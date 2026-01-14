const boxen = require("boxen");

const message = "I am using my first external module!";
const boxTitle = "Hurray!!!";

// 1. Classic (The one you are missing)
console.log(
  boxen(message, {
    title: boxTitle,
    titleAlignment: "center",
    borderStyle: "classic",
  })
);

// 2. SingleDouble
console.log(
  boxen(message, {
    title: boxTitle,
    titleAlignment: "center",
    borderStyle: "singleDouble",
  })
);

// 3. Round
console.log(
  boxen(message, {
    title: boxTitle,
    titleAlignment: "center",
    borderStyle: "round",
  })
);

// 4. Bonus Task
console.log(
  boxen(message, {
    title: "Bonus Task",
    backgroundColor: "magenta",
    borderColor: "yellow",
  })
);
