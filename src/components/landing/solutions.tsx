"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope, Smile } from "lucide-react";
import Link from "next/link";

const solutions = [
  {
    icon: Stethoscope,
    title: "Clínicas médicas",
    benefit: "Menos faltas, mais pacientes atendidos",
    segment: "clinica-medica",
  },
  {
    icon: Smile,
    title: "Clínicas odontológicas",
    benefit: "Agenda lotada e pacientes felizes",
    segment: "clinica-odontologica",
  },
];

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
          {solutions.map((solution) => (
            <Link
              key={solution.title}
              href={`/configuracoes-plano?segmento=${solution.segment}`}
            >
              <Card className="group hover:ring-primary/20 relative h-full overflow-hidden transition-all hover:shadow-md hover:ring-1">
                <CardHeader className="pb-3">
                  <div className="bg-primary/10 mb-2 flex size-10 items-center justify-center rounded-lg">
                    <solution.icon className="text-primary size-5" />
                  </div>
                  <CardTitle className="text-base">{solution.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground text-sm">
                    {solution.benefit}
                  </p>
                  <div className="text-primary text-sm font-semibold">
                    Plano personalizado
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
