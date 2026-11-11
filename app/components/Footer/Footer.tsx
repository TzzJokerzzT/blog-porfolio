import data from "@/shared/data/data.json";

const { name, social } = data.basics;

const links = [
  { name: "GitHub", href: social.github },
  { name: "LinkedIn", href: social.linkedin },
  { name: "X", href: social.twitter },
];

export function Footer() {
  return (
    <footer className="border-t border-divider">
      <div className="page-shell ui-meta flex flex-col gap-3 py-8 text-foreground-secondary sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {name}
        </p>
        <nav aria-label="Elsewhere" className="flex gap-5">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center transition-colors hover:text-accent"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
