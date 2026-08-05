"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Check,
  CreditCard,
  QrCode,
  ArrowLeft,
  Shield,
  Lock,
  Sparkles,
  TrendingDown,
  Zap,
} from "lucide-react";
import Link from "next/link";

const modules = [
  {
    id: "agenda",
    name: "Agenda",
    description: "Agendamento de compromissos e horários",
    price: 49,
    included: true,
    popular: true,
  },
  {
    id: "clientes",
    name: "Clientes",
    description: "Cadastro e gestão de clientes",
    price: 39,
    included: true,
    popular: true,
  },
  {
    id: "financeiro",
    name: "Financeiro",
    description: "Contas a pagar, receber e fluxo de caixa",
    price: 69,
    included: true,
    popular: true,
  },
  {
    id: "estoque",
    name: "Estoque",
    description: "Controle de produtos e entradas/saídas",
    price: 144,
    included: false,
    popular: false,
  },
  {
    id: "relatorios",
    name: "Relatórios",
    description: "Dashboards e indicadores do negócio",
    price: 114,
    included: false,
    popular: false,
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    description: "Envio automático de mensagens e lembretes",
    price: 174,
    included: false,
    popular: true,
  },
  {
    id: "prontuario",
    name: "Prontuário",
    description: "Prontuário eletrônico para clínicas",
    price: 194,
    included: false,
    popular: false,
  },
  {
    id: "lembretes",
    name: "Lembretes",
    description: "Notificações automáticas para clientes",
    price: 82,
    included: false,
    popular: false,
  },
  {
    id: "pdv",
    name: "PDV",
    description: "Ponto de venda integrado",
    price: 214,
    included: false,
    popular: false,
  },
  {
    id: "entregas",
    name: "Entregas",
    description: "Rastreamento de entregas e motoboys",
    price: 154,
    included: false,
    popular: false,
  },
  {
    id: "assinaturas",
    name: "Assinaturas",
    description: "Cobrança recorrente e planos",
    price: 144,
    included: false,
    popular: false,
  },
  {
    id: "app-mobile",
    name: "App mobile",
    description: "Acesso pelo celular para clientes e equipe",
    price: 264,
    included: false,
    popular: true,
  },
];

const paymentMethods = [
  {
    id: "credit",
    name: "Cartão de crédito",
    description: "Parcelamento em até 12x sem juros",
    icon: CreditCard,
  },
  {
    id: "debit",
    name: "Cartão de débito",
    description: "Pagamento à vista",
    icon: CreditCard,
  },
  {
    id: "pix",
    name: "PIX",
    description: "Pagamento instantâneo",
    icon: QrCode,
  },
];

const BASE_PRICE = 397;
const MAX_PRICE = 1489.9;

