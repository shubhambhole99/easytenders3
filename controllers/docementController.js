const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const Document = require('../models/document'); // update the path as per your directory structure
const path = require('path');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    // region: 'YOUR_AWS_REGION'
    apiVersion: '2006-03-01' // Add this line
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'dcpr1',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            const folderName = req.body.folderName;
            const extension = path.extname(file.originalname);
            cb(null, `${folderName}/${Date.now().toString()}${extension}`); // Include the file extension // Prefix the key with the folder name
        }
    })
});

exports.uploadDocument = async (req, res) => {
    try {
        upload.single('file')(req, res, async function (err) {
            if (err) {
                console.error(err);
                return res.status(500).send('Failed to upload document');
            }
            const { folderName, documents } = req.body;

            if (!req.file) {
                return res.status(400).send('No file uploaded');
            }

            const document = new Document({
                folderName,
                file: req.file.location,
                documents
            });

            const savedDocument = await document.save();
            res.send({ message: 'File uploaded and document saved successfully', document: savedDocument });
        });
    } catch (err) {
        console.log(err);
    }
};

exports.getAllDocuments = async (req, res) => {
    try {
        const documents = await Document.find();
        console.log(documents)
        res.status(200).json({message:documents});
    } catch (err) {
        res.status(500).send(err);
    }
};

// folder
exports.getAllFolders = async (req, res) => {
    try {
        const params = {
            Bucket: 'dcpr1',
            Delimiter: '/'
        };

        const data = await s3.listObjectsV2(params).promise();
        console.log(data);
        const folders = data.CommonPrefixes.map(prefix => prefix.Prefix);
        const files = data.Contents.map(file => file.Key);
        
        const folderStructure = {};
        console.log(files);
        console.log(folderStructure);
        files.forEach(file => {
            const parts = file.split('/');
            const folder = parts[0];
            const filename = parts[1];

            if (!folderStructure[folder]) {
                folderStructure[folder] = [];
            }

            folderStructure[folder].push(filename);
        });

        const result = folders.map(folder => {
            return {
                folder,
                files: folderStructure[folder.replace('/', '')] || []
            };
        });

        res.status(200).json(result);
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.getDocument = async (req, res) => {
    try {
        const document = await Document.findById(req.params.id);
        res.send(document);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.deleteDocument = async (req, res) => {
    try {
        const document = await Document.findByIdAndDelete(req.params.id);
        res.send({ message: 'Document deleted successfully', document });
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.updateDocument = async (req, res) => {
    try {
        const document = await Document.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send({ message: 'Document updated successfully', document });
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.getFolderContents = async (req, res) => {
    const folderName = req.body.folderName;

    try {
        const data = await s3.listObjects({
            Bucket: 'dcpr1',
            Prefix: `${folderName}/`
        }).promise();

        const folderUrl = `https://${process.env.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${folderName}/`;
        console.log(folderUrl,'folderUrl')
        const documents = data.Contents.map(item => ({
            name: item.Key,
            url: `${folderUrl}${item.Key}`
        }));

        res.send({ folderUrl, documents });
    } catch (err) {
        res.status(500).send(err);
    }
};