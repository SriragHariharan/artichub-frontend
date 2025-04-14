import { Heart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

interface Article {
  id: string;
  title: string;
  category: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  datePublished: string;
  likes: number;
  imageUrl: string;
}

interface FeedCardProps {
  article: Article;
}

function FeedCard({ article }: FeedCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(article?.likes);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <Link to={`/article/${article?._id}`} className="mb-6 bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1 cursor-pointer">
      {/* Article Image - Full width at top */}
      <div className="w-full h-48 overflow-hidden">
        <img
          src={article?.image ?? "https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg"}
          alt={article?.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content */}
      <div className="p-6">
        {/* Category and Member Badge */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full uppercase tracking-wide">
            {article?.category}
          </span>
        </div>

        {/* Article Title */}
        <h2 className="text-gray-900 font-bold text-xl mb-2 line-clamp-2">
          {article?.title}
        </h2>

        {/* Article Preview Content */}
        {/* <p className="text-gray-700 text-base mb-4 line-clamp-3">
          {article?.content}
        </p> */}

        {/* Author and Like Button */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center">
            <img
              className="w-8 h-8 rounded-full mr-3"
              src={article?.author?.profilePic || "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"}
              alt={`Avatar of ${article?.author?.username}`}
            />
            <div className="text-sm">
              <p className="text-gray-900 font-medium leading-none">
                {article?.author?.username}
              </p>
              <p className="text-gray-500">
                {new Date(article?.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
          <button
            onClick={handleLike}
            className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors"
            aria-label="Like article"
          >
            <Heart
              className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`}
            />
            <span className="text-sm">{likeCount}</span>
          </button>
        </div>
      </div>
    </Link>
  );
}

export default FeedCard;