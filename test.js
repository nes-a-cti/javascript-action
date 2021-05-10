const START = `+--- `;
const END = ` --- `;
const UPGRADE = ' -> '


let dependencies = `------------------------------------------------------------
Root project
------------------------------------------------------------

annotationProcessor - Annotation processors and their dependencies for source set 'main'.
\--- org.projectlombok:lombok:1.18.8

apiElements - API elements for main. (n)
No dependencies

archives - Configuration for archive artifacts. (n)
No dependencies

compileClasspath - Compile classpath for source set 'main'.
+--- co.anywhere.fullhooks:fullhooks-api-java-client:1.0.6
|    \--- com.fasterxml.jackson.core:jackson-databind:2.8.2 -> 2.9.7
|         +--- com.fasterxml.jackson.core:jackson-annotations:2.9.0 -> 2.9.7
|         \--- com.fasterxml.jackson.core:jackson-core:2.9.7
+--- org.projectlombok:lombok:1.18.10
+--- javax.xml.bind:jaxb-api:2.4.0-b180830.0359
|    \--- javax.activation:javax.activation-api:1.2.0
+--- aopalliance:aopalliance:+ -> 1.0
+--- commons-beanutils:commons-beanutils:+ -> 20030211.134440
+--- commons-lang:commons-lang:2.6
+--- commons-logging:commons-logging:+ -> 1.2
+--- org.eclipse.birt.runtime.3_7_1:com.lowagie.text:2.1.7
+--- org.apache.commons:commons-pool2:+ -> 2.9.0
+--- org.apache.cxf:cxf-common-utilities:+ -> 2.5.11
|    +--- org.apache.ws.xmlschema:xmlschema-core:2.0.3
|    \--- org.codehaus.woodstox:woodstox-core-asl:4.2.0
|         \--- org.codehaus.woodstox:stax2-api:3.1.1
+--- com.caucho:hessian:4.0.7
+--- org.hibernate:hibernate-core:5.3.7.Final
|    +--- org.jboss.logging:jboss-logging:3.3.2.Final
|    +--- javax.persistence:javax.persistence-api:2.2
|    +--- org.javassist:javassist:3.23.1-GA -> 3.27.0-GA
|    +--- net.bytebuddy:byte-buddy:1.8.17 -> 1.10.14
|    +--- antlr:antlr:2.7.7
|    +--- org.jboss.spec.javax.transaction:jboss-transaction-api_1.2_spec:1.1.1.Final
|    +--- org.jboss:jandex:2.0.5.Final
|    +--- com.fasterxml:classmate:1.3.4
|    +--- javax.activation:javax.activation-api:1.2.0
|    +--- org.dom4j:dom4j:2.1.1
|    \--- org.hibernate.common:hibernate-commons-annotations:5.0.4.Final
|         \--- org.jboss.logging:jboss-logging:3.3.1.Final -> 3.3.2.Final
+--- org.apache.httpcomponents:httpclient:+ -> 4.5.13
|    +--- org.apache.httpcomponents:httpcore:4.4.13 -> 4.4.14
|    +--- commons-logging:commons-logging:1.2
|    \--- commons-codec:commons-codec:1.11
+--- org.apache.httpcomponents:httpcore:+ -> 4.4.14
+--- com.lowagie:itext:+ -> 4.2.2
+--- com.fasterxml.jackson.core:jackson-core:{strictly 2.9.7} -> 2.9.7
+--- com.fasterxml.jackson.core:jackson-annotations:{strictly 2.9.7} -> 2.9.7
+--- com.fasterxml.jackson.core:jackson-databind:{strictly 2.9.7} -> 2.9.7 (*)
+--- com.fasterxml.jackson.dataformat:jackson-dataformat-cbor:{strictly 2.9.7} -> 2.9.7
|    \--- com.fasterxml.jackson.core:jackson-core:2.9.7
+--- com.fasterxml.jackson.dataformat:jackson-dataformat-csv:{strictly 2.9.7} -> 2.9.7
|    +--- com.fasterxml.jackson.core:jackson-databind:2.9.7 (*)
|    +--- com.fasterxml.jackson.core:jackson-annotations:2.9.0 -> 2.9.7
|    \--- com.fasterxml.jackson.core:jackson-core:2.9.7
+--- javax.batch:javax.batch-api:+ -> 1.0.1
+--- javax.mail:javax.mail-api:+ -> 1.6.2
+--- redis.clients:jedis:+ -> 3.6.0
|    +--- org.slf4j:slf4j-api:1.7.30 -> 2.0.0-alpha1
|    \--- org.apache.commons:commons-pool2:2.9.0
+--- joda-time:joda-time:+ -> 2.10.10
+--- com.jcraft:jsch:+ -> 0.1.55
+--- log4j:log4j:+ -> 1.2.17
+--- javax.servlet:javax.servlet-api:3.+ -> 3.1.0
+--- org.slf4j:slf4j-log4j12:2.0.0-alpha1
|    +--- org.slf4j:slf4j-api:2.0.0-alpha1
|    \--- log4j:log4j:1.2.17
+--- org.springframework:spring-context:5.2.2.RELEASE
|    +--- org.springframework:spring-aop:5.2.2.RELEASE
|    |    +--- org.springframework:spring-beans:5.2.2.RELEASE
|    |    |    \--- org.springframework:spring-core:5.2.2.RELEASE
|    |    |         \--- org.springframework:spring-jcl:5.2.2.RELEASE
|    |    \--- org.springframework:spring-core:5.2.2.RELEASE (*)
|    +--- org.springframework:spring-beans:5.2.2.RELEASE (*)
|    +--- org.springframework:spring-core:5.2.2.RELEASE (*)
|    \--- org.springframework:spring-expression:5.2.2.RELEASE
|         \--- org.springframework:spring-core:5.2.2.RELEASE (*)
+--- org.springframework:spring-webmvc:5.2.2.RELEASE
|    +--- org.springframework:spring-aop:5.2.2.RELEASE (*)
|    +--- org.springframework:spring-beans:5.2.2.RELEASE (*)
|    +--- org.springframework:spring-context:5.2.2.RELEASE (*)
|    +--- org.springframework:spring-core:5.2.2.RELEASE (*)
|    +--- org.springframework:spring-expression:5.2.2.RELEASE (*)
|    \--- org.springframework:spring-web:5.2.2.RELEASE
|         +--- org.springframework:spring-beans:5.2.2.RELEASE (*)
|         \--- org.springframework:spring-core:5.2.2.RELEASE (*)
+--- org.springframework.batch:spring-batch-core:4.2.1.RELEASE
|    +--- com.fasterxml.jackson.core:jackson-databind:2.10.0 -> 2.9.7 (*)
|    +--- io.micrometer:micrometer-core:1.3.2
|    |    +--- org.hdrhistogram:HdrHistogram:2.1.11
|    |    \--- org.latencyutils:LatencyUtils:2.0.3
|    +--- javax.batch:javax.batch-api:1.0 -> 1.0.1
|    +--- org.codehaus.jettison:jettison:1.2
|    +--- org.springframework.batch:spring-batch-infrastructure:4.2.1.RELEASE
|    |    +--- org.springframework.retry:spring-retry:1.2.4.RELEASE
|    |    |    \--- org.springframework:spring-core:4.3.22.RELEASE -> 5.2.2.RELEASE (*)
|    |    \--- org.springframework:spring-core:5.2.2.RELEASE (*)
|    +--- org.springframework:spring-aop:5.2.2.RELEASE (*)
|    +--- org.springframework:spring-beans:5.2.2.RELEASE (*)
|    +--- org.springframework:spring-context:5.2.2.RELEASE (*)
|    +--- org.springframework:spring-core:5.2.2.RELEASE (*)
|    \--- org.springframework:spring-tx:5.2.2.RELEASE
|         +--- org.springframework:spring-beans:5.2.2.RELEASE (*)
|         \--- org.springframework:spring-core:5.2.2.RELEASE (*)
+--- com.google.apis:google-api-services-sheets:v4-rev604-1.25.0
|    \--- com.google.api-client:google-api-client:1.25.0 -> 1.30.7
|         +--- com.google.oauth-client:google-oauth-client:1.30.5
|         |    +--- com.google.http-client:google-http-client:1.34.0
|         |    |    +--- org.apache.httpcomponents:httpclient:4.5.10 -> 4.5.13 (*)
|         |    |    +--- org.apache.httpcomponents:httpcore:4.4.12 -> 4.4.14
|         |    |    +--- com.google.code.findbugs:jsr305:3.0.2
|         |    |    +--- com.google.guava:guava:28.1-android
|         |    |    |    +--- com.google.guava:failureaccess:1.0.1
|         |    |    |    +--- com.google.guava:listenablefuture:9999.0-empty-to-avoid-conflict-with-guava
|         |    |    |    +--- com.google.code.findbugs:jsr305:3.0.2
|         |    |    |    +--- org.checkerframework:checker-compat-qual:2.5.5
|         |    |    |    +--- com.google.errorprone:error_prone_annotations:2.3.2
|         |    |    |    +--- com.google.j2objc:j2objc-annotations:1.3
|         |    |    |    \--- org.codehaus.mojo:animal-sniffer-annotations:1.18
|         |    |    +--- com.google.j2objc:j2objc-annotations:1.3
|         |    |    +--- io.opencensus:opencensus-api:0.24.0
|         |    |    |    \--- io.grpc:grpc-context:1.22.1
|         |    |    \--- io.opencensus:opencensus-contrib-http-util:0.24.0
|         |    |         +--- io.opencensus:opencensus-api:0.24.0 (*)
|         |    |         \--- com.google.guava:guava:26.0-android -> 28.1-android (*)
|         |    +--- com.google.code.findbugs:jsr305:3.0.2
|         |    \--- com.google.guava:guava:28.1-android (*)
|         +--- com.google.http-client:google-http-client-jackson2:1.32.1 -> 1.34.0
|         |    +--- com.google.http-client:google-http-client:1.34.0 (*)
|         |    \--- com.fasterxml.jackson.core:jackson-core:2.10.1 -> 2.9.7
|         \--- com.google.guava:guava:28.1-android (*)
+--- org.powermock:powermock-api-mockito2:+ -> 2.0.9
|    +--- org.powermock:powermock-api-support:2.0.9
|    |    +--- org.powermock:powermock-reflect:2.0.9
|    |    |    +--- org.objenesis:objenesis:3.0.1
|    |    |    +--- net.bytebuddy:byte-buddy:1.10.14
|    |    |    \--- net.bytebuddy:byte-buddy-agent:1.10.14
|    |    \--- org.powermock:powermock-core:2.0.9
|    |         +--- org.powermock:powermock-reflect:2.0.9 (*)
|    |         +--- org.javassist:javassist:3.27.0-GA
|    |         +--- net.bytebuddy:byte-buddy:1.10.14
|    |         \--- net.bytebuddy:byte-buddy-agent:1.10.14
|    \--- org.mockito:mockito-core:3.3.3
|         \--- org.objenesis:objenesis:2.6 -> 3.0.1
+--- org.powermock:powermock-module-junit4:+ -> 2.0.9
|    +--- org.powermock:powermock-module-junit4-common:2.0.9
|    |    +--- org.powermock:powermock-reflect:2.0.9 (*)
|    |    +--- org.powermock:powermock-core:2.0.9 (*)
|    |    +--- junit:junit:4.12
|    |    \--- org.hamcrest:hamcrest-core:1.3
|    +--- junit:junit:4.12
|    \--- org.hamcrest:hamcrest-core:1.3
+--- com.google.api-client:google-api-client:1.30.7 (*)
+--- com.google.http-client:google-http-client:1.34.0 (*)
+--- com.google.auth:google-auth-library-oauth2-http:0.19.0
|    +--- com.google.auto.value:auto-value-annotations:1.7
|    +--- com.google.code.findbugs:jsr305:3.0.2
|    +--- com.google.auth:google-auth-library-credentials:0.19.0
|    +--- com.google.http-client:google-http-client:1.33.0 -> 1.34.0 (*)
|    +--- com.google.http-client:google-http-client-jackson2:1.33.0 -> 1.34.0 (*)
|    \--- com.google.guava:guava:28.1-android (*)
+--- com.google.http-client:google-http-client-jackson2:1.34.0 (*)
+--- org.apache.httpcomponents:httpcore:4.4.12 -> 4.4.14
\--- org.apache.httpcomponents:httpclient:4.5.10 -> 4.5.13 (*)

`;

