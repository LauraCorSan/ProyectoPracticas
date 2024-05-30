export class User {
    constructor(
        public name: string,
        public surname: string,
        public email: string,
        public intolerances: string[],
        public birthDate: Date
    ) {}
}
