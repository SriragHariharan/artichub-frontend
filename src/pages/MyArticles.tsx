
import { Link } from "react-router";
import FeedCard from "../components/FeedCard";
import useMyPosts from "../hooks/useMyPosts";
// import useMyArticles from "../hooks/useMyArticles"; // New custom hook for fetching user's articles

function MyArticles() {

    const { myPosts, error, loading } = useMyPosts();
    console.log(myPosts)

  return (
    <div className="min-h-screen bg-white text-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-2">My Articles</h1>
          <p className="text-gray-600 text-lg">
            {myPosts?.length === 0 
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
        {!loading && (
          <div className="text-center mb-12">
            <Link to="/create"
              className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors "
            >
              Create An Article
            </Link>
          </div>
        )}

        {/* Articles Grid */}
        {!loading && myPosts && myPosts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myPosts?.map((article) => (
              <FeedCard key={article?._id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyArticles;