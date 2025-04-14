import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import axiosInstance from '../helpers/axios';

interface ArticleFormData {
  title: string;
  category: string;
  image: File | null | string;
  description: string;
}

interface Category {
  id: string;
  name: string;
}

const EditArticle = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [editorContent, setEditorContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ArticleFormData>();

  const categories: Category[] = [
    { id: "sports", name: "Sports" },
    { id: "politics", name: "Politics" },
    { id: "films", name: "Films" },
    { id: "space", name: "Space" },
    { id: "cooking", name: "Cooking" },
  ];

  // Fetch article data on component mount
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axiosInstance.get(`/post/${id}`);
        const article = response.data;
        
        // Set form values
        reset({
          title: article.title,
          category: article.category,
          description: article.description,
          image: article.image || null,
        });
        
        setEditorContent(article.description);
        if (article.image) {
          setImagePreview(article.image);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching article:', error);
        navigate('/articles', { replace: true });
      }
    };

    fetchArticle();
  }, [id, reset, navigate]);

  const onSubmit = async (data: ArticleFormData) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('category', data.category);
      formData.append('description', data.description);
      
      if (typeof data.image !== 'string' && data.image) {
        formData.append('image', data.image);
      }

      await axiosInstance.put(`/post/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      navigate(`/article/${id}`);
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setValue('image', file);
      };
      reader.readAsDataURL(file);
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'link', 'image',
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg font-semibold">Loading article...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Article</h1>
          <p className="text-gray-600">Update your article details below</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
          {/* Title Field */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Article Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              {...register('title', {
                required: 'Title is required',
                maxLength: {
                  value: 120,
                  message: 'Title must be less than 120 characters',
                },
              })}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black ${
                errors?.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter article title"
            />
            {errors?.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          {/* Category Dropdown */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              {...register('category', { required: 'Category is required' })}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black ${
                errors?.category ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors?.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
            )}
          </div>

          {/* Featured Image */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Featured Image
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                />
                {errors?.image && (
                  <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">JPEG or PNG, max 2MB</p>
              </div>
              {imagePreview && (
                <div className="w-20 h-20 border border-gray-300 rounded-md overflow-hidden">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          {/* Content Editor */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Article Content <span className="text-red-500">*</span>
            </label>
            <ReactQuill
              theme="snow"
              value={editorContent}
              onChange={(value) => {
                setEditorContent(value);
                setValue('description', value);
              }}
              modules={modules}
              formats={formats}
              className={`h-64 ${errors?.description ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors?.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors duration-200"
            >
              Update Article
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditArticle;