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
    modules: ["Agenda", "Prontuário", "WhatsApp", "Financeiro"],
    price: "R$ 500–900",
  },
  {
    icon: Smile,
    title: "Clínicas odontológicas",
    modules: ["Agenda", "Ficha do paciente", "Lembretes"],
    price: "R$ 500–900",
  },
  {
    icon: Scissors,
    title: "Salões de beleza",
    modules: ["Agendamento", "Fidelidade", "Caixa"],
    price: "R$ 500",
  },
  {
    icon: Scissors,
    title: "Barbearias",
    modules: ["Agendamento", "Assinaturas", "Caixa"],
    price: "R$ 500",
  },
  {
    icon: Dumbbell,
    title: "Academias",
    modules: ["Controle de alunos", "Pagamentos"],
    price: "R$ 500",
  },
  {
    icon: PawPrint,
    title: "Pet shops",
    modules: ["Agendamento banho/tosa", "Cadastro de pets"],
    price: "R$ 500",
  },
  {
    icon: Car,
    title: "Autoescolas",
    modules: ["Agenda de aulas", "Controle de alunos"],
    price: "R$ 500",
  },
  {
    icon: Wrench,
    title: "Oficinas mecânicas",
    modules: ["Ordens de serviço", "Estoque", "Orçamento"],
    price: "R$ 500",
  },
  {
    icon: ShoppingBag,
    title: "Autopeças",
    modules: ["Estoque", "Vendas", "Orçamento"],
    price: "R$ 500",
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurantes",
    modules: ["Pedidos", "Mesas", "Financeiro"],
    price: "R$ 500",
  },
  {
    icon: Pizza,
    title: "Pizzarias",
    modules: ["Pedidos", "Entrega", "Clientes"],
    price: "R$ 500",
  },
  {
    icon: Coffee,
    title: "Lanchonetes",
    modules: ["Delivery próprio", "Painel de pedidos"],
    price: "R$ 500",
  },
  {
    icon: Pill,
    title: "Farmácias",
    modules: ["Estoque", "Vendas", "Clientes"],
    price: "R$ 500",
  },
  {
    icon: Glasses,
    title: "Óticas",
    modules: ["Cadastro de clientes", "Receitas", "Vendas"],
    price: "R$ 500",
  },
  {
    icon: Shirt,
    title: "Lojas de roupas",
    modules: ["Estoque", "Vendas", "Catálogo"],
    price: "R$ 500",
  },
  {
    icon: BookOpen,
    title: "Papelarias",
    modules: ["Estoque", "PDV"],
    price: "R$ 500",
  },
  {
    icon: Building,
    title: "Material de construção",
    modules: ["Orçamentos", "Estoque", "Entregas"],
    price: "R$ 500",
  },
  {
    icon: Home,
    title: "Imobiliárias",
    modules: ["CRM", "Imóveis", "Visitas"],
    price: "R$ 500–1.000",
  },
  {
    icon: Scale,
    title: "Escritórios de advocacia",
    modules: ["Processos", "Agenda", "Documentos"],
    price: "R$ 500",
  },
  {
    icon: Calculator,
    title: "Contabilidades",
    modules: ["Gestão de clientes", "Documentos", "Vencimentos"],
    price: "R$ 500",
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
            Um sistema para cada tipo de negócio
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Escolha a solução ideal para o seu segmento. Cada sistema vem com os
            módulos necessários para o seu dia a dia.
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
                <div className="flex flex-wrap gap-1.5">
                  {solution.modules.map((mod) => (
                    <Badge key={mod} variant="secondary" className="text-xs">
                      {mod}
                    </Badge>
                  ))}
                </div>
                <div className="text-primary text-sm font-semibold">
                  {solution.price}/mês
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
