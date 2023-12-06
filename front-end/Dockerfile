# start from the node v16 base image
FROM node:16


# install dependencies into the image - doing this first will speed up subsequent builds, as Docker will cache this step
COPY package*.json ./
RUN npm install

# copy the remaining app source code into the default directory within the image
COPY . .

EXPOSE 80

CMD [ "npm", "start" ]