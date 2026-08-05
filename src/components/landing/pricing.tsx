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
  "Agenda inteligente com lembretes",
  "CRM e gestão de clientes",
  "Financeiro completo",
  "WhatsApp integrado",
  "Relatórios básicos",
  "Backup automático",
  "Usuários ilimitados",
  "Suporte técnico incluso",
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
            Menos faltas, mais clientes, mais lucro
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Um plano que resolve problemas reais do seu negócio. Cancele quando
            quiser.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-lg">
          <Card className="border-primary ring-primary/20 overflow-visible shadow-lg ring-1">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">OpenBusiness</CardTitle>
              <CardDescription>
                Monte seu plano ideal em poucos passos
              </CardDescription>
              <div className="mt-4">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-foreground text-5xl font-bold">
                    Monte seu plano
                  </span>
                </div>
                <p className="text-muted-foreground mt-3 text-sm">
                  Preço calculado pelo uso real do seu negócio.
                  <br />
                  Responda poucas perguntas e descubra seu valor.
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
