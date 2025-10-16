# Infraestrutura PM2025-2

Este projeto contém a configuração Docker para os serviços de banco de dados e ferramentas de gestão.

## Serviços Incluídos

- **MySQL**: Banco de dados principal para horários de laboratório
- **MongoDB**: Banco de dados NoSQL
- **Flyway**: Migração automática do banco MySQL
- **Portainer**: Interface web para gestão de containers Docker

## Como Executar

1. Certifique-se de ter o Docker e Docker Compose instalados
2. Execute:

   Ou manualmente:
   ```bash
   # Parar containers existentes
   docker-compose down
   
   # Iniciar MySQL, MongoDB e Portainer primeiro
   docker-compose up -d pm20252_mysql_service pm20252_mongo_service portainer
   
   # Aguardar MySQL ficar pronto (30 segundos)
   
   # Executar Flyway
   docker-compose up flyway
   ```

## Correções Aplicadas

- **MySQL**: Configurado com `mysql_native_password` e SSL desabilitado
- **Flyway**: Atualizado para versão mais recente com parâmetros de conexão corretos
- **Healthcheck**: Adicionado para garantir que MySQL esteja pronto antes do Flyway
- **Script**: Criado `start.bat` para execução sequencial dos serviços

## Acesso aos Serviços

- **MySQL**: localhost:3306
  - Usuário: pm20252_mysql_dbuser
  - Senha: A12345678a
  - Database: PM20252_HORARIO_LAB

- **MongoDB**: localhost:27017
  - Usuário: pm20252_mongo_dbuser
  - Senha: A12345678a

- **Portainer**: http://localhost:9000

## Estrutura do Banco MySQL

O Flyway criará automaticamente as seguintes tabelas:
- CURSO
- PROFESSOR
- DISCIPLINA
- LABORATORIO
- HORARIO
- DIA_SEMANA
- AULA