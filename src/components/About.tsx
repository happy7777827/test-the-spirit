import { content } from "../content";

const SERIF = { fontFamily: content.pageText.About_1 } as const;

export default function About() {
  const a = content.about;
  return (
    <section className="relative z-10 bg-black text-white px-6 md:px-12 py-24 md:py-32 border-t border-white/15">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-12 md:gap-20 items-start">
        <div>
          <h2 className="text-4xl md:text-6xl leading-[1.02]" style={SERIF}>{a.heading}</h2>
          <p className="mt-6 max-w-xl text-white/65 leading-relaxed">{a.body}</p>
          <ul className="mt-10 grid gap-3">
            {a.points.map((p) => (<li key={p} className="text-white/85 border-b border-white/15 pb-3">{p}</li>))}
          </ul>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-6 w-full">
          {a.stats.map((s) => (
            <div key={s.label} className="border-t border-white/15 pt-4">
              <div className="text-4xl text-[#FDFFB7]" style={SERIF}>{s.value}</div>
              <div className="mt-2 text-xs tracking-[0.16em] text-white/50 uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
