# Horário Lab Inf

Sistema de gerenciamento de horários do laboratório de informática.

## Estrutura do Projeto

```
horariolabinflogin/
├── backend/          # API Node.js com Express, Sequelize e Mongoose
├── frontend/         # Interface web React com Vite e MUI
├── mobile/           # App React Native com Expo
├── infraestrutura/   # Configurações de banco de dados
│   ├── mysql/
│   │   └── dump/
│   ├── mongo/
│   │   └── dump/
│   └── flyway/
│       ├── sql/
│       └── conf/
└── docker-compose.yml
```

## Como executar

### 1. Criar a rede Docker
```bash
docker network create horariolabinf-network
```

### 2. Subir a infraestrutura
```bash
cd infraestrutura
docker-compose up -d
```

### 3. Subir as aplicações
```bash
cd ..
docker-compose up -d
```

## Serviços

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001
- **Mobile**: http://localhost:19006
- **MySQL**: localhost:3306
- **MongoDB**: localhost:27017
- **Portainer**: http://localhost:9000

## Desenvolvimento

Para desenvolvimento local, execute cada projeto individualmente:

### Backend
```bash
cd backend
npm run dev
```

### Frontend
```bash
cd frontend
npm run dev
```

### Mobile
```bash
cd mobile
npm start
```