
/* Thanks to JensOrsel! He gave me an example of how to clean the data from CBS */


// Loading in the data as plain text so it can be cleaned.
d3.text('data.csv')
	.mimeType('text/plain;charset=iso88591')
	.get(onload)

// make a function to start cleaning the mess.
function onload(err, doc) {
	if (err) throw err// Throws error when the data isn't what it supossed to be.

	// Remove the meta text from the data and start at the first line of the actual data.
	var start = doc.indexOf('"Population; key figures"')
	var end = doc.indexOf('\n', start)

	// This block will remove all the unnesecery addons in the text.
	doc = doc.slice(end).trim()
	doc = doc.replace(/number/g, '')
	doc = doc.replace(/;/g, ',')
	doc = doc.replace(/\d\.\d /g, '')
	doc = doc.replace(/"/g, '')
	doc = doc.replace('"© Statistics Netherlands, Den Haag/Heerlen 31-1-2018"', '')

	// making rows of all the data
	var data = d3.csvParseRows(doc)

	// Im still trying to figure out how the get the proper data out if this.
	function map(d) {
		return {
			years: d[0].slice(4)
		}
	}

	console.log(data)
}



