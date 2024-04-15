const multer = require('multer');
const csvParser = require('csv-parser');
const stream = require('stream');
const UserModel = require('../models/UserModel');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadCSV = (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const results = [];

    const bufferStream = new stream.PassThrough();
    bufferStream.end(req.file.buffer);

    bufferStream
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            UserModel.deleteMany({}, (err) => {
                if (err) {
                    console.error("Failed to clear collection: ", err);
                    return res.status(500).send('Error clearing the collection: ' + err.message);
                }

                UserModel.insertMany(results, (err) => {
                    if (err) {
                        return res.status(500).send('Error inserting data.');
                    }

                    res.send('Data uploaded successfully.');
                });
            });
        })
        .on('error', (error) => {
            return res.status(500).send(`Error processing CSV: ${error.message}`);
        });
};

const getData = (req, res) => {
    UserModel.find({}, (err, data) => {
        if (err) {
            return res.status(500).send('Error retrieving data.');
        }

        res.json(data);
    });
};

module.exports = {
    uploadCSV: [upload.single('file'), uploadCSV],
    getData
};
