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
import { Check, ArrowRight, Stethoscope, Smile, Wand2 } from "lucide-react";
import Link from "next/link";

const segments = [
  {
    id: "clinica-medica",
    name: "Clínica Médica",
    icon: Stethoscope,
    description: "Agenda, prontuário, financeiro e WhatsApp integrado",
    modules: [
      "Agenda inteligente",
      "Prontuário eletrônico",
      "Financeiro completo",
      "CRM e gestão de clientes",
      "WhatsApp integrado",
      "Lembretes automáticos",
    ],
  },
  {
    id: "clinica-odontologica",
    name: "Clínica Odontológica",
    icon: Smile,
    description: "Odontograma, agenda, prontuário e muito mais",
    modules: [
      "Agenda inteligente",
      "Prontuário eletrônico",
      "Financeiro completo",
      "CRM e gestão de pacientes",
      "WhatsApp integrado",
      "Lembretes automáticos",
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-muted/30 border-y py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">
            Planos sob medida
          </Badge>
          <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
            Seu plano, feito para o seu negócio
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Cada plano é montado de acordo com o segmento e os módulos que você
            precisa. Sem surpresas, sem taxa escondida.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-6 sm:grid-cols-2">
          {segments.map((segment) => (
            <Card
              key={segment.id}
              className="relative flex flex-col overflow-visible"
            >
              <CardHeader className="text-center">
                <div className="bg-primary/10 mx-auto mb-3 flex size-12 items-center justify-center rounded-lg">
                  <segment.icon className="text-primary size-6" />
                </div>
                <CardTitle className="text-xl">{segment.name}</CardTitle>
                <CardDescription>{segment.description}</CardDescription>
                <div className="bg-primary/10 mx-auto mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2">
                  <Wand2 className="text-primary size-4" />
                  <span className="text-primary text-sm font-medium">
                    Plano personalizado
                  </span>
                </div>
              </CardHeader>

              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {segment.modules.map((mod) => (
                    <li key={mod} className="flex items-start gap-2">
                      <Check className="text-primary mt-0.5 size-4 shrink-0" />
                      <span className="text-muted-foreground text-sm">
                        {mod}
                      </span>
                    </li>
                  ))}
                  <li className="flex items-start gap-2">
                    <Check className="text-primary mt-0.5 size-4 shrink-0" />
                    <span className="text-muted-foreground text-sm">
                      Backup automático
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-primary mt-0.5 size-4 shrink-0" />
                    <span className="text-muted-foreground text-sm">
                      Suporte técnico incluso
                    </span>
                  </li>
                </ul>
              </CardContent>

              <CardFooter>
                <Link
                  href={`/configuracoes-plano?segmento=${segment.id}`}
                  className="w-full"
                >
                  <Button className="w-full" size="lg">
                    Montar meu plano
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <p className="text-muted-foreground mt-8 text-center text-sm">
          Cada negócio é único.{" "}
          <a
            href="#contact"
            className="text-primary underline-offset-4 hover:underline"
          >
            Fale conosco
          </a>{" "}
          para uma consultoria gratuita.
        </p>
      </div>
    </section>
  );
}
