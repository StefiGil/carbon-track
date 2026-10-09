import { references } from "@/lib/data/about/content";
import SectionHeading from "./SectionHeading";

export default function References() {
  return (
    <section className="space-y-6">
      <SectionHeading title={references.title} />
      <div className="bg-surface border border-outline-variant rounded-xl p-6">
        <ol className="space-y-3 text-label-sm text-on-surface-variant list-decimal list-inside">
          {references.items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary underline decoration-outline-variant hover:decoration-primary"
              >
                {item.text} <em>{item.italic}</em> {item.suffix}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
