import { content } from "../content";

const SERIF = { fontFamily: content.pageText.About_1 } as const;

export default function Services() {
  return (
    <section className="relative z-10 bg-black text-white px-6 md:px-12 py-24 md:py-32">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-6xl leading-[1.02]" style={SERIF}>{content.services.heading}</h2>
        <p className="mt-6 max-w-xl text-white/65 leading-relaxed">{content.services.intro}</p>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-px bg-white/15">
          {content.services.items.map((item) => (
            <div key={item.no} className="bg-black p-8 md:p-10">
              <div className="text-xs tracking-[0.2em] text-[#FDFFB7]">{item.no}</div>
              <h3 className="mt-4 text-2xl md:text-3xl" style={SERIF}>{item.title}</h3>
              <p className="mt-3 text-white/65 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
