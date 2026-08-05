"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Users,
  BarChart3,
  Settings,
  Bell,
  MessageSquare,
  FileText,
  CreditCard,
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  Phone,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Edit,
  Stethoscope,
  Activity,
  DollarSign,
  UserPlus,
  CalendarPlus,
} from "lucide-react";
import Link from "next/link";

type Module = "dashboard" | "agenda" | "clientes" | "financeiro" | "relatorios";

type Segment = "clinica" | "salao" | "restaurante" | "personalizado";

interface SegmentConfig {
  id: Segment;
  name: string;
  modules: Module[];
  businessName: string;
  businessType: string;
}

const segmentConfigs: SegmentConfig[] = [
  {
    id: "clinica",
    name: "Clínica Médica",
    modules: ["dashboard", "agenda", "clientes", "financeiro", "relatorios"],
    businessName: "Clínica Saúde+",
    businessType: "Clínica Médica",
  },
  {
    id: "salao",
    name: "Salão de Beleza",
    modules: ["dashboard", "agenda", "clientes", "financeiro"],
    businessName: "Studio Beleza",
    businessType: "Salão de Beleza",
  },
  {
    id: "restaurante",
    name: "Restaurante",
    modules: ["dashboard", "clientes", "financeiro", "relatorios"],
    businessName: "Sabor & Arte",
    businessType: "Restaurante",
  },
  {
    id: "personalizado",
    name: "Personalizado",
    modules: ["dashboard", "agenda", "clientes", "financeiro", "relatorios"],
    businessName: "Meu Negócio",
    businessType: "Personalizado",
  },
];

const clients = [
  {
    id: 1,
    name: "Maria Silva",
    phone: "(21) 99876-5432",
    email: "maria@email.com",
    lastVisit: "2026-08-01",
    totalSpent: 1250,
    status: "ativo",
  },
  {
    id: 2,
    name: "João Santos",
    phone: "(21) 99765-4321",
    email: "joao@email.com",
    lastVisit: "2026-08-03",
    totalSpent: 890,
    status: "ativo",
  },
  {
    id: 3,
    name: "Ana Costa",
    phone: "(21) 99654-3210",
    email: "ana@email.com",
    lastVisit: "2026-07-28",
    totalSpent: 2100,
    status: "ativo",
  },
  {
    id: 4,
    name: "Pedro Lima",
    phone: "(21) 99543-2109",
    email: "pedro@email.com",
    lastVisit: "2026-08-02",
    totalSpent: 450,
    status: "ativo",
  },
  {
    id: 5,
    name: "Lucia Ferreira",
    phone: "(21) 99432-1098",
    email: "lucia@email.com",
    lastVisit: "2026-07-15",
    totalSpent: 780,
    status: "inativo",
  },
  {
    id: 6,
    name: "Carlos Mendes",
    phone: "(21) 99321-0987",
    email: "carlos@email.com",
    lastVisit: "2026-08-04",
    totalSpent: 3200,
    status: "ativo",
  },
  {
    id: 7,
    name: "Fernanda Alves",
    phone: "(21) 99210-9876",
    email: "fernanda@email.com",
    lastVisit: "2026-08-01",
    totalSpent: 950,
    status: "ativo",
  },
  {
    id: 8,
    name: "Roberto Souza",
    phone: "(21) 99109-8765",
    email: "roberto@email.com",
    lastVisit: "2026-07-20",
    totalSpent: 1500,
    status: "ativo",
  },
];

