
import MessageModel from "../database/model/messageModel.js"

/** 
 * Generate Mongo regex to use for search matching
 * @searchWord: search keyword to search
 * @option: mongo specific option to search
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function searchToRegex(searchWord: string, option?: string) {
    
    if (undefined !== option) {

    }
    return searchWord + "i";
}
