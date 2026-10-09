import { notice } from "@/lib/data/about/content";

export default function NoticeBanner() {
  return (
    <section className="bg-primary-fixed/40 border border-primary-fixed-dim rounded-xl p-6 flex items-start gap-4">
      <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 text-on-primary-fixed-variant">
        <span className="material-symbols-outlined text-2xl">info</span>
      </div>
      <div className="space-y-1.5">
        <h3 className="text-body-md font-semibold text-on-primary-fixed tracking-tight">{notice.title}</h3>
        <p className="text-label-sm text-on-primary-fixed-variant leading-relaxed">{notice.text}</p>
      </div>
    </section>
  );
}
