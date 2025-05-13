require('dotenv').config();
const path = require('path');

class ChatController {
    static async chat(req, res){
        res.sendFile(path.join(__dirname, '../views', 'chat.html'));
    }

}

module.exports = ChatController;
