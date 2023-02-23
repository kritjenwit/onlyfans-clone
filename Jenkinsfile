pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        git(url: 'https://github.com/kritjenwit/onlyfans-clone', branch: 'main')
      }
    }

    stage('build') {
      parallel {
        stage('build web') {
          steps {
            sh './build.web.sh'
          }
        }

        stage('build API') {
          steps {
            sh './build.api.sh'
          }
        }

      }
    }

  }
}