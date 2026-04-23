import Image from "next/image";
import Link from "next/link";

const year = new Date().getFullYear();

const columns = [
  {
    label: "Explore",
    items: [
      { name: "Work", href: "/#work" },
      { name: "Process", href: "/#practice" },
      { name: "Studio", href: "/#about" },
      { name: "Start", href: "/#brief" },
    ],
  },
  {
    label: "Contact",
    items: [
      { name: "anoop@flutterly.co.uk", href: "mailto:anoop@flutterly.co.uk" },
      { name: "+44 7780 580 534", href: "tel:+447780580534" },
      {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/anoop-jose-0b308a296/",
        external: true,
      },
    ],
  },
  {
    label: "Company",
    items: [
      { name: "Flutterly Ltd", href: "/#about" },
      { name: "Reading, UK", href: "/#about" },
      { name: "Sipli privacy", href: "/projects/sipli/privacy-policy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background px-5 py-10 text-foreground sm:px-8">
      <div className="mx-auto max-w-[1180px]">
        <div className="grid gap-10 md:grid-cols-[1fr_1.4fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 font-semibold">
              <Image
                src="/flutterly-logo.png"
                alt="Flutterly"
                width={22}
                height={22}
                className="h-[18px] w-[18px] brightness-0"
              />
              Flutterly
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-foreground-secondary">
              Polished web and mobile products, designed and built from
              Reading, UK.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.label}>
                <p className="mb-3 text-xs font-semibold text-foreground">
                  {column.label}
                </p>
                <ul className="space-y-2">
                  {column.items.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        {...("external" in item && item.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="text-xs text-foreground-secondary transition duration-200 hover:text-foreground"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-5 text-xs text-foreground-tertiary sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright © {year} Flutterly Ltd. All rights reserved.</p>
          <p>Built with care in Reading.</p>
        </div>
      </div>
    </footer>
  );
}
