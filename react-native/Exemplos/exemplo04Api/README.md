## Construido os cantainets individualmente
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

# Construindo os containers com buildx compose

docker compose up -d

## docker-compose.yml

services:
  db:
    container_name: pm2025-2-postgresql-container
    build:
      context: ./postgresql        # <-- ajuste para a pasta do Dockerfile do banco
      dockerfile: Dockerfile       # <-- nome do Dockerfile do banco (se diferente, mude aqui)
    image: pm2025-2-postgresql-image
    ports:
      - "5432:5432"
    volumes:
      - postgresql-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U $$POSTGRES_USER -d $$POSTGRES_DB"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - pm2025-2-network

  backend:
    container_name: pm2025-2-backend-container
    build:
      context: ./backend           # <-- ajuste para a pasta do Dockerfile do backend
      dockerfile: Dockerfile       # <-- nome do Dockerfile do backend
    image: pm2025-2-backend-image
    depends_on:
      db:
        condition: service_healthy
    environment:
      # Exemplo de variável apontando para o Postgres do compose
      DATABASE_URL: ${DATABASE_URL:-postgresql://pm20252:pm20252@db:5432/pm20252db}
      NODE_ENV: ${NODE_ENV:-production}
      PORT: ${BACKEND_PORT:-3000}
    ports:
      - "${BACKEND_PORT:-3000}:3000"
    networks:
      - pm2025-2-network

  frontend:
    container_name: pm2025-2-frontend-container
    build:
      context: ./frontend          # <-- ajuste para a pasta do Dockerfile do frontend
      dockerfile: Dockerfile.prod  # <-- se o seu frontend usa Dockerfile.prod (como no seu README)
    image: pm2025-2-frontend-image
    depends_on:
      - backend
    environment:
      # Caso o frontend precise saber o endpoint do backend em build-time
      VITE_API_BASE_URL: ${VITE_API_BASE_URL:-http://pm2025-2-backend-container:3000}
    ports:
      - "80:80"
    networks:
      - pm2025-2-network

networks:
  pm2025-2-network:
    driver: bridge

volumes:
  postgresql-data:

