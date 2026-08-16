from backend.database import db

# ========== 1. LEADS PROSPECCAO ==========
class Lead(db.Model):
    __tablename__ = "leads_prospeccao"

    id = db.Column(db.Integer, primary_key=True)

    nome_empresa = db.Column(
        db.String(255),
        nullable=False
    )

    nome_contato = db.Column(db.String(255))

    telefone = db.Column(db.String(50))

    email = db.Column(db.String(255))

    cidade = db.Column(db.String(255))

    ramo = db.Column(db.String(255))

    abordado = db.Column(
        db.Enum(
            "Sim",
            "Não",
            name="abordado_enum"
        ),
        default="Não"
    )

    site = db.Column(
        db.Enum(
            "Sim",
            "Não",
            name="site_enum"
        ),
        default="Não"
    )

    status_lead = db.Column(
        db.Enum(
            "novo",
            "em andamento",
            "perdido",
            "convertido",
            name="status_lead_enum"
        ),
        default="novo"
    )

    nivel_interesse = db.Column(
        db.Enum(
            "baixo",
            "medio",
            "alto",
            name="nivel_interesse_enum"
        )
    )

    responsavel = db.Column(db.String(255))

    created_at = db.Column(
        db.DateTime,
        nullable=False,
        server_default=db.func.now()
    )

    def to_dict(self):
        return {
            "id": self.id,
            "nome_empresa": self.nome_empresa,
            "nome_contato": self.nome_contato,
            "telefone": self.telefone,
            "email": self.email,
            "cidade": self.cidade,
            "ramo": self.ramo,
            "abordado": self.abordado,
            "site": self.site,
            "status_lead": self.status_lead,
            "nivel_interesse": self.nivel_interesse,
            "responsavel": self.responsavel,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }


# ========== 2. CLIENTES ==========
class Cliente(db.Model):
    __tablename__ = "clientes"

    id = db.Column(db.Integer, primary_key=True)

    nome_empresa = db.Column(
        db.String(255),
        nullable=False
    )

    nome_contato = db.Column(db.String(255))

    telefone = db.Column(db.String(50))

    email = db.Column(db.String(255))

    cidade = db.Column(db.String(255))

    ramo = db.Column(db.String(255))

    link_site = db.Column(db.String(255))

    status_cliente = db.Column(
        db.Enum(
            "ativo",
            "inativo",
            name="status_cliente_enum"
        ),
        default="ativo"
    )

    data_conversao = db.Column(db.Date)

    valor_medio = db.Column(db.Numeric(10, 2))

    created_at = db.Column(
        db.DateTime,
        nullable=False,
        server_default=db.func.now()
    )

    def to_dict(self):
        return {
            "id": self.id,
            "nome_empresa": self.nome_empresa,
            "nome_contato": self.nome_contato,
            "telefone": self.telefone,
            "email": self.email,
            "cidade": self.cidade,
            "ramo": self.ramo,
            "link_site": self.link_site,
            "status_cliente": self.status_cliente,
            "data_conversao": self.data_conversao.isoformat() if self.data_conversao else None,
            "valor_medio": float(self.valor_medio) if self.valor_medio else None,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }

# ========== 3. PROJETOS ==========
class Projeto(db.Model):
    __tablename__ = "projetos"

    id = db.Column(db.Integer, primary_key=True)

    cliente_id = db.Column(
        db.Integer,
        db.ForeignKey("clientes.id"),
        nullable=False
    )

    nome_projeto = db.Column(db.String(255))

    status_projeto = db.Column(
        db.Enum(
            "briefing",
            "em andamento",
            "entregue",
            "cancelado",
            name="status_projeto_enum"
        ),
        default="briefing"
    )

    data_inicio = db.Column(db.Date)

    data_previsao = db.Column(db.Date)

    data_entrega = db.Column(db.Date)

    valor_projeto = db.Column(db.Numeric(10, 2))

    created_at = db.Column(
        db.DateTime,
        nullable=False,
        server_default=db.func.now()
    )

    cliente = db.relationship(
        "Cliente",
        backref=db.backref(
            "projetos",
            lazy=True
        )
    )

    def to_dict(self):
        return {
            "id": self.id,
            "cliente_id": self.cliente_id,
            "nome_projeto": self.nome_projeto,
            "status_projeto": self.status_projeto,
            "data_inicio": self.data_inicio.isoformat() if self.data_inicio else None,
            "data_previsao": self.data_previsao.isoformat() if self.data_previsao else None,
            "data_entrega": self.data_entrega.isoformat() if self.data_entrega else None,
            "valor_projeto": float(self.valor_projeto) if self.valor_projeto else None,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }


