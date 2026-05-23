import { getSearchResults, SearchResult } from "@/APIS/getSearch";
import AnimatedGrid from "@/components/AnimatedGrid";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || "";

  const data = await getSearchResults(query);
  
  const filteredResults = data.results?.filter(
    (item: SearchResult) => item.poster_path && item.media_type !== "person"
  );

  return (
    <main className="min-h-screen bg-[#16111B] pt-32 pb-20">
      <div className="container mx-auto px-6">
        
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-1.5 h-6 bg-[#B76DFF] rounded-full" />
            <h2 className="text-[#CFC2D6] text-lg font-medium">Search Results for</h2>
          </div>
          <h1 className="text-[#EADFED] text-4xl md:text-5xl font-bold italic tracking-tight">
            &quot;{query}&quot;
          </h1>
        </header>

        {!filteredResults || filteredResults.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center border border-white/5 rounded-3xl bg-white/5 backdrop-blur-sm">
            <div className="text-6xl mb-6 opacity-50">🔍</div>
            <h3 className="text-[#EADFED] text-2xl font-bold">No results found</h3>
            <p className="text-gray-500 mt-2 max-w-xs mx-auto">
              We couldn&apos;t find anything matching your search. Try checking for typos or use different keywords.
            </p>
          </div>
        ) : (
          <AnimatedGrid 
            key={query} 
            results={filteredResults} 
            type="movie" 
          />
        )}
      </div>
    </main>
  );
}