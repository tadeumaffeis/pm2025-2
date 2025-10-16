# Backend Cursos API

## Instalação
```bash
npm install
```

## Executar
```bash
npm start
# ou para desenvolvimento
npm run dev
```

## Endpoints

### GET /cursos
Lista todos os cursos

### GET /cursos/:sigla
Busca curso por sigla

### POST /cursos
Cria novo curso
```json
{
  "sigla": "ADS",
  "nome": "Análise e Desenvolvimento de Sistemas",
  "email": "ads@exemplo.com"
}
```

### PUT /cursos/:sigla
Atualiza curso existente
```json
{
  "nome": "Novo Nome",
  "email": "novo@email.com"
}
```

### DELETE /cursos/:sigla
Remove curso por sigla