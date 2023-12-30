const rp = require("request-promise");

class Taqnyat {
  constructor(bearerToken, sender) {
    this._bearerToken = bearerToken;
    this._sender = sender;
  }

  async sendSMS(message, recipients, options) {
    const requestBody = {
      sender: this._sender,
      body: message,
      recipients: recipients,
    };

    const requestOptions = {
      method: 'POST',
      uri: 'https://api.taqnyat.sa/v1/messages',
      headers: {
        'Authorization': `Bearer ${this._bearerToken}`, // Set the Bearer Token here
        'Content-Type': 'application/json' // Specify JSON content type
      },
      body: requestBody,
      json: true // Automatically parse response body as JSON
    };

    try {
      const result = await rp(requestOptions);
      return result;
    } catch (error) {
      return error.message;
    }
  }
}

module.exports = {
  Taqnyat: Taqnyat,
};
