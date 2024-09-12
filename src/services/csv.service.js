const fs = require('fs');

exports.writeCsvFile = (filePath, data) => {

    // Extract headers from all rows (Union of all keys)
    const headers = new Set();
    data.forEach(row => {
        Object.keys(row).forEach(key => headers.add(key));
    });
    const headersArray = Array.from(headers);

    // Create a writable stream
    const writer = fs.createWriteStream(filePath);

    // Write headers to the file
    writer.write(headersArray.join(',') + '\n');

    // Write each row's data to the file
    data.forEach(row => {
        const rowValues = headersArray.map(header => row[header] || '');
        writer.write(rowValues.join(',') + '\n');
    });

    // Finalize the file writing
    writer.end();
};