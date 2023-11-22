
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

    static async getHideMessage(channelID: string) {
        return MessageModel.getMessages(channelID, true);
    }
    static async getReply(channelID: string, messageID: string) {
        return MessageModel.getSingleMessage(messageID, channelID);
    }

    static async addMessage(userID: string, channelID: string, messageType: string, content: string) {
        return MessageModel.addMessage(userID, channelID, messageType, content);
    }

    static async editMessage(userID: string, channelID: string, content: string) {
        
    }
}

export default MessageController;