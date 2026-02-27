# Boilerplate-Api
Boilerplate de API CRUD

# API
É um lugar para disponibilizar recursos e/ou funcionalidades

# Objetivo
Criar uma API que disponibiliza a consulta, criação, edição e exclusão de livros
 
# URL base
localhost

# Endpoints
localhost/livros (GET) - Consulta <br>
localhost/livros (POST) - Criar novos livros<br>
localhost/livros/id (GET) - Consulta de livro específico por ID<br>
localhost/livros/id (PUT) - Modificação de livro por ID<br>
localhost/livros/id (DELETE) - Deletar por ID

# Recursos
Livros

# Script MySQL

CREATE DATABASE livros; <br>
USE livros; <br>

CREATE TABLE livro ( <br>
&nbsp;    id INT AUTO_INCREMENT PRIMARY KEY, <br>
&nbsp;    titulo VARCHAR(200) NOT NULL, <br>
&nbsp;    autor VARCHAR(100) NOT NULL <br>
); <br>

INSERT INTO livro (titulo, autor) VALUES <br>
('O Senhor dos Anéis - A Sociedade do Anel', 'J.R.R. Tolkien'), <br>
('Harry Potter e a Pedra Filosofal', 'J.K. Rowling'), <br>
('James Clear', 'Hábitos Atômicos'); <br>

SELECT * FROM livro



Precisa rodar antes py -m pip install flask-cors


Criando banco de dados
Conexão TechDias
CREATE DATABASE techdias;
USE techdias;

-- LEADS PROSPECCAO
CREATE TABLE leads_prospeccao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_empresa VARCHAR(255) NOT NULL,
    nome_contato VARCHAR(255),
    telefone VARCHAR(50),
    email VARCHAR(255),
    cidade VARCHAR(255),
    status_lead ENUM('novo','em andamento','perdido','convertido') DEFAULT 'novo',
    nivel_interesse ENUM('baixo','medio','alto'),
    responsavel VARCHAR(255),
    created_at DATETIME
);

-- CLIENTES
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_empresa VARCHAR(255) NOT NULL,
    nome_contato VARCHAR(255),
    telefone VARCHAR(50),
    email VARCHAR(255),
    cidade VARCHAR(255),
    status_cliente ENUM('ativo','inativo') DEFAULT 'ativo',
    data_conversao DATE,
    valor_medio DECIMAL(10,2),
    created_at DATETIME
);

-- PROJETOS
CREATE TABLE projetos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    nome_projeto VARCHAR(255),
    status_projeto ENUM('briefing','em andamento','entregue','cancelado') DEFAULT 'briefing',
    data_inicio DATE,
    data_previsao DATE,
    data_entrega DATE,
    valor_projeto DECIMAL(10,2),
    created_at DATETIME,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

-- PAGAMENTOS
CREATE TABLE pagamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    projeto_id INT,
    valor DECIMAL(10,2) NOT NULL,
    data_vencimento DATE,
    data_pagamento DATE,
    status_pagamento ENUM('pendente','pago','atrasado') DEFAULT 'pendente',
    created_at DATETIME,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (projeto_id) REFERENCES projetos(id)
);

-- PLANOS RECORRENTES
CREATE TABLE planos_recorrentes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    nome_plano VARCHAR(255),
    valor_mensal DECIMAL(10,2),
    dia_cobranca INT,
    status_plano ENUM('ativo','cancelado','suspenso') DEFAULT 'ativo',
    created_at DATETIME,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

-- INTERACOES
CREATE TABLE interacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lead_id INT,
    cliente_id INT,
    tipo_interacao ENUM('ligacao','email','reuniao','mensagem'),
    resumo TEXT,
    data_interacao DATETIME,
    responsavel VARCHAR(255),
    FOREIGN KEY (lead_id) REFERENCES leads_prospeccao(id),
    FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);



Inserção de Dados:
-- LEAD
INSERT INTO leads_prospeccao 
(nome_empresa, nome_contato, telefone, email, cidade, status_lead, nivel_interesse, responsavel, created_at)
VALUES ('TechCorp', 'João Silva', '21999999999', 'joao@techcorp.com', 'Rio de Janeiro', 'novo', 'alto', 'Gabriel', NOW());

-- CLIENTE
INSERT INTO clientes 
(nome_empresa, nome_contato, telefone, email, cidade, status_cliente, data_conversao, valor_medio, created_at)
VALUES ('Inova Ltda', 'Maria Souza', '2133334444', 'maria@inova.com', 'São Paulo', 'ativo', '2026-02-01', 15000.00, NOW());

-- PROJETO
INSERT INTO projetos 
(cliente_id, nome_projeto, status_projeto, data_inicio, data_previsao, valor_projeto, created_at)
VALUES (1, 'Website Corporativo', 'em andamento', '2026-02-10', '2026-03-15', 25000.00, NOW());

-- PAGAMENTO
INSERT INTO pagamentos 
(cliente_id, projeto_id, valor, data_vencimento, status_pagamento, created_at)
VALUES (1, 1, 5000.00, '2026-03-01', 'pendente', NOW());

-- PLANO RECORRENTE
INSERT INTO planos_recorrentes 
(cliente_id, nome_plano, valor_mensal, dia_cobranca, status_plano, created_at)
VALUES (1, 'Plano Premium', 1200.00, 10, 'ativo', NOW());

-- INTERACAO
INSERT INTO interacoes 
(lead_id, cliente_id, tipo_interacao, resumo, data_interacao, responsavel)
VALUES (1, 1, 'reuniao', 'Apresentação inicial do projeto', NOW(), 'Gabriel');
