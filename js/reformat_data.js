var data = require("./../clean_data.json");
var jsonfile = require('jsonfile');

var reformat = {};
for(i = 0; i < data.length; i++) {
    row = data[i];
    reformat[row.Actor] = reformat[row.Actor] || [];
    reformat[row.Actor].push({
        title: row.Title,
        year: row.Year,
        gross: row.Gross,
        rating: row.Score
    });
}

jsonfile.writeFile("./../reformat_data.json", reformat, function (err) {
  console.error(err)
})