export class User {
  constructor(
    public name: string,
    public surname: string,
    public email: string,
    public username: string,
    public password: string,
    public dateOfBirth: Date,
    public registrationDate: Date,
    public alergens: Alergens[]
  ) {}
}
export class Alergens {
  constructor(
    public id: number,
    public name: string,
  ) {}
}
