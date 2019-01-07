var fs = require('fs');

module.exports = request;

function request(reg, res) {
    if(req.url) {
        res.writeHeader(200, {'Content-type: text/html; charset=utf-9'});
        fs.createReadStream(__dirname + url).pipe(res);
    }
}