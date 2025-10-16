FROM node:20-alpine

WORKDIR /app

# Instalar wget para healthcheck
RUN apk add --no-cache wget

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências como root
RUN npm ci --only=production && npm cache clean --force

# Copiar código fonte
COPY . .

# Criar usuário e ajustar permissões
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
RUN chown -R nodejs:nodejs /app
RUN chmod -R 755 /app

USER nodejs

EXPOSE 3000

CMD ["npm", "start"]