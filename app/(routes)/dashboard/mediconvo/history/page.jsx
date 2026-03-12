export default async function Page({ params }) {
  const { slug } = await params;

  if (slug === "history") {
    return <div>History</div>;
  }

  return <div>Page not found</div>;
}