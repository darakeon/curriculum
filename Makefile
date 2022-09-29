IMAGE_NAME=darakeon/curriculum
MACHINE_NAME=dk-c

build:
	@docker build . -t ${IMAGE_NAME}

run:
	@docker run -d --rm --name ${MACHINE_NAME} --network host ${IMAGE_NAME}

log:
	@docker logs ${MACHINE_NAME}

stop:
	@docker stop ${MACHINE_NAME}

rerun: stop run

push:
	@docker push ${IMAGE_NAME}
