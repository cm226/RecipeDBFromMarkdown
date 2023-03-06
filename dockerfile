FROM ubuntu:22.10
RUN apt-get update
RUN apt install -y curl unzip
RUN curl https://rclone.org/install.sh | bash
RUN curl -sL https://deb.nodesource.com/setup_19.x | bash
RUN apt-get install nodejs

COPY ./rclone.conf /root/.config/rclone/rclone.conf

COPY ./packages/backend/package.json /app/backend/package.json
RUN cd /app/backend && npm install

COPY ./packages/backend /app/backend
COPY ./packages/frontend/build /app/frontend/build
COPY ./packages/certs/ /app/certs


RUN rclone sync bugChub:Obsidian/big_chub/Recipe /app/backend/big_chub

cmd cd /app/backend && node build/index.js

EXPOSE 8000