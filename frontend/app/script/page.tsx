"use client";

import { useState } from "react";
import { Copy } from "lucide-react";
import Navbar from "../../components/Navbar";

export default function ScriptsCRM() {
  const [copiado, setCopiado] = useState("");
  const [aberto, setAberto] = useState(null);

  const copiar = (texto, id) => {
    navigator.clipboard.writeText(texto);
    setCopiado(id);
    setTimeout(() => setCopiado(""), 2000);
  };

  const data = [
    {
      titulo: "Script de Abordagem",
      scripts: [
        {
          nome: "Cliente que tem site",
          variacoes: [
            {
              titulo: "Otimização | Conversão",
              texto: `Olá [Nome], tudo bem?\n
Estava analisando sua presença online e vi que sua empresa já possui site, o que é ótimo. Porém, muitos negócios enfrentam um problema silencioso: ter visitantes, mas não ter conversões.\n
Páginas lentas, pouco estratégicas ou sem foco em ação fazem com que potenciais clientes entrem, mas saiam sem comprar ou entrar em contato — e isso significa oportunidades sendo perdidas diariamente.\n
Meu trabalho é transformar páginas comuns em páginas que realmente geram resultado, com estrutura estratégica, foco em conversão e experiência que conduz o visitante até a decisão.\n
Se fizer sentido pra você, posso analisar sua página atual e te mostrar pontos simples que já podem aumentar seus resultados.
Posso te enviar essa análise rápida?`
            },
            {
              titulo: "Perda Silenciosa de Clientes",
              texto: `Olá [Nome], tudo bem?\n
Muitos empresários acreditam que a falta de clientes está ligada ao mercado, quando na verdade o problema costuma estar na presença digital.\n
Se sua página não conduz o visitante até uma ação clara, você pode estar perdendo pessoas interessadas todos os dias sem perceber.\n
Meu trabalho é estruturar páginas que direcionam o visitante para contato e compra, transformando acesso em resultado real.\n
Posso te mostrar rapidamente alguns pontos que podem estar limitando suas conversões?`
            },
            {
              titulo: "Agressivo (vendas)",
              texto: "Você pode estar perdendo clientes todos os dias por falhas no seu site..."
            },
            {
              titulo: "Curto (WhatsApp)",
              texto: "Vi seu site e tenho uma ideia rápida pra aumentar seus resultados. Posso te mostrar?"
            },
            {
              titulo: "Personalizado",
              texto: "Notei que sua empresa atua com [segmento] e seu site poderia converter muito mais..."
            },
          ],
        },
        {
          nome: "Cliente que não tem site",
          texto: "Olá! Percebi que sua empresa ainda não possui site...",
        },
        {
          nome: "SEQUÊNCIA COMPLETA DE FOLLOW-UP",
          texto: "Dia 1: mensagem inicial...\nDia 2: reforço...\nDia 3: urgência...",
        },
        {
          nome: "SCRIPT DE ÁUDIO WHATSAPP",
          texto: "Fala, tudo bem? Passei aqui rapidinho porque vi uma oportunidade...",
        },
        {
          nome: "SCRIPTS PARA RESPONDER OBJEÇÕES",
          texto: "Entendo perfeitamente, muitos clientes pensavam assim antes de ver os resultados...",
        },
      ],
    },
    {
      titulo: "Reunião de Venda",
      scripts: [
        {
          nome: "Fechamento Apenas",
          texto: "Baseado no que você me falou, essa é a melhor solução para você...",
        },
      ],
    },
    {
      titulo: "Fidelização de Cliente",
      scripts: [
        {
          nome: "Fidelização apenas",
          texto: "Quero te mostrar como podemos continuar evoluindo seus resultados...",
        },
      ],
    },
    {
      titulo: "Venda Mensal",
      scripts: [
        {
          nome: "Venda mensal apenas",
          texto: "Com um plano mensal você garante consistência e crescimento contínuo...",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <div className="p-6 space-y-8">
        
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold">Scripts de CRM</h1>
          <p className="text-base-content/60">
            Scripts prontos para abordagem, vendas e fidelização
          </p>
        </div>

        {/* GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {data.map((grupo, index) => (
            <div
              key={index}
              className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-lg transition"
            >
              <div className="card-body p-5">

                <h2 className="card-title text-lg">
                  {grupo.titulo}
                </h2>

                <div className="divider my-2"></div>

                <div className="space-y-2">

                  {grupo.scripts.map((item, i) => {
                    const id = `${grupo.titulo}-${i}`;

                    return (
                      <div
                        key={i}
                        className={`collapse collapse-arrow bg-base-200/60 rounded-box ${
                          aberto === id ? "collapse-open" : "collapse-close"
                        }`}
                      >
                        {/* HEADER */}
                        <div
                          className="collapse-title text-sm font-medium cursor-pointer"
                          onClick={() =>
                            setAberto(aberto === id ? null : id)
                          }
                        >
                          {item.nome}
                        </div>

                        {/* CONTEÚDO */}
                        <div className="collapse-content space-y-3">

                          {/* SE TIVER VARIAÇÕES */}
                          {item.variacoes ? (
                            item.variacoes.map((varItem, vIndex) => {
                              const subId = `${id}-${vIndex}`;

                              return (
                                <div
                                  key={vIndex}
                                  className="collapse collapse-arrow bg-base-100 border border-base-200 rounded-box"
                                >
                                  <input type="checkbox" />

                                  <div className="collapse-title text-xs font-semibold text-primary">
                                    {varItem.titulo}
                                  </div>

                                  <div className="collapse-content space-y-2">

                                    <p className="text-sm whitespace-pre-line text-base-content/80">
                                      {varItem.texto}
                                    </p>

                                    <button
                                      onClick={() =>
                                        copiar(varItem.texto, subId)
                                      }
                                      className="btn btn-xs btn-primary flex items-center gap-2"
                                    >
                                      <Copy size={14} />
                                      {copiado === subId
                                        ? "Copiado!"
                                        : "Copiar"}
                                    </button>

                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <>
                              <p className="text-sm whitespace-pre-line text-base-content/80">
                                {item.texto}
                              </p>

                              <button
                                onClick={() => copiar(item.texto, id)}
                                className="btn btn-xs btn-primary flex items-center gap-2"
                              >
                                <Copy size={14} />
                                {copiado === id
                                  ? "Copiado!"
                                  : "Prompt para copiar 01"}
                              </button>
                            </>
                          )}

                        </div>
                      </div>
                    );
                  })}

                </div>

                {/* COPIAR TUDO */}
                <div className="card-actions justify-end mt-4">
                  <button
                    onClick={() =>
                      copiar(
                        grupo.scripts
                          .map((s) =>
                            s.variacoes
                              ? s.variacoes.map((v) => v.texto).join("\n\n")
                              : s.texto
                          )
                          .join("\n\n"),
                        grupo.titulo
                      )
                    }
                    className="btn btn-sm btn-outline flex items-center gap-2"
                  >
                    <Copy size={16} />
                    Copiar Tudo
                  </button>
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}