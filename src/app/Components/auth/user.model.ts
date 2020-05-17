export class User {
  constructor(
    public email: string,
    public token: string,
    public expiresAt: Date
  ) { }

  // getToken() {
  //   if (this.tokenExpirationDate || new Date() > this.tokenExpirationDate) {
  //     return null;
  //   }
  //   return this.token;
  // }
}
