// Requires
var fs = require( 'fs' );
var path = require( 'path' );
var process = require( 'process' );
var filesPath = './files';
var idsPath = 'ids.js';
var Xlsx = require('xlsx');
// Variables
var numberOfIds = 0;
var idsNotFound = [];

// Init
// Read ids synch
var ids = fs.readFileSync(idsPath, 'utf8').split('\n');
// Get files synch
var files = fs.readdirSync(filesPath);

/**
 * Clean up the ids array
 */
function cleanUpIds (ids) {
  ids.map(function (id, index) {
    if (id.length === 0 ) {
      ids.splice(index, 1);
    }
  })
  return ids;
}
/**
 * Seach function
 */
function findString (idsArray) {
    // Clean up the ids array
    var ids = cleanUpIds(idsArray);
    // Loop through all ids
    for (var i in ids) {
        // Make sure id is not null
        if (ids[i].length > 0) {
          var idsFoundFlag = false;
          // Incremente ids
          numberOfIds += 1;

          // Files
          files.forEach( function( file, index ) {
              var workbook = JSON.stringify(Xlsx.readFile(filesPath + '/' + file));
              // If id is found - can't stop the loop as ids are not unique
              if (workbook.indexOf(ids[i]) != -1) {
                  console.log('id: ' + ids[i] + ' ' + 'found in file: ' + file);
                  idsFoundFlag = true;
              }
          })
          // If id hasn't been found in any files
          if (!idsFoundFlag) {
              idsNotFound.push(ids[i]);
          }
        }
    }
}

// RUN
findString(ids);

// Quick result
console.log("**********RESULT***********");
console.log("Script run on: " + numberOfIds + ' ids.');
if (idsNotFound.length > 0) {
    console.log('Those ids were not found: ', JSON.stringify(idsNotFound));
}
console.log("Number of files: ", files.length);
console.log("******************************");
