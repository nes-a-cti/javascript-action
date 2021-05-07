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

const { Storage } = require('@google-cloud/storage');
const { resolve } = require('./dist');
const storage = new Storage();

const source = ".";

const requiredDependencies = new Set();
requiredDependencies.add('com.google.guava:guava:30.0-jre');
requiredDependencies.add('com.google.guava:failureaccess:1.0.1');
requiredDependencies.add('com.google.guava:listenablefuture:9999.0-empty-to-avoid-conflict-with-guava');
requiredDependencies.add('com.google.code.findbugs:jsr305:3.0.2');
requiredDependencies.add('org.checkerframework:checker-qual:2.11.1');
requiredDependencies.add('com.google.errorprone:error_prone_annotations:2.3.4');
requiredDependencies.add('com.google.j2objc:j2objc-annotations:1.3');
requiredDependencies.add('junit:junit:4.13');
requiredDependencies.add('org.hamcrest:hamcrest-core:1.3');

async function run(){
    try{

        console.log('File Read Start');

        const fileStream = storage.bucket('ds_testclasses').file('dependencies.txt').createReadStream();

        console.log('Stream Created.');

        let buf = '';

        fileStream.on('data', data => {
            console.log(data);
            buf += data;
        }).on('end', () => {            
            console.log(buf);
        });
        
        let cmdOut = "";
        let cmdArgs = [];
        let command = './gradlew dependencies';
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

        const foundDependency = findDependencies(data);
        console.log(`2foundDependency : ${foundDependency.size}`);
        let hasConfilct = await compareDependecies(foundDependency);
        console.log('hasConfilct : ${hasConfilct}');

        console.log(`Exit Code : ${exitCode}`);



    }catch(error){
        core.setFailed(error.message);
    }

}

async function readDependenciesFile(){
        return new Promise((resolve, reject) => {
            let dependencies = new Set();
            const fileStream = storage.bucket('ds_testclasses').file('dependencies.txt').createReadStream();
            let buf = '';
    
            fileStream.on('data', data => {                
                buf += data;
            }).on('end', () => {            
                resolve(constructRequiredDependencies(buf));
            }).on('error', error => {
                console.log('Error : ' + error.message);
                reject(error);
            });
        });        
}

function constructRequiredDependencies(data){
    const lines = data.split('\n');
    let dependencies = new Set();
    lines.forEach(element => {
        dependencies.add(element);
    });
    console.log(`dependencies  size :${dependencies.size}`);
    return dependencies;
}

async function compareDependecies(foundDependency){
    new Promise(async (resolve, reject) => {
        let requiredDependencies = await readDependenciesFile();
        console.log(`1foundDependency : ${foundDependency.size}`);
        console.log(`requiredDependencies : ${requiredDependencies.size}`);
        const conflictedDepencies = new Set();
        Array.from(foundDependency).every(value => {
                if(!requiredDependencies.has(value)){
                    conflictedDepencies.add(value);
                    resolve(false);
                }
                resolve(true);
        });
    });    
}

function findDependencies(content){
    let lines = content.split('\n');
    let dependencies = new Set();

    for(index in lines){
        
        if(lines[index].includes('--- ')){
            let ln = lines[index].trim();
            ln = ln.substring(ln.indexOf('--- ')+4);
            ln = ln.includes(' ') ? ln.substring(0, ln.indexOf(' ')) : ln;
            dependencies.add(ln);
        }
    }    

    return dependencies;
}

module.exports = {run}

if(require.main == module){
    run().catch(error => {
        throw new Error(error);
    });
}