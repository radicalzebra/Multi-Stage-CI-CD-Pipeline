pipeline {
    agent any

    environment {
        SCRIPT_PATH = "Jenkins/scripts"
    }

    stages {
        
        stage('CHECKOUT') {
            steps {
                echo 'Cloning git repo..'
                git url: "https://github.com/radicalzebra/Multi-Stage-CI-CD-Pipeline.git", branch: "main"
                echo "Successfully Cloned repo..."
            }
        }
    
       
       stage('BUILD IMAGE') {
         steps {
            echo 'Building Docker image..'
            
            withCredentials([usernamePassword(
            credentialsId:'docker-hub-cred',
            usernameVariable: 'DOCKER_USER',
            passwordVariable: 'DOCKER_PASS')]){

                sh '''
                    chmod +x ${SCRIPT_PATH}/buildImage.sh
                    ./${SCRIPT_PATH}/buildImage.sh

                   '''
            }

            echo 'Docker Image built succesfully...'
         }
       }

       stage('PUSH IMAGE'){
        steps{

            echo "Running a trivy scan for docker image..."

            withCredentials([usernamePassword(
            credentialsId:'docker-hub-cred',
            usernameVariable: 'DOCKER_USER',
            passwordVariable: 'DOCKER_PASS')]){

                sh '''
    
                    chmod +x ${SCRIPT_PATH}/pushImage.sh
                    ./${SCRIPT_PATH}/pushImage.sh

                '''
            }

            echo "Scanned docker image, it's good to go"
        }
       }
       
    }
}
