# Step 1: Initialize the sample Hello World application.
In this step, you will use the AWS SAM CLI to create a sample Hello World application project on your local machine. 
 
**To initialize the sample Hello World application**  
1. In your command line, run the following from a starting directory of your choice:
```
$ sam init
```
2. The AWS SAM CLI will guide you through initializing a new application. Configure the following:  
a. Select **AWS Quick Start Templates** to choose a starting template.  
b. Choose the **Hello World Example** template and download it.  
c. Use the `nodejs16.x` runtime and `zip` package type.  
d. Name your application as `sam-app`.
  
The following is an example of the sam init interactive flow:

```
$ sam init  
You can preselect a particular runtime or package type when using the `sam init` experience.
Call `sam init --help` to learn more.

Which template source would you like to use?
        1 - AWS Quick Start Templates
        2 - Custom Template Location
Choice: 1

Choose an AWS Quick Start application template
        1 - Hello World Example
        2 - Data processing
        3 - Hello World Example with Powertools for AWS Lambda
        4 - Multi-step workflow
        5 - Scheduled task
        6 - Standalone function
        7 - Serverless API
        8 - Infrastructure event management
        9 - Lambda Response Streaming
        10 - Serverless Connector Hello World Example
        11 - Multi-step workflow with Connectors
        12 - GraphQLApi Hello World Example
        13 - Full Stack
        14 - Lambda EFS example
        15 - Hello World Example With Powertools for AWS Lambda
        16 - DynamoDB Example
        17 - Machine Learning
Template: 1
Use the most popular runtime and package type? (Python and zip) [y/N]: N

Which runtime would you like to use?
        1 - aot.dotnet7 (provided.al2)
        2 - dotnet6
        3 - go1.x
        4 - go (provided.al2)
        5 - graalvm.java11 (provided.al2)
        6 - graalvm.java17 (provided.al2)
        7 - java17
        8 - java11
        9 - java8.al2
        10 - java8
        11 - nodejs18.x
        12 - nodejs16.x
        13 - nodejs14.x
        14 - python3.9
        15 - python3.8
        16 - python3.7
        17 - python3.11
        18 - python3.10
        19 - ruby3.2
        20 - ruby2.7
        21 - rust (provided.al2)
Runtime: 12

What package type would you like to use?
        1 - Zip
        2 - Image
Package type: 1

Based on your selections, the only dependency manager available is npm.
We will proceed copying the template using npm.

Select your starter template
        1 - Hello World Example
        2 - Hello World Example TypeScript
Template: 1

Would you like to enable X-Ray tracing on the function(s) in your application?  [y/N]: N

Would you like to enable monitoring using CloudWatch Application Insights?
For more info, please view https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch-application-insights.html [y/N]: N

Project name [sam-app]:
```
3. The AWS SAM CLI downloads your starting template and creates the application project directory structure on your local machine. The following is an example of the AWS SAM CLI output:
```
    -----------------------
    Generating application:
    -----------------------
    Name: sam-app
    Runtime: nodejs16.x
    Architectures: x86_64
    Dependency Manager: npm
    Application Template: hello-world
    Output Directory: .
    Configuration file: sam-app\samconfig.toml

    Next steps can be found in the README file at sam-app\README.md


Commands you can use next
=========================
[*] Create pipeline: cd sam-app && sam pipeline init --bootstrap
[*] Validate SAM template: cd sam-app && sam validate
[*] Test Function in the Cloud: cd sam-app && sam sync --stack-name {stack-name} --watch
```

4. From your command line, move to the newly created sam-app directory.

# Step 2: Build your application
In this step, you use the AWS SAM CLI to build your application and prepare for deployment. When you build, the AWS SAM CLI creates a `.aws-sam` directory and organizes your function dependencies, project code, and project files there.

**To build your application**
- In your command line, from the sam-app project directory, run the following:
```
$ sam build
```
The following is an example of the AWS SAM CLI output:
```
Starting Build use cache
Manifest file is changed (new hash: 52ab2eb3ecad2acec5992fe98cd83fcd) or dependency folder (.aws-sam\deps\1d0dee38-70e0-45e5-a140-fe8c685e9e70) is missing for      
(HelloWorldFunction), downloading dependencies and copying/building source
Building codeuri: D:\SAMCLI\sam-app\hello-world runtime: nodejs16.x metadata: {} architecture: x86_64 functions: HelloWorldFunction
 Running NodejsNpmBuilder:NpmPack
 Running NodejsNpmBuilder:CopyNpmrcAndLockfile
 Running NodejsNpmBuilder:CopySource
 Running NodejsNpmBuilder:NpmInstall
 Running NodejsNpmBuilder:CleanUp
 Running NodejsNpmBuilder:CopyDependencies
 Running NodejsNpmBuilder:CleanUpNpmrc
 Running NodejsNpmBuilder:LockfileCleanUp
 Running NodejsNpmBuilder:LockfileCleanUp

Build Succeeded

Built Artifacts  : .aws-sam\build
Built Template   : .aws-sam\build\template.yaml

Commands you can use next
=========================
[*] Validate SAM template: sam validate
[*] Invoke Function: sam local invoke
[*] Test Function in the Cloud: sam sync --stack-name {{stack-name}} --watch
[*] Deploy: sam deploy --guided
```
You are now ready to deploy your application to the AWS Cloud.

