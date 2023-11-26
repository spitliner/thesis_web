import RoleModel from "../database/model/roleModel.js";


class GroupController {
    static async updateNickname(userID: string, groupID: string) {
        
    }

    static async getJoinedUser(groupID: string) {
        return RoleModel.getGroupUser(groupID);
    }

    static async getChannels(userID: string, groupID: string) {
        
    }

    static async generatePesonalInvite(userID: string, groupID: string) {

    }

    
}

export default GroupController;