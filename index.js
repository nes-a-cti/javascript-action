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

const START = `+--- `;
const END = `--- `;
const UPGRADE = ' -> '
const NOT_RESOLVED = '  (n)'


const {exec} = require('@actions/exec');
const core = require('@actions/core');

const { Storage } = require('@google-cloud/storage');
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
        console.log('run start');
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
        await exec(command, cmdArgs, cmdOpts);
        let data = cmdOut;          
        const foundDependency = findDependencies(data);        
        const conflictedDepencies = await compareDependecies(foundDependency);
        console.log(`${conflictedDepencies.size} conflict found.`);

        if(conflictedDepencies.size > 0){
            core.setFailed(`Build Script conflict \n ${Array.from(conflictedDepencies).join('\n')} `);
        }        

    }catch(error){
        core.setFailed(error.message);
    }

}

async function readDependenciesFile(){
        return new Promise((resolve, reject) => {            
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
    // let dependencies = new Set();
    let dependencies = {};
    lines.forEach(element => {
        // dependencies.add(element);
        let depends = element.split(':');
        let key = depends[0] + ":" + depends[1];
        dependencies[key] = {};
        dependencies[key].version = depends[2];
    });
    // console.log(`dependencies  size :${JSON.stringify(dependencies)}`);
    return dependencies;
}

async function compareDependecies(foundDependency){    
    try{
        let requiredDependencies = await readDependenciesFile();
        return new Promise((resolve, reject) => {
            // console.log(`1foundDependency : ${JSON.stringify(foundDependency)}`);
            // console.log(`requiredDependencies : ${JSON.stringify(requiredDependencies)}`);
            const conflictedDepencies = new Set();
            // Array.from(foundDependency).every(value => {
            //         if(!requiredDependencies.has(value)){
            //             conflictedDepencies.add(value);                        
            //         }                    
            // });       
            Object.entries(foundDependency).forEach(([key, value]) => {
                let val = '';        
                if(requiredDependencies[key]){                    
                    let repVersion = foundDependency[key].version;                    
                    let reqVersion = requiredDependencies[key].version;                                        
                    if(!repVersion){
                        console.log(`Key : ${key}`);
                        console.log(`foundDependency : ${JSON.stringify(foundDependency[key])}`);
                    } 
                    if(repVersion !== reqVersion){                        
                        val += 'Requried = ' + key + ":" + reqVersion;
                        val += ', Found = ' + key + ":" + repVersion;
                        conflictedDepencies.add(val);
                    }
                }else{
                    val = 'Dependency not allowed : ' + key + ":" + foundDependency[key].version;
                    conflictedDepencies.add(val);
                 }                 
            }); 
            resolve(conflictedDepencies);
        });       
    }catch(e){
        console.log(e.stack);
    }         
}

// function findDependencies(content){
//     let lines = content.split('\n');
//     let dependencies = new Set();

//     for(index in lines){
        
//         if(lines[index].includes('--- ')){
//             let ln = lines[index].trim();
//             ln = ln.substring(ln.indexOf('--- ')+4);
//             ln = ln.includes(' ') ? ln.substring(0, ln.indexOf(' ')) : ln;
//             dependencies.add(ln);
//         }
//     }    

//     return dependencies;
// }

function findDependencies(content){
    let repoDependencies = {};
    try{
        let levelDependencies = {}; 
        const lines = content.split('\n');

        for(let index = 0; index <= lines.length; index++){        
            if(lines[index] && lines[index].indexOf(' - ') > 0){
                let level = lines[index].substring(0, lines[index].indexOf(' - '));
                levelDependencies[level] = [];
                index++;            
                while(lines[index] != ''){
                    if(lines[index].indexOf('-') < 0){
                        delete levelDependencies[level];
                    }else{
                        levelDependencies[level].push(lines[index]);                    
                    }
                    index++;                
                }            
            }
        }
                    
        Object.entries(levelDependencies).forEach(([key, value]) => {        
            repoDependencies = {...repoDependencies, ...getDependecyTree(levelDependencies[key])};        
        })    
        
        // console.log(`repoDependencies : ${JSON.stringify(repoDependencies)}`);
    }catch(e){
        console.log(e.stack);
    }

    return repoDependencies;
}

function getDependecyTree(ldependencies){    
    let dependencies = {};
    let parent = '';
    ldependencies.forEach(dependency => {
        if(dependency.indexOf(':') < 0) return;        
        let isParent = false;
        if(dependency.indexOf(START) == 0 || dependency.indexOf(END) == 0){            
            isParent = true;
        }        
        if(dependency.indexOf(START) >= 0){
            dependency = dependency.substring(dependency.indexOf(START)+5);
        }        
        if(dependency.indexOf(END) >= 0){
            dependency = dependency.substring(dependency.indexOf(END)+4);
        }
        if(isParent) parent = dependency;
        let depends = dependency.split(':');
        let key = depends[0].replace(END.substring(1), '') + ":" + depends[1];
        let version = depends[2];        
        if(version.indexOf(UPGRADE) > 0){     
            version = version.replace(version.substring(0, version.indexOf(UPGRADE)+4), '');                                                
        }
        version = version.replace(' (*)', '').replace(NOT_RESOLVED, '');        
        dependencies[key] = dependencies[key] || {parent  : []};
        dependencies[key].version = version;                
        if(!isParent && !dependencies[key].parent.includes(parent)) 
            dependencies[key].parent.push(parent);
    });

    // console.log(`dependencies : ${JSON.stringify(dependencies)}`);

    return dependencies;
}

module.exports = {run}

if(require.main == module){
    run().catch(error => {
        throw new Error(error);
    });
}