const appointments = [
  {
    id: 1,
    time: "09:00",
    client: "Maria Silva",
    service: "Consulta",
    duration: "30min",
    status: "confirmado",
    professional: "Dr. Ricardo",
  },
  {
    id: 2,
    time: "09:30",
    client: "João Santos",
    service: "Retorno",
    duration: "20min",
    status: "confirmado",
    professional: "Dr. Ricardo",
  },
  {
    id: 3,
    time: "10:00",
    client: "Ana Costa",
    service: "Exame",
    duration: "45min",
    status: "pendente",
    professional: "Dr. Ricardo",
  },
  {
    id: 4,
    time: "11:00",
    client: "Pedro Lima",
    service: "Consulta",
    duration: "30min",
    status: "confirmado",
    professional: "Dra. Beatriz",
  },
  {
    id: 5,
    time: "14:00",
    client: "Lucia Ferreira",
    service: "Limpeza",
    duration: "60min",
    status: "cancelado",
    professional: "Higienista Ana",
  },
  {
    id: 6,
    time: "14:30",
    client: "Carlos Mendes",
    service: "Consulta",
    duration: "30min",
    status: "confirmado",
    professional: "Dr. Ricardo",
  },
  {
    id: 7,
    time: "15:00",
    client: "Fernanda Alves",
    service: "Avaliação",
    duration: "40min",
    status: "confirmado",
    professional: "Dra. Beatriz",
  },
  {
    id: 8,
    time: "16:00",
    client: "Roberto Souza",
    service: "Retorno",
    duration: "20min",
    status: "pendente",
    professional: "Dr. Ricardo",
  },
];

const financialData = {
  monthlyRevenue: 28450,
  lastMonthRevenue: 25200,
  pendingPayments: 3200,
  averageTicket: 285,
  recentTransactions: [
    {
      id: 1,
      date: "2026-08-05",
      client: "Maria Silva",
      service: "Consulta",
      amount: 250,
      status: "pago",
    },
    {
      id: 2,
      date: "2026-08-05",
      client: "João Santos",
      service: "Retorno",
      amount: 150,
      status: "pago",
    },
    {
      id: 3,
      date: "2026-08-04",
      client: "Ana Costa",
      service: "Exame",
      amount: 450,
      status: "pendente",
    },
    {
      id: 4,
      date: "2026-08-04",
      client: "Pedro Lima",
      service: "Consulta",
      amount: 250,
      status: "pago",
    },
    {
      id: 5,
      date: "2026-08-03",
      client: "Carlos Mendes",
      service: "Tratamento",
      amount: 1200,
      status: "pago",
    },
    {
      id: 6,
      date: "2026-08-03",
      client: "Fernanda Alves",
      service: "Avaliação",
      amount: 200,
      status: "pago",
    },
  ],
};

const weeklyData = [
  { day: "Seg", revenue: 3200, appointments: 12 },
  { day: "Ter", revenue: 4100, appointments: 15 },
  { day: "Qua", revenue: 3800, appointments: 14 },
  { day: "Qui", revenue: 4500, appointments: 16 },
  { day: "Sex", revenue: 5200, appointments: 18 },
  { day: "Sáb", revenue: 2800, appointments: 10 },
  { day: "Dom", revenue: 0, appointments: 0 },
];

