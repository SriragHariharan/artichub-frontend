import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import 'react-quill-new/dist/quill.bubble.css'; // Optional: For bubble style

const CreateArticle = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [editorContent, setEditorContent] = useState('');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      title: '',
      featuredImage: null,
    },
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    console.log(data);
    alert('Article submitted successfully!');
  };

  const categories = [
      { id: "sports", name: "Sports" },
      { id: "politics", name: "Politics" },
      { id: "films", name: "Films" },
      { id: "space", name: "Space" },
      { id: "cooking", name: "Cooking" },
  ];

  // ReactQuill toolbar configuration
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }], // Header levels
      ['bold', 'italic', 'underline', 'strike'], // Text formatting
      [{ 'list': 'ordered'}, { 'list': 'bullet' }], // Lists
      ['link', 'image'], // Link and image
      ['clean'], // Clear formatting
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'link', 'image',
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setValue('featuredImage', file); // Store the file in form state
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Article</h1>
          <p className="text-gray-600">Fill in the details below to publish your article</p>
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
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter article title"
            />
            {errors.title && (
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
                errors.category ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
            )}
          </div>

          {/* Featured Image */}
          <div>
            <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-700 mb-1">
              Featured Image
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <input
                  id="featuredImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                />
                {errors.featuredImage && (
                  <p className="mt-1 text-sm text-red-600">{errors.featuredImage.message}</p>
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
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Article Content <span className="text-red-500">*</span>
            </label>
            <ReactQuill
              theme="snow"
              value={editorContent}
              onChange={(value) => {
                setEditorContent(value);
                setValue('content', value); // Set content in form state
              }}
              modules={modules}
              formats={formats}
              className={`h-64 ${errors.content ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors duration-200"
            >
              Publish Article
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateArticle;
