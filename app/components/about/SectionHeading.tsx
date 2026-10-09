interface SectionHeadingProps {
  title: string;
}

export default function SectionHeading({ title }: SectionHeadingProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-1.5 h-6 bg-primary rounded-full" />
      <h2 className="text-h3 md:text-h2 font-semibold text-on-surface tracking-tight">{title}</h2>
    </div>
  );
}
