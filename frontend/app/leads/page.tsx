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
  ramo: string;
  abordado: string; // "Sim" ou "Não"
  site: string;     // "Sim" ou "Não"
  created_at: string;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [novo, setNovo] = useState<Partial<Lead>>({});
  const [editando, setEditando] = useState<Lead | null>(null);
  
  // Função para aplicar máscara no telefone
  const formatarTelefone = (valor?: string | null) => {
    if (!valor) return ""; // se for null/undefined, retorna vazio
    let numeros = valor.replace(/\D/g, "");
    if (!numeros.startsWith("55")) {
      numeros = "55" + numeros;
    }
    numeros = numeros.slice(0, 13);
    if (numeros.length >= 12) {
      return `+55 ${numeros.slice(2, 4)} ${numeros.slice(4, 9)}-${numeros.slice(9, 13)}`;
    }
    return "+55 " + numeros.slice(2);
  };

  // Funções auxiliares para definir cores
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "novo":
        return "badge badge-info";
      case "em andamento":
        return "badge badge-warning";
      case "perdido":
        return "badge badge-error";
      case "convertido":
        return "badge badge-success";
      default:
        return "badge";
    }
  };

  const getInteresseBadgeClass = (nivel: string) => {
    switch (nivel) {
      case "baixo":
        return "badge badge-secondary";
      case "medio":
        return "badge badge-primary";
      case "alto":
        return "badge badge-success";
      default:
        return "badge";
    }
  };

  const carregar = () => {
    api.get("/leads/").then(res => setLeads(res.data));
  };

  useEffect(() => { carregar(); }, []);

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
              onChange={e => setNovo({ ...novo, telefone: formatarTelefone(e.target.value) })} />
            <input className="input input-bordered" placeholder="Email"
              value={novo.email || ""}
              onChange={e => setNovo({ ...novo, email: e.target.value })} />
            <input className="input input-bordered" placeholder="Cidade"
              value={novo.cidade || ""}
              onChange={e => setNovo({ ...novo, cidade: e.target.value })} />
            <input className="input input-bordered" placeholder="Ramo"
              value={novo.ramo || ""}
              onChange={e => setNovo({ ...novo, ramo: e.target.value })} />
            <select className="select select-bordered"
              value={novo.abordado || ""}
              onChange={e => setNovo({ ...novo, abordado: e.target.value })}>
              <option value="" disabled>Abordado?</option>
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
            </select>
            <select className="select select-bordered"
              value={novo.site || ""}
              onChange={e => setNovo({ ...novo, site: e.target.value })}>
              <option value="" disabled>Tem Site?</option>
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
            </select>
            <select className="select select-bordered"
              value={novo.status_lead || "novo"}
              onChange={e => setNovo({ ...novo, status_lead: e.target.value })}>
              <option value="" disabled>Status</option>
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
                <th>Ramo</th>
                <th>Abordado?</th>
                <th>Site?</th>
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
                  <td>{formatarTelefone(l.telefone)}</td>
                  <td>{l.email}</td>
                  <td>{l.cidade}</td>
                  <td>{l.ramo}</td>
                  <td>{l.abordado}</td>
                  <td>{l.site}</td>
                  <td>
                    <span className={getStatusBadgeClass(l.status_lead)}>
                      {l.status_lead.charAt(0).toUpperCase() + l.status_lead.slice(1)}
                    </span>
                  </td>
                  <td>
                    <span className={getInteresseBadgeClass(l.nivel_interesse)}>
                      {l.nivel_interesse.charAt(0).toUpperCase() + l.nivel_interesse.slice(1)}
                    </span>
                  </td>
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
                <fieldset className="border p-2 rounded">
                  <legend className="text-sm">Empresa</legend>
                  <input className="input input-bordered" placeholder="Empresa"
                  value={editando.nome_empresa}
                  onChange={e => setEditando({ ...editando, nome_empresa: e.target.value })} />
                </fieldset>
                <fieldset className="border p-2 rounded">
                  <legend className="text-sm">Contato</legend>
                  <input className="input input-bordered" placeholder="Contato"
                  value={editando.nome_contato}
                  onChange={e => setEditando({ ...editando, nome_contato: e.target.value })} />
                </fieldset>
                <fieldset className="border p-2 rounded">
                  <legend className="text-sm">Telefone</legend>
                  <input className="input input-bordered" placeholder="Telefone"
                  value={editando.telefone}
                  onChange={e => setEditando({ ...editando, telefone: formatarTelefone(e.target.value) })} />
                </fieldset>
                <fieldset className="border p-2 rounded">
                  <legend className="text-sm">E-mail</legend>
                  <input className="input input-bordered" placeholder="Email"
                  value={editando.email}
                  onChange={e => setEditando({ ...editando, email: e.target.value })} />
                </fieldset>
                <fieldset className="border p-2 rounded">
                  <legend className="text-sm">Cidade</legend>
                  <input className="input input-bordered" placeholder="Cidade"
                  value={editando.cidade}
                  onChange={e => setEditando({ ...editando, cidade: e.target.value })} />                
                </fieldset>
                <fieldset className="border p-2 rounded">
                  <legend className="text-sm">Ramo</legend>
                  <input className="input input-bordered" placeholder="Ramo"
                  value={editando.ramo}
                  onChange={e => setEditando({ ...editando, ramo: e.target.value })} />
                </fieldset>
                <fieldset className="border p-2 rounded">
                  <legend className="text-sm">Abordado?</legend>
                  <select className="select select-bordered w-full"
                    value={editando.abordado}
                    onChange={e => setEditando({ ...editando, abordado: e.target.value })}>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                  </select>
                </fieldset>
                <fieldset className="border p-2 rounded">
                  <legend className="text-sm">Tem Site?</legend>
                  <select className="select select-bordered w-full"
                    value={editando.site}
                    onChange={e => setEditando({ ...editando, site: e.target.value })}>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                  </select>
                </fieldset>
                <fieldset className="border p-2 rounded">
                  <legend className="text-sm">Status Lead</legend>
                  <div className="flex items-center gap-2">
                    <select className="select select-bordered flex-1"
                      value={editando.status_lead}
                      onChange={e => setEditando({ ...editando, status_lead: e.target.value })}>
                      <option value="novo">Novo</option>
                      <option value="em andamento">Em andamento</option>
                      <option value="perdido">Perdido</option>
                      <option value="convertido">Convertido</option>
                    </select>
                    <span className={getStatusBadgeClass(editando.status_lead)}>
                      {editando.status_lead.charAt(0).toUpperCase() + editando.status_lead.slice(1)}
                    </span>
                  </div>
                </fieldset>
                <fieldset className="border p-2 rounded">
                  <legend className="text-sm">Nível de Interesse</legend>
                  <div className="flex items-center gap-2">
                    <select className="select select-bordered flex-1"
                      value={editando.nivel_interesse}
                      onChange={e => setEditando({ ...editando, nivel_interesse: e.target.value })}>
                      <option value="baixo">Baixo</option>
                      <option value="medio">Médio</option>
                      <option value="alto">Alto</option>
                    </select>
                    <span className={getInteresseBadgeClass(editando.nivel_interesse)}>
                      {editando.nivel_interesse.charAt(0).toUpperCase() + editando.nivel_interesse.slice(1)}
                    </span>
                  </div>
                </fieldset>               
                <fieldset className="border p-2 rounded">
                  <legend className="text-sm">Responsável</legend>
                <input className="input input-bordered" placeholder="Responsável"
                  value={editando.responsavel}
                  onChange={e => setEditando({ ...editando, responsavel: e.target.value })} />
                </fieldset>
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
