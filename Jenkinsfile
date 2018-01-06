#!groovy

def workerNode = "devel8"

void deploy(String deployEnvironment) {
	dir("deploy") {
		git(url: "gitlab@git-platform.dbc.dk:metascrum/deploy.git", credentialsId: "gitlab-meta")
	}
	sh """
		marathon-config-producer deploy/marathon/dataio single gui-${deployEnvironment} --template-keys BRANCH_NAME=${env.BRANCH_NAME} BUILD_NUMBER=${env.BUILD_NUMBER} -o gui-${deployEnvironment}.json
		marathon-deployer -a ${MARATHON_TOKEN} -b https://mcp1.dbc.dk:8443 deploy gui-${deployEnvironment}.json
	"""
}

pipeline {
	agent {label workerNode}
	environment {
		MARATHON_TOKEN = credentials("METASCRUM_MARATHON_TOKEN")
	}
	triggers {
		pollSCM("H/03 * * * *")
	}
	options {
		timestamps()
	}
	stages {
		stage("docker build") {
			steps {
				script {
					def image = docker.build("docker-io.dbc.dk/io-react:${env.BRANCH_NAME}-${env.BUILD_NUMBER}")
					image.push()
				}
			}
		}
		stage("deploy staging") {
			when {
				branch "master"
			}
			steps {
				deploy("staging")
			}
		}
	}
}
