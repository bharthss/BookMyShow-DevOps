pipeline {

    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Auth Service') {
            steps {
                dir('auth-service') {
                    sh 'docker build -t auth-service:v1 .'
                }
            }
        }

        stage('Build Movie Service') {
            steps {
                dir('movie-service') {
                    sh 'docker build -t movie-service:v1 .'
                }
            }
        }

        stage('Build Booking Service') {
            steps {
                dir('booking-service') {
                    sh 'docker build -t booking-service:v1 .'
                }
            }
        }

        stage('Build Payment Service') {
            steps {
                dir('payment-service') {
                    sh 'docker build -t payment-service:v1 .'
                }
            }
        }

        stage('Docker Compose Up') {
    steps {
        sh '''
        export DOCKER_BUILDKIT=0
        export COMPOSE_BAKE=false

        docker compose down || true
        docker compose up -d --build
        '''
    }
}

    }

}