export default function DemonstracaoPage() {
  const [currentModule, setCurrentModule] = useState<Module>("dashboard");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSegment, setSelectedSegment] = useState<Segment>("clinica");
  const [enabledModules, setEnabledModules] = useState<Module[]>([
    "dashboard",
    "agenda",
    "clientes",
    "financeiro",
    "relatorios",
  ]);

  const currentSegment = segmentConfigs.find((s) => s.id === selectedSegment);

  const toggleModule = (module: Module) => {
    setEnabledModules((prev) =>
      prev.includes(module)
        ? prev.filter((m) => m !== module)
        : [...prev, module],
    );
  };

  const handleSegmentChange = (segment: Segment) => {
    setSelectedSegment(segment);
    const config = segmentConfigs.find((s) => s.id === segment);
    if (config) {
      setEnabledModules(config.modules);
    }
  };

  const availableModules: {
    id: Module;
    label: string;
    icon: React.ElementType;
  }[] = [
    { id: "dashboard", label: "Painel", icon: BarChart3 },
    { id: "agenda", label: "Agenda", icon: Calendar },
    { id: "clientes", label: "Clientes", icon: Users },
    { id: "financeiro", label: "Financeiro", icon: CreditCard },
    { id: "relatorios", label: "Relatórios", icon: FileText },
  ];

  const maxRevenue = Math.max(...weeklyData.map((d) => d.revenue));

  return (
    <div className="bg-background min-h-screen">
      <aside className="bg-card border-border fixed top-0 left-0 z-40 flex h-screen w-64 flex-col border-r">
        <div className="border-border flex items-center gap-2 border-b p-4">
          <Stethoscope className="text-primary size-6" />
          <div>
            <p className="font-semibold">{currentSegment?.businessName}</p>
            <p className="text-muted-foreground text-xs">Nova Iguaçu, RJ</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {availableModules
            .filter((item) => enabledModules.includes(item.id))
            .map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentModule(item.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  currentModule === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="size-4" />
                {item.label}
              </button>
            ))}
        </nav>

        <div className="border-border space-y-2 border-t p-3">
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            size="sm"
          >
            <Bell className="size-4" />
            Notificações
            <Badge className="ml-auto" variant="secondary">
              3
            </Badge>
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            size="sm"
          >
            <MessageSquare className="size-4" />
            WhatsApp
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            size="sm"
          >
            <Settings className="size-4" />
            Configurações
          </Button>
        </div>
      </aside>

      <main className="ml-64 flex-1 overflow-auto">
        <header className="bg-card border-border flex items-center justify-between border-b p-4">
          <div>
            <h1 className="text-xl font-semibold">
              {currentModule === "dashboard" && "Painel de Controle"}
              {currentModule === "agenda" && "Agenda"}
              {currentModule === "clientes" && "Clientes"}
              {currentModule === "financeiro" && "Financeiro"}
              {currentModule === "relatorios" && "Relatórios"}
            </h1>
            <p className="text-muted-foreground text-sm">
              {new Date().toLocaleDateString("pt-BR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm">Segmento:</span>
              <select
                value={selectedSegment}
                onChange={(e) => handleSegmentChange(e.target.value as Segment)}
                className="bg-muted rounded-lg border px-3 py-1.5 text-sm"
              >
                {segmentConfigs.map((seg) => (
                  <option key={seg.id} value={seg.id}>
                    {seg.name}
                  </option>
                ))}
              </select>
            </div>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm">Módulos:</span>
              <div className="flex gap-1">
                {availableModules.map((mod) => (
                  <Button
                    key={mod.id}
                    variant={
                      enabledModules.includes(mod.id) ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => toggleModule(mod.id)}
                    className="h-7 px-2 text-xs"
                  >
                    {mod.label}
                  </Button>
                ))}
              </div>
            </div>
            <Separator orientation="vertical" className="h-6" />
            <div className="relative">
              <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar..."
                className="bg-muted focus:ring-primary/20 rounded-lg py-2 pr-4 pl-9 text-sm outline-none focus:ring-2"
              />
            </div>
            <Link href="/demonstracao">
              <Button variant="outline" size="sm">
                Sair da Demo
              </Button>
            </Link>
          </div>
        </header>

        <div className="p-6">
          {currentModule === "dashboard" && <DashboardModule />}
          {currentModule === "agenda" && (
            <AgendaModule
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          )}
          {currentModule === "clientes" && <ClientesModule />}
          {currentModule === "financeiro" && <FinanceiroModule />}
          {currentModule === "relatorios" && (
            <RelatoriosModule weeklyData={weeklyData} maxRevenue={maxRevenue} />
          )}
        </div>
      </main>
    </div>
  );
}

