FROM node:20-alpine

WORKDIR /app

# Instalar wget para healthcheck
RUN apk add --no-cache wget

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências como root
RUN npm ci && npm cache clean --force

# Copiar código fonte
COPY . .

# Criar usuário e ajustar permissões
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
RUN chown -R nodejs:nodejs /app
RUN chmod -R 755 /app

USER nodejs

ENV PORT=3001
EXPOSE 3001

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3001"]