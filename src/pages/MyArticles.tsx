
import FeedCard from "../components/FeedCard";
// import useMyArticles from "../hooks/useMyArticles"; // New custom hook for fetching user's articles

function MyArticles() {

    const articles = []
    const error = null;
    const loading = false

  return (
    <div className="min-h-screen bg-white text-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-2">My Articles</h1>
          <p className="text-gray-600 text-lg">
            {articles?.length === 0 
              ? "You haven't published any articles yet" 
              : "Manage your published articles"}
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-100 text-red-700 border border-red-400 rounded px-4 py-3 mb-6 text-center">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center text-gray-600 mb-6">Loading your articles...</div>
        )}

        {/* Empty State */}
        {!loading && articles?.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">No articles posted yet</div>
            <button
              onClick={() => window.location.href = '/create-article'}
              className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              Create Your First Article
            </button>
          </div>
        )}

        {/* Articles Grid */}
        {!loading && articles && articles.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <FeedCard key={article._id} article={article} showEditOptions={true} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyArticles;