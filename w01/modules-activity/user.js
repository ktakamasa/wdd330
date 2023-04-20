export default class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

export function printName(user) {
  console.log(`User's name is ${user.name}`);
}

export function printAge(user) {
  console.log(`User is ${user.age} years old`);
}

// //one way of exporting -- at the end
// export default User
// export { printName, printAge }

// //or you can do it in line like above
// // can only export default one thing