# ========== 4. PAGAMENTOS ==========
class Pagamento(db.Model):
    __tablename__ = "pagamentos"

    id = db.Column(db.Integer, primary_key=True)

    cliente_id = db.Column(
        db.Integer,
        db.ForeignKey("clientes.id"),
        nullable=False
    )

    projeto_id = db.Column(
        db.Integer,
        db.ForeignKey("projetos.id")
    )

    valor = db.Column(
        db.Numeric(10, 2),
        nullable=False
    )

    data_vencimento = db.Column(db.Date)

    data_pagamento = db.Column(db.Date)

    status_pagamento = db.Column(
        db.Enum(
            "pendente",
            "pago",
            "atrasado",
            name="status_pagamento_enum"
        ),
        default="pendente"
    )

    created_at = db.Column(
        db.DateTime,
        nullable=False,
        server_default=db.func.now()
    )

    cliente = db.relationship(
        "Cliente",
        backref=db.backref(
            "pagamentos",
            lazy=True
        )
    )

    projeto = db.relationship(
        "Projeto",
        backref=db.backref(
            "pagamentos",
            lazy=True
        )
    )

    def to_dict(self):
        return {
            "id": self.id,
            "cliente_id": self.cliente_id,
            "cliente_nome": self.cliente.nome_empresa if self.cliente else None,
            "projeto_id": self.projeto_id,
            "valor": float(self.valor),
            "data_vencimento": self.data_vencimento.isoformat() if self.data_vencimento else None,
            "data_pagamento": self.data_pagamento.isoformat() if self.data_pagamento else None,
            "status_pagamento": self.status_pagamento,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }

# ========== 5. PLANOS RECORRENTES ==========
class PlanoRecorrente(db.Model):
    __tablename__ = "planos_recorrentes"

    id = db.Column(db.Integer, primary_key=True)

    cliente_id = db.Column(
        db.Integer,
        db.ForeignKey("clientes.id"),
        nullable=False
    )

    nome_plano = db.Column(db.String(255))

    valor_mensal = db.Column(db.Numeric(10, 2))

    dia_cobranca = db.Column(db.Integer)

    status_plano = db.Column(
        db.Enum(
            "ativo",
            "cancelado",
            "suspenso",
            name="status_plano_enum"
        ),
        default="ativo"
    )

    created_at = db.Column(
        db.DateTime,
        nullable=False,
        server_default=db.func.now()
    )

    cliente = db.relationship(
        "Cliente",
        backref=db.backref(
            "planos",
            lazy=True
        )
    )

    def to_dict(self):
        return {
            "id": self.id,
            "cliente_id": self.cliente_id,
            "nome_plano": self.nome_plano,
            "valor_mensal": float(self.valor_mensal) if self.valor_mensal else None,
            "dia_cobranca": self.dia_cobranca,
            "status_plano": self.status_plano,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }


# ========== 6. INTERACOES ==========
class Interacao(db.Model):
    __tablename__ = "interacoes"

    id = db.Column(db.Integer, primary_key=True)

    lead_id = db.Column(
        db.Integer,
        db.ForeignKey("leads_prospeccao.id")
    )

    cliente_id = db.Column(
        db.Integer,
        db.ForeignKey("clientes.id")
    )

    tipo_interacao = db.Column(
        db.Enum(
            "ligacao",
            "email",
            "reuniao",
            "mensagem",
            name="tipo_interacao_enum"
        )
    )

    resumo = db.Column(db.Text)

    data_interacao = db.Column(db.DateTime)

    responsavel = db.Column(db.String(255))

    cliente = db.relationship(
        "Cliente",
        backref=db.backref(
            "interacoes",
            lazy=True
        )
    )

    lead = db.relationship(
        "Lead",
        backref=db.backref(
            "interacoes",
            lazy=True
        )
    )

    def to_dict(self):
        return {
            "id": self.id,
            "lead_id": self.lead_id,
            "cliente_id": self.cliente_id,
            "tipo_interacao": self.tipo_interacao,
            "resumo": self.resumo,
            "data_interacao": self.data_interacao.isoformat() if self.data_interacao else None,
            "responsavel": self.responsavel
        }