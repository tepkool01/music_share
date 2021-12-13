# Installation
## Pre-requisites
| Tool | Version |
|------|---------|
 | Docker | 20.10.11 |
 | Node | 16.13.1 |

## First time running
These steps will build your initial docker containers from the source you have in the folder, and bind/mount your 
local file system to the docker image (think symbolic link of sorts). This means if you change files on your local
system, they will be reflected in the application. This is true of the bound locations, i.e. anything in client/src is bound, 
but the parent folder is not and will not reflect changes from the host OS. 

1. Make sure the docker daemon is running (I just open Docker Desktop, and it reboots with the system)
2. Run `docker-compose up` from this folder

# Common Tasks
## Modifying package.json and saving
Say you want to add a new dependency to package.json, or change something in /client (not /client/src, which is mounted).
Or you just simply want to 'save' the state of the application into a container.
1. Run `docker-compose build` (this creates a new image, with the installed packages, and files from host system)
2. Run `docker-compose up` (spins the system back up)

**NOTE**: Every time you do a docker-compose build, it creates a new container and keeps the old one. If you don't want a
bunch of containers piling up on your system, add the `--force-rm` option to the build command. `docker-compose build --force-rm`

## Running an interactive shell
You can use the docker GUI application to do this, but for doing it in your own terminal, the steps are below.
1. Run `docker ps` to see all running containers
2. Run `docker exec -it CONTAINER_ID sh` to get the terminal

## Running a copy of the system in isolation (getting the terminal)
If you want to test out something crazy, and don't want it affecting your container, you can create a new identical image
based on the original, and do whatever you want. Just make sure you clean up/delete the image afterwards.
1. Run `docker run -it IMAGE_NAME /bin/sh`

## When finished
1. Run `docker-compose down` to stop the containers