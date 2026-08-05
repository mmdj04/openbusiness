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
import { Check } from "lucide-react";

const plans = [
  {
    name: "Básico",
    description: "Para quem está começando",
    price: "R$ 397",
    period: "/mês",
    highlight: false,
    features: [
      "Até 3 módulos",
      "1 usuário",
      "Suporte por email",
      "Backup semanal",
      "Relatórios básicos",
    ],
    cta: "Começar agora",
  },
  {
    name: "Profissional",
    description: "Para negócios em crescimento",
    price: "R$ 597",
    period: "/mês",
    highlight: true,
    badge: "Mais popular",
    features: [
      "Até 6 módulos",
      "5 usuários",
      "Suporte prioritário",
      "Backup diário",
      "Relatórios avançados",
      "WhatsApp integrado",
      "App mobile",
    ],
    cta: "Começar agora",
  },
  {
    name: "Completo",
    description: "Para quem quer tudo",
    price: "R$ 897",
    period: "/mês",
    highlight: false,
    features: [
      "Todos os módulos",
      "Usuários ilimitados",
      "Suporte 24/7",
      "Backup em tempo real",
      "Relatórios personalizados",
      "WhatsApp integrado",
      "App mobile",
      "Multi-unidades",
      "API personalizada",
    ],
    cta: "Começar agora",
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
            Invista na gestão do seu negócio
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Planos simples, sem surpresas. Cancele quando quiser.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col ${
                plan.highlight
                  ? "border-primary ring-primary/20 mt-4 overflow-visible shadow-lg ring-1"
                  : ""
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
                  <Badge className="px-3">{plan.badge}</Badge>
                </div>
              )}

              <CardHeader className="text-center">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-foreground text-4xl font-bold">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">{plan.period}</span>
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
                <Button
                  className="w-full"
                  variant={plan.highlight ? "default" : "outline"}
                  size="lg"
                >
                  {plan.cta}
                </Button>
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
