FROM registry.cn-chengdu.aliyuncs.com/shy-base/emulation:24.04.app
WORKDIR /app
ADD . .
RUN npm config set registry https://registry.npmmirror.com/ && \
    npm i && \
    npm run build && \
    rm -rf src Dockerfile
CMD ["npm", "run", "start"]