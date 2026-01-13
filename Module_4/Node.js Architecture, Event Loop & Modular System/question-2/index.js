// Import the checkPrime function using ES Module syntax
import { checkPrime } from "./math.js";

// Define values to test
const testValues = [2, 7, 10, 13, 25, 29];

console.log("--- Prime Number Check ---");

testValues.forEach((val) => {
  const result = checkPrime(val);
  console.log(`Is ${val} a prime number? ${result}`);
});
