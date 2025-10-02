# Deploy local com Docker

## Construindo e executando **containers individuais**

> Pré-requisitos:
> - Docker e Docker Compose v2 instalados  
> - Criar a rede (apenas uma vez): `docker network create pm2025-2-network`

### 1) PostgreSQL

```bash
# Dentro da pasta ./postgresql (onde está o Dockerfile do banco)
docker build -t pm2025-2-postgresql-image .

# Crie o container com variáveis obrigatórias do Postgres
docker create   --name pm2025-2-postgresql-container   --network pm2025-2-network   -p 5432:5432   -e POSTGRES_USER=pm20252   -e POSTGRES_PASSWORD=pm20252   -e POSTGRES_DB=pm20252db   pm2025-2-postgresql-image

docker start pm2025-2-postgresql-container
```

### 2) Backend (Node)

```bash
# Dentro da pasta ./backend (onde está o Dockerfile do backend)
docker build -t pm2025-2-backend-image .

docker create   --name pm2025-2-backend-container   --network pm2025-2-network   -p 3000:3000   -e NODE_ENV=production   -e PORT=3000   -e DATABASE_URL=postgresql://pm20252:pm20252@pm2025-2-postgresql-container:5432/pm20252db   pm2025-2-backend-image

docker start pm2025-2-backend-container
```

> **Nota:** Não é necessário rodar `node index.js` no host. O processo do backend deve ser iniciado **dentro do container** pelo `CMD`/`ENTRYPOINT` do Dockerfile.

### 3) Frontend

```bash
# Dentro da pasta ./frontend (onde está o Dockerfile.prod)
docker build -f Dockerfile.prod -t pm2025-2-frontend-image .

docker create   --name pm2025-2-frontend-container   --network pm2025-2-network   -p 80:80   -e VITE_API_BASE_URL=http://pm2025-2-backend-container:3000   pm2025-2-frontend-image

docker start pm2025-2-frontend-container
```

---

## Subindo com **Docker Compose**

### Comando

```bash
docker compose up -d --build
```

### Estrutura do `docker-compose.yml`

```yaml
services:
  db:
    container_name: pm2025-2-postgresql-container
    build:
      context: ./postgresql         # pasta do Dockerfile do banco
      dockerfile: Dockerfile
    image: pm2025-2-postgresql-image
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-pm20252}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-pm20252}
      POSTGRES_DB: ${POSTGRES_DB:-pm20252db}
    ports:
      - "5432:5432"
    volumes:
      - postgresql-data:/var/lib/postgresql/data
    healthcheck:
      # usa as variáveis acima; pg_isready retorna 0 quando pronto
      test: ["CMD-SHELL", "pg_isready -U $$POSTGRES_USER -d $$POSTGRES_DB || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 10
    networks:
      - pm2025-2-network

  backend:
    container_name: pm2025-2-backend-container
    build:
      context: ./backend            # pasta do Dockerfile do backend
      dockerfile: Dockerfile
    image: pm2025-2-backend-image
    depends_on:
      db:
        condition: service_healthy
    environment:
      NODE_ENV: ${NODE_ENV:-production}
      PORT: ${BACKEND_PORT:-3000}
      # apontando para o serviço 'db' do compose
      DATABASE_URL: ${DATABASE_URL:-postgresql://pm20252:pm20252@db:5432/pm20252db}
    ports:
      - "${BACKEND_PORT:-3000}:3000"
    networks:
      - pm2025-2-network

  frontend:
    container_name: pm2025-2-frontend-container
    build:
      context: ./frontend           # pasta do Dockerfile do frontend
      dockerfile: Dockerfile.prod   # se usa Dockerfile.prod
    image: pm2025-2-frontend-image
    depends_on:
      backend:
        condition: service_started
    environment:
      # Caso o frontend precise do endpoint em build-time
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
```

---

## Arquivo `.env` (opcional)

Crie um arquivo `.env` na raiz do projeto para sobrepor valores:

```env
# Banco
POSTGRES_USER=pm20252
POSTGRES_PASSWORD=pm20252
POSTGRES_DB=pm20252db

# Backend
NODE_ENV=production
BACKEND_PORT=3000
DATABASE_URL=postgresql://pm20252:pm20252@db:5432/pm20252db

# Frontend
VITE_API_BASE_URL=http://pm2025-2-backend-container:3000
```

---

## Dicas & Observações

- **Buildx**: você já está usando `docker buildx build`. Se não precisa de multiplataforma, `docker build` também funciona.
- **Ordem de subida**: o `depends_on` com `service_healthy` garante que o backend só inicie após o Postgres ficar pronto.
- **URLs internas**: em Compose, prefira o **nome do serviço** (`db`, `backend`) como host.
- **Sem `node index.js` fora do container**: o app deve iniciar pelo Dockerfile.
- **Volumes**: o volume `postgresql-data` persiste os dados do banco entre reinicializações.
