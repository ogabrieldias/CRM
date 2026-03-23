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
              titulo: "Concorrência Capturando seus Clientes",
              texto:  `Olá [Nome],\n
Uma coisa que observo bastante é empresas excelentes sendo ultrapassadas por concorrentes apenas por terem uma presença digital mais estratégica.\n
Hoje, quem comunica melhor online acaba sendo escolhido primeiro, mesmo não sendo o melhor.\n
Eu ajudo negócios a corrigirem isso com páginas pensadas para posicionamento, autoridade e conversão.\n
Se quiser, posso te mostrar como sua empresa poderia se destacar digitalmente.`
            },
            {
              titulo: "Visitantes Frios sem Confiança",
              texto: `Olá [Nome], tudo bem?\n
Quando alguém encontra sua empresa online, os primeiros segundos definem se essa pessoa vai confiar ou sair.\n
Design, clareza e estrutura fazem toda diferença nessa decisão.\n
Eu desenvolvo páginas que passam profissionalismo imediato e conduzem o visitante até o contato.\n
Posso te mostrar algumas ideias aplicáveis ao seu negócio?`
            },
            {
              titulo: "Falta de Previsibilidade de Vendas",
              texto: `Olá [Nome],\n
Depender apenas de indicação ou redes sociais gera um problema comum: falta de previsibilidade de clientes.\n
Uma página estratégica funciona como um canal constante de geração de oportunidades.\n
Esse é exatamente o tipo de estrutura que eu implemento para negócios locais e prestadores de serviço.\n
Se fizer sentido, posso te mostrar como isso funcionaria para sua empresa.`
            },
            {
              titulo: "Negócio Bom Mal Apresentado",
              texto: `Olá [Nome], tudo bem?\n
Muitos negócios oferecem serviços excelentes, mas acabam não transmitindo isso online.\n
Quando a apresentação não acompanha a qualidade, o cliente não percebe o valor.\n
Meu trabalho é alinhar imagem digital com a qualidade real da empresa, criando páginas que valorizam o negócio e geram contato.\n
Quer ver como poderíamos aplicar isso no seu caso?`
            }  
          ],
        }, //FIM DE CLIENTE QUE TEM SITE
        
        {
          nome: "Cliente que não tem site",
          variacoes: [
            {
              titulo: "Invisibilidade Digital",
              texto: `Olá [Nome], tudo bem?\n
Hoje, quando alguém precisa de um serviço ou produto, a primeira atitude é pesquisar na internet. Empresas que não possuem uma página profissional acabam dependendo apenas de indicação ou redes sociais, limitando muito o crescimento.\n
Isso faz com que potenciais clientes procurem soluções como a sua, mas encontrem concorrentes primeiro.\n
Eu desenvolvo páginas modernas e estratégicas que funcionam como um vendedor digital 24h, apresentando sua empresa, gerando confiança e transformando visitantes em contatos e vendas.\n
Se quiser, posso te mostrar exemplos e ideias de como sua empresa poderia ter uma presença digital forte e começar a gerar oportunidades online.\n
Quer que eu te mostre algumas possibilidades?`
            },
            {
              titulo: "Perda de Oportunidades",
              texto: `Olá [Nome], tudo bem?\n
Muitos clientes hoje começam a busca por soluções no Google. Se sua empresa não aparece lá, quem ganha é o concorrente.\n
Um site profissional funciona como vitrine aberta 24h, mostrando seus serviços e captando contatos.\n
Gostaria que eu te mostrasse como sua empresa pode começar a aparecer e atrair clientes online?`
            },
            {
              titulo: "Autoridade e confiança",
              texto: `Oi [Nome], tudo certo?\n
Ter um site não é apenas estar visível, é transmitir credibilidade.\n
Quando alguém pesquisa e encontra sua empresa com uma página bem estruturada, a confiança aumenta e a chance de fechar negócio também.\n
Posso te mostrar modelos de sites que transformam visitantes em clientes. Quer ver alguns exemplos?`
            },
            {
              titulo: "Diferenciação da concorrência",
              texto: `Olá [Nome], como vai?\n
Hoje, quem não tem site acaba ficando limitado às redes sociais, que são ótimas, mas não substituem uma página própria.\n
Um site coloca sua empresa em outro patamar, destacando seus diferenciais e mostrando profissionalismo.\n
Gostaria que eu te apresentasse ideias de como sua empresa pode se destacar online?`
            },
            {
              titulo: "Vendas automáticas",
              texto: `Oi [Nome], tudo bem?\n
Imagine ter um vendedor que trabalha 24h por dia, sem pausa, apresentando sua empresa e gerando contatos.\n
É exatamente isso que um site bem feito faz: transforma visitantes em oportunidades de negócio.\n
Posso te mostrar como isso funcionaria para sua empresa?`
            },
            {
              titulo: "Crescimento sustentável",
              texto: `Olá [Nome], tudo certo?\n
Sem um site, sua empresa depende apenas de indicações e redes sociais, o que limita muito o crescimento.\n
Com uma página própria, você constrói uma base sólida de presença digital e abre portas para novos clientes todos os dias.\n
Quer que eu te mostre como começar esse processo de forma simples e estratégica?`
            },
          ],             
        }, //FIM DE CLIENTE QUE NÃO TEM SITE
        {
          nome: "Script de Follow-Up",
          variacoes: [
            {
              titulo: "Dia 2 — Primeiro lembrete leve",
              subvariacoes: [
                {
                  titulo: "Confirmação simples",
                  texto: `Oi [Nome], tudo bem? Só passando pra confirmar se conseguiu ver minha mensagem anterior.`
                },
                {
                  titulo: "Follow-up educado",
                  texto: `Olá [Nome], espero que esteja tendo uma boa semana! Queria saber se chegou a dar uma olhada na ideia que compartilhei.`
                },
                {
                  titulo: "Rotina corrida",
                  texto: `Oi [Nome], sei que a rotina é corrida, mas queria reforçar que posso te mostrar como sua empresa pode ganhar visibilidade online.`
                },
                {
                  titulo: "Curiosidade estratégica",
                  texto: `Olá [Nome], você já pensou em como seria ter um site que trabalha por você 24h? Posso te mostrar exemplos rápidos.`
                },
                {
                  titulo: "Reforço direto",
                  texto: `Oi [Nome], só pra não deixar passar: minha proposta é simples e pode gerar resultados reais. Quer que eu te mostre?`
                }
              ]
            },
            {
              titulo: "Dia 4 — Reforço com valor",
              subvariacoes: [
                {
                  titulo: "Dor + solução",
                  texto: `Olá [Nome], sei que o dia a dia é puxado, mas ter uma presença digital pode facilitar muito a conquista de novos clientes.`
                },
                {
                  titulo: "Visualização de resultado",
                  texto: `Oi [Nome], imagine sua empresa aparecendo no Google e sendo encontrada por quem procura exatamente o que você oferece.`
                },
                {
                  titulo: "Prova social",
                  texto: `Olá [Nome], muitas empresas que não tinham site conseguiram aumentar vendas depois de investir em uma página estratégica.`
                },
                {
                  titulo: "Reforço leve",
                  texto: `Oi [Nome], só reforçando: minha ideia é mostrar possibilidades simples, sem complicação, que podem trazer resultado.`
                },
                {
                  titulo: "Oferta de exemplos",
                  texto: `Olá [Nome], se quiser, posso te enviar alguns exemplos de sites que transformaram negócios parecidos com o seu.`
                }
              ]
            },
            {
              titulo: "Dia 7 — Último contato elegante",
              subvariacoes: [
                {
                  titulo: "Saída respeitosa",
                  texto: `Olá [Nome], essa é minha última mensagem pra não incomodar. Se em algum momento quiser melhorar sua presença digital, estarei à disposição.`
                },
                {
                  titulo: "Encerramento sem pressão",
                  texto: `Oi [Nome], não quero ser insistente, então encerro por aqui. Mas se quiser conversar sobre como ter um site estratégico, pode me chamar.`
                },
                {
                  titulo: "Abertura futura",
                  texto: `Olá [Nome], deixo aqui meu contato caso queira dar o próximo passo no futuro. Vai ser um prazer ajudar sua empresa a crescer online.`
                },
                {
                  titulo: "Timing respeitado",
                  texto: `Oi [Nome], sei que talvez não seja o momento, mas quando quiser explorar como um site pode gerar oportunidades, estarei pronto pra ajudar.`
                },
                {
                  titulo: "Agradecimento final",
                  texto: `Olá [Nome], agradeço por ter lido minhas mensagens. Se decidir investir em presença digital, pode contar comigo.`
                }
              ]
            }
          ]
        }, // FIM DE SEQUÊNCIA DE FOLLOW UP
        {
          nome: "Script de Áudio",
          variacoes: [
            {
              titulo: "Lead que não tem site",
              texto: `Oi [Nome], tudo bem? Hoje todo mundo procura no Google antes de contratar. Se sua empresa não tem site, acaba ficando invisível.\n
Eu crio páginas simples e estratégicas que funcionam como vitrine 24h. Vamos fechar isso e colocar sua empresa no mapa digital?`
            },  
            {
              titulo: "Lead que tem site",
              texto: `Fala [Nome], vi que você já tem um site, mas muitos negócios perdem clientes porque a página não converte.\n
Eu ajusto sites para gerar confiança e resultado real. Se quiser, podemos fechar esse projeto e já começar a aumentar suas vendas.`
            }
          ],
        }, //FIM DE SCRIPT DE ÁUDIO
        {
          nome: "Script de Objeções",
          variacoes: [
            {
              titulo: "💰 Sem dinheiro agora",
              texto: `Super entendo, [Nome].\n
Na verdade, muitos clientes começam justamente para aumentar entrada de oportunidades e melhorar faturamento.\n
Se quiser, posso te mostrar opções simples e acessíveis que já geram resultado.`
            },  
            {
              titulo: "⏳ Depois vejo isso",
              texto: `Perfeito 🙂\n
Só te deixo uma reflexão: quanto antes sua estrutura digital estiver trabalhando por você, antes começam os resultados.\n
Quando quiser retomar, me chama.`
            },
            {
              titulo: "📱 Só uso Instagram",
              texto: `Instagram é excelente para alcance 🙂\n
Mas a página funciona como base profissional onde o cliente entende, confia e toma decisão.\m
Os dois juntos geram muito mais resultado.\n
Se quiser, te explico melhor.`
            },
            {
              titulo: "🤝 Já tenho alguém que faz",
              texto: `Perfeito, isso é ótimo 🙂\n
Minha ideia nem é substituir, mas somar com uma visão estratégica focada em conversão.\n
Se quiser trocar uma ideia e comparar abordagens, estou à disposição.`
            },
            {
              titulo: "❓ Como funciona?",
              texto: `Funciona de forma simples:\n
Marcamos uma call → Entendo seu negócio → estruturo a página → publico → você começa a usar.\n
Posso te explicar com mais detalhes se quiser 🙂`
            },
          ],
        }, //FIM DE OBJEÇÕES
      ],
    },
    {
      titulo: "Reunião de Venda",
      scripts: [
        {
          nome: "Quebra-gelo",
          texto: `- Pergunte sobre o negócio
- Demonstre interesse real\n
 “Quero entender primeiro como vocês trabalham hoje."`
        },
        {
          nome: "Diagnóstico",
          texto: `- Como chegam clientes hoje?
- Qual maior dificuldade?
- O que gostaria de melhorar?
- Já tentou algo digital?\n
Cliente vende sozinho nessa etapa.`
        },
        {
          nome: "Amplificação da dor",
          texto: `“Então hoje você depende de X e isso limita Y, certo?”\n
Ele confirma → cria consciência.`
        },
        {
          nome: "Apresentação da solução",
          texto: `“O que implemento é uma estrutura digital que…”\n
- Apresenta
- Gera confiança
- Facilita contato
- Aumenta conversão`
        },
        {
          nome: "Visão futura",
          texto: `“Imagina o cliente encontrando sua empresa, entendendo rápido e entrando em contato na hora.”\n
Cliente visualiza → gatilho forte.`
        },
        {
          nome: "Fechamento leve",
          texto: `“Faz sentido implementar isso no seu negócio agora?”\n
Se sim → proposta
Se dúvida → tratar objeção`
        },
      ],
    },
    {
      titulo: "Fidelização de Cliente",
      scripts: [
        {
          nome: "Acompanhamento pós-entrega",
          texto: `“Oi [Nome], tudo bem? Queria saber como está sendo a experiência com o site até agora.\n
É importante pra mim garantir que você esteja tendo resultado e que o site esteja ajudando sua empresa a crescer.\n
Se tiver qualquer ajuste ou ideia nova, pode contar comigo.`
        },
        {
          nome: "Reforço de valor",
          texto: `Olá [Nome], só passando pra lembrar que o site é uma ferramenta viva.\n
Pequenas atualizações podem manter sua página sempre relevante e atrativa.\n
Se quiser, posso sugerir melhorias simples que podem aumentar ainda mais seus resultados.`
        },
        {
          nome: "Oferta de benefício exclusivo",
          texto: `“Oi [Nome], como cliente, você tem prioridade em novas soluções que estou oferecendo.\n
Posso te mostrar algumas estratégias extras que podem complementar o site e gerar ainda mais oportunidades`
        },
        {
          nome: "Check-in de relacionamento",
          texto: `Olá [Nome], tudo certo? Gosto de acompanhar de perto os clientes que confiam no meu trabalho.\n
Me conta: como o site tem ajudado no dia a dia da empresa? Se tiver algo que possamos melhorar, estou à disposição.`
        },
        {
          nome: "Convite para evolução",
          texto: `Oi [Nome], seu site já está rodando bem, mas sempre dá pra evoluir.\n
Podemos pensar juntos em novas páginas, campanhas ou integrações que tragam ainda mais resultado.\n
Quer que eu te mostre algumas ideias?`
        }
      ],
    },
    {
      titulo: "Venda Mensal",
      scripts: [
        {
          nome: "Mensal Plus",
          texto: `Oi [Nome], tudo bem?\n
Além do desenvolvimento, ofereço um plano mensal básico pra manter seu site seguro e atualizado.\n
É um valor acessível e garante que sua página nunca fique parada. Quer que eu te mostre como funciona?`
        },
        {
          nome: "Mensal Pro",
          texto: `Fala [Nome], além da criação do site, tenho um plano mensal premium que garante evolução contínua.\n
Inclui otimização de copy, novos conteúdos e suporte prioritário.\n
É como ter alguém cuidando do seu site todo mês pra gerar mais clientes. Quer que eu te explique melhor?`
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

      {/* GRID DE CARDS */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

        {data.map((grupo, index) => (
          <div
            key={index}
            className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-lg transition"
          >
            <div className="card-body p-5">

              {/* Título do grupo */}
              <h2 className="card-title text-lg">{grupo.titulo}</h2>
              <div className="divider my-2"></div>

              <div className="space-y-2">

                {/* Percorre os scripts dentro do grupo */}
                {grupo.scripts.map((item, i) => {
                  const id = `${grupo.titulo}-${i}`;

                  return (
                    <div
                      key={i}
                      className={`collapse collapse-arrow bg-base-200/60 rounded-box ${
                        aberto === id ? "collapse-open" : "collapse-close"
                      }`}
                    >
                      {/* Cabeçalho do acordeon */}
                      <div
                        className="collapse-title text-sm font-medium cursor-pointer"
                        onClick={() => setAberto(aberto === id ? null : id)}
                      >
                        {item.nome}
                      </div>

                      {/* Conteúdo do acordeon */}
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

                                  {/* SE TIVER SUBVARIAÇÕES */}
                                  {varItem.subvariacoes ? (
                                    varItem.subvariacoes.map((sub, sIndex) => (
                                      <div
                                        key={sIndex}
                                        className="collapse collapse-arrow bg-base-100 border border-base-200 rounded-box"
                                      >
                                        <input type="checkbox" />
                                        <div className="collapse-title text-xs font-semibold text-secondary">
                                          {sub.titulo}
                                        </div>
                                        <div className="collapse-content space-y-2">
                                          <p className="text-sm whitespace-pre-line text-base-content/80">
                                            {sub.texto}
                                          </p>
                                          <button
                                            onClick={() => copiar(sub.texto, `${subId}-${sIndex}`)}
                                            className="btn btn-xs btn-primary flex items-center gap-2"
                                          >
                                            <Copy size={14} />
                                            {copiado === `${subId}-${sIndex}` ? "Copiado!" : "Copiar"}
                                          </button>
                                        </div>
                                      </div>
                                    ))
                                  ) : (
                                    <>
                                      <p className="text-sm whitespace-pre-line text-base-content/80">
                                        {varItem.texto}
                                      </p>
                                      <button
                                        onClick={() => copiar(varItem.texto, subId)}
                                        className="btn btn-xs btn-primary flex items-center gap-2"
                                      >
                                        <Copy size={14} />
                                        {copiado === subId ? "Copiado!" : "Copiar"}
                                      </button>
                                    </>
                                  )}
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
                              {copiado === id ? "Copiado!" : "Copiar"}
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* BOTÃO COPIAR TUDO */}
              <div className="card-actions justify-end mt-4">
                <button
                  onClick={() =>
                    copiar(
                      grupo.scripts
                        .map((s) =>
                          s.variacoes
                            ? s.variacoes
                                .map((v) =>
                                  v.subvariacoes
                                    ? v.subvariacoes.map((sub) => sub.texto).join("\n\n")
                                    : v.texto
                                )
                                .join("\n\n")
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
