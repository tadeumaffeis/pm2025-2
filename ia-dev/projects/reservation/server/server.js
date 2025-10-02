import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

// Dados mock para demonstração
let reservations = [
  { id: 1, name: 'João Silva', date: '2024-01-15', time: '14:00', status: 'confirmed' },
  { id: 2, name: 'Maria Santos', date: '2024-01-16', time: '10:30', status: 'confirmed' }
]

// Listar todas as reservas
app.get('/api/reservations', (req, res) => {
  res.json(reservations)
})

// Buscar reserva por ID
app.get('/api/reservations/:id', (req, res) => {
  const reservation = reservations.find(r => r.id === parseInt(req.params.id))
  if (!reservation) {
    return res.status(404).json({ error: 'Reserva não encontrada' })
  }
  res.json(reservation)
})

// Criar nova reserva
app.post('/api/reservations', (req, res) => {
  const { name, date, time } = req.body
  
  if (!name || !date || !time) {
    return res.status(400).json({ error: 'Nome, data e horário são obrigatórios' })
  }
  
  const newReservation = {
    id: Math.max(...reservations.map(r => r.id), 0) + 1,
    name,
    date,
    time,
    status: 'confirmed'
  }
  
  reservations.push(newReservation)
  res.status(201).json(newReservation)
})

// Atualizar reserva
app.put('/api/reservations/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const reservationIndex = reservations.findIndex(r => r.id === id)
  
  if (reservationIndex === -1) {
    return res.status(404).json({ error: 'Reserva não encontrada' })
  }
  
  const { name, date, time, status } = req.body
  reservations[reservationIndex] = { ...reservations[reservationIndex], name, date, time, status }
  
  res.json(reservations[reservationIndex])
})

// Deletar reserva
app.delete('/api/reservations/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const reservationIndex = reservations.findIndex(r => r.id === id)
  
  if (reservationIndex === -1) {
    return res.status(404).json({ error: 'Reserva não encontrada' })
  }
  
  reservations.splice(reservationIndex, 1)
  res.status(204).send()
})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})