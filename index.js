const core = require('@actions/core')
const github = require('@actions/github')

try{
  const nameToGreet = core.getInput('whom-to-greet');
  console.log(`Hello, ${nameToGreet}`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // const payload = JSON.stringify(github.context.payload, undefined, 2);
  // console.log(`The event payload : ${payload}`);
  const path1 = core.getInput("path");
  const path2 = core.getInput("PATH");
  console.log(`Path11 : ${path1}`);
  console.log(`Path12 : ${path2}`);
}catch(error){
  core.setFailed(error.message);
}