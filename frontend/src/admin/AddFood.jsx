import React, { useState, useEffect } from "react";
import { addfood } from "../api/food.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const AddFood = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    photo: null, 
  });
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [previewUrl, setPreviewUrl] = useState(""); 

  // Clean up memory leaks when the component unmounts or preview changes
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        photo: file,
      }));
      // Revoke old URL before creating a new one to prevent memory leaks
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const addMutation = useMutation({
    mutationFn: (data) => {
      return addfood(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foods"] });
      navigate("/admin/food-management");
    },
    onError: (err) => {
      console.log(err);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("photo", formData.photo); 

    addMutation.mutate(data);
  };

  const handleClear = () => {
    setFormData({ name: "", price: "", description: "", photo: null });
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl("");
  };

  return (
    // Responsive padding dynamically expands from mobile to desktop
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6 border-b border-gray-200 pb-4 sm:mb-8">
        <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
          Add New Food Item
        </h1>
        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
          Fill out the details and upload a photo to add this item to the database.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Adjusted grid layout to handle smaller screens flawlessly */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          
          {/* Food Name */}
          <div className="sm:col-span-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Food Item Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Spicy Crunchy Zinger Burger"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none text-sm"
            />
          </div>

          {/* Price */}
          <div className="sm:col-span-2">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price (RS)
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-sm text-gray-500">RS</span>
              </div>
              <input
                type="number"
                name="price"
                id="price"
                required
                min="0"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                className="block w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-gray-900 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none text-sm"
              />
            </div>
          </div>

          {/* Description */}
          <div className="sm:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={3}
              required
              value={formData.description}
              onChange={handleChange}
              placeholder="Detail the ingredients, allergen tags, portions..."
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none text-sm"
            />
          </div>

          {/* Drag & Drop File Upload Input */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Food Photo
            </label>
            <div className="mt-1 flex justify-center rounded-lg border-2 border-dashed border-gray-300 px-4 py-6 hover:border-green-500 transition-colors bg-white sm:px-6">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-10 w-10 text-gray-400 sm:h-12 sm:w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4-4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {/* Flex layout wraps on extra-small mobile devices */}
                <div className="flex flex-wrap text-sm text-gray-600 justify-center gap-1">
                  <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-green-600 focus-within:outline-none hover:text-green-500">
                    <span>Upload a file</span>
                    <input 
                      id="file-upload" 
                      name="photo" 
                      type="file" 
                      accept="image/*" 
                      required
                      className="sr-only" 
                      onChange={handleFileChange} 
                    />
                  </label>
                  <p className="text-gray-500">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
              </div>
            </div>
          </div>
        </div>

        {/* Local Live Image Preview */}
        {previewUrl && (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
              Selected File Preview
            </span>
            <div className="relative aspect-video w-full max-w-xs overflow-hidden rounded-md border border-gray-200 bg-white sm:max-w-sm">
              <img
                src={previewUrl}
                alt="Upload preview"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500 truncate">{formData.photo?.name}</p>
          </div>
        )}

        {/* Action Buttons */}
        {/* On mobile, stack them vertically to fit narrow screens; on desktop, align horizontally */}
        <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:items-center sm:justify-end sm:space-x-3 sm:gap-0">
          <button
            type="button"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors sm:w-auto"
            onClick={handleClear}
          >
            Clear Form
          </button>
          <button
            type="submit"
            disabled={addMutation.isPending}
            className="w-full rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 transition-colors disabled:bg-green-400 sm:w-auto"
          >
            {addMutation.isPending ? "Saving..." : "Save Item"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFood;