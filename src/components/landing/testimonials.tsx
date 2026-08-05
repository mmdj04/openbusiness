import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Dra. Marina Santos",
    role: "Clínica Odontológica",
    initials: "MS",
    content:
      "Antes eu usava 3 sistemas diferentes. Agora tudo está em um só lugar. Meu tempo de atendimento caiu pela metade e os pacientes adoram os lembretes pelo WhatsApp.",
    rating: 5,
  },
  {
    name: "Carlos Eduardo",
    role: "Barbearia Style",
    initials: "CE",
    content:
      "O sistema de assinaturas mudou meu negócio. Agora tenho previsibilidade de faturamento e meus barbeiros conseguem ver a agenda pelo celular.",
    rating: 5,
  },
  {
    name: "Ana Paula Ribeiro",
    role: "Restaurante Sabor da Terra",
    initials: "AP",
    content:
      "O painel de pedidos é incrível. Meus garçons pedalam pelo tablet e a cozinha recebe tudo organizado. Acabaram os pedidos perdidos.",
    rating: 5,
  },
  {
    name: "Roberto Mendes",
    role: "Autopeças Mendes",
    initials: "RM",
    content:
      "Controlar estoque de peças é complicado, mas com o sistema ficou simples. Sei exatamente o que precisa repor e o que está parado na prateleira.",
    rating: 5,
  },
  {
    name: "Fernanda Lima",
    role: "Studio de Beleza",
    initials: "FL",
    content:
      "O programa de fidelidade automático fez meus clientes voltarem 40% mais. Não imagino mais meu salão sem esse sistema.",
    rating: 5,
  },
  {
    name: "Dr. Ricardo Alves",
    role: "Escritório de Advocacia",
    initials: "RA",
    content:
      "Organizar processos e prazos nunca foi tão fácil. O sistema me avisa de cada deadline e posso acessar de qualquer lugar.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">
            Depoimentos
          </Badge>
          <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
            Quem já usa, não troca
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Veja o que nossos clientes dizem sobre a plataforma.
          </p>
        </div>

        <div className="mx-auto mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="flex flex-col">
              <CardContent className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="fill-primary text-primary size-4"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground flex-1 text-sm leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <Avatar className="size-9">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-foreground text-sm font-medium">
                      {testimonial.name}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
