<!-- Ans a : Package Managers  -->

 **What is Package manager**
 A Package manager is a tool that automates the process of installing, upgrading,configuring, and removing software libraries (packages) for a project. In the context of development, it acts as a middleman between a global registry of code and your local project.

 **Why do we need package managers in backend development**
  Backend applications rarely exist in a vacuum; they rely on many external tools for tasks like connecting to databases (e.g., Mongoose), handling encryption (e.g., Bcrypt), or managing server routes (e.g., Express). A package manager allows us to:

  > Easily share code: We don’t have to reinvent the wheel for standard features.

  > Manage versions: Ensure everyone on a team is using the exact same version of a library.

  > Handle dependencies: Automatically download the libraries that our libraries need to work.

**Problems faced if package managers are not used**
  > Dependency Hell: Manually tracking which version of "Library A" works with "Library B" becomes nearly impossible as a project grows.

  > Manual Updates: You would have to manually download .zip files from websites and copy-paste code into your project every time there is a security patch.

  > Bloated Repositories: Without a manager, you’d have to upload every single line of third-party code to your GitHub, making your project massive and hard to manage

  <!--Ans b : NPM (Node Package Manager)  -->

**What is NPM?**
 NPM is the default package manager for Node.js. It consists of two parts: an online database (the NPM Registry) where developers share their code, and a Command Line Interface (CLI) that we use to interact with that database.

**Why is NPM important for Node.js applications?**
  NPM is the backbone of the Node ecosystem. It allows developers to access over a million open-source packages instantly. Without NPM, the rapid development speed that Node.js is known for would be significantly slower.

**How NPM helps in managing dependencies**
 NPM tracks every library you install in a specific file called package.json. It ensures that if another developer downloads your project, they can simply run one command (npm install) to get all the necessary dependencies without you having to send them the actual library files.


<!-- Ans c : Backend Project Initialization -->

**The Initialization command**
  To start a new Node.js project, we use the following command in the terminal: *npm init*

**Difference between "npm init" and "npm init -y"**
 > npm init: This is the interactive version. It asks a series of questions (like project name, version, description, and author) to customize your setup.

 > npm init -y: The -y stands for "yes." This skips all the questions and automatically generates a package.json file with the default settings. It is much faster when you want to get started immediately.

 <!--Ans d : Files and Folders Created After Project Initialization  -->

**package.json**
  This is the "manifest" or the "ID card" of your project. It contains essential metadata (name, version) and, most importantly, the list of dependencies required to run the app. It is the heart of any Node project.

**node_modules**
  This folder contains the actual source code of the libraries you installed via NPM. For example, if you install Express, the Express code lives here. It is usually a very large folder because it also contains the "dependencies of your dependencies."

**package-lock.json**
  While package.json says "I need version 4.x of Express," the package-lock.json records the exact version installed (e.g., 4.17.1). This ensures that the project behaves identically on every developer's machine.

**What to Push to Github (and What Not to)**
Item : *node_modules*
Action : Do NOT Push
Why :   It is too large and can be easily recreated by running npm install. We list it in a .gitignore file.

Item : *package.json*
Action: Must Push
Why : It serves as the blueprint for the project; without it, others won't know which libraries to install.

Item : package-lock.json
Action : Must Push
Why: It ensures that everyone on the team is using the exact same sub-versions of dependencies, preventing "it works on my machine" bugs.



