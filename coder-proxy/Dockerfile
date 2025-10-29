FROM registry.cn-chengdu.aliyuncs.com/shy-base/emulation:24.04.app
WORKDIR /app
COPY . .

RUN npm config set registry https://registry.npmmirror.com/ && \
    npm i && \
    chown -R root:root /app

RUN npm run build && \
    rm -rf src Dockerfile && \
    chown -R root:root /app

USER root
CMD ["npm", "run", "start"]