import { SmoothScroll } from "@/components/SmoothScroll";
import { Loader } from "@/components/Loader";
import { Nav } from "@/components/Nav";
import { Intro } from "@/components/Intro";
import { Reveal } from "@/components/Reveal";
import { Projects } from "@/components/Projects";
import { Stays } from "@/components/Stays";
import { Upcoming } from "@/components/Upcoming";
import { Investors } from "@/components/Investors";
import { Finale } from "@/components/Finale";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Loader />
      <Nav />
      <main>
        <Intro />
        <Reveal />
        <Projects />
        <Stays />
        <Upcoming />
        <Investors />
        <Finale />
      </main>
      <Footer />
    </>
  );
}
