CREATE DATABASE resume_ai;


CREATE TABLE "usuarios" (
  "id" serial NOT NULL,
  "nome" text NOT NULL,
  "email" text NOT NULL,
  "senha" text NOT NULL,
  PRIMARY KEY ("id")
);


CREATE TABLE "materias" (
  "id" serial NOT NULL,
  "nome" text NOT NULL,
  PRIMARY KEY ("id")
);

INSERT INTO materias (nome) VALUES
('Back-end'),
('Front-end'),
('Carreira'),
('Mobile'),
('Design'),
('Dados'),
('SQL');

CREATE TABLE "resumos" (
  "id" serial NOT NULL,
  "usuario_id" int4 NOT NULL,
  "materia_id" text NOT NULL,
  "descricao" text NOT NULL,
  "criado" date NOT NULL DEFAULT now(),
  PRIMARY KEY ("id"),
  CONSTRAINT "resumo_usuarios_id_foreign_key" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuarios" ("id"),
  CONSTRAINT "resumo_materia_id_foreign_key" FOREIGN KEY ("materia_id") REFERENCES "public"."materias" ("id")
);



// Comando para listar matérias
SELECT * FROM materias;

//Comando para verificar se existe um usuário com um dado e-mail
SELECT * FROM usuarios WHERE email = 'email@example.com';

// Comando para criar um usuário
INSERT INTO usuarios (nome, email, senha) VALUES ('Nome do Usuário', 'email@example.com', 'senha_secreta');

// Comando para verificar a senha cadastrada de um usuário
SELECT senha FROM usuarios WHERE email = 'senha_secreta';

// Comando para criar um resumo
INSERT INTO resumos (usuario_id, materia_id, topicos, descricao) VALUES (1, 1, 'Tópico Exemplo', 'Descrição do resumo');

// Comando para listar os resumos que correspondem a um determinado usuário
SELECT * FROM resumos WHERE usuario_id = 1;

// Comando para listar os resumos filtrados por uma matéria e que correspondem a um determinado usuário
SELECT * FROM resumos WHERE usuario_id = 1 AND materia_id = 1;

// Comando para verificar se um resumo com um determinado id pertence a um determinado usuário
SELECT * FROM resumos WHERE id = 1 AND usuario_id = 1;

// Comando para editar todos os campos de um resumo especificado pelo seu id
UPDATE resumos SET usuario_id = 1, materia_id = 1, topicos = 'Novos Tópicos', descricao = 'Nova descrição' WHERE id = 1;

// Comando para deletar um resumo especificado pelo seu id
DELETE FROM resumos WHERE id = 1;

// Comando para visualizar a quantidade de resumos gerados em um determinado mês e ano
SELECT COUNT(*) AS total_resumos FROM resumos WHERE MONTH(criado) = 7 AND YEAR(criado) = 2024;