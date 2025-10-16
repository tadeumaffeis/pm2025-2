-- Criação da estrutura do banco de dados PM20252_HORARIO_LAB
-- Modelo Entidade-Relacionamento baseado em Horarios_Laboratórios_TI_1sem_2025
-- Inclui sistema de autenticação com usuários

CREATE TABLE IF NOT EXISTS CURSO (
    id_curso INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS PROFESSOR (
    id_professor INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS DISCIPLINA (
    id_disciplina INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    id_curso INT,
    id_professor INT,
    FOREIGN KEY (id_curso) REFERENCES CURSO(id_curso),
    FOREIGN KEY (id_professor) REFERENCES PROFESSOR(id_professor)
);

CREATE TABLE IF NOT EXISTS LABORATORIO (
    id_laboratorio INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    qtd_computadores INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS HORARIO (
    id_horario INT AUTO_INCREMENT PRIMARY KEY,
    inicio TIME NOT NULL,
    fim TIME NOT NULL
);

CREATE TABLE IF NOT EXISTS DIA_SEMANA (
    id_dia INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS USUARIO (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS AULA (
    id_aula INT AUTO_INCREMENT PRIMARY KEY,
    id_disciplina INT,
    id_laboratorio INT,
    id_horario INT,
    id_dia INT,
    FOREIGN KEY (id_disciplina) REFERENCES DISCIPLINA(id_disciplina),
    FOREIGN KEY (id_laboratorio) REFERENCES LABORATORIO(id_laboratorio),
    FOREIGN KEY (id_horario) REFERENCES HORARIO(id_horario),
    FOREIGN KEY (id_dia) REFERENCES DIA_SEMANA(id_dia)
);

-- Inserir usuários padrão (admin123 / user123)
INSERT INTO USUARIO (username, password_hash, role) VALUES 
('admin', '$2a$10$Ziq2Gzg56zD3Hn18X7MhJugVddNk3CzUXA/3kRGPj1WWcAD5eFDrC', 'admin'),
('user', '$2a$10$DlwHy8ZRJWV.Vc2vII/tVef.7CFXZnJMtUmyZCo924DJ4ZCBFTFpS', 'user');