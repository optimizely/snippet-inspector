var snippetParam = location.search.split('snippet=')[1];

if (!snippetParam) {
  snippet = 'https://cdn.optimizely.com/js/4391536040.js';
} else if (/https?:/.test(snippetParam)) {

  snippet = snippetParam;
} else {
  snippet = 'https://cdn.optimizely.com/js/' + snippetParam + '.js';
}

document.write('<scr' + 'ipt src="' + snippet + '"></script>');
