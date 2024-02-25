# frontend-angular-ionic-docker

## Docker section
```bash
# Docker stop e remove (in root)
$ docker stop $(docker ps -a -q)
$ docker rm $(docker ps -a -q)

# DOCKER DEPLOY (in root)
$ docker network create proxy (docker network ls, docker network prune)
## Docker for developer mode in local
$ IMAGE=frontend-development-local:frontend-development-local TARGET=local docker compose -f docker-compose-dev-local.yml --env-file ./frontend/.env up

```