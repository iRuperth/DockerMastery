# Docker & CI/CD Basics
## Dockerfile Basics
- FROM: defines the base image
- WORKDIR: sets the working directory
- COPY: copies files
- RUN: executes commands
- CMD: default command
- EXPOSE: documents port
- ENV: environment variables
- ENTRYPOINT: main executable
Example Dockerfile:
```Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```
## Docker Compose Basics
- services: defines containers
- image: uses existing image
- build: builds from Dockerfile
- ports: maps ports
- volumes: persistent data
- environment: env vars
- depends_on: startup order
Example docker-compose.yml:
```yaml
version: "3.9"
services:
 app:
 build: .
 ports:
 - "3000:3000"
 environment:
 - NODE_ENV=development
 depends_on:
 - db
 db:
 image: postgres:15
 environment:
 POSTGRES_USER: user
 POSTGRES_PASSWORD: pass
 POSTGRES_DB: appdb
 volumes:
 - db_data:/var/lib/postgresql/data
volumes:
 db_data:
```
## GitHub Actions CI/CD Basics
- name: workflow name
- on: triggers
- jobs: defines jobs
- runs-on: OS
- steps: actions or commands
- checkout: pulls repo
- setup-node: configures Node
- docker build & push: builds and publishes images
Example workflow:
```yaml
name: CI/CD Pipeline
on:
 push:
 branches: [ "main" ]
jobs:
 build:
 runs-on: ubuntu-latest
 steps:
 - name: Checkout code
 uses: actions/checkout@v4
 - name: Set up Node.js
 uses: actions/setup-node@v4
 with:
 node-version: 18
 - name: Install dependencies
 run: npm install
 - name: Run tests
 run: npm test
 - name: Build Docker image
 run: docker build -t myapp:latest .
 - name: Log in to Docker Hub
 run: echo "${{ secrets.DOCKERHUB_TOKEN }}" | docker login -u "${{
secrets.DOCKERHUB_USER }}" --password-stdin
 - name: Push image
 run: docker push myapp:latest
```











.
