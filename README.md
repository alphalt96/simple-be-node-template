## Installation


Add `.env file` and configure connection

```sh
cp .env.example .env
```

Run docker containers

```sh
docker-compose up -d
```

Install the dependencies and devDependencies and start the server.

```sh
npm i
npm run dev
```

### Configure minio
When the Minio docker container is running, then you can access the minio web ui via http://localhost:9000


Click on `Access Keys` button on the tab bar, will show as the image below
![Minio screenshot 1](./docs/minioConfiguration/minio_screenshot_1.png "Minio screenshot 1")


clicks on `Create access keys` button, it will show as below
![Minio screenshot 2](./docs/minioConfiguration/minio_screenshot_2.png "Minio screenshot 2")

Copy your `Access key` and `Secret key` and save it for next step, then clicks on `Create` button to create the key

Paste your `Access key` and `Secret key` from previous step to .env file
```sh
STORAGE_ACCESS_KEY=YOUR_COPIED_ACCESS_KEY
STORAGE_SECRET_KEY=YOUR_COPIED_SECRET_KEY
```

## Documentation
