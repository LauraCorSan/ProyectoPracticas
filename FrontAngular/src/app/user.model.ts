export class User {
  constructor(
    public name: string,
    public surname: string,
    public email: string,
    public username: string,
    public password: string,
    public dateOfBirth: Date,
    public registrationDate: Date,
    public alergens: Alergen[]
  ) {}
}
export class Alergen {
  constructor(
    public name: string,
  ) {}
}
