@echo off
echo Parando containers existentes...
docker-compose down

echo Removendo volumes antigos (opcional)...
docker volume prune -f

echo Iniciando servicos...
docker-compose up -d pm20252_mysql_service pm20252_mongo_service portainer

echo Aguardando MySQL ficar pronto...
timeout /t 30

echo Executando Flyway...
docker-compose up flyway

echo Verificando status dos containers...
docker-compose ps

echo.
echo Acesso aos servicos:
echo MySQL: localhost:3306
echo MongoDB: localhost:27017  
echo Portainer: http://localhost:9000
echo.
pause