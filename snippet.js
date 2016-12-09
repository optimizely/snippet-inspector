var snippetParam = location.search.split('snippet=')[1];

if (!snippetParam) {
  var snippet = 'https://cdn.optimizely.com/js/4391536040.js';
} else if (snippetParam.includes('cdn.optimizely.com')) {

  var snippet = snippetParam;
} else {
  var snippet = 'https://cdn.optimizely.com/js/' + snippetParam + '.js';
}

document.write('<scr' + 'ipt src="' + snippet + '"></script>');