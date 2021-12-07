1. npm install -g @vue/cli-service
2. May need to restart or add npm modules path to environment variables

## Running
1. yarn install
2. yarn run serve
## Adding new package
- yarn add package_name
- yarn add package_name --dev

---
## Docker
- Building an image `docker build ./client -t TAG_NAME`
- Running an individual docker container `docker run -p 8080:8080 IMAGE_NAME`
- Getting a shell `docker run -it DOCKER_NAME /bin/sh`