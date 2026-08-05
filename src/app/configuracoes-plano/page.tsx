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
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import {
  Check,
  ArrowLeft,
  ArrowRight,
  Shield,
  Lock,
  Sparkles,
  Stethoscope,
  Smile,
  ShoppingBag,
  Building,
  Users,
  BarChart3,
  Calendar,
  Package,
  Zap,
  Headphones,
  TrendingUp,
  Crown,
  EyeOff,
} from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

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
};

const operationSizes = [
  {
    id: "solo",
    label: "Apenas eu",
    description: "Empreendedor individual",
    multiplier: 1.0,
    icon: "👤",
  },
  {
    id: "pequena",
    label: "2–5 colaboradores",
    description: "Equipe pequena e ágil",
    multiplier: 1.1,
    icon: "👥",
  },
  {
    id: "media",
    label: "6–20 colaboradores",
    description: "Operação em crescimento",
    multiplier: 1.25,
    icon: "🏢",
  },
  {
    id: "grande",
    label: "21–50 colaboradores",
    description: "Empresa consolidada",
    multiplier: 1.45,
    icon: "🏬",
  },
  {
    id: "enterprise",
    label: "51+ colaboradores",
    description: "Grande empresa",
    multiplier: 1.7,
    icon: "🏗️",
  },
];

const userTiers = [
  { id: "1-3", label: "1–3", surcharge: 0, description: "Uso básico" },
  { id: "4-10", label: "4–10", surcharge: 40, description: "Equipe pequena" },
  {
    id: "11-30",
    label: "11–30",
    surcharge: 100,
    description: "Equipe média",
  },
  {
    id: "31+",
    label: "31+",
    surcharge: 200,
    description: "Equipe grande",
  },
];

const volumeTiers = {
  clientes: [
    { label: "Até 500", surcharge: 0, usage: "leve" },
    { label: "501–5.000", surcharge: 50, usage: "moderado" },
    { label: "5.001–50.000", surcharge: 120, usage: "intensivo" },
    { label: "50.000+", surcharge: 250, usage: "enterprise" },
  ],
  pedidos: [
    { label: "Até 200", surcharge: 0, usage: "leve" },
    { label: "201–1.000", surcharge: 50, usage: "moderado" },
    { label: "1.001–10.000", surcharge: 120, usage: "intensivo" },
    { label: "10.000+", surcharge: 250, usage: "enterprise" },
  ],
  agendamentos: [
    { label: "Até 300", surcharge: 0, usage: "leve" },
    { label: "301–2.000", surcharge: 50, usage: "moderado" },
    { label: "2.001–20.000", surcharge: 120, usage: "intensivo" },
    { label: "20.000+", surcharge: 250, usage: "enterprise" },
  ],
  produtos: [
    { label: "Até 500", surcharge: 0, usage: "leve" },
    { label: "501–3.000", surcharge: 50, usage: "moderado" },
    { label: "3.001–30.000", surcharge: 120, usage: "intensivo" },
    { label: "30.000+", surcharge: 250, usage: "enterprise" },
  ],
};

const segments = [
  {
    id: "clinica-medica",
    name: "Clínica médica",
    icon: Stethoscope,
    modules: [
      "agenda",
      "financeiro",
      "crm",
      "prontuario",
      "whatsapp",
      "lembretes",
    ],
    volumes: ["agendamentos", "clientes"],
  },
  {
    id: "clinica-odontologica",
    name: "Clínica odontológica",
    icon: Smile,
    modules: [
      "agenda",
      "financeiro",
      "crm",
      "prontuario",
      "whatsapp",
      "lembretes",
    ],
    volumes: ["agendamentos", "clientes"],
  },
];

const moduleLabels: Record<string, string> = {
  agenda: "Agenda inteligente",
  financeiro: "Financeiro completo",
  estoque: "Estoque",
  whatsapp: "WhatsApp integrado",
  pdv: "PDV integrado",
  crm: "CRM e gestão de clientes",
  relatorios: "Relatórios avançados",
  ia: "IA e automações",
  assinaturas: "Assinaturas e planos",
  prontuario: "Prontuário eletrônico",
  lembretes: "Lembretes avançados",
  "multi-unidades": "Multi-unidades",
};

