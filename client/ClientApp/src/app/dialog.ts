export class Dialog {

    id: number;

    reciever_id: number;
    sender_id: number;
    message_body: string;
    receiverNickname: string;

    constructor(id: number, reciever_id: number, message_body: string) {
        this.id = id;
        this.reciever_id = reciever_id;
        this.message_body = message_body;
    }
}
