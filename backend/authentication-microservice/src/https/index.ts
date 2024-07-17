const fs = require('fs');
const path = require('path');

const privateKeyPath = path.join(__dirname, "..", "https", 'key.pem');
const publicCertPath = path.join(__dirname, "..", "https", 'server.crt');

const privateKey = fs.readFileSync(privateKeyPath,"utf8");
const publicCert = fs.readFileSync(publicCertPath,"utf8");

module.exports =  {
  key: privateKey,
  cert: publicCert,
};