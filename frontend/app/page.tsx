"use client";
import Navbar from "../components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <main className="p-10">
        <h1 className="text-3xl font-bold mb-6">Bem-vindo ao TechDias CRM</h1>
        <p className="mb-8 text-lg text-gray-600">
          Selecione uma seção abaixo para gerenciar seus dados.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/clientes" className="card bg-base-100 shadow-md hover:shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Clientes</h2>
            <p>Gerencie empresas e contatos convertidos.</p>
          </Link>

          <Link href="/leads" className="card bg-base-100 shadow-md hover:shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Leads</h2>
            <p>Acompanhe prospecções e oportunidades.</p>
          </Link>

          <Link href="/projetos" className="card bg-base-100 shadow-md hover:shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Projetos</h2>
            <p>Controle status, prazos e valores dos projetos.</p>
          </Link>

          <Link href="/pagamentos" className="card bg-base-100 shadow-md hover:shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Pagamentos</h2>
            <p>Gerencie cobranças, vencimentos e status.</p>
          </Link>

          <Link href="/planos" className="card bg-base-100 shadow-md hover:shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Planos Recorrentes</h2>
            <p>Controle assinaturas e faturamento recorrente.</p>
          </Link>

          <Link href="/interacoes" className="card bg-base-100 shadow-md hover:shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Interações</h2>
            <p>Registre contatos e atividades com leads e clientes.</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
