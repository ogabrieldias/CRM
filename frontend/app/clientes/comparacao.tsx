"use client";
import { useEffect, useState } from "react";
import api from "../../services/api";
import Navbar from "../../components/Navbar";

// 1. Interface: define os campos da entidade
interface Entidade {
  id: number;
  campo1: string;
  campo2: string;
  campo3: string;
  // ... adicione todos os campos do modelo
}

export default function EntidadePage() {
  // 2. Estados: lista, novo registro e edição
  const [registros, setRegistros] = useState<Entidade[]>([]);
  const [novo, setNovo] = useState<Partial<Entidade>>({});
  const [editando, setEditando] = useState<Entidade | null>(null);

  // 3. Carregar dados ao abrir a página
  useEffect(() => { carregar(); }, []);

  const carregar = () => {
    api.get("/entidade/").then(res => setRegistros(res.data));
  };

  // 4. Criar novo registro
  const criar = () => {
    api.post("/entidade/", novo).then(() => {
      setNovo({});
      carregar();
    });
  };

  // 5. Atualizar registro existente
  const atualizar = () => {
    if (!editando) return;
    api.put(`/entidade/${editando.id}`, editando).then(() => {
      setEditando(null);
      carregar();
    });
  };

  // 6. Deletar registro
  const deletar = (id: number) => {
    api.delete(`/entidade/${id}`).then(() => carregar());
  };

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-6">Entidade</h2>

        {/* 7. Formulário de criação */}
        <div className="card bg-base-200 p-4 mb-6">
          <h3 className="text-xl font-semibold mb-2">Adicionar</h3>
          <div className="grid grid-cols-2 gap-2">
            <input className="input input-bordered" placeholder="Campo1"
              value={novo.campo1 || ""}
              onChange={e => setNovo({ ...novo, campo1: e.target.value })} />
            <input className="input input-bordered" placeholder="Campo2"
              value={novo.campo2 || ""}
              onChange={e => setNovo({ ...novo, campo2: e.target.value })} />
            {/* ... repita para todos os campos */}
            <button className="btn btn-primary col-span-2" onClick={criar}>Salvar</button>
          </div>
        </div>

        {/* 8. Tabela de registros */}
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Campo1</th>
                <th>Campo2</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {registros.map(r => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.campo1}</td>
                  <td>{r.campo2}</td>
                  <td className="flex gap-2">
                    <button className="btn btn-warning btn-xs" onClick={() => setEditando(r)}>Editar</button>
                    <button className="btn btn-error btn-xs" onClick={() => deletar(r.id)}>Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 9. Modal de edição */}
        {editando && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Editar</h3>
              <div className="flex flex-col gap-2 mt-2">
                <input className="input input-bordered" placeholder="Campo1"
                  value={editando.campo1}
                  onChange={e => setEditando({ ...editando, campo1: e.target.value })} />
                <input className="input input-bordered" placeholder="Campo2"
                  value={editando.campo2}
                  onChange={e => setEditando({ ...editando, campo2: e.target.value })} />
                {/* ... repita para todos os campos */}
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

