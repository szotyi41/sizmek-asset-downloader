// this code will be executed when the extension's button is clicked
(function () {
  const servingUrl = 'https://secure-ds.serving-sys.com';
  const array = [];
  const iframe = document.querySelector('#sas2_sas1_iframe_component_wrapper')
    .contentWindow.document;
  iframe
    .querySelectorAll('div.assetContentContainer.ng-scope > div > ul img')
    .forEach((img) => {
      array.push({
        name: img.alt,
        path: img.currentSrc.replace(/^https?:\/\/[^#?\/]+/, servingUrl),
      });
    });

  if (!array.length) {
    alert('You are in a wrong page. Please go to https://platform.sizmek.com/#/spa/creativeMainNew/assetsLibrary/ and open your folder which has the uploaded assets.');
    return;
  }

  alert(array.length + ' assets found');

  exportJSONToCSV(array);

  function exportJSONToCSV(objArray) {
    var arr = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    var str =
      `${Object.keys(arr[0])
        .map((value) => `"${value}"`)
        .join(',')}` + '\r\n';
    var csvContent = arr.reduce((st, next) => {
      st +=
        `${Object.values(next)
          .map((value) => `"${value}"`)
          .join(',')}` + '\r\n';
      return st;
    }, str);
    var element = document.createElement('a');
    element.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
    element.target = '_blank';
    element.download = 'export.csv';
    element.click();
  }
})();