const volumeLabels: Record<string, string> = {
  clientes: "Clientes por mês",
  pedidos: "Pedidos por mês",
  agendamentos: "Agendamentos por mês",
  produtos: "Produtos cadastrados",
};

const allModules = [
  { id: "agenda", icon: Calendar, popular: true },
  { id: "financeiro", icon: BarChart3, popular: true },
  { id: "estoque", icon: Package, popular: false },
  { id: "whatsapp", icon: Zap, popular: true },
  { id: "pdv", icon: ShoppingBag, popular: false },
  { id: "crm", icon: Users, popular: true },
  { id: "relatorios", icon: BarChart3, popular: false },
  { id: "prontuario", icon: Stethoscope, popular: false },
  { id: "lembretes", icon: Calendar, popular: false },
];

function calculatePrice(
  selectedModules: string[],
  operationSize: string | null,
  userCount: string | null,
  volumes: Record<string, string>,
  supportPremium: boolean,
): { total: number; breakdown: Record<string, number> } {
  const breakdown: Record<string, number> = {};

  breakdown.base = BASE_PRICE;

  let modulesTotal = 0;
  for (const moduleId of selectedModules) {
    modulesTotal += modulePrices[moduleId] || 0;
  }
  breakdown.modulos = modulesTotal;

  const size = operationSizes.find((s) => s.id === operationSize);
  const sizeMultiplier = size?.multiplier || 1.0;
  breakdown.porte = Math.round(
    (BASE_PRICE + modulesTotal) * (sizeMultiplier - 1),
  );

  const userTier = userTiers.find((t) => t.id === userCount);
  breakdown.usuarios = userTier?.surcharge || 0;

  let volumeTotal = 0;
  for (const [key, value] of Object.entries(volumes)) {
    const tier = volumeTiers[key as keyof typeof volumeTiers]?.find(
      (t) => t.label === value,
    );
    if (tier) {
      volumeTotal += tier.surcharge;
    }
  }
  breakdown.volume = volumeTotal;

  breakdown.suporte = supportPremium ? 120 : 0;

  const total = Math.round(
    (BASE_PRICE + modulesTotal) * sizeMultiplier +
      (userTier?.surcharge || 0) +
      volumeTotal +
      (supportPremium ? 120 : 0),
  );

  return { total, breakdown };
}

function formatPrice(value: number): string {
  return value.toLocaleString("pt-BR");
}

function getPriceTier(price: number): {
  label: string;
  color: string;
  icon: React.ReactNode;
} {
  if (price <= 450) {
    return {
      label: "Plano Essencial",
      color: "text-emerald-500",
      icon: <Zap className="size-5" />,
    };
  }
  if (price <= 800) {
    return {
      label: "Plano Profissional",
      color: "text-blue-500",
      icon: <TrendingUp className="size-5" />,
    };
  }
  return {
    label: "Plano Enterprise",
    color: "text-purple-500",
    icon: <Crown className="size-5" />,
  };
}

function CensoredLine() {
  return (
    <div className="text-muted-foreground flex items-center gap-2">
      <EyeOff className="size-4" />
      <div className="bg-muted h-4 w-32 rounded" />
    </div>
  );
}

