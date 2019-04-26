export class Message {

    id: number;
    subjectId: number;
    text = '';
    senderId: number;


    constructor(text: string) {
        this.text = text;
    }

}
