import Historylist from "@/app/(routes)/dashboard/components/Historylist";
import { PricingTable } from "@clerk/nextjs";

export default function Page({ params }) {
  const { slug } = params;

  if (slug === "history") {
    return <Historylist/>;
  }
  

  
}
