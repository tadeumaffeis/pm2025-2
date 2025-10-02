import { useState, useEffect } from 'react'

function App() {
  const [reservations, setReservations] = useState([])

  useEffect(() => {
    fetch('/api/reservations')
      .then(res => res.json())
      .then(data => setReservations(data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <h1>Sistema de Reservas</h1>
      <div>
        <h2>Reservas Ativas</h2>
        {reservations.length === 0 ? (
          <p>Nenhuma reserva encontrada</p>
        ) : (
          <ul>
            {reservations.map(reservation => (
              <li key={reservation.id}>
                {reservation.name} - {reservation.date}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App