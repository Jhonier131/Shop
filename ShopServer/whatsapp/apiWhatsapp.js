const fetch = require('node-fetch');

const sendWhatsAppMessage = async () => {
    const botId = '335151829687046';
    const phoneNumber = '573217742884';
    const bearerToken = 'EAAQ7lpIWwr0BOZCCw086LMGckWZAsxenjl68AUGJX2kKfuPpeFZAIklP7dNwBCJyhXe9DeXFvyeMLVJhqBSLEbfyeL47bvuRCZBrXdCHlMHB0ZA1X0BMqd3liiFNDA8y4XTt6BW4kA72v3OiSsp5PhUKCuhRmEglbuSF6za5eteab5n34FC0ZBYKGo3DnflIk36WCrecEfMsszOa9yZAgZDZD';

    var url = 'https://graph.facebook.com/v19.0/' + botId + '/messages';
    var data = {
        messaging_product: 'whatsapp',
        to: phoneNumber,
        type: 'template',
        template: {
            name: 'hello_world',
            language: { code: 'en_US' }
        }
    };

    const postReq = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        json: true
    }

    try {
        const response = await fetch(url, postReq);
        const resData = await response.json();
        console.log(resData);
    } catch (error) {
        console.error('Error:', error);
    }
}

module.exports = sendWhatsAppMessage;