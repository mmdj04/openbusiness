import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Building2, Check, Shield, Zap, Users } from "lucide-react";
import Link from "next/link";
import CardSwap, { Card } from "@/components/ui/card-swap";

const solutions = [
  {
    title: "Clínica Médica",
    description: "Agenda, prontuário, financeiro e WhatsApp automáticos.",
    modules: ["Agenda", "Prontuário", "Financeiro", "WhatsApp"],
    color: "from-blue-500/20 to-blue-600/20",
  },
  {
    title: "Salão de Beleza",
    description: "Agendamento, comissões, estoque e marketing integrado.",
    modules: ["Agenda", "Comissões", "Estoque", "Marketing"],
    color: "from-pink-500/20 to-pink-600/20",
  },
  {
    title: "Restaurante",
    description: "Pedidos, delivery, estoque e financeiro simplificados.",
    modules: ["Pedidos", "Delivery", "Estoque", "Financeiro"],
    color: "from-orange-500/20 to-orange-600/20",
  },
];

export function Hero() {
  return (
    <section className="bg-background relative overflow-hidden border-b">
      <div className="relative mx-auto max-w-7xl px-4 pt-32 pb-24 sm:px-6 sm:pt-40 sm:pb-32 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
            <Badge variant="secondary" className="mb-6 gap-1.5 px-4 py-1.5">
              <Zap className="size-3.5" />
              Gestão completa para seu negócio
            </Badge>

            <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Menos faltas, menos erros,{" "}
              <span className="text-primary">mais lucro</span>
            </h1>

            <p className="text-muted-foreground mt-6 text-lg leading-8 sm:text-xl">
              Agenda inteligente, WhatsApp automático, financeiro organizado e
              muito mais. Tudo em um só lugar para clínicas, salões,
              restaurantes e qualquer negócio.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <a
                href="#pricing"
                className={buttonVariants({
                  size: "lg",
                  className: "gap-2 px-8 text-base",
                })}
              >
                Comece agora
                <ArrowRight className="size-4" />
              </a>
              <Link
                href="/demonstracao"
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className: "gap-2 px-8 text-base",
                })}
              >
                Ver demonstração
              </Link>
            </div>

            <div className="text-muted-foreground mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm lg:justify-start">
              <div className="flex items-center gap-2">
                <Check className="text-primary size-4" />
                Sem taxa de setup
              </div>
              <div className="flex items-center gap-2">
                <Check className="text-primary size-4" />
                Suporte técnico incluso
              </div>
              <div className="flex items-center gap-2">
                <Check className="text-primary size-4" />
                Cancele quando quiser
              </div>
            </div>
          </div>

          <div className="relative h-[400px] sm:h-[450px]">
            <CardSwap
              width={360}
              height={250}
              cardDistance={50}
              verticalDistance={55}
              delay={3500}
              pauseOnHover
              skewAmount={4}
            >
              {solutions.map((sol) => (
                <Card key={sol.title} className="p-0">
                  <div
                    className={cn(
                      "rounded-xl bg-gradient-to-br p-6",
                      sol.color,
                    )}
                  >
                    <h3 className="text-lg font-semibold">{sol.title}</h3>
                    <p className="mt-2 text-sm text-white/70">
                      {sol.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {sol.modules.map((mod) => (
                        <Badge
                          key={mod}
                          variant="secondary"
                          className="text-xs"
                        >
                          {mod}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>

        <div className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { icon: Building2, label: "Negócios ativos", value: "2.400+" },
            { icon: Users, label: "Clientes atendidos", value: "18.000+" },
            { icon: Shield, label: "Uptime garantido", value: "99,9%" },
            { icon: Zap, label: "Tempo de setup", value: "< 24h" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="border-border bg-card rounded-xl border p-4 text-center"
            >
              <stat.icon className="text-muted-foreground mx-auto mb-2 size-5" />
              <div className="text-foreground text-2xl font-bold">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
