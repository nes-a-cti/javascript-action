const core = require('@actions/core')
const github = require('@actions/github')

try{
  const nameToGreet = core.getInput('whom-to-greet');
  console.log(`Hello, ${nameToGreet}`);
  const time = (new Date()).toTimeString();
  console.log(`Time : ${time}`);
  core.setOutput("time", time);
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload : ${payload}`);
}catch(error){
  core.setFailed(error.message);
}