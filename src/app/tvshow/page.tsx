import { getDiscoverTV } from "@/APIS/getDiscoverTv";
import MediaLibrary from "@/components/MediaLibrary";

export default async function TVShowPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const data = await getDiscoverTV(currentPage);

  return (
    <MediaLibrary
      key={currentPage} 
      title="Shows Library"
      results={data.results}
      currentPage={currentPage}
      totalPages={data.total_pages}
      type="tv"
      basePath="/tvshow"
    />
  );
}