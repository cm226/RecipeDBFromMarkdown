FROM ubuntu:22.04
RUN apt-get update
RUN apt install -y curl unzip
RUN curl -sL https://deb.nodesource.com/setup_19.x | bash
RUN apt-get install nodejs

COPY ./packages/backend/package.json /app/backend/package.json
RUN cd /app/backend && npm install

COPY ./packages/backend /app/backend
COPY ./packages/frontend/build /app/frontend/build
COPY ./packages/certs/ /app/certs

CMD cd /app/backend && node build/index.js

EXPOSE 8000