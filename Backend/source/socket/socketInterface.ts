export interface ServerToClientEvents {
    chat_sync: (message: object) => void;
    chat_edited: (message: object) => void;
    chat_delete: (messageID: string) => void;
    chat_get: (message: object[]) => void;
    user_notify: (channelID: string) => void;
    mod_notify: (groupID: string, channelID: string) => void;
    admin_notify: (groupID: string, channelID: string) => void;
    user_typing: (channelID: string, userID: string) => void;
    server_error: (error: object) => void
}
  
export interface ClientToServerEvents {
    chat_new: (channelID: string, content: string) => void;
    chat_new_img: (channelID: string, type: string, content: Buffer) => void;
    chat_edit: (channelID: string, messageID: string, content: string) => void;
    chat_typing: (channelID: string) => void;
    join_channel: (groupID: string, channelID: string) => void;
    mod_action: (groupID: string, channelID: string, messageID: string) => void;
    admin_action: (groupID: string, channelID: string, messageID: string) => void;
    user_typing: (channelID: string, userID: string) => void;
}
  
export interface InterServerEvents {
    
}
  
export interface SocketData {
    
}