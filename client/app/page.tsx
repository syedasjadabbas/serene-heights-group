import { SmoothScroll } from "@/global/components/SmoothScroll";
import { SiteHeader } from "@/global/components/SiteHeader";
import { SiteFooter } from "@/global/components/SiteFooter";
import { Loader } from "./_components/Loader";
import { Intro } from "./_components/Intro";
import { Reveal } from "./_components/Reveal";
import { Projects } from "./_components/Projects";
import { Stays } from "./_components/Stays";
import { Upcoming } from "./_components/Upcoming";
import { Investors } from "./_components/Investors";
import { Finale } from "./_components/Finale";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Loader />
      <SiteHeader />
      <main>
        <Intro />
        <Reveal />
        <Projects />
        <Stays />
        <Upcoming />
        <Investors />
        <Finale />
      </main>
      <SiteFooter />
    </>
  );
}
