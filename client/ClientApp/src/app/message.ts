export class Message {

    id: number;
    receiver_id: number;
    dialogue_id: number;
    body = '';
    senderId: number;


    constructor(body: string, sender_id: number, receiver_id: number, dialogue_id: number) {
        this.body = body;
        this.senderId = sender_id;
        this.receiver_id = receiver_id;
        this.dialogue_id = dialogue_id;
    }

}
