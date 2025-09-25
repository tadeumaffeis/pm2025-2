docker buildx build -t pm2025-2-postgresql-image .

docker create --name pm2025-2-postgresql-container --network pm2025-2-network -p 5432:5432 pm2025-2-postgresql-image

docker start pm2025-2-postgresql-container

node index.js

docker buildx build -t pm2025-2-backend-image .

docker create --name pm2025-2-backend-container --network pm2025-2-network -p 3000:3000 pm2025-2-backend-image

docker start pm2025-2-backend-container

docker buildx build -f Dockerfile.prod -t pm2025-2-frontend-image .

docker create --name pm2025-2-frontend-container --network pm2025-2-network -p 80:80 pm2025-2-frontend-image

docker start pm2025-2-frontend-container