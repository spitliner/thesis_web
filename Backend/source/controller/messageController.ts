
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
        return MessageModel.getVisibleMessages(channelID);
    }

    static async getReply(channelID: string, messageID: string) {
        return MessageModel.getSingleMessage(messageID, channelID);
    }
}

export default MessageController;