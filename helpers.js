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

Handlebars.registerHelper('json', function(obj) {
  return new Handlebars.SafeString('<pre>' + JSON.stringify(obj, null, 2) + '</pre>')
})