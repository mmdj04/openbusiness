import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Settings, Rocket, HeadphonesIcon } from "lucide-react";

const steps = [
  {
    icon: Settings,
    title: "Escolha seu sistema",
    description:
      "Selecione o segmento do seu negócio. Cada sistema já vem com os módulos ideais para o seu dia a dia.",
    number: "01",
  },
  {
    icon: Rocket,
    title: "Configure e ative",
    description:
      "Personalize com sua marca, cadastre seus serviços e comece a usar em menos de 24 horas.",
    number: "02",
  },
  {
    icon: HeadphonesIcon,
    title: "Conte com nosso suporte",
    description:
      "Suporte técnico incluso em todos os planos. Estamos aqui para ajudar quando precisar.",
    number: "03",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-muted/30 border-y py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">
            Como funciona
          </Badge>
          <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
            Simples de começar, poderoso para crescer
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Em apenas 3 passos seu negócio já está no ar.
          </p>
        </div>

        <div className="mx-auto mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <Card
              key={step.number}
              className="relative border-0 bg-transparent"
            >
              <CardContent className="p-6">
                <div className="mb-6 flex items-center gap-4">
                  <div className="bg-primary text-primary-foreground flex size-12 items-center justify-center rounded-full text-lg font-bold">
                    {step.number}
                  </div>
                  <step.icon className="text-muted-foreground size-6" />
                </div>
                <h3 className="text-foreground text-xl font-semibold">
                  {step.title}
                </h3>
                <p className="text-muted-foreground mt-2">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
