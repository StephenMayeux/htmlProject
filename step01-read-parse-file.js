// var => initialize the variable, and then later change its value
// in addition, the var keyword is scoped to a function.

// const and let are scoped to the block {}
// const = constant, meaning we cannot reassign it a new value
// let

const fs = require('fs');

fs.readFile('./package.json', 'utf8', (err, fileContents) => {
  // null, undefined, false, 0, '' => falsy
  if (err) {
    console.log('Error reading file', err);
    process.exit(1);
  }

  // javascript array or object and convert it into a string, JSON.stringify()
  const parsedFileContents = JSON.parse(fileContents);
  // destructuring
  const { dependencies } = parsedFileContents;
  console.log(dependencies)
  // const dependencies = parsedFileContents.dependencies;
  const keys = Object.keys(dependencies);

  console.log('these are my keys', keys)
});
