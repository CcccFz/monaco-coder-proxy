.PHONY: run coder

DockerTagRemote=app-dev_app-dev
DockerNameSpace=registry.cn-chengdu.aliyuncs.com/shy-app

run:
	docker build -f Dockerfile -t $(DockerNameSpace)/coder:app-local .
	docker-compose -f /opt/docker-compose.yml up -d coder

push:
	docker build -f Dockerfile -t $(DockerNameSpace)/coder:$(DockerTagRemote) .
	docker push $(DockerNameSpace)/coder:$(DockerTagRemote)