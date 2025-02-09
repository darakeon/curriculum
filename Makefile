MAKEFLAGS += --no-print-directory

IMAGE_NAME=darakeon/curriculum
MACHINE_NAME=dk-c

build:
	@docker build . -t ${IMAGE_NAME}

run:
	@docker run -d --name ${MACHINE_NAME} --network host ${IMAGE_NAME}

run-dev:
	@cd src && npm i && npm run dev

log:
	@docker logs ${MACHINE_NAME}

log-follow:
	@docker logs -f ${MACHINE_NAME}

stop:
	@docker stop ${MACHINE_NAME}
	@docker rm ${MACHINE_NAME}

rerun: stop run
rerun-dev: stop run-dev

push:
	@docker push ${IMAGE_NAME}
