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
  BookOpen,
  Building,
  Home,
  Scale,
  Calculator,
} from "lucide-react";

const solutions = [
  {
    icon: Stethoscope,
    title: "Clínicas médicas",
    benefit: "Menos faltas, mais pacientes atendidos",
    price: "R$ 497–900",
  },
  {
    icon: Smile,
    title: "Clínicas odontológicas",
    benefit: "Agenda lotada e pacientes felizes",
    price: "R$ 497–900",
  },
  {
    icon: Scissors,
    title: "Salões de beleza",
    benefit: "Fila de espera e fidelidade automática",
    price: "R$ 497–700",
  },
  {
    icon: Scissors,
    title: "Barbearias",
    benefit: "Assinaturas recorrentes e agenda cheia",
    price: "R$ 497–700",
  },
  {
    icon: Dumbbell,
    title: "Academias",
    benefit: "Controle total de alunos e pagamentos",
    price: "R$ 497–700",
  },
  {
    icon: PawPrint,
    title: "Pet shops",
    benefit: "Agendamentos organizados e clientes fiéis",
    price: "R$ 497–700",
  },
  {
    icon: Car,
    title: "Autoescolas",
    benefit: "Horários otimizados e alunos satisfeitos",
    price: "R$ 497–700",
  },
  {
    icon: Wrench,
    title: "Oficinas mecânicas",
    benefit: "Ordens de serviço sem papel e estoque controlado",
    price: "R$ 497–900",
  },
  {
    icon: ShoppingBag,
    title: "Autopeças",
    benefit: "Estoque correto e vendas organizadas",
    price: "R$ 497–700",
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurantes",
    benefit: "Pedidos sem erro e caixa organizado",
    price: "R$ 497–900",
  },
  {
    icon: Pizza,
    title: "Pizzarias",
    benefit: "Delivery rápido e clientes repetem",
    price: "R$ 497–700",
  },
  {
    icon: Coffee,
    title: "Lanchonetes",
    benefit: "Delivery próprio e pedidos organizados",
    price: "R$ 497–700",
  },
  {
    icon: Pill,
    title: "Farmácias",
    benefit: "Estoque sempre disponível e vendas rastreadas",
    price: "R$ 497–700",
  },
  {
    icon: Glasses,
    title: "Óticas",
    benefit: "Clientes cadastrados e vendas aumentam",
    price: "R$ 497–700",
  },
  {
    icon: Shirt,
    title: "Lojas de roupas",
    benefit: "Estoque organizado e vendas crescem",
    price: "R$ 497–700",
  },
  {
    icon: BookOpen,
    title: "Papelarias",
    benefit: "Estoque correto e PDV ágil",
    price: "R$ 497–700",
  },
  {
    icon: Building,
    title: "Material de construção",
    benefit: "Orçamentos rápidos e entregas no prazo",
    price: "R$ 497–900",
  },
  {
    icon: Home,
    title: "Imobiliárias",
    benefit: "Mais visitas agendadas e negócios fechados",
    price: "R$ 497–1.000",
  },
  {
    icon: Scale,
    title: "Escritórios de advocacia",
    benefit: "Processos organizados e prazos em dia",
    price: "R$ 497–900",
  },
  {
    icon: Calculator,
    title: "Contabilidades",
    benefit: "Vencimentos controlados e clientes satisfeitos",
    price: "R$ 497–700",
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

        <div className="mx-auto mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {solutions.map((solution) => (
            <Card
              key={solution.title}
              className="group hover:ring-primary/20 relative overflow-hidden transition-all hover:shadow-md hover:ring-1"
            >
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
                  A partir de {solution.price}/mês
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
