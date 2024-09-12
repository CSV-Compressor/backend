const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const csv = require('csv-parser');
const {writeCsvFile} = require('../services/csv.service')

exports.compress = async (req, res) => {
    if (!req.file) {
        return res.status(400).send({
            message: 'File not found',
            success: false
        });
    }

    const filePath = req.file.path;
    const maleData = [];
    const femaleData = [];
    
    // Read and process CSV file
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            if (row.gender.toLowerCase() === 'male') {
                maleData.push(row);
            } else if (row.gender.toLowerCase() === 'female') {
                femaleData.push(row);
            }
        })
        .on('end', async () => {
            try {
                const maleFilePath = path.join('src/uploads', 'male.csv');
                const femaleFilePath = path.join('src/uploads', 'female.csv');

                // Write separated CSV files
                await Promise.all([
                    writeCsvFile(maleFilePath, maleData),
                    writeCsvFile(femaleFilePath, femaleData)
                ]);

                const archive = archiver('zip', { zlib: { level: 9 } });
                const zipName = 'compressed-files.zip';
                res.attachment(zipName);
                archive.pipe(res);

                // Append the separated CSV files to the ZIP archive
                archive.file(maleFilePath, { name: 'male.csv' });
                archive.file(femaleFilePath, { name: 'female.csv' });
                await archive.finalize();

                // Clean up the uploaded and generated files
                fs.unlink(filePath, err => { if (err) console.error(err); });
                fs.unlink(maleFilePath, err => { if (err) console.error(err); });
                fs.unlink(femaleFilePath, err => { if (err) console.error(err); });
            } catch (err) {
                console.error(err);
                res.status(500).send({
                    message: 'Error processing file',
                    success: false
                });
            }
        });
};
