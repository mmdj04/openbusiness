import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Preciso saber programar para usar?",
    answer:
      "Não. A plataforma é 100% visual. Você cadastra seus serviços, clientes e horários pelo painel. Se precisar de ajuda, nosso suporte faz tudo para você.",
  },
  {
    question: "Posso cancelar a qualquer momento?",
    answer:
      "Sim. Não há fidelidade. Você pode cancelar sua assinatura a qualquer momento pelo painel de configurações.",
  },
  {
    question: "Meus dados estão seguros?",
    answer:
      "Sim. Todos os dados são criptografados e armazenados em servidores seguros com backup automático. Seguimos as melhores práticas de segurança da informação.",
  },
  {
    question: "Funciona no celular?",
    answer:
      "Sim. A plataforma é responsiva e funciona perfeitamente em qualquer dispositivo. Planos Profissional e Completo incluem app mobile nativo.",
  },
  {
    question: "Posso adicionar mais módulos depois?",
    answer:
      "Sim. Você pode upgrade do plano a qualquer momento e novos módulos serão ativados imediatamente.",
  },
  {
    question: "Tem limite de clientes ou agendamentos?",
    answer:
      "Não há limite de clientes cadastrados. O limite é apenas no número de módulos ativos e usuários do sistema, de acordo com o plano escolhido.",
  },
  {
    question: "Vocês oferecem migração de dados?",
    answer:
      "Sim. Nossa equipe ajuda a migrar seus dados de outros sistemas sem custo adicional nos planos Profissional e Completo.",
  },
  {
    question: "Como funciona o suporte?",
    answer:
      "Todos os planos incluem suporte. Básico: por email. Profissional: prioritário. Completo: 24/7 por chat, email e telefone.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="bg-muted/30 border-y py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">
            Perguntas frequentes
          </Badge>
          <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
            Tire suas dúvidas
          </h2>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <Accordion className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-lg border px-5"
              >
                <AccordionTrigger className="text-foreground py-4 text-left text-sm font-medium hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 text-sm leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
