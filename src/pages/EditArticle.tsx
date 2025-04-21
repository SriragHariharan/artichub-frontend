import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import axiosInstance from '../helpers/axios';
import useArticleDetails from '../hooks/useArticleDetails';

interface ArticleFormData {
  title: string;
  category: string;
  image: File | null | string;
  description: string;
}


const EditArticle = () => {
  const location = useLocation();
  console.log("article ID::: ",location?.state?.articleDetails?._id)
  const id = location?.state?.articleDetails?._id;
  const {articleDetails,  error} = useArticleDetails({ id });
  const navigate = useNavigate();
  const [editorContent, setEditorContent] = useState( articleDetails?.description ||'');

  console.log(articleDetails, "  ::AD")
  
  const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
      reset,
  } = useForm<ArticleFormData>();

  // Reset form when articleDetails changes
  useEffect(() => {
    if (articleDetails) {
      reset({
        title: articleDetails.title,
        description: articleDetails.description,
      });
      setEditorContent(articleDetails.description);
    }
  }, [articleDetails, reset]);

  const onSubmit = async (data: ArticleFormData) => {
    try {

      console.log(data);

      axiosInstance.put(`/post/${id}`, data)
      .then((response) => {
        console.log('Article updated successfully:', response.data);
        navigate('/article', { state: { article: {_id: id} } });
      }).catch((error) => {
        console.error('Error updating article:', error);
      })
      
    } catch (error) {
      console.error('Error updating article:', error);
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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Article</h1>
          <p className="text-gray-600">Update your article details below</p>
        </div>
        {error && (
          <div className="mb-6 p-4 rounded-md bg-red-50 border border-red-300 text-red-800">
            <h2 className="font-semibold text-red-700 text-md mb-1">Error Loading Article</h2>
            <p className="text-sm">{typeof error === 'string' ? error : 'Something went wrong while fetching article details. Please try again later.'}</p>
          </div>
        )}
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