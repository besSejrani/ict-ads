pipeline{
    agent any

    options {
        skipDefaultCheckout true
    }

    triggers {
        githubPush()
    }

    post { 
        always { 
            slackSend channel: 'jenkins-notifications',
            message: "Please find the status of the build: ${currentBuild.currentResult} - ${env.JOB_NAME} ${env.BUILD_NUMBER} ${env.BUILD_URL}"

            cleanWs()
            echo 'Workspace has been cleaned up'
        }
    }

    stages {

        //===========================================
        //  Clone Documentation
        //===========================================
        stage("Clone Documentation"){

            steps {
                dir('Documentation') {
                    git branch:'master', credentialsId: 'Github', url: 'https://github.com/Ioloco/Documentation.git'
                }
            }
        }



        //===========================================
        //  Install
        //===========================================
        stage('Install Dependencies') {
            steps {
                dir('Documentation') {
                    sh 'pnpm install'
                }
            }
        }



        // ===========================================
        //  Build
        // ===========================================
        stage('Build Application') {
            steps {
                dir('Documentation') {
                    sh 'pnpm run build'
                }
            }
        }

        

        //===========================================
        //  Ansible
        //===========================================
        stage("Clone Ansible"){
            steps {
                dir('Ansible') {
                    git branch:'master', credentialsId: 'Github', url: 'https://github.com/Ioloco/Infrastructure.git'
                }
            }
        }

        //===========================================
        //  Deployment
        //===========================================
        stage("Deployment"){

            steps {
                dir('Ansible/Nextra') {

                    sh 'ansible-galaxy install --roles-path roles -r requirements.yaml'
                    
                    ansiblePlaybook credentialsId: 'SSH_BESJAN',     // SSH Key
                    become: true,                   
                    becomeUser: 'root',                              // After login with user Bes, escalate privileges
                    disableHostKeyChecking: true,                    // Ansible Path
                    installation: 'Ansible',                         // Jenkins Ansible Plugin Name
                    inventory: 'hosts',                              // Inventory in Workspace
                    limit: 'besjan',
                    playbook: 'playbook-documentation.yaml',
                    vaultCredentialsId: 'ANSIBLE_VAULT_GITHUB_TOKEN' // Ansible Vault Passowrd for opening the vault
                }
            }
        }

    }
}
