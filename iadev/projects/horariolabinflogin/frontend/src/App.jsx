import { Container, Typography, Box } from '@mui/material'

function App() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Horário Lab Inf
        </Typography>
        <Typography variant="body1">
          Sistema de gerenciamento de horários do laboratório de informática
        </Typography>
      </Box>
    </Container>
  )
}

export default App