import { SiteFooter } from "@/global/components/SiteFooter";
import { SiteHeader } from "@/global/components/SiteHeader";
import { SmoothScroll } from "@/global/components/SmoothScroll";
import { articles, getPage } from "@/global/site";
import type { Block } from "@/global/site/types";
import { when } from "./Blocks";
import { Finale } from "./Finale";
import { Intro } from "./Intro";
import { Investors } from "./Investors";
import { Latest } from "./Latest";
import { Projects } from "./Projects";
import { Reveal } from "./Reveal";
import { Stays } from "./Stays";

/** The group home: the original scroll story, in the order of the client's wireframe. */
export function HomeView() {
  const page = getPage("/")!;
  const get = <K extends Block["kind"]>(id: string, kind: K) =>
    page.blocks.find((b): b is Extract<Block, { kind: K }> => b.id === id && b.kind === kind)!;
  const doors = get("doors", "cards");
  const check = get("check", "cards");
  const abroad = get("abroad", "band");
  const latest = get("latest", "media");
  const guides = get("guides", "listing");
  const ask = get("ask", "form");

  return (
    <div className="site">
      <a href="#projects" className="skip">
        Skip to content
      </a>
      <SmoothScroll />
      <SiteHeader hotel={false} />
      <main data-nav="light">
        <Intro />
        <Stays heading={doors.h} doors={doors.cards} />
        <Projects />
        <Reveal heading={check.h} checks={check.cards} />
        <Investors />
        <Latest
          abroad={{ h: abroad.h, d: abroad.d, link: abroad.links![0] }}
          latest={{ h: latest.h, image: latest.image, t: latest.t, text: latest.text, link: latest.links![0] }}
          guides={{
            h: guides.h,
            cards: articles.slice(0, 3).map((a) => ({ t: a.title, d: a.description, href: a.path, image: a.image, meta: when(a.article!.date) })),
          }}
        />
        <Finale heading={ask.h} text={ask.d} kind={ask.form} about={ask.about} />
      </main>
      <SiteFooter hotel={false} />
    </div>
  );
}
