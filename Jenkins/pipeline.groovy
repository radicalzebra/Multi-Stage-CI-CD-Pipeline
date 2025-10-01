pipeline {
    agent any

    stages {
        stage('CLONE') {
            steps {
                echo 'Cloning git repo..'
                git url: "https://github.com/radicalzebra/Multi-Stage-CI-CD-Pipeline.git", branch: "main"
                echo "Successfully Cloned repo..."
            }
        }
       
       stage('BUILD & PUSH') {
         steps {
            echo 'Building & Pushing Docker image..'
            
            withCredentials([usernamePassword(
            credentialsId:'docker-hub-cred',
            passwordVariable:'dockerHubPass',
            usernameVariable:'dockerHubUser')]){

                sh '''
                    echo "$dockerHubPass" | docker login -u "$dockerHubUser" --password-stdin
                    docker build -t $dockerHubUser/bankist:latest .
                    docker push $dockerHubUser/bankist:latest

                   '''

            //   sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPass}"
            //   sh "docker build -t ${env.dockerHubUser}/bankist:latest  . "
            //   sh "docker push ${env.dockerHubUser}/bankist:latest"
            }

            echo 'Docker Image pushed succesfully...'
         }
       }
       
    }
}
