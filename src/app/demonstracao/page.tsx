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
  Check,
  ArrowLeft,
  ArrowRight,
  Calendar,
  Users,
  BarChart3,
  Settings,
  Bell,
  MessageSquare,
  FileText,
  CreditCard,
  Package,
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
  Sparkles,
  Zap,
  TrendingUp,
  Crown,
  Play,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const demoSteps = [
  {
    title: "Qual é o seu negócio?",
    description: "Selecione seu segmento para recomendar os melhores módulos.",
    options: [
      { id: "clinica", name: "Clínica médica", icon: Stethoscope },
      { id: "salao", name: "Salão de beleza", icon: Scissors },
      { id: "restaurante", name: "Restaurante", icon: UtensilsCrossed },
      { id: "academia", name: "Academia", icon: Dumbbell },
      { id: "petshop", name: "Pet shop", icon: PawPrint },
      { id: "autopecas", name: "Autopeças", icon: ShoppingBag },
    ],
  },
  {
    title: "Qual é o tamanho da operação?",
    description:
      "Empresas maiores precisam de mais recursos e suporte dedicado.",
    options: [
      { id: "solo", name: "Apenas eu", multiplier: "1.0x" },
      { id: "pequena", name: "2–5 colaboradores", multiplier: "1.1x" },
      { id: "media", name: "6–20 colaboradores", multiplier: "1.25x" },
      { id: "grande", name: "21–50 colaboradores", multiplier: "1.45x" },
    ],
  },
  {
    title: "Quantas pessoas vão usar o sistema?",
    description: "O número de usuários ativos influencia o valor final.",
    options: [
      { id: "1-3", name: "1–3 pessoas", surcharge: "R$ 0" },
      { id: "4-10", name: "4–10 pessoas", surcharge: "R$ 40" },
      { id: "11-30", name: "11–30 pessoas", surcharge: "R$ 100" },
      { id: "31+", name: "31+ pessoas", surcharge: "R$ 200" },
    ],
  },
];

const dashboardPreview = {
  stats: [
    { label: "Agendamentos hoje", value: "12", change: "+3" },
    { label: "Clientes ativos", value: "248", change: "+15" },
    { label: "Receita do mês", value: "R$ 18.450", change: "+12%" },
    { label: "Taxa de presença", value: "87%", change: "+5%" },
  ],
  recentAppointments: [
    {
      time: "09:00",
      client: "Maria Silva",
      service: "Corte + Escova",
      status: "Confirmado",
    },
    {
      time: "10:30",
      client: "João Santos",
      service: "Barba",
      status: "Pendente",
    },
    {
      time: "11:00",
      client: "Ana Costa",
      service: "Manicure",
      status: "Confirmado",
    },
    {
      time: "14:00",
      client: "Pedro Lima",
      service: "Corte",
      status: "Confirmado",
    },
  ],
};

