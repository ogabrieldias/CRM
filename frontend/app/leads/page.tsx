"use client";
import { useEffect, useState } from "react";
import api from "../../services/api";
import Navbar from "../../components/Navbar";

interface Lead {
  id: number;
  nome_empresa: string;
  nome_contato: string;
  telefone: string;
  email: string;
  cidade: string;
  status_lead: string;
  nivel_interesse: string;
  responsavel: string;
  created_at: string;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [novo, setNovo] = useState<Partial<Lead>>({});
  const [editando, setEditando] = useState<Lead | null>(null);

  useEffect(() => { carregar(); }, []);

  const carregar = () => {
    api.get("/leads/").then(res => setLeads(res.data));
  };

  const criar = () => {
    api.post("/leads/", novo).then(() => {
      setNovo({});
      carregar();
    });
  };

  const atualizar = () => {
    if (!editando) return;
    api.put(`/leads/${editando.id}`, editando).then(() => {
      setEditando(null);
      carregar();
    });
  };

  const deletar = (id: number) => {
    api.delete(`/leads/${id}`).then(() => carregar());
  };

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-6">Leads</h2>

        {/* Formulário de criação */}
        <div className="card bg-base-200 p-4 mb-6">
          <h3 className="text-xl font-semibold mb-2">Adicionar Lead</h3>
          <div className="grid grid-cols-2 gap-2">
            <input className="input input-bordered" placeholder="Empresa"
              value={novo.nome_empresa || ""}
              onChange={e => setNovo({ ...novo, nome_empresa: e.target.value })} />
            <input className="input input-bordered" placeholder="Contato"
              value={novo.nome_contato || ""}
              onChange={e => setNovo({ ...novo, nome_contato: e.target.value })} />
            <input className="input input-bordered" placeholder="Telefone"
              value={novo.telefone || ""}
              onChange={e => setNovo({ ...novo, telefone: e.target.value })} />
            <input className="input input-bordered" placeholder="Email"
              value={novo.email || ""}
              onChange={e => setNovo({ ...novo, email: e.target.value })} />
            <input className="input input-bordered" placeholder="Cidade"
              value={novo.cidade || ""}
              onChange={e => setNovo({ ...novo, cidade: e.target.value })} />
            <select className="select select-bordered"
              value={novo.status_lead || "novo"}
              onChange={e => setNovo({ ...novo, status_lead: e.target.value })}>
              <option value="novo">Novo</option>
              <option value="em andamento">Em andamento</option>
              <option value="perdido">Perdido</option>
              <option value="convertido">Convertido</option>
            </select>
            <select className="select select-bordered"
              value={novo.nivel_interesse || ""}
              onChange={e => setNovo({ ...novo, nivel_interesse: e.target.value })}>
              <option value="">Selecione interesse</option>
              <option value="baixo">Baixo</option>
              <option value="medio">Médio</option>
              <option value="alto">Alto</option>
            </select>
            <input className="input input-bordered" placeholder="Responsável"
              value={novo.responsavel || ""}
              onChange={e => setNovo({ ...novo, responsavel: e.target.value })} />
            <button className="btn btn-primary col-span-2" onClick={criar}>Salvar</button>
          </div>
        </div>

        {/* Tabela */}
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Empresa</th>
                <th>Contato</th>
                <th>Telefone</th>
                <th>Email</th>
                <th>Cidade</th>
                <th>Status</th>
                <th>Interesse</th>
                <th>Responsável</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {leads.map(l => (
                <tr key={l.id}>
                  <td>{l.id}</td>
                  <td>{l.nome_empresa}</td>
                  <td>{l.nome_contato}</td>
                  <td>{l.telefone}</td>
                  <td>{l.email}</td>
                  <td>{l.cidade}</td>
                  <td>{l.status_lead}</td>
                  <td>{l.nivel_interesse}</td>
                  <td>{l.responsavel}</td>
                  <td className="flex gap-2">
                    <button className="btn btn-warning btn-xs"
                      onClick={() => setEditando(l)}>Editar</button>
                    <button className="btn btn-error btn-xs"
                      onClick={() => deletar(l.id)}>Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal de edição */}
        {editando && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Editar Lead</h3>
              <div className="flex flex-col gap-2 mt-2">
                <input className="input input-bordered" placeholder="Empresa"
                  value={editando.nome_empresa}
                  onChange={e => setEditando({ ...editando, nome_empresa: e.target.value })} />
                <input className="input input-bordered" placeholder="Contato"
                  value={editando.nome_contato}
                  onChange={e => setEditando({ ...editando, nome_contato: e.target.value })} />
                <input className="input input-bordered" placeholder="Telefone"
                  value={editando.telefone}
                  onChange={e => setEditando({ ...editando, telefone: e.target.value })} />
                <input className="input input-bordered" placeholder="Email"
                  value={editando.email}
                  onChange={e => setEditando({ ...editando, email: e.target.value })} />
                <input className="input input-bordered" placeholder="Cidade"
                  value={editando.cidade}
                  onChange={e => setEditando({ ...editando, cidade: e.target.value })} />
                <select className="select select-bordered"
                  value={editando.status_lead}
                  onChange={e => setEditando({ ...editando, status_lead: e.target.value })}>
                  <option value="novo">Novo</option>
                  <option value="em andamento">Em andamento</option>
                  <option value="perdido">Perdido</option>
                  <option value="convertido">Convertido</option>
                </select>
                <select className="select select-bordered"
                  value={editando.nivel_interesse}
                  onChange={e => setEditando({ ...editando, nivel_interesse: e.target.value })}>
                  <option value="baixo">Baixo</option>
                  <option value="medio">Médio</option>
                  <option value="alto">Alto</option>
                </select>
                <input className="input input-bordered" placeholder="Responsável"
                  value={editando.responsavel}
                  onChange={e => setEditando({ ...editando, responsavel: e.target.value })} />
              </div>
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
