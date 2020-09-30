/* @flow */

export class User {
  _id;
  height;
  age;
  sex;
  birthday;
  constructor(
    _id: string,
    height: number,
    age: number,
    sex: string,
    birthday: string
  ) {
    this._id = _id;
    this.height = height;
    this.age = age;
    this.sex = sex;
    this.birthday = birthday;
  }
}
