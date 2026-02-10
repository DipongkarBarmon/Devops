
.PHONY: build up down clean

DOCKER_COMPOSE:= docker compose
BASE_FILE:= docker-compose.yml
DEV_FILE:= docker-compose.dev.yml
PROD_FILE:=docker-compose.prod.yml
SCALE := 2

OS := $(shell uname)

build:
	@echo "Building Docker containers..."
ifeq ($(OS),Linux)
	@echo "Running in $(OS)"
	$(DOCKER_COMPOSE) build
endif

ifeq ($(OS),Windows_NT)
  @echo "Please add windows command"
endif

up: 
	@echo "Starting docker containers..."
	$(DOCKER_COMPOSE) -f $(BASE_FILE) -f $(DEV_FILE) up -d --scale node-app=$(SCALE)

down: 
	@echo "Stopping docker containers..."
	$(DOCKER_COMPOSE) -f $(BASE_FILE) -f $(DEV_FILE) down

clean:
	@echo "Cleaning up Docker conteiner.."
	docker system prune 


