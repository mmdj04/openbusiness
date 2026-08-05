import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, Building2, Check, Shield, Zap, Users } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="bg-background relative overflow-hidden border-b">
      <div className="relative mx-auto max-w-7xl px-4 pt-32 pb-24 sm:px-6 sm:pt-40 sm:pb-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
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
            muito mais. Tudo em um só lugar para clínicas, salões, restaurantes
            e qualquer negócio.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
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

          <div className="text-muted-foreground mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm">
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