# Step 3: Deploy your application to the AWS Cloud
In this step, you use the AWS SAM CLI to deploy your application to the AWS Cloud. The AWS SAM CLI will do the following:
- Guide you through configuring your application settings for deployment.
- Upload your application files to Amazon Simple Storage Service (Amazon S3).
- Transform your AWS SAM template into an AWS CloudFormation template. It then uploads your template to the AWS CloudFormation service to provision your AWS resources.
### To deploy your application
1. In your command line, from the `sam-app` project directory, run the following:
```
$ sam deploy --guided
```
2. Follow the AWS SAM CLI interactive flow to configure your application settings. Configure the following:  
a. The **AWS CloudFormation stack name** – A stack is a collection of AWS resources that you can manage as a single unit.  
b. The **AWS Region** to deploy your AWS CloudFormation stack to.  
c. For this tutorial, opt out of **confirming changes before deploy**.  
d. Allow **IAM role creation** – This lets AWS SAM create the IAM role necessary for your API Gateway resource and Lambda function resource to interact.  
e. For this tutorial, opt out of **disabling rollback**.  
f. Allow **HelloWorldFunction without authorization defined** – This message displays because your API Gateway endpoint is configured to be publicly accessible, without authorization. Since this is the intended configuration for your Hello World application, allow the AWS SAM CLI to continue.  
g. **Save arguments to configuration file** – This will update your application’s samconfig.toml file with your deployment preferences.  
h. Select the default **configuration file name**.  
i. Select the default **configuration environment**.

