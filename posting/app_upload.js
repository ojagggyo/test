var request = require('request');
var fs = require('fs');


module.exports.upload = (url, file_path) => {

    return new Promise((resolve) => {

        var options = {
            'method': 'POST',
            'url': url,
        'headers': {},
        formData: {
            '': {
            'value': fs.createReadStream(file_path),
            'options': {
                'filename': '',
                'contentType': null
                }
            }
        }
        };
        
        request(options, function (error, response) {
        if (error) {
            console.error(error);
        }
            //console.log(response.body);
            resolve(response.body)
        });
    })
}
