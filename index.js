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
        // let command = 'pwd';
        const cmdOpts = {};
        cmdOpts.listeners = {
            stdout : (data = Buffer) => {
                cmdOut += data.toString();
            }
        }

        cmdOpts.ignoreReturnCode = true;

        let exitCode = await exec(command, cmdArgs, cmdOpts);
        let data = cmdOut;
        
        console.log('Test13');

        console.log(`Exit Code : ${exitCode}`);

        // console.log(`Data : ${data}`);
        findDependencies(data);

    }catch(error){
        core.setFailed(error.message);
    }

}

function findDependencies(content){
    let lines = content.split('\n');
    let dependencies = new Set();

    for(index in lines){
        
        if(lines[index].includes('--- ')){
            let ln = lines[index].trim();
            ln = ln.substring(ln.indexOf('--- ')+4);
            ln = ln.includes(' ') ? ln.substring(0, indexOf(' ')) : ln;
            dependencies.add(ln);
        }
    }

    console.log(`Length1 : ${dependencies.size}`);
    console.log(`Length2 : `, dependencies.size);

    const val = [...dependencies].join(',');

    console.log(`Dependeinces ${val}`);

}

module.exports = {run}

if(require.main == module){
    run().catch(error => {
        throw new Error(error);
    });
}