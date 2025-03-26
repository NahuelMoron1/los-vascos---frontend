export class User {
  id: string;
  email: string;
  password: string;
  username: string;
  client: boolean = false;

  constructor(id: string, email: string, password: string, username: string) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.username = username;
  }
}
