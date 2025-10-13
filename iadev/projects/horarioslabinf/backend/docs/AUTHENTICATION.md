# Sistema de Autenticação JWT

## Endpoints Disponíveis

### POST /api/v1/auth/login
Autentica usuário e retorna token JWT.

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "admin",
      "role": "admin"
    }
  }
}
```

### GET /api/v1/auth/verify
Verifica se o token JWT é válido.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Token is valid",
  "data": {
    "id": 1,
    "username": "admin",
    "role": "admin"
  }
}
```

### POST /api/v1/auth/refresh
Renova o token JWT.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "admin",
      "role": "admin"
    }
  }
}
```

## Usuários Padrão

| Username | Password | Role  |
|----------|----------|-------|
| admin    | admin123 | admin |
| user     | user123  | user  |

## Middleware de Autenticação

### auth
Middleware básico que verifica se o token JWT é válido.

```javascript
const { auth } = require('../middleware/auth');
router.get('/protected', auth, controller.method);
```

### requireRole
Middleware que verifica se o usuário tem a role necessária.

```javascript
const { auth, requireRole } = require('../middleware/auth');
router.post('/admin-only', auth, requireRole(['admin']), controller.method);
```

## Configuração

As seguintes variáveis de ambiente são necessárias:

```env
JWT_SECRET=horarios-lab-super-secret-key-2025
JWT_EXPIRES_IN=24h
```

## Logs de Auditoria

Todas as tentativas de login são registradas no sistema de logs:
- LOGIN: Login bem-sucedido
- LOGIN_FAILED: Falha na autenticação
- LOGIN_ERROR: Erro no serviço de autenticação

## Códigos de Erro

| Código | Descrição |
|--------|-----------|
| 400    | Dados de entrada inválidos |
| 401    | Credenciais inválidas ou token expirado |
| 403    | Permissões insuficientes |
| 500    | Erro interno do servidor |