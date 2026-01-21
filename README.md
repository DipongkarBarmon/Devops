# Devops

npm run dev

docker commend 

docker build . 

List all Local images
docker images

List all Local images
docker images

Remove unused images
docker image prune  

Build an image from a Dockerfile
docker build -t <image_name>:<version> . //version is optional

docker build -t <image_name>:<version> . -no-cache //build without cache


CONTAINER :

List all Local containers (running & stopped)
docker ps -a

List all running containers
docker ps


Docker run

 docker run  --name <container_name> <image_name> //cann't use terminal

docker run -d --name <container_name> <image_name> //for use terminal

Create & run a new container
docker run <image_name>

//if image not available locally, it’ll be downloaded from DockerHub
Run container in background
docker run -d <image_name>

Run container with custom name
docker run - -name <container_name> <image_name>



Port Binding in container
docker run -p 8001:3000 -d --name  <container_image> <image_name>  // run docker  to mapping two service

docker run -v <path_to_folder_on_location>:<path_to_folder_on_container> -p 8001:3000 -d --name  <container_image> <image_name>

docker run -v <path_to_folder_on_location>:/app -p 8001:3000 -d --name  <container_image> <image_name>

expamle : docker run -v $(pwd):/app -p 8001:3000 -d --name node-app node-app-image 

docker run -p<host_port>:<container_port> <image_name> 

Set environment variables in a container
docker run -e <var_name>=<var_value> <container_name> (or <container_id)

Start or Stop an existing container
docker start|stop <container_name> (or <container_id)

Inspect a running container
docker inspect <container_name> (or <container_id)

Delete a container
docker rm <container_name> (or <container_id)

docker rm <container_name> -f //best option to romove container
example:docker rm node-app -f


TROUBLESHOOT :
Fetch logs of a container
docker logs <container_name> (or <container_id)

example : docker logs node-app

Open shell inside running container
docker exec -it <container_name> /bin/bash

docker exec -it <container_name> sh


DOCKER HUB :
Pull an image from DockerHub
docker pull <image_name>

Publish an image to DockerHub
docker push <username>/<image_name>

Login into DockerHub
docker login -u <image_name>

Or
docker login
//also, docker logout to remove credentials
Search for an image on DockerHub
docker search <image_name>

VOLUMES :

List all Volumes
docker volume ls

Create new Named volume
docker volume create <volume_name>

Delete a Named volume
docker volume rm <volume_name>


Mount Named volume with running container
docker run - -volume <volume_name>:<mount_path>

//or using - -mount
docker run - -mount type=volume,src=<volume_name>,dest=<mount_path>
Mount Anonymous volume with running container

docker run - -volume <mount_path>
To create a Bind Mount

docker run - -volume <host_path>:<container_path>

//or using - -mount
docker run - -mount type=bind,src=<host_path>,dest=<container_path>

Remove unused local volumes
docker volume prune //for anonymous volumes

NETWORK :

List all networks
docker network ls

Create a network
docker network create <network_name>

Remove a network
docker network rm <network_name>

Remove all unused networks
docker network prune





// bash
docker exec -it node-app bash

bash commend
cat index.js //show the code
printenv //to show env 



 docker run -v $(pwd):/app -v /app/node_modules -p 8001:3000  -d --name node-app node-app-image   

 //can't create file only for read only
 docker run -v $(pwd):/app:ro -v /app/node_modules -p 8001:3000  -d --name node-app node-app-image 

//with out env 
 docker run -v $(pwd):/app:ro -v /app/node_modules --env PORT=4000  -p 8001:4000  -d --name node-app 
node-app-image

//with env file
docker run -v $(pwd):/app -v /app/node_modules --env-file ./.env -p 8001:4000 -d --name node-app node-app-image



Volume:
//list of all volume
docker volume ls

//delete unnesseccery volume except running container
docker volume prune

//delete volume when delete container
docker rm node-app -fv


//docker run -v $(pwd):/app -v /app/node_modules --env-file ./.env -p 8001:3000 -d --name n
//this commmend to much long . we have lot of commend like this so to run these all commnt vary painfull. we can't keep it in our mind
// so we use docker compose

now create docker-compose.yml file

docker compose version

docker build -t node-app-image .

// to run services 
docker compose up -d

//to remvoe Container and Network
docker compose down -v

//if we change fundamentally in docker file ,neet to rebulid docker using docker build -t node-app-image .
//or docker compose up -d --build (always we use this)


then i create 
docker-compose.backup.yml
docker-compose.dev.yml for development environment
docker-compose.prod.yml for production environmnet

//run dev
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
//delete dev
docker compose -f docker-compose.yml -f docker-compose.dev.yml down -v

//run prod
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build

//delete 
docker compose -f docker-compose.yml -f docker-compose.prod.yml down -v