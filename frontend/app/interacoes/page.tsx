"use client";
import { useEffect, useState } from "react";
import api from "../../services/api";
import Navbar from "../../components/Navbar";

interface Cliente {
  id: number;
  nome_empresa: string;
}

interface Lead {
  id: number;
  nome_empresa: string;
}

interface Interacao {
  id: number;
  tipo_origem: "cliente" | "lead";
  origem_id: number;
  tipo_interacao: string;
  resumo: string;
  data_interacao: string;
}

export default function InteracoesPage() {
  const [interacoes, setInteracoes] = useState<Interacao[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [novo, setNovo] = useState<Partial<Interacao>>({});
  const [editando, setEditando] = useState<Interacao | null>(null);

  useEffect(() => {
    carregarTudo();
  }, []);

  const carregarTudo = () => {
    api.get("/interacoes/").then(res => setInteracoes(res.data));
    api.get("/clientes/").then(res => setClientes(res.data));
    api.get("/leads/").then(res => setLeads(res.data));
  };

  const criar = () => {
    api.post("/interacoes/", novo).then(() => {
      setNovo({});
      carregarTudo();
    });
  };

  const atualizar = () => {
    if (!editando) return;
    api.put(`/interacoes/${editando.id}`, editando).then(() => {
      setEditando(null);
      carregarTudo();
    });
  };

  const deletar = (id: number) => {
    api.delete(`/interacoes/${id}`).then(() => carregarTudo());
  };

  const obterNomeOrigem = (i: Interacao) => {
    if (i.tipo_origem === "cliente") {
      return clientes.find(c => c.id === i.origem_id)?.nome_empresa;
    }
    return leads.find(l => l.id === i.origem_id)?.nome_empresa;
  };

  const listaOrigem = novo.tipo_origem === "cliente" ? clientes : leads;

  return (
    <div>
      <Navbar />
      <div className="p-6">

        <h2 className="text-3xl font-bold mb-6">Interações</h2>

        {/* FORM */}
        <div className="card bg-base-200 p-4 mb-6">
          <h3 className="text-xl font-semibold mb-2">Nova interação</h3>

          <div className="grid grid-cols-2 gap-2">

            {/* Tipo origem */}
            <select
              className="select select-bordered"
              value={novo.tipo_origem || ""}
              onChange={e => setNovo({ ...novo, tipo_origem: e.target.value as any, origem_id: undefined })}
            >
              <option value="">Tipo</option>
              <option value="cliente">Cliente</option>
              <option value="lead">Lead</option>
            </select>

            {/* Seleção dinâmica */}
            <select
              className="select select-bordered"
              value={novo.origem_id || ""}
              onChange={e => setNovo({ ...novo, origem_id: Number(e.target.value) })}
            >
              <option value="">Selecione</option>
              {listaOrigem?.map((o: any) => (
                <option key={o.id} value={o.id}>{o.nome_empresa}</option>
              ))}
            </select>

            <select
              className="select select-bordered"
              value={novo.tipo_interacao || ""}
              onChange={e => setNovo({ ...novo, tipo_interacao: e.target.value })}
            >
              <option value="">Tipo interação</option>
              <option>Ligação</option>
              <option>WhatsApp</option>
              <option>Email</option>
              <option>Reunião</option>
              <option>Follow-up</option>
            </select>

            <input
              type="date"
              className="input input-bordered"
              value={novo.data_interacao || ""}
              onChange={e => setNovo({ ...novo, data_interacao: e.target.value })}
            />

            <textarea
              className="textarea textarea-bordered col-span-2"
              placeholder="Descrição"
              value={novo.resumo || ""}
              onChange={e => setNovo({ ...novo, resumo: e.target.value })}
            />

            <button className="btn btn-primary col-span-2" onClick={criar}>
              Salvar
            </button>

          </div>
        </div>

        {/* TABELA */}
        <table className="table w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Origem</th>
              <th>Tipo</th>
              <th>Data</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {interacoes.map(i => (
              <tr key={i.id}>
                <td>{i.id}</td>
                <td>{i.tipo_origem} - {obterNomeOrigem(i)}</td>
                <td>{i.tipo_interacao}</td>
                <td>{i.data_interacao}</td>
                <td>{i.resumo}</td>
                <td className="flex gap-2">
                  <button className="btn btn-warning btn-xs" onClick={() => setEditando(i)}>Editar</button>
                  <button className="btn btn-error btn-xs" onClick={() => deletar(i.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* MODAL */}
        {editando && (
          <div className="modal modal-open">
            <div className="modal-box">

              <h3 className="font-bold text-lg">Editar</h3>

              <textarea
                className="textarea textarea-bordered w-full mt-2"
                value={editando.resumo}
                onChange={e => setEditando({ ...editando, resumo: e.target.value })}
              />

              <div className="modal-action">
                <button className="btn btn-primary" onClick={atualizar}>Salvar</button>
                <button className="btn" onClick={() => setEditando(null)}>Cancelar</button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}