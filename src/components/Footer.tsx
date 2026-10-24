import { Link } from "react-router-dom";
import { content } from "../content";

const SERIF = { fontFamily: content.pageText.About_1 } as const;
const LEGAL = [["Privacy", "/privacy"], ["Terms", "/terms"], ["Journal", "/blog"]] as const;

export default function Footer() {
  return (
    <footer className="relative z-10 bg-black text-white px-6 md:px-12 pt-20 pb-10 border-t border-white/15">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-12 md:gap-20">
        <div>
          <div className="flex items-start leading-none" style={SERIF}>
            <span className="text-[40px] text-[#FDFFB7]">{content.brandName}</span>
            <span className="text-[14px] ml-1 mt-1 text-[#FDFFB7]">©</span>
          </div>
          <p className="mt-5 max-w-sm text-white/60 leading-relaxed">{content.footer.note}</p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          {content.footer.columns.map((col) => (
            <div key={col.heading}>
              <div className="text-xs tracking-[0.16em] uppercase text-white/50">{col.heading}</div>
              <ul className="mt-5 grid gap-2">
                {col.links.map((l) => (<li key={l} className="text-white/85">{l}</li>))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-14 pt-6 border-t border-white/15 flex justify-between gap-4 flex-wrap">
        <span className="text-xs text-white/50">{content.footer.copyright}</span>
        <div className="flex gap-6 flex-wrap">
          {LEGAL.map(([label, href]) => (<Link key={label} to={href} className="text-xs text-white/50">{label}</Link>))}
        </div>
      </div>
    </footer>
  );
}
