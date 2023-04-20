import User, { printName, printAge } from "./user.js";

const user = new User("Bob", 11);

console.log(user);

printName(user);
printAge(user);
