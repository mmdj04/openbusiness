import { Separator } from "@/components/ui/separator";

const footerLinks = {
  Produto: ["Soluções", "Módulos", "Preços", "API"],
  Empresa: ["Sobre", "Blog", "Carreiras", "Contato"],
  Suporte: ["Central de ajuda", "Documentação", "Status", "Comunidade"],
  Legal: ["Privacidade", "Termos de uso", "Cookies"],
};

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="text-foreground text-xl font-bold">
              OpenBusiness
            </div>
            <p className="text-muted-foreground mt-3 max-w-xs text-sm leading-relaxed">
              A plataforma completa para gerenciar seu negócio. Sistemas prontos
              para clínicas, salões, restaurantes e muito mais.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-foreground text-sm font-semibold">
                {category}
              </h3>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-muted-foreground text-xs">
            &copy; {new Date().getFullYear()} OpenBusiness. Todos os direitos
            reservados.
          </p>
          <p className="text-muted-foreground text-xs">
            Feito com dedicação para pequenos negócios do Brasil.
          </p>
        </div>
      </div>
    </footer>
  );
}
