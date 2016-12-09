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

pages = _.sortBy(pages, 'size').reverse();

// Spit them out
var template = Handlebars.compile([
  '<a href="{{url}}"><h1>{{name}}</h1></a>',
  '<p>Total Size: {{size}}</p>',
  '<ul>',
  '{{#each campaigns}}',
  '  <li><a href="{{url}}">{{ name }}</a> ({{ size }})</li>',
  '{{/each}}',
  '</ul>',
].join(""));

_.each(pages, function(p) {
  print(template(p));
});
