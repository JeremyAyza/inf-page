import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

function convertCsvToJson(csvString) {
	const lines = csvString.trim().split('\n');
	const result = [];

	const keys = [
		'id',
		'firstName',
		'lastName',
		'department',
		'district',
		'age',
		'occupation',
		'motive',
		'socialMedia'
	];

	// Regex to split CSV line, handling commas within double quotes.
	// It captures either a quoted field (removing quotes) or a non-quoted field.
	const csvSplitRegex = /("([^"]*(?:""[^"]*)*)"|[^,]*)(?:,|$)/g;

	for (const line of lines) {
		const values = [];
		let match;
		let lastIndex = 0;

		// Use a loop with regex.exec to find all fields
		while ((match = csvSplitRegex.exec(line)) !== null) {
			// If the field was quoted, match[2] will contain the unquoted value
			// with escaped double quotes (e.g., "" becomes ").
			// Otherwise, match[1] or match[0] (before comma) contains the value.
			let value = match[2] !== undefined ? match[2].replace(/""/g, '"') : match[1];
			if (value === undefined) { // Handle cases like trailing commas or empty fields
					value = '';
			}
			values.push(value.trim());
			lastIndex = csvSplitRegex.lastIndex;

			// Stop if we've processed the entire line and the last char wasn't a comma
			if (lastIndex === line.length && !line.endsWith(',')) {
					break;
			}
		}
		
		// If the line ends with a comma, csvSplitRegex.exec might not capture an empty string for the last field.
		// This check ensures we have the correct number of fields.
		if (line.endsWith(',') && values.length < keys.length) {
				values.push('');
		}

		if (values.length === keys.length) {
			const obj = {};
			keys.forEach((key, index) => {
				let val = values[index];
				// Attempt to convert age to number if it's a number string
				if (key === 'age' && !isNaN(parseFloat(val)) && isFinite(val)) {
					obj[key] = parseFloat(val);
				} else {
					obj[key] = val === 'NA' || val === 'N/A' || val === '' ? null : val;
				}
			});
			result.push(obj);
		}
	}

	return result;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputCsvFilePath = path.join(__dirname, 'lista.csv'); // Assuming input.csv is in the same directory
const outputJsonFilePath = path.join(__dirname, 'output.json');

fs.readFile(inputCsvFilePath, 'utf8', (err, data) => {
	if (err) {
		console.error(`Error reading CSV file: ${err}`);
		return;
	}

	try {
		const jsonData = convertCsvToJson(data);
		const jsonString = JSON.stringify(jsonData, null, 2); // Pretty print JSON

		fs.writeFile(outputJsonFilePath, jsonString, 'utf8', (err) => {
			if (err) {
				console.error(`Error writing JSON file: ${err}`);
				return;
			}
			console.log(`Successfully converted ${inputCsvFilePath} to ${outputJsonFilePath}`);
		});
	} catch (parseError) {
		console.error(`Error converting CSV to JSON: ${parseError}`);
	}
});



