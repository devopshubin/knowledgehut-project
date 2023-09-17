# Installation
Maven is a Java tool, so you must have Java installed in order to proceed.To install maven use following command:\
 `sudo apt install maven -y`

First, download Maven and follow the installation instructions. After that, type the following in a terminal or in a command prompt:

``` bash
 mvn --version
```

It should print out your installed version of Maven, for example:
```bash
Maven home: /usr/share/maven
Java version: 17.0.8.1, vendor: Private Build, runtime: /usr/lib/jvm/java-17-openjdk-amd64
Default locale: en, platform encoding: UTF-8
OS name: "linux", version: "5.15.0-83-generic", arch: "amd64", family: "unix"
```

# Creating a Project
You need somewhere for your project to reside. Create a directory somewhere and start a shell in that directory. On your command line, execute the following Maven goal:

``` bash
mvn archetype:generate -DgroupId=com.mycompany.app -DartifactId=my-app -DarchetypeArtifactId=maven-archetype-quickstart -DarchetypeVersion=1.4 -DinteractiveMode=false
```

*If you have just installed Maven, it may take a while on the first run. This is because Maven is downloading the most recent artifacts (plugin jars and other files) into your local repository. You may also need to execute the command a couple of times before it succeeds. This is because the remote server may time out before your downloads are complete. Don't worry, there are ways to fix that.*  

You will notice that the generate goal created a directory with the same name given as the artifactId. Change into that directory.  
```bash
cd my-app
```
Under this directory you will notice the following standard project structure.
```
my-app
|-- pom.xml
`-- src
    |-- main
    |   `-- java
    |       `-- com
    |           `-- mycompany
    |               `-- app
    |                   `-- App.java
    `-- test
        `-- java
            `-- com
                `-- mycompany
                    `-- app
                        `-- AppTest.java
```
The `src/main/java` directory contains the project source code, the `src/test/java` directory contains the test source, and the `pom.xml` file is the project's Project Object Model, or POM.  
# The POM
The `pom.xml` file is the core of a project's configuration in Maven. It is a single configuration file that contains the majority of information required to build a project in just the way you want. The POM is huge and can be daunting in its complexity, but it is not necessary to understand all of the intricacies just yet to use it effectively.  
# Build the Project
```bash
mvn package
```  
The command line will print out various actions, and end with the following:  
```bash
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  2.953 s
[INFO] Finished at: 2023-09-17T13:05:10+01:00
[INFO] ------------------------------------------------------------------------
```  
Unlike the first command executed (*archetype:generate*), the second is simply a single word *- package*. Rather than a goal, this is a phase. A phase is a step in the build lifecycle, which is an ordered sequence of phases. When a phase is given, Maven executes every phase in the sequence up to and including the one defined. For example, if you execute the compile phase, the phases that actually get executed are:  
1. validate
2. generate-sources
3. process-sources
4. generate-resources
5. process-resources
6. compile  

You may test the newly compiled and packaged JAR with the following command:  
```bash
java -cp target/my-app-1.0-SNAPSHOT.jar com.mycompany.app.App
```
Which will print the quintessential:  
```bash
Hello World!
```