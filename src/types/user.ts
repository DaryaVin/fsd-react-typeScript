export interface user {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  sex: "male" | "female",
  dateBirthday: Date,
  urlPhoto?: string,
  subscription?: boolean,
}

export class User {
  // email: string;
  // password: string;
  firstName: string;
  lastName: string;
  sex: "male" | "female";
  dateBirthday: Date;
  urlPhoto: string | null;
  subscription: boolean;
  protected _email: string = "";
  protected _password: string = "";
  get email(): string {
    return this._email;
  }
  set email(value: string) {
    //checking for email
    this._email = value;
  }
  get password(): string {
    return this._password;
  }
  set password(value: string) {
    // checking for password
    this._password = value;
  }
  constructor(data: user) {
    this.email = data.email;
    this.password = data.password;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.sex = data.sex;
    this.dateBirthday = data.dateBirthday;
    data.urlPhoto? this.urlPhoto = data.urlPhoto : this.urlPhoto = null;
    data.subscription ? this.subscription = data.subscription : this.subscription = false;
  }
}
