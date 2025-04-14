import FeedCard from "../components/FeedCard";
import useFeed from "../hooks/useFeed";

function Homepage() {
  const { feeds, error, loading } = useFeed();

  return (
    <div className="min-h-screen bg-white text-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-2">Welcome to Artichub</h1>
          <p className="text-gray-600 text-lg">Explore curated content tailored to your interests</p>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-100 text-red-700 border border-red-400 rounded px-4 py-3 mb-6 text-center">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center text-gray-600 mb-6">Loading feeds...</div>
        )}

        {/* Feed Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {feeds?.map((article: any) => (
            <FeedCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
