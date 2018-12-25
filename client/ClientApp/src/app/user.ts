export class User {

    id: number;
    name: string;
    email: string;
    nickname: string;
    password: string;

    constructor(name: string) {
        this.name = name;
    }
}
