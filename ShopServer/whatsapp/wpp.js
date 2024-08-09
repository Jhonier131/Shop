const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const chromium = require('chromium');

const client = new Client({
    puppeteer: {
        executablePath: chromium.path,
    }
});

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    // if (msg.body == '!ping') {
        msg.reply('pong');
    // }
});

module.exports = {client}