export default function ConfiguracoesPlanoPage() {
  const [selectedModules, setSelectedModules] = useState<string[]>(
    modules.filter((m) => m.included).map((m) => m.id),
  );
  const [paymentMethod, setPaymentMethod] = useState("credit");

  const toggleModule = (moduleId: string) => {
    const selectedModule = modules.find((m) => m.id === moduleId);
    if (selectedModule?.included) return;

    setSelectedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId],
    );
  };

  const extraModules = modules.filter(
    (m) => selectedModules.includes(m.id) && !m.included,
  );
  const extraModulesValue = extraModules.reduce((sum, m) => sum + m.price, 0);

  const rawTotal = BASE_PRICE + extraModulesValue;
  const hasDiscount = rawTotal > MAX_PRICE;
  const discountAmount = hasDiscount
    ? Math.round((rawTotal - MAX_PRICE) * 100) / 100
    : 0;
  const discountPercentage = hasDiscount
    ? Math.round((discountAmount / rawTotal) * 100)
    : 0;
  const finalPrice = Math.round(Math.min(rawTotal, MAX_PRICE) * 100) / 100;

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/#pricing"
            className="text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-2 text-sm transition-colors"
          >
            <ArrowLeft className="size-4" />
            Voltar aos planos
          </Link>
          <h1 className="text-foreground mt-4 text-3xl font-bold tracking-tight">
            Configurar seu plano
          </h1>
          <p className="text-muted-foreground mt-2">
            Personalize seu plano selecionando os módulos que precisa
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-full text-sm font-bold">
                    1
                  </span>
                  Seus módulos
                </CardTitle>
                <CardDescription>
                  3 módulos já inclusos no plano. Adicione mais para
                  personalizar.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  {modules.map((module) => {
                    const isSelected = selectedModules.includes(module.id);
                    const discountedPrice = hasDiscount
                      ? Math.round(
                          module.price * (1 - discountPercentage / 100),
                        )
                      : module.price;

                    return (
                      <div
                        key={module.id}
                        className={`rounded-lg border p-4 transition-colors ${
                          isSelected
                            ? "bg-primary/5 border-primary/30"
                            : "bg-muted/30 hover:bg-muted/50"
                        } ${module.included ? "opacity-75" : ""}`}
                      >
                        <div className="flex items-start gap-3">
                          <Checkbox
                            id={module.id}
                            checked={isSelected}
                            onCheckedChange={() => toggleModule(module.id)}
                            disabled={module.included}
                            className="mt-0.5"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <Label
                                htmlFor={module.id}
                                className="cursor-pointer font-medium"
                              >
                                {module.name}
                              </Label>
                              {module.included && (
                                <Badge variant="secondary" className="text-xs">
                                  Incluso
                                </Badge>
                              )}
                              {module.popular && !module.included && (
                                <Badge
                                  variant="secondary"
                                  className="bg-primary/10 text-primary text-xs"
                                >
                                  <Sparkles className="mr-1 size-3" />
                                  Popular
                                </Badge>
                              )}
                            </div>
                            <p className="text-muted-foreground mt-1 text-sm">
                              {module.description}
                            </p>
                            {!module.included && (
                              <div className="mt-2 flex items-center gap-2">
                                {hasDiscount && (
                                  <span className="text-muted-foreground text-sm line-through">
                                    R$ {module.price}
                                  </span>
                                )}
                                <span className="text-primary text-sm font-medium">
                                  R$ {discountedPrice}/mês
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-full text-sm font-bold">
                    2
                  </span>
                  Forma de pagamento
                </CardTitle>
                <CardDescription>Escolha como deseja pagar.</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-3"
                >
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`rounded-lg border p-4 transition-colors ${
                        paymentMethod === method.id
                          ? "bg-primary/5 border-primary/30"
                          : "bg-muted/30 hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <RadioGroupItem value={method.id} id={method.id} />
                        <method.icon className="text-muted-foreground size-5" />
                        <div className="flex-1">
                          <Label
                            htmlFor={method.id}
                            className="cursor-pointer font-medium"
                          >
                            {method.name}
                          </Label>
                          <p className="text-muted-foreground text-sm">
                            {method.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Resumo do pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Plano base (3 módulos)
                  </span>
                  <span className="font-medium">R$ {BASE_PRICE}/mês</span>
                </div>

                {extraModules.length > 0 && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      {extraModules.map((module) => (
                        <div
                          key={module.id}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-muted-foreground">
                            {module.name}
                          </span>
                          <span className="font-medium">
                            + R$ {module.price}
                          </span>
                        </div>
                      ))}
                      <div className="flex items-center justify-between text-sm font-medium">
                        <span className="text-muted-foreground">
                          Subtotal módulos
                        </span>
                        <span>R$ {extraModulesValue}</span>
                      </div>
                    </div>
                  </>
                )}

                <Separator />

                {hasDiscount && (
                  <div className="rounded-lg bg-green-500/10 p-3">
                    <div className="flex items-center gap-2">
                      <Zap className="size-4 text-green-600 dark:text-green-400" />
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">
                        Desconto por volume aplicado!
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-green-600 dark:text-green-400">
                      Quanto mais módulos, maior o desconto. Você está
                      economizando R$ {Math.round(discountAmount)}/mês
                    </p>
                  </div>
                )}

                <div className="space-y-1">
                  {hasDiscount && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm line-through">
                        R$ {rawTotal}/mês
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>R$ {finalPrice}/mês</span>
                  </div>
                </div>

                <div className="bg-muted/50 mt-4 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="text-primary size-4" />
                    <span>Sem taxa de setup</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-sm">
                    <Check className="text-primary size-4" />
                    <span>Cancele quando quiser</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-sm">
                    <Check className="text-primary size-4" />
                    <span>Suporte técnico incluso</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button className="w-full" size="lg">
                  <Lock className="mr-2 size-4" />
                  Finalizar assinatura
                </Button>
                <div className="text-muted-foreground flex items-center justify-center gap-2 text-xs">
                  <Shield className="size-3" />
                  <span>Pagamento seguro e criptografado</span>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
