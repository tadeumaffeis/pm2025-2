import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Paper,
  Box,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import { LogoutOutlined, SchoolOutlined, ComputerOutlined, PersonOutlined } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <SchoolOutlined sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Horários Lab - Sistema de Gerenciamento
          </Typography>
          <Typography variant="body2" sx={{ mr: 2 }}>
            Olá, {user?.username} ({user?.role})
          </Typography>
          <Button 
            color="inherit" 
            onClick={handleLogout}
            startIcon={<LogoutOutlined />}
          >
            Sair
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SchoolOutlined color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">
                    Cursos
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Gerenciar cursos disponíveis
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <ComputerOutlined color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">
                    Laboratórios
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Gerenciar laboratórios e equipamentos
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PersonOutlined color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">
                    Professores
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Gerenciar professores e disciplinas
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Bem-vindo ao Sistema de Horários Lab
          </Typography>
          <Typography variant="body1">
            Este sistema permite o gerenciamento completo de horários de laboratórios, 
            incluindo cursos, professores, disciplinas e agendamentos.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Dashboard;