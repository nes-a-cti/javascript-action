// const core = require('@actions/core')
// const github = require('@actions/github')

// try{
//   const nameToGreet = core.getInput('whom-to-greet');
//   console.log(`Hello, ${nameToGreet}`);
//   const time = (new Date()).toTimeString();
//   core.setOutput("time", time);
//   // const payload = JSON.stringify(github.context.payload, undefined, 2);
//   // console.log(`The event payload : ${payload}`);
//   const path1 = core.getInput("path");
//   const path2 = core.getInput("PATH");
//   console.log(`Test`);
//   console.log(`Path11 : ${path1}`);
//   console.log(`Path12 : ${path2}`);
// }catch(error){
//   core.setFailed(error.message);
// }

const {exec} = require('@actions/exec');
const core = require('@actions/core');

const source = ".";

async function run(){
    try{
        let cmdOut = "";
        let cmdArgs = [];
        let command = 'gradle dependencies';
        const cmdOpts = {};
        cmdOpts.listeners = {
            stdout : (data = Buffer) => {
                cmdOut += data.toString();
            }
        }

        cmdOpts.ignoreReturnCode = true;

        let exitCode = await exec(command, cmdArgs, cmdOpts);
        let data = cmdOut;
        
        console.log(`Data : ${data}`);

    }catch(error){
        core.setFailed(error.message);
    }

}

module.exports = {run}

if(require.main == module){
    run().catch(error => {
        throw new Error(error);
    });
}