# Builder Stage
FROM node:15.5.1-alpine AS node

FROM node AS builder

# Use /app as the CWD
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package*.json ./

# Install all dependencies
RUN npm install -g npm@latest
RUN yarn

# Copy the rest of the code
COPY . .

# Invoke the build script to transpile ts code to js
RUN yarn build

# Final stage

FROM node AS final

ARG KUBE_NAMESPACE
ENV KUBE_NAMESPACE $KUBE_NAMESPACE

# Set node environment to production
ENV NODE_ENV production

# Update the system
RUN apk --no-cache -U upgrade
RUN apk add --no-cache --upgrade bash

# Prepare destination directory and ensure user node owns it
RUN mkdir -p /home/node/app/dist && chown -R node:node /home/node/app

# Set CWD
WORKDIR /home/node/app

# Install PM2
RUN npm install -g npm@latest && yarn global add pm2

COPY package*.json process.yml ./

# # Switch to user node
# USER node

# Install libraries as user node
RUN yarn

# Copy js files and change ownership to user node
COPY --chown=node:node --from=builder /app/dist ./dist

# Use PM2 to run the application as stated in config file
ENTRYPOINT ["pm2-runtime", "./process.yml"]
# CMD ["node", "./dist/index.js"]
