import { Loader } from "./_components/Loader";
import { HomeView } from "./_components/HomeView";
import { structuredDataJson } from "@/global/lib/structuredData";

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredDataJson() }} />
      <Loader />
      <HomeView />
    </>
  );
}
