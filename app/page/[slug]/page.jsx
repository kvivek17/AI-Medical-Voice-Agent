import Historylist from "@/app/(routes)/dashboard/components/Historylist";

export default async function  Page({ params }) {
  const { slug } =  await params;

  if (slug === "history") {
    return <Historylist/>;
  }
  

  
}
