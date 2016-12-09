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
print('<h1>Total size: ' + totalSize + '</h1>')

pages = _.sortBy(pages, 'size').reverse();

var template = Handlebars.compile([
  '<a href="{{url}}"><h1>{{id}} {{name}}</h1></a>',
  '<p>API Name: {{apiName}}</p>',
  '<p>Total Size: {{size}} ({{percent fraction}})</p>',
  '<ul>',
  '{{#each campaigns}}',
  '  <li><a href="{{url}}">{{id}} {{name}}</a> ({{size}})</li>',
  '{{/each}}',
  '</ul>',
].join(""));

_.each(pages, function(p) {
  p.fraction = p.size / totalSize;
  p.url = 'https://app.optimizely.com/v2/projects/' + data.projectId + '/implementation/pages/' + p.id;
  _.each(p.campaigns, function(c) {
    c.url = 'https://app.optimizely.com/v2/projects/' + data.projectId + '/campaigns/' + c.id;
  })
  print(template(p));
});
