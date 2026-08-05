import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Clinico",
    price: "297",
    description: "Tudo que sua clínica precisa para começar",
    features: [
      "Agenda inteligente com lembretes",
      "CRM e gestão de clientes",
      "Financeiro completo",
      "Relatórios básicos",
      "Backup automático",
      "Suporte técnico incluso",
    ],
    popular: false,
  },
  {
    name: "Clinico Plus",
    price: "497",
    description: "Automação e inteligência para crescer mais",
    features: [
      "Tudo do plano Clinico",
      "WhatsApp automatizado",
      "IA no prontuário",
      "Teleconsulta",
    ],
    popular: true,
  },
  {
    name: "Multi-Profissional",
    price: "797",
    description: "Para clínicas com múltiplos profissionais e convênios",
    features: [
      "Tudo do plano Clinico Plus",
      "Multi-profissional",
      "Convênios",
      "Portal do paciente",
      "Prioridade no suporte",
    ],
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-muted/30 border-y py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">
            Planos e preços
          </Badge>
          <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
            Menos faltas, mais clientes, mais lucro
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Um plano que resolve problemas reais do seu negócio. Cancele quando
            quiser.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col overflow-visible ${
                plan.popular
                  ? "border-primary ring-primary/20 shadow-lg ring-1"
                  : ""
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                  Mais popular
                </Badge>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-muted-foreground text-sm">R$</span>
                    <span className="text-foreground text-4xl font-bold">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground text-sm">/mês</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="text-primary mt-0.5 size-4 shrink-0" />
                      <span className="text-muted-foreground text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Link href="/configuracoes-plano" className="w-full">
                  <Button className="w-full" size="lg">
                    Começar agora
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <p className="text-muted-foreground mt-8 text-center text-sm">
          Precisa de algo personalizado?{" "}
          <a
            href="#contact"
            className="text-primary underline-offset-4 hover:underline"
          >
            Fale conosco
          </a>{" "}
          para um plano sob medida.
        </p>
      </div>
    </section>
  );
}