function findDependencies(){
    let levelDependencies = {}; 
    const lines = dependencies.split('\n');

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
        
    let repoDependencies = {};
    Object.entries(levelDependencies).forEach(([key, value]) => {        
        repoDependencies = {...repoDependencies, ...getDependecyTree(levelDependencies[key])};        
    })    

    console.log(`repoDependencies : ${JSON.stringify(repoDependencies)}`);
}

function getDependecyTree(ldependencies){
    let dependencies = {};
    let parent = '';
    ldependencies.forEach(dependency => {        
        let isParent = false;
        if(dependency.indexOf(START) == 0 || dependency.indexOf(END) == 0){            
            isParent = true;
        }        
        if(dependency.indexOf(START) >= 0){
            dependency = dependency.substring(dependency.indexOf(START)+5);
        }        
        if(dependency.indexOf(END) >= 0){
            dependency = dependency.substring(dependency.indexOf(END)+5);
        }
        if(isParent) parent = dependency;
        let depends = dependency.split(':');
        let key = depends[0].replace(END.substring(1), '') + ":" + depends[1];
        let version = depends[2];
        if(version.indexOf(UPGRADE) > 0){     
            version = version.replace(version.substring(0, version.indexOf(UPGRADE)+4), '');                                                
        }
        version = version.replace(' (*)', '');
        dependencies[key] = dependencies[key] || {parent  : []};
        dependencies[key].version = version;                
        if(!isParent && !dependencies[key].parent.includes(parent)) 
            dependencies[key].parent.push(parent);
    });

    // console.log(`dependencies : ${JSON.stringify(dependencies)}`);

    return dependencies;
}

findDependencies();