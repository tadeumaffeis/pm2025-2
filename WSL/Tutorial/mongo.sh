#!/bin/bash
set -euo pipefail

# Limpa qualquer repo/chave antigo
sudo rm -f /etc/apt/sources.list.d/mongodb-org-*.list
sudo rm -f /usr/share/keyrings/mongodb-server-*.gpg

# Adiciona chave e repositório 8.0 para Ubuntu 24.04 (noble)
curl -fsSL https://pgp.mongodb.com/server-8.0.asc | \
  sudo gpg --dearmor -o /usr/share/keyrings/mongodb-server-8.0.gpg

echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu noble/mongodb-org/8.0 multiverse" \
| sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list > /dev/null

# Atualiza e instala
sudo apt update
sudo apt install -y mongodb-org

# Inicia e habilita o serviço
sudo systemctl start mongod
sudo systemctl enable mongod

# Mostra status
sudo systemctl status --no-pager mongod
