export class User {
    email: string;
    username: string;
    location: string;
    picture: string;

    constructor(email: string, username: string, location: string, picture: string) {
        this.email = email;
        this.username = username;
        this.location = location;
        this.picture = picture;
    }
}