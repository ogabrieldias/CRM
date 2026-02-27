import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar bg-base-200 px-4">
      <div className="flex-1">
        <h1 className="text-xl font-bold">TechDias CRM</h1>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><Link href="/clientes">Clientes</Link></li>
          <li><Link href="/leads">Leads</Link></li>
          <li><Link href="/projetos">Projetos</Link></li>
          <li><Link href="/pagamentos">Pagamentos</Link></li>
          <li><Link href="/planos">Planos</Link></li>
          <li><Link href="/interacoes">Interações</Link></li>
        </ul>
      </div>
    </div>
  );
}
