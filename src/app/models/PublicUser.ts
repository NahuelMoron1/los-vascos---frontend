export class PublicUser {
  id: string;
  email: string;
  username: string;
  client: boolean;
  constructor(id: string, email: string, username: string, client: boolean) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.client = client;
  }
}
