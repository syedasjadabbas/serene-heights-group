import { getPage } from "@/global/site";
import { PageView } from "./_components/PageView";

export default function NotFound() {
  return <PageView page={getPage("/404")!} />;
}
