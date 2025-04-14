import { Heart, Bookmark } from "lucide-react";
import { useState } from "react";

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

const ArticleDetail = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(1243);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Sample article data
  const article: Article = {
    id: "1",
    title: "The Future of Web Development in 2024",
    category: "sports",
    content: `
      <p class="mb-4">The web development landscape continues to evolve at a rapid pace. As we move into 2024, several trends are emerging that will shape how we build and interact with web applications.</p>
      
      <h2 class="text-xl font-bold mb-3 mt-6">1. The Rise of Edge Computing</h2>
      <p class="mb-4">Edge computing is transforming how we deliver content. By processing data closer to the user, we can achieve significantly faster load times and improved performance. Frameworks like Next.js and Remix are leading this charge with their edge runtime capabilities.</p>
      
      <h2 class="text-xl font-bold mb-3 mt-6">2. AI Integration in Development</h2>
      <p class="mb-4">AI-powered tools are becoming standard in developers' workflows. From code completion to automated testing, AI is reducing boilerplate work and allowing developers to focus on creative problem-solving.</p>
      
      <h2 class="text-xl font-bold mb-3 mt-6">3. Web Components Maturity</h2>
      <p class="mb-4">With browser support now nearly universal, Web Components are seeing increased adoption. Their framework-agnostic nature makes them ideal for design systems and micro-frontend architectures.</p>
      
      <p class="mb-4 mt-8">As these technologies mature, developers who adapt quickly will find themselves at the forefront of the industry. The key is continuous learning and experimentation.</p>
    `,
    author: {
      name: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    datePublished: "2024-03-15",
    likes: 1243,
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/Mumbai_Indians_Logo.svg/1200px-Mumbai_Indians_Logo.svg.png",
  };

  const handleLike = () => {
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Article Header */}
        <div className="mb-8">
          <span className="text-xs font-extrabold text-gray-300 bg-gray-600 px-4 py-2 rounded-full uppercase tracking-wide inline-block mb-4">
            {article.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>
          
          <div className="flex items-center space-x-4 mb-6">
            <img
              className="w-10 h-10 rounded-full"
              src={article.author.avatar}
              alt={article.author.name}
            />
            <div>
              <p className="font-medium text-gray-900">{article.author.name}</p>
              <div className="flex space-x-3 text-sm text-gray-500">
                <span>
                  {new Date(article.datePublished).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-8 rounded-lg overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* Article Content */}
        <article 
          className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Article Footer */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-1 ${isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500 transition-colors`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                <span>{likeCount}</span>
              </button>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={handleBookmark}
                className={`p-2 rounded-full ${isBookmarked ? 'text-gray-900 bg-gray-100' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>

      </main>

    </div>
  );
};

export default ArticleDetail;