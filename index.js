var fs = require( 'fs' );
var path = require( 'path' );
var process = require( 'process' );
var filesPath = './files';
var idsPath = 'ids.js';
var Xlsx = require('xlsx');

// Init
// Read ids
var ids = fs.readFileSync(idsPath, 'utf8').split('\n');
var files = fs.readdirSync(filesPath);

/**
 * Seach function
 */
function findString (ids) {
    for (var i in ids) {
        // Make sure id is not null
        if (ids[i].length > 0) {
          files.forEach( function( file, index ) {
              var workbook = JSON.stringify(Xlsx.readFile(filesPath + '/' + file));
              if (workbook.indexOf(ids[i]) != -1) {
                  console.log('id: ' + ids[i] + ' ' + 'found in file: ' + file);
              }
          })
        }
    }
}

findString(ids);