The following is an example output of the `sam deploy --guided` interactive flow:
```
PS D:\SAMCLI\sam-app> sam deploy --guided

Configuring SAM deploy
======================

        Looking for config file [samconfig.toml] :  Found
        Reading default arguments  :  Success

        Setting default arguments for 'sam deploy'
        =========================================
        Stack Name [sam-app]:
        AWS Region [us-east-1]:
        #Shows you resources changes to be deployed and require a 'Y' to initiate deploy
        Confirm changes before deploy [Y/n]: n
        #SAM needs permission to be able to create roles to connect to the resources in your template
        Allow SAM CLI IAM role creation [Y/n]: Y
        #Preserves the state of previously provisioned resources when an operation fails
        Disable rollback [y/N]: y
        HelloWorldFunction has no authentication. Is this okay? [y/N]: y
        Save arguments to configuration file [Y/n]: Y
        SAM configuration file [samconfig.toml]:
        SAM configuration environment [default]:

        Looking for resources needed for deployment:

        Managed S3 bucket: aws-sam-cli-managed-default-samclisourcebucket-1gfqyjx0s60w5
        A different default S3 bucket can be set in samconfig.toml and auto resolution of buckets turned off by setting resolve_s3=False

        Parameter "stack_name=sam-app" in [default.deploy.parameters] is defined as a global parameter [default.global.parameters].
        This parameter will be only saved under [default.global.parameters] in D:\SAMCLI\sam-app\samconfig.toml.

        Saved arguments to config file
        Running 'sam deploy' for future deployments will use the parameters saved above.
        The above parameters can be changed by modifying samconfig.toml
        Learn more about samconfig.toml syntax at
        https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-config.html

        Uploading to sam-app/f91445947c37eba1be7ec6d06a3b358c  572106 / 572106  (100.00%)

        Deploying with following values
        ===============================
        Stack name                   : sam-app
        Region                       : us-east-1
        Confirm changeset            : False
        Disable rollback             : True
        Deployment s3 bucket         : aws-sam-cli-managed-default-samclisourcebucket-1gfqyjx0s60w5
        Capabilities                 : ["CAPABILITY_IAM"]
        Parameter overrides          : {}
        Signing Profiles             : {}

Initiating deployment
=====================

        Uploading to sam-app/52877c74437347a1fec8beda5d323faa.template  1245 / 1245  (100.00%)


Waiting for changeset to be created..

CloudFormation stack changeset
-----------------------------------------------------------------------------------------------------------------------------------------------------------------   
Operation                                LogicalResourceId                        ResourceType                             Replacement
-----------------------------------------------------------------------------------------------------------------------------------------------------------------   
+ Add                                    HelloWorldFunctionHelloWorldPermission   AWS::Lambda::Permission                  N/A
                                         Prod
+ Add                                    HelloWorldFunctionRole                   AWS::IAM::Role                           N/A
+ Add                                    HelloWorldFunction                       AWS::Lambda::Function                    N/A
+ Add                                    ServerlessRestApiDeployment47fc2d5f9d    AWS::ApiGateway::Deployment              N/A
+ Add                                    ServerlessRestApiProdStage               AWS::ApiGateway::Stage                   N/A
+ Add                                    ServerlessRestApi                        AWS::ApiGateway::RestApi                 N/A
-----------------------------------------------------------------------------------------------------------------------------------------------------------------   


Changeset created successfully. arn:aws:cloudformation:us-east-1:789502026025:changeSet/samcli-deploy1695120568/9f09c248-2080-4358-b4d3-c40edcff44aa


2023-09-19 16:19:38 - Waiting for stack create/update to complete

CloudFormation events from stack operations (refresh every 5.0 seconds)
-----------------------------------------------------------------------------------------------------------------------------------------------------------------   
ResourceStatus                           ResourceType                             LogicalResourceId                        ResourceStatusReason
-----------------------------------------------------------------------------------------------------------------------------------------------------------------   
CREATE_IN_PROGRESS                       AWS::IAM::Role                           HelloWorldFunctionRole                   -
CREATE_IN_PROGRESS                       AWS::IAM::Role                           HelloWorldFunctionRole                   Resource creation Initiated
CREATE_COMPLETE                          AWS::IAM::Role                           HelloWorldFunctionRole                   -
CREATE_IN_PROGRESS                       AWS::Lambda::Function                    HelloWorldFunction                       -
CREATE_IN_PROGRESS                       AWS::Lambda::Function                    HelloWorldFunction                       Resource creation Initiated
CREATE_COMPLETE                          AWS::Lambda::Function                    HelloWorldFunction                       -
CREATE_IN_PROGRESS                       AWS::ApiGateway::RestApi                 ServerlessRestApi                        -
CREATE_IN_PROGRESS                       AWS::ApiGateway::RestApi                 ServerlessRestApi                        Resource creation Initiated
CREATE_COMPLETE                          AWS::ApiGateway::RestApi                 ServerlessRestApi                        -
CREATE_IN_PROGRESS                       AWS::ApiGateway::Deployment              ServerlessRestApiDeployment47fc2d5f9d    -
CREATE_IN_PROGRESS                       AWS::Lambda::Permission                  HelloWorldFunctionHelloWorldPermission   -
                                                                                  Prod
CREATE_IN_PROGRESS                       AWS::Lambda::Permission                  HelloWorldFunctionHelloWorldPermission   Resource creation Initiated
                                                                                  Prod
CREATE_COMPLETE                          AWS::Lambda::Permission                  HelloWorldFunctionHelloWorldPermission   -
                                                                                  Prod
CREATE_IN_PROGRESS                       AWS::ApiGateway::Deployment              ServerlessRestApiDeployment47fc2d5f9d    Resource creation Initiated
CREATE_COMPLETE                          AWS::ApiGateway::Deployment              ServerlessRestApiDeployment47fc2d5f9d    -
CREATE_IN_PROGRESS                       AWS::ApiGateway::Stage                   ServerlessRestApiProdStage               -
CREATE_IN_PROGRESS                       AWS::ApiGateway::Stage                   ServerlessRestApiProdStage               Resource creation Initiated
CREATE_COMPLETE                          AWS::ApiGateway::Stage                   ServerlessRestApiProdStage               -
CREATE_COMPLETE                          AWS::CloudFormation::Stack               sam-app                                  -
-----------------------------------------------------------------------------------------------------------------------------------------------------------------   

CloudFormation outputs from deployed stack
-----------------------------------------------------------------------------------------------------------------------------------------------------------------   
Outputs
-----------------------------------------------------------------------------------------------------------------------------------------------------------------   
Key                 HelloWorldFunctionIamRole
Description         Implicit IAM Role created for Hello World function
Value               arn:aws:iam::789502026025:role/sam-app-HelloWorldFunctionRole-RZ4HLGSMBJYY

Key                 HelloWorldApi
Description         API Gateway endpoint URL for Prod stage for Hello World function
Value               https://fknc0wfxe3.execute-api.us-east-1.amazonaws.com/Prod/hello/

Key                 HelloWorldFunction
Description         Hello World Lambda Function ARN
Value               arn:aws:lambda:us-east-1:789502026025:function:sam-app-HelloWorldFunction-QgcJnMH39fMg
-----------------------------------------------------------------------------------------------------------------------------------------------------------------   


Successfully created/updated stack - sam-app in us-east-1
```
Your application is now deployed and running in the AWS Cloud!  
# Step 7: Test your application
For testing your application go to the browser and paste the endpoint `https://fknc0wfxe3.execute-api.us-east-1.amazonaws.com/Prod/hello/`.  
You will get the result like this:  
![hello-world](D:\SAMCLI\hello-world.png)
