"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope, Smile } from "lucide-react";
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

const solutions = [
  {
    icon: Stethoscope,
    title: "Clínicas médicas",
    benefit: "Menos faltas, mais pacientes atendidos",
    modules: [
      "agenda",
      "financeiro",
      "crm",
      "prontuario",
      "whatsapp",
      "lembretes",
    ],
    segment: "clinica-medica",
  },
  {
    icon: Smile,
    title: "Clínicas odontológicas",
    benefit: "Agenda lotada e pacientes felizes",
    modules: [
      "agenda",
      "financeiro",
      "crm",
      "prontuario",
      "whatsapp",
      "lembretes",
    ],
    segment: "clinica-odontologica",
  },
];

function getSegmentTotal(modules: string[]): number {
  const extra = modules.reduce((sum, id) => sum + (modulePrices[id] || 0), 0);
  return BASE_PRICE + extra;
}

function formatPrice(value: number): string {
  return value.toLocaleString("pt-BR");
}

export function Solutions() {
  return (
    <section id="solutions" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">
            Soluções por segmento
          </Badge>
          <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
            Cada negócio resolve problemas diferentes
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Não vendemos módulos. Entregamos resultados que fazem seu negócio
            crescer.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl gap-4 sm:grid-cols-2">
          {solutions.map((solution) => {
            const total = getSegmentTotal(solution.modules);
            return (
              <Link
                key={solution.title}
                href={`/configuracoes-plano?segmento=${solution.segment}`}
              >
                <Card className="group hover:ring-primary/20 relative h-full overflow-hidden transition-all hover:shadow-md hover:ring-1">
                  <CardHeader className="pb-3">
                    <div className="bg-primary/10 mb-2 flex size-10 items-center justify-center rounded-lg">
                      <solution.icon className="text-primary size-5" />
                    </div>
                    <CardTitle className="text-base">
                      {solution.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground text-sm">
                      {solution.benefit}
                    </p>
                    <div className="text-primary text-sm font-semibold">
                      A partir de R$ {formatPrice(total)}/mês
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