function DashboardModule() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Receita do mês",
            value: "R$ 28.450",
            change: "+12.9%",
            trend: "up",
            icon: DollarSign,
          },
          {
            label: "Agendamentos hoje",
            value: "8",
            change: "+2",
            trend: "up",
            icon: CalendarPlus,
          },
          {
            label: "Clientes ativos",
            value: "248",
            change: "+15",
            trend: "up",
            icon: UserPlus,
          },
          {
            label: "Taxa de presença",
            value: "87%",
            change: "+5%",
            trend: "up",
            icon: Activity,
          },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div
                  className={`rounded-lg p-2 ${stat.trend === "up" ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"}`}
                >
                  <stat.icon
                    className={`size-5 ${stat.trend === "up" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                  />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-sm">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="size-4 text-green-600" />
                ) : (
                  <ArrowDownRight className="size-4 text-red-600" />
                )}
                <span
                  className={
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }
                >
                  {stat.change}
                </span>
                <span className="text-muted-foreground">vs. mês anterior</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Próximos agendamentos</CardTitle>
            <CardDescription>
              Hoje, {new Date().toLocaleDateString("pt-BR")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {appointments.slice(0, 5).map((apt) => (
                <div
                  key={apt.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-muted-foreground font-mono text-sm">
                      {apt.time}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{apt.client}</p>
                      <p className="text-muted-foreground text-xs">
                        {apt.service} • {apt.professional}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      apt.status === "confirmado"
                        ? "default"
                        : apt.status === "pendente"
                          ? "secondary"
                          : "destructive"
                    }
                    className="text-xs"
                  >
                    {apt.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Últimas transações</CardTitle>
            <CardDescription>Receitas recentes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {financialData.recentTransactions.slice(0, 5).map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <p className="text-sm font-medium">{tx.client}</p>
                    <p className="text-muted-foreground text-xs">
                      {tx.service}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">R$ {tx.amount}</p>
                    <Badge
                      variant={tx.status === "pago" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {tx.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AgendaModule({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: Date;
  setSelectedDate: (d: Date) => void;
}) {
  const daysInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0,
  ).getDate();
  const firstDayOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1,
  ).getDay();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            {selectedDate.toLocaleDateString("pt-BR", {
              month: "long",
              year: "numeric",
            })}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setSelectedDate(
                new Date(
                  selectedDate.getFullYear(),
                  selectedDate.getMonth() - 1,
                ),
              )
            }
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSelectedDate(new Date())}
          >
            Hoje
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setSelectedDate(
                new Date(
                  selectedDate.getFullYear(),
                  selectedDate.getMonth() + 1,
                ),
              )
            }
          >
            <ChevronRight className="size-4" />
          </Button>
          <Button size="sm">
            <Plus className="mr-2 size-4" />
            Novo agendamento
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardContent className="p-4">
            <div className="text-muted-foreground mb-4 grid grid-cols-7 gap-1 text-center text-xs font-medium">
              {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDayOfMonth }, (_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
                (day) => {
                  const isToday =
                    day === new Date().getDate() &&
                    selectedDate.getMonth() === new Date().getMonth() &&
                    selectedDate.getFullYear() === new Date().getFullYear();
                  const isSelected = day === selectedDate.getDate();
                  return (
                    <button
                      key={day}
                      onClick={() =>
                        setSelectedDate(
                          new Date(
                            selectedDate.getFullYear(),
                            selectedDate.getMonth(),
                            day,
                          ),
                        )
                      }
                      className={`flex size-8 items-center justify-center rounded-full text-sm transition-colors ${
                        isToday
                          ? "bg-primary text-primary-foreground"
                          : isSelected
                            ? "bg-primary/20 text-primary"
                            : "hover:bg-muted"
                      }`}
                    >
                      {day}
                    </button>
                  );
                },
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Agendamentos do dia</CardTitle>
            <CardDescription>
              {selectedDate.toLocaleDateString("pt-BR", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {appointments.map((apt) => (
                <div
                  key={apt.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-lg font-bold">{apt.time}</div>
                      <div className="text-muted-foreground text-xs">
                        {apt.duration}
                      </div>
                    </div>
                    <Separator orientation="vertical" className="h-10" />
                    <div>
                      <p className="font-medium">{apt.client}</p>
                      <p className="text-muted-foreground text-sm">
                        {apt.service}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {apt.professional}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        apt.status === "confirmado"
                          ? "default"
                          : apt.status === "pendente"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {apt.status}
                    </Badge>
                    <Button variant="ghost" size="icon" className="size-8">
                      <Phone className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="size-8">
                      <MessageSquare className="size-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ClientesModule() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Lista de clientes</h2>
          <p className="text-muted-foreground text-sm">
            {clients.length} clientes cadastrados
          </p>
        </div>
        <Button>
          <Plus className="mr-2 size-4" />
          Novo cliente
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-border border-b">
                  <th className="text-muted-foreground p-4 text-left text-sm font-medium">
                    Cliente
                  </th>
                  <th className="text-muted-foreground p-4 text-left text-sm font-medium">
                    Contato
                  </th>
                  <th className="text-muted-foreground p-4 text-left text-sm font-medium">
                    Último atendimento
                  </th>
                  <th className="text-muted-foreground p-4 text-left text-sm font-medium">
                    Total gasto
                  </th>
                  <th className="text-muted-foreground p-4 text-left text-sm font-medium">
                    Status
                  </th>
                  <th className="text-muted-foreground p-4 text-right text-sm font-medium">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr
                    key={client.id}
                    className="border-border hover:bg-muted/50 border-b last:border-0"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 flex size-10 items-center justify-center rounded-full">
                          <span className="text-primary text-sm font-medium">
                            {client.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{client.name}</p>
                          <p className="text-muted-foreground text-xs">
                            {client.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="size-3" />
                        {client.phone}
                      </div>
                    </td>
                    <td className="p-4 text-sm">
                      {new Date(client.lastVisit).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="p-4 text-sm font-medium">
                      R$ {client.totalSpent.toLocaleString("pt-BR")}
                    </td>
                    <td className="p-4">
                      <Badge
                        variant={
                          client.status === "ativo" ? "default" : "secondary"
                        }
                      >
                        {client.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="size-8">
                          <Eye className="size-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="size-8">
                          <Edit className="size-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function FinanceiroModule() {
  const revenueChange = (
    ((financialData.monthlyRevenue - financialData.lastMonthRevenue) /
      financialData.lastMonthRevenue) *
    100
  ).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Receita do mês",
            value: `R$ ${financialData.monthlyRevenue.toLocaleString("pt-BR")}`,
            change: `+${revenueChange}%`,
          },
          {
            label: "Receita mês anterior",
            value: `R$ ${financialData.lastMonthRevenue.toLocaleString("pt-BR")}`,
            change: "",
          },
          {
            label: "Pagamentos pendentes",
            value: `R$ ${financialData.pendingPayments.toLocaleString("pt-BR")}`,
            change: "",
          },
          {
            label: "Ticket médio",
            value: `R$ ${financialData.averageTicket}`,
            change: "",
          },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <p className="text-muted-foreground text-sm">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
              {stat.change && (
                <p className="mt-1 text-sm text-green-600">{stat.change}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Últimas transações</CardTitle>
          <CardDescription>Receitas e pagamentos recentes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {financialData.recentTransactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-green-100 p-2 dark:bg-green-900">
                    <DollarSign className="size-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium">{tx.client}</p>
                    <p className="text-muted-foreground text-sm">
                      {tx.service}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">R$ {tx.amount}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-muted-foreground text-xs">{tx.date}</p>
                    <Badge
                      variant={tx.status === "pago" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {tx.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function RelatoriosModule({
  weeklyData,
  maxRevenue,
}: {
  weeklyData: { day: string; revenue: number; appointments: number }[];
  maxRevenue: number;
}) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Receita da semana</CardTitle>
            <CardDescription>Últimos 7 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyData.map((day) => (
                <div key={day.day} className="flex items-center gap-4">
                  <div className="w-8 text-sm font-medium">{day.day}</div>
                  <div className="flex-1">
                    <div className="bg-muted h-6 overflow-hidden rounded-full">
                      <div
                        className="bg-primary h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${(day.revenue / maxRevenue) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="w-20 text-right text-sm font-medium">
                    R$ {day.revenue.toLocaleString("pt-BR")}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Agendamentos por dia</CardTitle>
            <CardDescription>Últimos 7 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyData.map((day) => (
                <div key={day.day} className="flex items-center gap-4">
                  <div className="w-8 text-sm font-medium">{day.day}</div>
                  <div className="flex-1">
                    <div className="bg-muted h-6 overflow-hidden rounded-full">
                      <div
                        className="h-full rounded-full bg-blue-500 transition-all duration-500"
                        style={{ width: `${(day.appointments / 20) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-20 text-right text-sm font-medium">
                    {day.appointments}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resumo mensal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border p-4 text-center">
              <p className="text-muted-foreground text-sm">
                Total de atendimentos
              </p>
              <p className="text-3xl font-bold">85</p>
              <p className="mt-1 text-sm text-green-600">
                +12% vs. mês anterior
              </p>
            </div>
            <div className="rounded-lg border p-4 text-center">
              <p className="text-muted-foreground text-sm">Novos clientes</p>
              <p className="text-3xl font-bold">23</p>
              <p className="mt-1 text-sm text-green-600">
                +8% vs. mês anterior
              </p>
            </div>
            <div className="rounded-lg border p-4 text-center">
              <p className="text-muted-foreground text-sm">Taxa de retenção</p>
              <p className="text-3xl font-bold">92%</p>
              <p className="mt-1 text-sm text-green-600">
                +3% vs. mês anterior
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
