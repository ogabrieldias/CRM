"use client";
import { useEffect, useState } from "react";
import api from "../../services/api";
import Navbar from "../../components/Navbar";

interface Cliente {
  id: number;
  nome_empresa: string;
  nome_contato: string;
  telefone: string;
  email: string;
  cidade: string;
  status_cliente: string;
  data_conversao: string;
  valor_medio: number;
  created_at: string;
}

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [novo, setNovo] = useState<Partial<Cliente>>({});
  const [editando, setEditando] = useState<Cliente | null>(null);

  useEffect(() => { carregar(); }, []);

  const carregar = () => {
    api.get("/clientes/").then(res => setClientes(res.data));
  };

  const criar = () => {
    api.post("/clientes/", novo).then(() => {
      setNovo({});
      carregar();
    });
  };

  const atualizar = () => {
    if (!editando) return;
    api.put(`/clientes/${editando.id}`, editando).then(() => {
      setEditando(null);
      carregar();
    });
  };

  const deletar = (id: number) => {
    api.delete(`/clientes/${id}`).then(() => carregar());
  };

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-6">Clientes</h2>

        {/* Formulário de criação */}
        <div className="card bg-base-200 p-4 mb-6">
          <h3 className="text-xl font-semibold mb-2">Adicionar Cliente</h3>
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
              value={novo.status_cliente || "ativo"}
              onChange={e => setNovo({ ...novo, status_cliente: e.target.value })}>
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
            </select>
            <input type="date" className="input input-bordered"
              value={novo.data_conversao || ""}
              onChange={e => setNovo({ ...novo, data_conversao: e.target.value })} />
            <input type="number" className="input input-bordered" placeholder="Valor Médio"
              value={novo.valor_medio || ""}
              onChange={e => setNovo({ ...novo, valor_medio: Number(e.target.value) })} />
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
                <th>Conversão</th>
                <th>Valor Médio</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map(c => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.nome_empresa}</td>
                  <td>{c.nome_contato}</td>
                  <td>{c.telefone}</td>
                  <td>{c.email}</td>
                  <td>{c.cidade}</td>
                  <td>{c.status_cliente}</td>
                  <td>{c.data_conversao}</td>
                  <td>{c.valor_medio}</td>
                  <td className="flex gap-2">
                    <button className="btn btn-warning btn-xs" onClick={() => setEditando(c)}>Editar</button>
                    <button className="btn btn-error btn-xs" onClick={() => deletar(c.id)}>Excluir</button>
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
              <h3 className="font-bold text-lg">Editar Cliente</h3>
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
                  value={editando.status_cliente}
                  onChange={e => setEditando({ ...editando, status_cliente: e.target.value })}>
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                </select>
                <input type="date" className="input input-bordered"
                  value={editando.data_conversao || ""}
                  onChange={e => setEditando({ ...editando, data_conversao: e.target.value })} />
                <input type="number" className="input input-bordered"
                  value={editando.valor_medio}
                  onChange={e => setEditando({ ...editando, valor_medio: Number(e.target.value) })} />
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
