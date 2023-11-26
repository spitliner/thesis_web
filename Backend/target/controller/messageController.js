import MessageModel from "../database/model/messageModel.js";
/**
 * Generate Mongo regex to use for search matching
 * @searchWord: search keyword to search
 * @option: mongo specific option to search
 *
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function searchToRegex(searchWord, option) {
    searchWord = "" + searchWord;
    if (undefined !== option) {
        return searchWord + option;
    }
    return searchWord + 'i';
}
class MessageController {
    static async getMessageInChannel(channelID) {
        return MessageModel.getMessages(channelID);
    }
    static async getHideMessage(channelID) {
        return MessageModel.getMessages(channelID, true);
    }
    static async getReply(channelID, messageID) {
        return MessageModel.getSingleMessage(messageID, channelID);
    }
    static async addMessage(userID, channelID, messageType, content) {
        return MessageModel.addMessage(userID, channelID, messageType, content);
    }
    static async editMessage(userID, channelID, content) {
    }
}
export default MessageController;
