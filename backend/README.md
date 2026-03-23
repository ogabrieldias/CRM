Se não abrir no XAMPP basta rodar um: netstat -ano | findstr 3306
no cmd, pegar o PID e matar a tarefa

Precisa rodar antes py -m pip install flask-cors


Criando banco de dados
Conexão TechDias
CREATE DATABASE crmtechdias;
USE crmtechdias;

-- LEADS PROSPECCAO
CREATE TABLE leads_prospeccao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_empresa VARCHAR(255) NOT NULL,
    nome_contato VARCHAR(255),
    telefone VARCHAR(50),
    email VARCHAR(255),
    cidade VARCHAR(255),
    ramo VARCHAR(255),
    abordado ENUM('Sim', 'Não') DEFAULT 'Não',
    site ENUM('Sim', 'Não') DEFAULT 'Não',
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
    ramo VARCHAR(255),
    link_site VARCHAR(255),
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


