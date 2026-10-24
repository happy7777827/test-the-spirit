import { content } from "../content";

const SERIF = { fontFamily: content.pageText.About_1 } as const;

export default function Contact() {
  const c = content.contact;
  const rows = [["Email", c.email], ["Phone", c.phone], ["Studio", c.address], ["Hours", c.hours]] as const;
  return (
    <section className="relative z-10 bg-black text-white px-6 md:px-12 py-24 md:py-32 border-t border-white/15">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-12 md:gap-20 items-start">
        <div>
          <h2 className="text-4xl md:text-6xl leading-[1.02]" style={SERIF}>{c.heading}</h2>
          <p className="mt-6 max-w-lg text-white/65 leading-relaxed">{c.body}</p>
          <button className="mt-10 rounded-full border border-white/50 px-8 py-4 text-sm tracking-[0.12em] uppercase hover:bg-white/10 transition-colors">
            {c.ctaLabel}
          </button>
        </div>
        <div className="grid gap-4 w-full">
          {rows.map(([label, value]) => (
            <div key={label} className="flex justify-between gap-4 flex-wrap border-b border-white/15 pb-3">
              <span className="text-xs tracking-[0.16em] uppercase text-white/50">{label}</span>
              <span className="text-white/90">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
