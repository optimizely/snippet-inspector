function print(html) {
  $('#output').append(html);
}

function log(message) {
  print('<pre>' + JSON.stringify(message, null, 2) + '</pre>');
}

function size(obj) {
  return obj ? JSON.stringify(obj).length : 0;  
}

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function sum(arr) {
  return _.reduce(arr, function(memo, num){ return memo + num; }, 0);
}

Handlebars.registerHelper('json', function(obj) {
  return new Handlebars.SafeString('<pre>' + JSON.stringify(obj, null, 2) + '</pre>')
})

Handlebars.registerHelper('percent', function(num) {
  return (100.0 * num).toFixed(1) + '%'
})