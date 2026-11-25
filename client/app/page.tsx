import { Loader } from "./_components/Loader";
import { PageView } from "./_components/PageView";
import { SmoothScroll } from "@/global/components/SmoothScroll";
import { structuredDataJson } from "@/global/lib/structuredData";
import { getPage } from "@/global/site";

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredDataJson() }} />
      <SmoothScroll />
      <Loader />
      <PageView page={getPage("/")!} />
    </>
  );
}
