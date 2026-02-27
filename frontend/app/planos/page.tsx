"use client";
import { useEffect, useState } from "react";
import api from "../../services/api";
import Navbar from "../../components/Navbar";

interface Plano {
  id: number;
  cliente_id: number;
  nome_plano: string;
  valor_mensal: number;
  status_plano: string;
}

export default function PlanosPage() {
  const [planos, setPlanos] = useState<Plano[]>([]);

  useEffect(() => {
    api.get("/planos/").then(res => setPlanos(res.data));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Planos Recorrentes</h2>
        <table className="table w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Plano</th>
              <th>Valor Mensal</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {planos.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.cliente_id}</td>
                <td>{p.nome_plano}</td>
                <td>{p.valor_mensal}</td>
                <td>{p.status_plano}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
