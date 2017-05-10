data = optimizely.get('data')
campaigns = _.sortBy(data.campaigns, size).reverse()
pages = data.pages


// Link campaigns to pages
_.each(campaigns, function(c) {
  _.each(c.viewIds, function(v) {
    if (pages[v]) { // Edge case: multipage
      pages[v].campaigns = pages[v].campaigns || [];
      pages[v].campaigns.push(c);
    }
  });
});

// Measure size
_.each(pages, function(p) {
  p.size = size(p.campaigns);
  _.each(p.campaigns, function(c) {
    c.size = size(c)
  });
});

totalSize = sum(_.pluck(pages, 'size'));

// Spit them out
print('<div class="muted title">Optimizely Snippet Inspector</div>')
print('<h1><a href="' + snippet + '">' + snippet + '</a></h2>')
print('<p>Total snippet size, uncompressed: ' + sizeToKilobytes(totalSize) + '</p>')

pages = _.sortBy(pages, 'size').reverse();

function toggleData(page_id, id) {
  $('#' + page_id + '-' + id).toggle();
}

var template = Handlebars.compile([
  '<a href="{{url}}" target="_blank"><h2>{{name}}</h2></a>',
  '<p><span class="accent">API Name:</span> {{apiName}}</p>',
  '<p><span class="accent">Page ID:</span> {{id}}</p>',
  '<p><span class="accent">Total size:</span> {{formatSize size}} ({{percent fraction}} of snippet)</p>',
  '<p class="accent">Experiments:</p>',
  '<ul>',
  '{{#each campaigns}}',
  '  <li><a href="{{url}}" target="_blank">{{id}} {{name}}</a> ({{formatSize size}}) <i class="fa fa-plus-circle" onclick="toggleData({{page_id}}, {{id}})"></i></li>',
    '<pre style="display: none" id="{{page_id}}-{{id}}">{{ data }}</pre>',
  '{{/each}}',
  '</ul>',
].join(""));

_.each(pages, function(p) {
  p.fraction = p.size / totalSize;
  p.url = 'https://app.optimizely.com/v2/projects/' + data.projectId + '/implementation/pages/' + p.id;
  _.each(p.campaigns, function(c) {
    c.data = JSON.stringify(c, null, 2);
    c.page_id = p.id
    c.url = 'https://app.optimizely.com/v2/projects/' + data.projectId + '/campaigns/' + c.id;
  })
  print(template(p));
});
