"use client";

import Link from "next/link";
import AuthGuard from "../components/AuthGuard";

export default function Home() {
  return (
    <AuthGuard>
      <main className="p-6">
        <h1 className="text-3xl font-bold mb-2">
          Bem-vindo ao TechDias CRM
        </h1>

        <p className="mb-8">
          Selecione uma seção abaixo para gerenciar seus dados.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* CLIENTES */}
          <Link
            href="/crm/clientes"
            className="card bg-base-100 shadow-md hover:shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold mb-2">
              Clientes
            </h2>

            <p>
              Gerencie empresas e contatos convertidos.
            </p>
          </Link>

          {/* LEADS */}
          <Link
            href="/crm/leads"
            className="card bg-base-100 shadow-md hover:shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold mb-2">
              Leads
            </h2>

            <p>
              Acompanhe prospecções e oportunidades.
            </p>
          </Link>

          {/* PROJETOS */}
          <Link
            href="/crm/projetos"
            className="card bg-base-100 shadow-md hover:shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold mb-2">
              Projetos
            </h2>

            <p>
              Controle status, prazos e valores dos projetos.
            </p>
          </Link>

          {/* PAGAMENTOS */}
          <Link
            href="/crm/pagamentos"
            className="card bg-base-100 shadow-md hover:shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold mb-2">
              Pagamentos
            </h2>

            <p>
              Gerencie cobranças, vencimentos e status.
            </p>
          </Link>

          {/* PLANOS */}
          <Link
            href="/crm/planos"
            className="card bg-base-100 shadow-md hover:shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold mb-2">
              Planos Recorrentes
            </h2>

            <p>
              Controle assinaturas e faturamento recorrente.
            </p>
          </Link>

          {/* INTERAÇÕES */}
          <Link
            href="/crm/interacoes"
            className="card bg-base-100 shadow-md hover:shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold mb-2">
              Interações
            </h2>

            <p>
              Registre contatos e atividades com leads e clientes.
            </p>
          </Link>

          {/* SCRIPTS */}
          <Link
            href="/crm/script"
            className="card bg-base-100 shadow-md hover:shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold mb-2">
              Scripts de CRM
            </h2>

            <p>
              Copie e utilize scripts prontos de alta conversão.
            </p>
          </Link>

        </div>
      </main>
    </AuthGuard>
  );
}