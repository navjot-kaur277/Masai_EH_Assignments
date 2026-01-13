/**
 * Checks if a given number is a prime number.
 * @param {number} num - The number to check.
 * @returns {boolean} - Returns true if prime, false otherwise.
 */
export const checkPrime = (num) => {
  if (num <= 1) return false; // Prime numbers must be greater than 1
  if (num <= 3) return true; // 2 and 3 are prime

  // Basic primality test optimization
  if (num % 2 === 0 || num % 3 === 0) return false;

  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }

  return true;
};
