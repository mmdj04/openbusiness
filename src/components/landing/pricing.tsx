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
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

const features = [
  "Módulos sob demanda",
  "Usuários ilimitados",
  "Suporte prioritário",
  "Backup diário",
  "Relatórios avançados",
  "WhatsApp integrado",
  "App mobile incluso",
  "Cancele quando quiser",
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-muted/30 border-y py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">
            Planos e preços
          </Badge>
          <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
            Invista na gestão do seu negócio
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Um plano flexível que cresce com o seu negócio.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-lg">
          <Card className="border-primary ring-primary/20 overflow-visible shadow-lg ring-1">
            <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
              <Badge className="px-3">Plano único</Badge>
            </div>

            <CardHeader className="text-center">
              <CardTitle className="text-xl">OpenBaaS</CardTitle>
              <CardDescription>
                Escolha apenas os módulos que precisa
              </CardDescription>
              <div className="mt-4">
                <span className="text-muted-foreground text-sm line-through">
                  R$ 1.489,90
                </span>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-foreground text-5xl font-bold">
                    R$ 397
                  </span>
                  <span className="text-muted-foreground">/mês</span>
                </div>
                <p className="text-muted-foreground mt-2 text-sm">
                  Valor com 3 módulos inclusos
                </p>
              </div>
            </CardHeader>

            <CardContent className="flex-1">
              <ul className="space-y-3">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="text-primary mt-0.5 size-4 shrink-0" />
                    <span className="text-muted-foreground text-sm">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <Link href="/configuracoes-plano" className="w-full">
                <Button className="w-full" size="lg">
                  Configurar meu plano
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        <p className="text-muted-foreground mt-8 text-center text-sm">
          Precisa de algo personalizado?{" "}
          <a
            href="#contact"
            className="text-primary underline-offset-4 hover:underline"
          >
            Fale conosco
          </a>{" "}
          para um plano sob medida.
        </p>
      </div>
    </section>
  );
}
