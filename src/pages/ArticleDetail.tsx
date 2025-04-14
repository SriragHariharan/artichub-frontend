import { Heart, Bookmark } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router";
import useArticleDetails from "../hooks/useArticleDetails";


const ArticleDetail = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const { id } = useParams<{ id: string }>();
  const { articleDetails, loading, error } = useArticleDetails({ id });

  const handleLike = () => {
    setIsLiked((prev) => !prev);
  };

  const handleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-black">
        <div className="text-lg font-semibold animate-pulse">Loading article...</div>
      </div>
    );
  }

  if (error || !articleDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-red-600">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Something went wrong.</h1>
          <p className="text-gray-600">Unable to load the article. Please try again later.</p>
        </div>
      </div>
    );
  }

  const totalLikes = (articleDetails?.likes?.length ?? 0) + (isLiked ? 1 : 0);

  return (
    <div className="min-h-screen bg-white text-black">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <span className="text-xs font-bold text-white bg-black px-4 py-1 rounded-full uppercase tracking-wide inline-block mb-4">
            {articleDetails?.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-black mb-4">
            {articleDetails?.title}
          </h1>

          {/* Author Info */}
          <div className="flex items-center space-x-4 mb-6">
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={
                articleDetails?.author?.profilePic ??
                `https://ui-avatars.com/api/?name=${articleDetails?.author?.username}`
              }
              alt={articleDetails?.author?.username}
            />
            <div>
              <p className="font-medium">{articleDetails?.author?.username}</p>
              <div className="text-sm text-gray-500">
                <span>
                  {new Date(articleDetails?.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Image */}
        {articleDetails?.image && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={articleDetails?.image}
              alt={articleDetails?.title}
              className="w-full h-96 object-contain rounded-lg border border-gray-200"
            />
          </div>
        )}

        {/* Description */}
        <article
          className="prose prose-lg prose-black max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: articleDetails?.description }}
        />

        {/* Footer */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-1 transition-colors ${
                  isLiked ? "text-red-500" : "text-gray-500 hover:text-red-500"
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
                <span>{totalLikes}</span>
              </button>
            </div>
            <div>
              <button
                onClick={handleBookmark}
                className={`p-2 rounded-full transition-colors ${
                  isBookmarked
                    ? "text-black bg-gray-200"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                <Bookmark className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArticleDetail;
