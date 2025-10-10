-- Criação da estrutura do banco de dados PM20252_HORARIO_LAB
-- Modelo Entidade-Relacionamento baseado em Horarios_Laboratórios_TI_1sem_2025

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