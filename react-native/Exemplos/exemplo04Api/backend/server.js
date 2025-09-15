const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { client, connectDB } = require('./database');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Cursos',
      version: '1.0.0',
      description: 'API REST para gerenciamento de cursos'
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Servidor de desenvolvimento'
      }
    ]
  },
  apis: ['./server.js']
};

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Conectar ao banco
connectDB();

/**
 * @swagger
 * components:
 *   schemas:
 *     Curso:
 *       type: object
 *       required:
 *         - sigla
 *         - nome
 *         - email
 *       properties:
 *         sigla:
 *           type: string
 *           description: Sigla única do curso
 *         nome:
 *           type: string
 *           description: Nome do curso
 *         email:
 *           type: string
 *           format: email
 *           description: Email de contato do curso
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Mensagem de erro
 */

/**
 * @swagger
 * /cursos:
 *   get:
 *     summary: Lista todos os cursos
 *     tags: [Cursos]
 *     responses:
 *       200:
 *         description: Lista de cursos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Curso'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.get('/cursos', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM cursos ORDER BY sigla');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /cursos/{sigla}:
 *   get:
 *     summary: Busca um curso pela sigla
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: sigla
 *         schema:
 *           type: string
 *         required: true
 *         description: Sigla do curso
 *     responses:
 *       200:
 *         description: Curso encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Curso'
 *       404:
 *         description: Curso não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.get('/cursos/:sigla', async (req, res) => {
  try {
    const { sigla } = req.params;
    const result = await client.query('SELECT * FROM cursos WHERE sigla = $1', [sigla]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Curso não encontrado' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /cursos:
 *   post:
 *     summary: Cria um novo curso
 *     tags: [Cursos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Curso'
 *     responses:
 *       201:
 *         description: Curso criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Curso'
 *       400:
 *         description: Sigla já existe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.post('/cursos', async (req, res) => {
  try {
    const { sigla, nome, email } = req.body;
    
    const result = await client.query(
      'INSERT INTO cursos (sigla, nome, email) VALUES ($1, $2, $3) RETURNING *',
      [sigla, nome, email]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') {
      res.status(400).json({ error: 'Sigla já existe' });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});

/**
 * @swagger
 * /cursos/{sigla}:
 *   put:
 *     summary: Atualiza um curso existente
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: sigla
 *         schema:
 *           type: string
 *         required: true
 *         description: Sigla do curso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Curso atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Curso'
 *       404:
 *         description: Curso não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.put('/cursos/:sigla', async (req, res) => {
  try {
    const { sigla } = req.params;
    const { nome, email } = req.body;
    
    const result = await client.query(
      'UPDATE cursos SET nome = $1, email = $2 WHERE sigla = $3 RETURNING *',
      [nome, email, sigla]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Curso não encontrado' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /cursos/{sigla}:
 *   delete:
 *     summary: Remove um curso
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: sigla
 *         schema:
 *           type: string
 *         required: true
 *         description: Sigla do curso
 *     responses:
 *       200:
 *         description: Curso deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Curso não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
app.delete('/cursos/:sigla', async (req, res) => {
  try {
    const { sigla } = req.params;
    
    const result = await client.query('DELETE FROM cursos WHERE sigla = $1 RETURNING *', [sigla]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Curso não encontrado' });
    }
    
    res.json({ message: 'Curso deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Documentação Swagger disponível em: http://localhost:${PORT}/api-docs`);
});