function ConfiguracoesPlanoContent() {
  const searchParams = useSearchParams();
  const segmentParam = searchParams.get("segmento");

  const [step, setStep] = useState(1);
  const [selectedSegment, setSelectedSegment] = useState<string | null>(
    segmentParam && segments.find((s) => s.id === segmentParam)
      ? segmentParam
      : null,
  );
  const [operationSize, setOperationSize] = useState<string | null>(null);
  const [userCount, setUserCount] = useState<string | null>(null);
  const [selectedModules, setSelectedModules] = useState<string[]>(
    segmentParam
      ? segments.find((s) => s.id === segmentParam)?.modules || []
      : [],
  );
  const [volumes, setVolumes] = useState<Record<string, string>>({});
  const [supportPremium, setSupportPremium] = useState(false);

  const currentSegment = segments.find((s) => s.id === selectedSegment);
  const relevantVolumes = currentSegment?.volumes || [];
  const { total: totalPrice, breakdown } = calculatePrice(
    selectedModules,
    operationSize,
    userCount,
    volumes,
    supportPremium,
  );
  const priceTier = getPriceTier(totalPrice);

  const toggleModule = (moduleId: string) => {
    setSelectedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId],
    );
  };

  const handleSegmentSelect = (segmentId: string) => {
    setSelectedSegment(segmentId);
    const segment = segments.find((s) => s.id === segmentId);
    if (segment) {
      setSelectedModules(segment.modules);
      const initialVolumes: Record<string, string> = {};
      segment.volumes.forEach((v) => {
        initialVolumes[v] = "Até 500";
      });
      setVolumes(initialVolumes);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return selectedSegment !== null;
      case 2:
        return operationSize !== null;
      case 3:
        return userCount !== null;
      case 4:
        return selectedModules.length > 0;
      case 5:
        return relevantVolumes.every((v) => volumes[v]);
      case 6:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="bg-background min-h-screen overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/#pricing"
            className="text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-2 text-sm transition-colors"
          >
            <ArrowLeft className="size-4" />
            Voltar
          </Link>
          <h1 className="text-foreground mt-4 text-3xl font-bold tracking-tight">
            Monte seu plano ideal
          </h1>
          <p className="text-muted-foreground mt-2">
            Responda algumas perguntas rápidas e descubra o plano perfeito para
            o seu negócio.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="mb-6 flex items-center justify-between overflow-x-auto">
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="flex items-center">
                  <div
                    className={`flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                      i + 1 === step
                        ? "bg-primary text-primary-foreground"
                        : i + 1 < step
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {i + 1 < step ? <Check className="size-4" /> : i + 1}
                  </div>
                  {i < 5 && (
                    <div
                      className={`mx-1 h-0.5 w-4 shrink-0 sm:mx-2 sm:w-12 ${
                        i + 1 < step ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Qual é o seu negócio?</CardTitle>
                  <CardDescription>
                    Selecione seu segmento para recomendar os melhores módulos.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {segments.map((segment) => (
                      <button
                        key={segment.id}
                        onClick={() => handleSegmentSelect(segment.id)}
                        className={`flex items-center gap-3 rounded-lg border p-4 text-left transition-all ${
                          selectedSegment === segment.id
                            ? "bg-primary/5 border-primary/30 ring-primary/20 ring-1"
                            : "bg-muted/30 hover:bg-muted/50 hover:shadow-sm"
                        }`}
                      >
                        <segment.icon className="text-muted-foreground size-5" />
                        <span className="font-medium">{segment.name}</span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Qual é o tamanho da operação?</CardTitle>
                  <CardDescription>
                    Empresas maiores precisam de mais recursos e suporte
                    dedicado.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {operationSizes.map((size) => (
                      <button
                        key={size.id}
                        onClick={() => setOperationSize(size.id)}
                        className={`flex w-full items-center gap-4 rounded-lg border p-4 text-left transition-all ${
                          operationSize === size.id
                            ? "bg-primary/5 border-primary/30 ring-primary/20 ring-1"
                            : "bg-muted/30 hover:bg-muted/50 hover:shadow-sm"
                        }`}
                      >
                        <span className="text-2xl">{size.icon}</span>
                        <div className="flex-1">
                          <span className="font-medium">{size.label}</span>
                          <p className="text-muted-foreground text-sm">
                            {size.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Quantas pessoas vão usar o sistema?</CardTitle>
                  <CardDescription>
                    O número de usuários ativos influencia o valor final.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {userTiers.map((tier) => (
                      <button
                        key={tier.id}
                        onClick={() => setUserCount(tier.id)}
                        className={`flex flex-col items-start rounded-lg border p-4 text-left transition-all ${
                          userCount === tier.id
                            ? "bg-primary/5 border-primary/30 ring-primary/20 ring-1"
                            : "bg-muted/30 hover:bg-muted/50 hover:shadow-sm"
                        }`}
                      >
                        <span className="text-lg font-bold">{tier.label}</span>
                        <span className="text-muted-foreground text-sm">
                          {tier.description}
                        </span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle>Quais problemas você quer resolver?</CardTitle>
                  <CardDescription>
                    Selecione todos os módulos que fazem sentido para o seu
                    negócio.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {allModules.map((module) => {
                      const isSelected = selectedModules.includes(module.id);
                      return (
                        <div
                          key={module.id}
                          className={`rounded-lg border p-4 transition-colors ${
                            isSelected
                              ? "bg-primary/5 border-primary/30"
                              : "bg-muted/30 hover:bg-muted/50"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <Checkbox
                              id={module.id}
                              checked={isSelected}
                              onCheckedChange={() => toggleModule(module.id)}
                              className="mt-0.5"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <Label
                                  htmlFor={module.id}
                                  className="cursor-pointer font-medium"
                                >
                                  {moduleLabels[module.id]}
                                </Label>
                                {module.popular && (
                                  <Badge
                                    variant="secondary"
                                    className="bg-primary/10 text-primary text-xs"
                                  >
                                    <Sparkles className="mr-1 size-3" />
                                    Popular
                                  </Badge>
                                )}
                              </div>
                              <p className="text-primary mt-1 text-sm">
                                + R$ {modulePrices[module.id]}/mês
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 5 && (
              <Card>
                <CardHeader>
                  <CardTitle>Qual o volume mensal?</CardTitle>
                  <CardDescription>
                    O volume de uso ajuda a dimensionar o plano ideal para você.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {relevantVolumes.map((vol) => (
                    <div key={vol}>
                      <Label className="text-sm font-medium">
                        {volumeLabels[vol]}
                      </Label>
                      <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                        {volumeTiers[vol as keyof typeof volumeTiers].map(
                          (tier) => (
                            <button
                              key={tier.label}
                              onClick={() =>
                                setVolumes((prev) => ({
                                  ...prev,
                                  [vol]: tier.label,
                                }))
                              }
                              className={`rounded-lg border p-3 text-left text-sm transition-all ${
                                volumes[vol] === tier.label
                                  ? "bg-primary/5 border-primary/30 ring-primary/20 ring-1"
                                  : "bg-muted/30 hover:bg-muted/50"
                              }`}
                            >
                              <span className="font-medium">{tier.label}</span>
                              <span className="text-muted-foreground mt-1 block text-xs">
                                Uso {tier.usage}
                              </span>
                            </button>
                          ),
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {step === 6 && (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`${priceTier.color}`}>{priceTier.icon}</div>
                    <div>
                      <CardTitle>{priceTier.label}</CardTitle>
                      <CardDescription>
                        Calculado especialmente para o seu negócio
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-lg border p-4">
                    <h3 className="mb-3 font-semibold">Módulos incluídos:</h3>
                    <div className="space-y-2">
                      {selectedModules.map((moduleId) => (
                        <div key={moduleId} className="flex items-center gap-2">
                          <Check className="text-primary size-4" />
                          <span>{moduleLabels[moduleId]}</span>
                          <span className="text-muted-foreground ml-auto text-sm">
                            + R$ {modulePrices[moduleId]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="mb-3 font-semibold">
                      Detalhamento do valor:
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Plano base
                        </span>
                        <span>R$ {breakdown.base}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Módulos ({selectedModules.length})
                        </span>
                        <span>+ R$ {breakdown.modulos}</span>
                      </div>
                      {breakdown.porte > 0 && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Porte da operação
                          </span>
                          <span>+ R$ {breakdown.porte}</span>
                        </div>
                      )}
                      {breakdown.usuarios > 0 && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Usuários
                          </span>
                          <span>+ R$ {breakdown.usuarios}</span>
                        </div>
                      )}
                      {breakdown.volume > 0 && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Volume</span>
                          <span>+ R$ {breakdown.volume}</span>
                        </div>
                      )}
                      {breakdown.suporte > 0 && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Suporte prioritário
                          </span>
                          <span>+ R$ {breakdown.suporte}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-lg border p-4">
                    <Checkbox
                      id="suporte"
                      checked={supportPremium}
                      onCheckedChange={(checked) =>
                        setSupportPremium(checked === true)
                      }
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor="suporte"
                        className="cursor-pointer font-medium"
                      >
                        <Headphones className="mr-1 inline size-4" />
                        Suporte prioritário 24/7
                      </Label>
                      <p className="text-primary text-sm">+ R$ 120/mês</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {step > 1 && step < 6 && (
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(step - 1)}>
                  <ArrowLeft className="mr-2 size-4" />
                  Voltar
                </Button>
                <Button
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                >
                  Próximo
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </div>
            )}

            {step === 6 && (
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1"
                >
                  Recomeçar
                </Button>
                <Button className="flex-1" size="lg">
                  <Lock className="mr-2 size-4" />
                  Finalizar assinatura
                </Button>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Resumo do pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Segmento</span>
                    {step >= 1 && selectedSegment ? (
                      <span className="font-medium">
                        {currentSegment?.name}
                      </span>
                    ) : (
                      <CensoredLine />
                    )}
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Porte</span>
                    {step >= 2 && operationSize ? (
                      <span className="font-medium">
                        {operationSizes.find((s) => s.id === operationSize)
                          ?.label || ""}
                      </span>
                    ) : (
                      <CensoredLine />
                    )}
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Usuários</span>
                    {step >= 3 && userCount ? (
                      <span className="font-medium">
                        {userCount} {userCount === "1" ? "pessoa" : "pessoas"}
                      </span>
                    ) : (
                      <CensoredLine />
                    )}
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <span className="text-muted-foreground text-sm">Módulos</span>
                  {step >= 4 && selectedModules.length > 0 ? (
                    <div className="space-y-1">
                      {selectedModules.map((moduleId) => (
                        <div
                          key={moduleId}
                          className="flex items-center justify-between text-sm"
                        >
                          <span>{moduleLabels[moduleId]}</span>
                          <span className="text-muted-foreground">
                            +R$ {modulePrices[moduleId]}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <CensoredLine />
                      <CensoredLine />
                      <CensoredLine />
                    </div>
                  )}
                </div>

                <Separator />

                <div className="space-y-2">
                  <span className="text-muted-foreground text-sm">Volume</span>
                  {step >= 5 && Object.keys(volumes).length > 0 ? (
                    <div className="space-y-1">
                      {Object.entries(volumes).map(([key, value]) => (
                        <div
                          key={key}
                          className="flex items-center justify-between text-sm"
                        >
                          <span>{volumeLabels[key]}</span>
                          <span className="text-muted-foreground">{value}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <CensoredLine />
                      <CensoredLine />
                    </div>
                  )}
                </div>

                <Separator />

                {step >= 6 ? (
                  <div className="space-y-3">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Plano base
                        </span>
                        <span>R$ {BASE_PRICE}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Módulos ({selectedModules.length})
                        </span>
                        <span>+ R$ {breakdown.modulos}</span>
                      </div>
                      {breakdown.porte > 0 && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Porte da operação
                          </span>
                          <span>+ R$ {breakdown.porte}</span>
                        </div>
                      )}
                      {breakdown.usuarios > 0 && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Usuários
                          </span>
                          <span>+ R$ {breakdown.usuarios}</span>
                        </div>
                      )}
                      {breakdown.volume > 0 && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Volume</span>
                          <span>+ R$ {breakdown.volume}</span>
                        </div>
                      )}
                    </div>

                    <Separator />

                    <div className="bg-muted/50 rounded-lg p-4 text-center">
                      <p className="text-muted-foreground text-sm">
                        Total mensal
                      </p>
                      <p className="text-foreground mt-1 text-3xl font-bold">
                        R$ {formatPrice(totalPrice)}
                      </p>
                      <p className="text-muted-foreground text-xs">/mês</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <p className="text-muted-foreground text-sm">
                      Total mensal
                    </p>
                    <CensoredLine />
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="text-primary size-4" />
                    <span>Sem taxa de setup</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="text-primary size-4" />
                    <span>Cancele quando quiser</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="text-primary size-4" />
                    <span>Backup automático incluso</span>
                  </div>
                </div>

                <div className="text-muted-foreground flex items-center justify-center gap-2 text-xs">
                  <Shield className="size-3" />
                  <span>Pagamento seguro e criptografado</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConfiguracoesPlanoPage() {
  return (
    <Suspense fallback={<div className="bg-background min-h-screen" />}>
      <ConfiguracoesPlanoContent />
    </Suspense>
  );
}
