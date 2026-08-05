import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Users,
  CreditCard,
  Package,
  BarChart3,
  MessageSquare,
  FileText,
  Bell,
  ShoppingCart,
  Clock,
  UserCog,
  Settings,
  Shield,
  Globe,
  Repeat,
  Headphones,
} from "lucide-react";

const modules = [
  {
    icon: Calendar,
    name: "Agenda",
    description: "Agendamento de compromissos e horários",
  },
  {
    icon: Users,
    name: "Clientes",
    description: "Cadastro e gestão de clientes",
  },
  {
    icon: CreditCard,
    name: "Financeiro",
    description: "Contas a pagar, receber e fluxo de caixa",
  },
  {
    icon: Package,
    name: "Estoque",
    description: "Controle de produtos e entradas/saídas",
  },
  {
    icon: BarChart3,
    name: "Relatórios",
    description: "Dashboards e indicadores do negócio",
  },
  {
    icon: MessageSquare,
    name: "WhatsApp",
    description: "Envio automático de mensagens e lembretes",
  },
  {
    icon: FileText,
    name: "Prontuário",
    description: "Prontuário eletrônico para clínicas",
  },
  {
    icon: Bell,
    name: "Lembretes",
    description: "Notificações automáticas para clientes",
  },
  {
    icon: ShoppingCart,
    name: "PDV",
    description: "Ponto de venda integrado",
  },
  {
    icon: Clock,
    name: "Assinaturas",
    description: "Cobrança recorrente e planos",
  },
  {
    icon: UserCog,
    name: "Usuários",
    description: "Controle de acesso e permissões",
  },
  {
    icon: Settings,
    name: "Configurações",
    description: "Personalização completa do sistema",
  },
  {
    icon: Shield,
    name: "Segurança",
    description: "Backup automático e dados criptografados",
  },
  {
    icon: Globe,
    name: "Multi-unidades",
    description: "Gerencie várias filiais em um só lugar",
  },
  {
    icon: Repeat,
    name: "Recorrência",
    description: "Cobranças automáticas e planos recorrentes",
  },
  {
    icon: Headphones,
    name: "Suporte prioritário",
    description: "Atendimento rápido e dedicado",
  },
];

export function Modules() {
  return (
    <section id="modules" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">
            Módulos disponíveis
          </Badge>
          <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
            Tudo que seu negócio precisa
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Ative apenas os módulos que fazem sentido para o seu segmento.
          </p>
        </div>

        <div className="mx-auto mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {modules.map((mod) => (
            <div
              key={mod.name}
              className="group hover:bg-muted/50 flex items-start gap-3 rounded-xl border p-4 transition-all hover:shadow-sm"
            >
              <div className="bg-primary/10 flex size-9 shrink-0 items-center justify-center rounded-lg">
                <mod.icon className="text-primary size-4.5" />
              </div>
              <div>
                <div className="text-foreground font-medium">{mod.name}</div>
                <div className="text-muted-foreground mt-0.5 text-sm">
                  {mod.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
