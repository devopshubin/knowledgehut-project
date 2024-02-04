pipeline {
    agent any

    stages {
        stage('Git Checkout') {
            steps {
                git branch: 'sonar-node', url: 'https://github.com/devopshubin/knowledgehut-project.git'
            }
        }
        stage('build code') {
            steps {
              sh "npm install"
            }
        }
        stage('CODE ANALYSIS with SONARQUBE') {
          
		  environment {
             scannerHome = tool 'sonar4'
          }

          steps {
            withSonarQubeEnv('sonar') {
               sh '''${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=calculator \
                   -Dsonar.projectName=calculator \
                   -Dsonar.projectVersion=1.0 '''
            }
          }
        }
    }
}

