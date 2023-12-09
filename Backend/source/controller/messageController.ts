
import MessageModel from "../database/model/messageModel.js"

/** 
 * Generate Mongo regex to use for search matching
 * @searchWord: search keyword to search
 * @option: mongo specific option to search
 * 
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function searchToRegex(searchWord: string, option?: 'i' | 'm' | 'x' | 's') {
    searchWord = "" + searchWord;
    if (undefined !== option) {
        return searchWord + option;
    }
    return searchWord + 'i';
}

class MessageController {
    static async getMessageInChannel(channelID: string) {
        return MessageModel.getMessages(channelID);
    }

    static async getHidenMessage(channelID: string) {
        return MessageModel.getMessages(channelID, true);
    }
    static async getReply(channelID: string, messageID: string) {
        return MessageModel.getSingleMessage(messageID, channelID);
    }

    static async addMessage(userID: string, channelID: string, messageType: string, content: string) {
        return MessageModel.addMessage(userID, channelID, messageType, content);
    }

    static async editMessage(messageID: string, userID: string, channelID: string, content: string) {
        return MessageModel.editMessage(messageID, channelID, userID, content);
    }

    static async moderateMessage(messageID: string, channelID: string, action: string) {
        return MessageModel.moderateMessage(messageID, channelID, action);
    }
}

export default MessageController;