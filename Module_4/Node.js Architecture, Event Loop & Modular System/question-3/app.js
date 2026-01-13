import os from "os";
import fs from "fs/promises"; // Using promises for cleaner async/await syntax

// --- Part A: OS Module ---
console.log("--- System Information ---");
console.log(`Free Memory: ${os.freemem()} bytes`);
console.log(`Total CPU Cores: ${os.cpus().length}`);

// --- Part B: File System CRUD Operations ---
const performFileOperations = async () => {
  try {
    // 1. Create data.txt with "Hello World"
    await fs.writeFile("data.txt", "Hello World");
    console.log("File 'data.txt' created.");

    // 2. Create Readme.md with specific content
    await fs.writeFile("Readme.md", "## This is first line in Readme");
    console.log("File 'Readme.md' created.");

    // 3. Read data.txt and print its content
    const dataContent = await fs.readFile("data.txt", "utf-8");
    console.log(`Reading data.txt: ${dataContent}`);

    // 4. Append text to data.txt
    await fs.appendFile("data.txt", "\nThis is second line");
    console.log("Text appended to 'data.txt'.");

    // 5. Delete Readme.md
    await fs.unlink("Readme.md");
    console.log("File 'Readme.md' deleted.");
  } catch (error) {
    // Handling errors properly as per rules
    console.error("An error occurred during file operations:", error.message);
  }
};

performFileOperations();
