"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Stethoscope,
  Smile,
  Scissors,
  Dumbbell,
  PawPrint,
  Car,
  Wrench,
  ShoppingBag,
  UtensilsCrossed,
  Pizza,
  Coffee,
  Pill,
  Glasses,
  Shirt,
  Building,
  Scale,
  Calculator,
} from "lucide-react";
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
  ia: 120,
  assinaturas: 60,
  prontuario: 85,
  lembretes: 45,
  "multi-unidades": 130,
};

const solutions = [
  {
    icon: Stethoscope,
    title: "Clinicas medicas",
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
    available: true,
  },
  {
    icon: Smile,
    title: "Clinicas odontologicas",
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
    available: true,
  },
  {
    icon: Scissors,
    title: "Saloes de beleza",
    benefit: "Fila de espera e fidelidade automatica",
    modules: ["agenda", "financeiro", "crm", "whatsapp", "assinaturas"],
    segment: "salao",
    available: false,
  },
  {
    icon: Scissors,
    title: "Barbearias",
    benefit: "Assinaturas recorrentes e agenda cheia",
    modules: ["agenda", "financeiro", "crm", "whatsapp", "assinaturas"],
    segment: "barbearia",
    available: false,
  },
  {
    icon: Dumbbell,
    title: "Academias",
    benefit: "Matriculas online e controle de acesso",
    modules: ["agenda", "financeiro", "crm", "whatsapp", "assinaturas"],
    segment: "academia",
    available: false,
  },
  {
    icon: PawPrint,
    title: "Pet shops e clinicas veterinarias",
    benefit: "Tutores fiéis e agenda sempre lotada",
    modules: ["agenda", "financeiro", "crm", "prontuario", "whatsapp"],
    segment: "pet",
    available: false,
  },
  {
    icon: Car,
    title: "Oficinas e concessionarias",
    benefit: "OS rapidas e clientes satisfeitos",
    modules: ["agenda", "financeiro", "crm", "estoque", "relatorios"],
    segment: "oficina",
    available: false,
  },
  {
    icon: Wrench,
    title: "Mecanicas de carros",
    benefit: "Controle total e sem surpresas",
    modules: ["agenda", "financeiro", "crm", "estoque", "relatorios"],
    segment: "mecanica",
    available: false,
  },
  {
    icon: ShoppingBag,
    title: "Lojas de varejo",
    benefit: "Estoque organizado e vendas crescem",
    modules: ["financeiro", "crm", "estoque", "pdv", "relatorios"],
    segment: "varejo",
    available: false,
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurantes",
    benefit: "Pedidos certos e sem fila",
    modules: ["financeiro", "crm", "estoque", "pdv", "relatorios", "whatsapp"],
    segment: "restaurante",
    available: false,
  },
  {
    icon: Pizza,
    title: "Pizzarias e lanchonetes",
    benefit: "Pedidos certos e entrega no prazo",
    modules: ["financeiro", "crm", "estoque", "pdv", "relatorios", "whatsapp"],
    segment: "pizzaria",
    available: false,
  },
  {
    icon: Coffee,
    title: "Cafeterias e padarias",
    benefit: "Fila menor e faturamento maior",
    modules: ["financeiro", "crm", "estoque", "pdv", "relatorios"],
    segment: "cafeteria",
    available: false,
  },
  {
    icon: Pill,
    title: "Farmacias",
    benefit: "Estoque sempre disponivel e vendas rastreadas",
    modules: ["financeiro", "crm", "estoque", "pdv", "relatorios"],
    segment: "farmacia",
    available: false,
  },
  {
    icon: Glasses,
    title: "Oticass",
    benefit: "Clientes cadastrados e vendas aumentam",
    modules: ["financeiro", "crm", "estoque", "pdv", "relatorios"],
    segment: "otica",
    available: false,
  },
  {
    icon: Shirt,
    title: "Lojas de roupas",
    benefit: "Estoque organizado e vendas crescem",
    modules: ["financeiro", "crm", "estoque", "pdv", "relatorios"],
    segment: "loja-roupas",
    available: false,
  },
  {
    icon: Building,
    title: "Material de construcao",
    benefit: "Orcamentos rapidos e entregas no prazo",
    modules: ["financeiro", "crm", "estoque", "pdv", "relatorios"],
    segment: "material-construcao",
    available: false,
  },
  {
    icon: Scale,
    title: "Escritorios de advocacia",
    benefit: "Processos organizados e prazos em dia",
    modules: ["agenda", "financeiro", "crm", "relatorios", "prontuario"],
    segment: "advocacia",
    available: false,
  },
  {
    icon: Calculator,
    title: "Contabilidades",
    benefit: "Vencimentos controlados e clientes satisfeitos",
    modules: ["agenda", "financeiro", "crm", "relatorios", "whatsapp"],
    segment: "contabilidade",
    available: false,
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

        <div className="mx-auto mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {solutions.map((solution) => {
            const total = getSegmentTotal(solution.modules);
            return (
              <Link
                key={solution.title}
                href={
                  solution.available
                    ? `/configuracoes-plano?segmento=${solution.segment}`
                    : "#"
                }
                onClick={(e) => {
                  if (!solution.available) e.preventDefault();
                }}
              >
                <Card
                  className={`group relative h-full overflow-hidden transition-all ${
                    solution.available
                      ? "hover:ring-primary/20 hover:shadow-md hover:ring-1"
                      : "opacity-60"
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="bg-primary/10 mb-2 flex size-10 items-center justify-center rounded-lg">
                        <solution.icon className="text-primary size-5" />
                      </div>
                      {!solution.available && (
                        <Badge variant="secondary" className="text-xs">
                          Em desenvolvimento
                        </Badge>
                      )}
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
                      A partir de R$ {formatPrice(total)}/mes
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
