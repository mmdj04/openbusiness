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
import { Check, ArrowRight, Stethoscope, Smile } from "lucide-react";
import Link from "next/link";

const BASE_PRICE = 297;

const modulePrices: Record<string, number> = {
  agenda: 40,
  financeiro: 50,
  estoque: 45,
  whatsapp: 80,
  pdv: 65,
  crm: 45,
  relatorios: 50,
  prontuario: 85,
  lembretes: 45,
};

const segments = [
  {
    id: "clinica-medica",
    name: "Clínica Médica",
    icon: Stethoscope,
    modules: [
      { id: "agenda", label: "Agenda inteligente" },
      { id: "financeiro", label: "Financeiro completo" },
      { id: "crm", label: "CRM e gestão de clientes" },
      { id: "prontuario", label: "Prontuário eletrônico" },
      { id: "whatsapp", label: "WhatsApp integrado" },
      { id: "lembretes", label: "Lembretes automáticos" },
    ],
  },
  {
    id: "clinica-odontologica",
    name: "Clínica Odontológica",
    icon: Smile,
    modules: [
      { id: "agenda", label: "Agenda inteligente" },
      { id: "financeiro", label: "Financeiro completo" },
      { id: "crm", label: "CRM e gestão de pacientes" },
      { id: "prontuario", label: "Prontuário eletrônico" },
      { id: "whatsapp", label: "WhatsApp integrado" },
      { id: "lembretes", label: "Lembretes automáticos" },
    ],
  },
];

function getSegmentTotal(moduleIds: string[]): number {
  const extra = moduleIds.reduce((sum, id) => sum + (modulePrices[id] || 0), 0);
  return BASE_PRICE + extra;
}

function formatPrice(value: number): string {
  return value.toLocaleString("pt-BR");
}

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
            Monte seu plano escolhendo o segmento e os módulos que precisa.
            Cancele quando quiser.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-6 sm:grid-cols-2">
          {segments.map((segment) => {
            const total = getSegmentTotal(segment.modules.map((m) => m.id));
            return (
              <Card
                key={segment.id}
                className="relative flex flex-col overflow-visible"
              >
                <CardHeader className="text-center">
                  <div className="bg-primary/10 mx-auto mb-3 flex size-12 items-center justify-center rounded-lg">
                    <segment.icon className="text-primary size-6" />
                  </div>
                  <CardTitle className="text-xl">{segment.name}</CardTitle>
                  <CardDescription>
                    Tudo que sua {segment.name.toLowerCase()} precisa para
                    começar
                  </CardDescription>
                  <div className="mt-4">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-muted-foreground text-sm">R$</span>
                      <span className="text-foreground text-4xl font-bold">
                        {formatPrice(total)}
                      </span>
                      <span className="text-muted-foreground text-sm">
                        /mês
                      </span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {segment.modules.map((mod) => (
                      <li key={mod.id} className="flex items-start gap-2">
                        <Check className="text-primary mt-0.5 size-4 shrink-0" />
                        <span className="text-muted-foreground text-sm">
                          {mod.label}
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
                      Começar agora
                      <ArrowRight className="ml-2 size-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
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
