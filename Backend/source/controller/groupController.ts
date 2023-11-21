import RoleModel from "../database/model/roleModel.js";


class GroupController {
    static async getJoinedGroup(userID: string) {
        return RoleModel.getGroupUser(userID);
    }

    static async updateNickname(userID: string, groupID: string) {
        
    }

    static async getChannels(userID: string, groupID: string) {
        
    }
}

export default GroupController;