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
  {
    icon: Scissors,
    title: "Salões de beleza",
    benefit: "Fila de espera e fidelidade automática",
    modules: ["agenda", "financeiro", "crm", "whatsapp", "assinaturas"],
    segment: "salao",
  },
  {
    icon: Scissors,
    title: "Barbearias",
    benefit: "Assinaturas recorrentes e agenda cheia",
    modules: ["agenda", "financeiro", "crm", "whatsapp", "assinaturas"],
    segment: "barbearia",
  },
  {
    icon: Dumbbell,
    title: "Academias",
    benefit: "Controle total de alunos e pagamentos",
    modules: ["agenda", "financeiro", "crm", "assinaturas", "relatorios"],
    segment: "academia",
  },
  {
    icon: PawPrint,
    title: "Pet shops",
    benefit: "Agendamentos organizados e clientes fiéis",
    modules: ["agenda", "financeiro", "crm", "estoque", "whatsapp"],
    segment: "petshop",
  },
  {
    icon: Car,
    title: "Autoescolas",
    benefit: "Horários otimizados e alunos satisfeitos",
    modules: ["agenda", "financeiro", "crm", "relatorios", "whatsapp"],
    segment: "autoescola",
  },
  {
    icon: Wrench,
    title: "Oficinas mecânicas",
    benefit: "Ordens de serviço sem papel e estoque controlado",
    modules: ["agenda", "financeiro", "crm", "estoque", "relatorios"],
    segment: "oficina",
  },
  {
    icon: ShoppingBag,
    title: "Autopeças",
    benefit: "Estoque correto e vendas organizadas",
    modules: ["financeiro", "crm", "estoque", "pdv", "relatorios"],
    segment: "autopecas",
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurantes",
    benefit: "Pedidos sem erro e caixa organizado",
    modules: ["financeiro", "pdv", "estoque", "relatorios"],
    segment: "restaurante",
  },
  {
    icon: Pizza,
    title: "Pizzarias",
    benefit: "Delivery rápido e clientes repetem",
    modules: ["financeiro", "pdv", "estoque", "whatsapp"],
    segment: "pizzaria",
  },
  {
    icon: Coffee,
    title: "Lanchonetes",
    benefit: "Delivery próprio e pedidos organizados",
    modules: ["financeiro", "pdv", "estoque", "relatorios"],
    segment: "lanchonete",
  },
  {
    icon: Pill,
    title: "Farmácias",
    benefit: "Estoque sempre disponível e vendas rastreadas",
    modules: ["financeiro", "crm", "estoque", "pdv", "relatorios"],
    segment: "farmacia",
  },
  {
    icon: Glasses,
    title: "Óticas",
    benefit: "Clientes cadastrados e vendas aumentam",
    modules: ["financeiro", "crm", "estoque", "pdv", "relatorios"],
    segment: "otica",
  },
  {
    icon: Shirt,
    title: "Lojas de roupas",
    benefit: "Estoque organizado e vendas crescem",
    modules: ["financeiro", "crm", "estoque", "pdv", "relatorios"],
    segment: "loja-roupas",
  },
  {
    icon: Building,
    title: "Material de construção",
    benefit: "Orçamentos rápidos e entregas no prazo",
    modules: ["financeiro", "crm", "estoque", "pdv", "relatorios"],
    segment: "material-construcao",
  },
  {
    icon: Scale,
    title: "Escritórios de advocacia",
    benefit: "Processos organizados e prazos em dia",
    modules: ["agenda", "financeiro", "crm", "relatorios", "prontuario"],
    segment: "advocacia",
  },
  {
    icon: Calculator,
    title: "Contabilidades",
    benefit: "Vencimentos controlados e clientes satisfeitos",
    modules: ["agenda", "financeiro", "crm", "relatorios", "whatsapp"],
    segment: "contabilidade",
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
