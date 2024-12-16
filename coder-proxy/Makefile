.PHONY: run coder

DockerTagRemote=app-fat_app-fat
DockerNameSpace=registry.cn-chengdu.aliyuncs.com/xxx-app

run:
	docker build -f Dockerfile -t registry.cn-chengdu.aliyuncs.com/xxx-app/coder:app-local .
	docker-compose -f /opt/docker-compose.yml up -d coder

push:
	docker build -f Dockerfile -t $(DockerNameSpace)/coder:$(DockerTagRemote) .
	docker push $(DockerNameSpace)/coder:$(DockerTagRemote)