const formidable = require('formidable');

var uploadUserFile = function (req, res, next) {
    const form = formidable({ multiples: true, keepExtensions: true, uploadDir: './public/assets/userPhoto/' });

    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        res.json({ files });
    });
}

module.exports = {
    uploadUserFile
};