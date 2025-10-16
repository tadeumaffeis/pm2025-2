import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Alert
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { cursoService } from '../services/cursoService';

const CursoManager = () => {
  const [cursos, setCursos] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingCurso, setEditingCurso] = useState(null);
  const [formData, setFormData] = useState({ nome: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCursos();
  }, []);

  const loadCursos = async () => {
    try {
      const response = await cursoService.getAll();
      setCursos(response.data.data || []);
    } catch (error) {
      setError('Erro ao carregar cursos');
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = { nome: formData.nome };
      if (editingCurso) {
        await cursoService.update(editingCurso.id_curso, payload);
      } else {
        await cursoService.create(payload);
      }
      handleClose();
      loadCursos();
    } catch (error) {
      setError('Erro ao salvar curso');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Confirma a exclusão?')) {
      try {
        await cursoService.delete(id);
        loadCursos();
      } catch (error) {
        setError('Erro ao excluir curso');
      }
    }
  };

  const handleEdit = (curso) => {
    setEditingCurso(curso);
    setFormData({ nome: curso.nome });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingCurso(null);
    setFormData({ nome: '' });
    setError('');
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Gerenciar Cursos</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpen(true)}
        >
          Novo Curso
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cursos.map((curso) => (
              <TableRow key={curso.id_curso}>
                <TableCell>{curso.id_curso}</TableCell>
                <TableCell>{curso.nome}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(curso)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(curso.id_curso)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingCurso ? 'Editar Curso' : 'Novo Curso'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nome"
            fullWidth
            variant="outlined"
            value={formData.nome}
            onChange={(e) => setFormData({ nome: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained" disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CursoManager;