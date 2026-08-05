import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-border bg-card relative overflow-hidden rounded-2xl border px-6 py-16 sm:px-12 sm:py-20">
          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
              Pronto para transformar a gestao do seu negocio?
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Comece hoje mesmo. Sem taxa de setup, sem fidelidade. Cancele
              quando quiser.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="gap-2 px-8 text-base">
                Comece agora
                <ArrowRight className="size-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 px-8 text-base"
              >
                Fale com um especialista
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
