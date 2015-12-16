var fs = require( 'fs' );
var path = require( 'path' );
var process = require( 'process' );
var filesPath = './files';
var idsPath = 'ids.js';
var Xlsx = require('xlsx');
var numberOfIds = 0;
var idsNotFound = [];

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
          var idsFoundFlag = false;
          // Incremente ids
          numberOfIds += 1;

          // Files
          files.forEach( function( file, index ) {
              var workbook = JSON.stringify(Xlsx.readFile(filesPath + '/' + file));
              if (workbook.indexOf(ids[i]) != -1) {
                  console.log('id: ' + ids[i] + ' ' + 'found in file: ' + file);
                  idsFoundFlag = true;
              }
          })

          if (!idsFoundFlag) {
              idsNotFound.push(ids[i]);
          }
        }
    }
    // Console logs
    console.log("**********RESULT***********");
    console.log("Total of ids: ", numberOfIds);
    if (idsNotFound.length > 0) {
        console.log('Those ids were not found: ', JSON.stringify(idsNotFound));
    }
    console.log("Number of files: ", files.length);
    console.log("******************************");
}

findString(ids);
