let express = require("express");
let app = express();
let jsonexport = require('jsonexport');

let port = process.env.PORT || 3030;



/*
Write a javascript code that will parse the sample data and fetch all the values and export it to a CSV file in the following format:
John Doe,EMT,Richmond Rd,Product 1,5,0,1,0,Product 2,19,899

-Full name: John Doe
-Payment type: EMT
-Pickup Location: Richmond Rd
-Product Name: Product 1
-Style 1: 5
-Style 2 : 0
-Style 3 : 1
-Style 4 : 0
-Product Name: Product 2
-Style 1: 19
-Style 2 : 899
Submit
Note: Test can only be submitted once.
*/
let text = 'John Doe,EMT,Richmond Rd,Product 1,5,0,1,0,Product 2,19,899';
let parts = text.split(',');

let titles = ['Full name', 'Payment type', 'Pickup Location', 'Product Name', 'Style 1', 'Style 2', 'Style 3', 'Style 4', 'Product Name', 'Style 1', 'Style 2'];

app.get("/", (req, res, next) => {
	let sdtOutput =  '<h2>Text to CSV:</h2><em>'+text+'</em><br><br>';
	for (let i=0; i<parts.length; i++){
		 sdtOutput += '<b>'+titles[i]+':</b> '+  parts[i] +'<br>';
	}
	sdtOutput += '<br><br><a href="export">Export to CSV</a> <br>';
	sdtOutput += '<br><a href="export?style=vertical">Export to CSV(Vertical)</a> <br>';
    res.send(sdtOutput);
});
app.get("/export", (req, res, next) => {
    let csvData = '';

    if (req.query.style === 'vertical'){
    	csvData += "Title,Value\n";
    	for (let i=0; i<parts.length; i++){
    		let rowString = titles[i]+','+  parts[i] +"\n";
	    	csvData += rowString + "\n";
		}
    } else {
	    let data = [titles, parts]
	    for (let i=0; i<data.length; i++){
	    	let row = data[i];
	    	let rowString = row.join(",");
	    	csvData += rowString + "\n";
	    }
    }
    
	res.header('Content-Type', 'text/csv');
    res.attachment('export.csv');
    return res.send(csvData);
});



// Default response for any other request
app.use(function(req, res){
    res.status(404);
});
app.listen(port, () => {
 console.log("Server running on port " + port);
});