export default function DemonstracaoPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const [showDashboard, setShowDashboard] = useState(false);

  const handleSelect = (stepId: string, optionId: string) => {
    setSelectedOptions((prev) => ({ ...prev, [stepId]: optionId }));
    if (currentStep < demoSteps.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    } else {
      setTimeout(() => setShowDashboard(true), 300);
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-2 text-sm transition-colors"
          >
            <ArrowLeft className="size-4" />
            Voltar ao site
          </Link>
          <h1 className="text-foreground mt-4 text-3xl font-bold tracking-tight">
            Demonstração do OpenBusiness
          </h1>
          <p className="text-muted-foreground mt-2">
            Veja como funciona na prática. Experimente o assistente de
            configuração e confira o painel de controle.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="text-primary size-5" />
                  Assistente de Configuração
                </CardTitle>
                <CardDescription>
                  Monte seu plano em poucos passos. Veja como é simples.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!showDashboard ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      {demoSteps.map((_, i) => (
                        <div key={i} className="flex items-center">
                          <div
                            className={`flex size-8 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                              i === currentStep
                                ? "bg-primary text-primary-foreground"
                                : i < currentStep
                                  ? "bg-primary/20 text-primary"
                                  : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {i < currentStep ? (
                              <Check className="size-4" />
                            ) : (
                              i + 1
                            )}
                          </div>
                          {i < demoSteps.length - 1 && (
                            <div
                              className={`mx-2 h-0.5 w-12 ${
                                i < currentStep ? "bg-primary" : "bg-muted"
                              }`}
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold">
                        {demoSteps[currentStep].title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {demoSteps[currentStep].description}
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {demoSteps[currentStep].options.map((option) => (
                        <button
                          key={option.id}
                          onClick={() =>
                            handleSelect(
                              demoSteps[currentStep].title,
                              option.id,
                            )
                          }
                          className={`flex items-center gap-3 rounded-lg border p-4 text-left transition-all hover:shadow-md ${
                            selectedOptions[demoSteps[currentStep].title] ===
                            option.id
                              ? "bg-primary/5 border-primary/30 ring-primary/20 ring-1"
                              : "bg-muted/30 hover:bg-muted/50"
                          }`}
                        >
                          {"icon" in option && option.icon && (
                            <option.icon className="text-muted-foreground size-5" />
                          )}
                          <div className="flex-1">
                            <span className="font-medium">{option.name}</span>
                            {"multiplier" in option && option.multiplier && (
                              <span className="text-muted-foreground ml-2 text-sm">
                                {option.multiplier}
                              </span>
                            )}
                            {"surcharge" in option && option.surcharge && (
                              <span className="text-primary ml-2 text-sm">
                                {option.surcharge}
                              </span>
                            )}
                          </div>
                          <ChevronRight className="text-muted-foreground size-4" />
                        </button>
                      ))}
                    </div>

                    {currentStep > 0 && (
                      <Button
                        variant="outline"
                        onClick={() => setCurrentStep(currentStep - 1)}
                      >
                        <ArrowLeft className="mr-2 size-4" />
                        Voltar
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-center dark:border-green-800 dark:bg-green-950">
                      <Check className="mx-auto mb-2 size-8 text-green-600" />
                      <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                        Plano configurado!
                      </h3>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        Seu plano personalizado está pronto. Confira o painel ao
                        lado.
                      </p>
                    </div>

                    <div className="rounded-lg border p-4">
                      <h4 className="mb-2 font-medium">Resumo do seu plano:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Segmento:
                          </span>
                          <span>
                            {selectedOptions["Qual é o seu negócio?"] ||
                              "Clínica médica"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Porte:</span>
                          <span>
                            {selectedOptions["Qual é o tamanho da operação?"] ||
                              "2–5 colaboradores"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Usuários:
                          </span>
                          <span>
                            {selectedOptions[
                              "Quantas pessoas vão usar o sistema?"
                            ] || "4–10 pessoas"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4 text-center">
                      <p className="text-muted-foreground text-sm">
                        Valor mensal
                      </p>
                      <p className="text-foreground mt-1 text-3xl font-bold">
                        R$ 689
                      </p>
                      <p className="text-muted-foreground text-xs">/mês</p>
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => {
                        setCurrentStep(0);
                        setSelectedOptions({});
                        setShowDashboard(false);
                      }}
                      className="w-full"
                    >
                      Recomeçar demo
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="text-primary size-5" />
                  Como funciona o pricing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 flex size-8 shrink-0 items-center justify-center rounded-full">
                    <span className="text-primary text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Responda 6 perguntas</h4>
                    <p className="text-muted-foreground text-sm">
                      Segmento, porte, usuários, módulos, volume e suporte.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 flex size-8 shrink-0 items-center justify-center rounded-full">
                    <span className="text-primary text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium">
                      Preço calculado automaticamente
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Algoritmo inteligente baseado no uso real do seu negócio.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 flex size-8 shrink-0 items-center justify-center rounded-full">
                    <span className="text-primary text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Assine e comece a usar</h4>
                    <p className="text-muted-foreground text-sm">
                      Sem setup, sem burocracia. Ativação imediata.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="overflow-hidden">
              <CardHeader className="bg-muted/50">
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="size-5" />
                  Painel de Controle
                </CardTitle>
                <CardDescription>
                  Veja como fica o painel após a configuração.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="border-b p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Stethoscope className="text-primary size-5" />
                      <span className="font-medium">Clínica Saúde+</span>
                    </div>
                    <Badge variant="secondary">Plano Profissional</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 p-4">
                  {dashboardPreview.stats.map((stat) => (
                    <div key={stat.label} className="rounded-lg border p-3">
                      <p className="text-muted-foreground text-xs">
                        {stat.label}
                      </p>
                      <p className="text-foreground mt-1 text-xl font-bold">
                        {stat.value}
                      </p>
                      <p className="text-xs text-green-600">{stat.change}</p>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="p-4">
                  <h4 className="mb-3 font-medium">Próximos agendamentos</h4>
                  <div className="space-y-2">
                    {dashboardPreview.recentAppointments.map((apt, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-muted-foreground text-sm font-medium">
                            {apt.time}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{apt.client}</p>
                            <p className="text-muted-foreground text-xs">
                              {apt.service}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant={
                            apt.status === "Confirmado"
                              ? "default"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          {apt.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-4 gap-2 p-4">
                  {[
                    { icon: Calendar, label: "Agenda" },
                    { icon: Users, label: "Clientes" },
                    { icon: BarChart3, label: "Financeiro" },
                    { icon: Settings, label: "Config" },
                  ].map((item) => (
                    <button
                      key={item.label}
                      className="hover:bg-muted/50 flex flex-col items-center gap-1 rounded-lg border p-2 transition-colors"
                    >
                      <item.icon className="size-4" />
                      <span className="text-xs">{item.label}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="size-5" />
                  Módulos disponíveis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    {
                      icon: Calendar,
                      name: "Agenda inteligente",
                      included: true,
                    },
                    { icon: Users, name: "CRM", included: true },
                    { icon: CreditCard, name: "Financeiro", included: true },
                    { icon: MessageSquare, name: "WhatsApp", included: true },
                    { icon: Package, name: "Estoque", included: true },
                    { icon: Bell, name: "Lembretes", included: true },
                    { icon: BarChart3, name: "Relatórios", included: true },
                    { icon: Sparkles, name: "IA", included: false },
                  ].map((module) => (
                    <div
                      key={module.name}
                      className={`flex items-center gap-2 rounded-lg border p-2 ${
                        module.included
                          ? "bg-primary/5 border-primary/20"
                          : "bg-muted/30"
                      }`}
                    >
                      <module.icon className="size-4" />
                      <span className="text-xs">{module.name}</span>
                      {module.included && (
                        <Check className="text-primary ml-auto size-3" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold">
                    Pronto para experimentar?
                  </h3>
                  <p className="text-muted-foreground mt-2 text-sm">
                    Configure seu plano personalizado e veja o valor exato para
                    o seu negócio.
                  </p>
                  <Link href="/configuracoes-plano">
                    <Button className="mt-4" size="lg">
                      <Play className="mr-2 size-4" />
                      Configurar meu plano
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
