import React, { useState } from "react";
import { addfood, editFood } from "../api/food.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router";

const EditFood = () => {
   const location =  useLocation();
   const food = location?.state;
  const [formData, setFormData] = useState({
    name: food.name,
    price: food.price,
    description: food.description,
    photo: food.photo, // Changed from empty string to null for file storage
  });
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [previewUrl, setPreviewUrl] = useState(food.photo); // Tracks the local preview blob URL

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
      // Generate a temporary local URL for immediate previewing
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

   const editMutation = useMutation({
    mutationFn:({id,data})=>{
       return editFood(id,data);
    },
    onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:["foods"]});
        navigate("/admin/food-management");
    },
    onError:(err)=>{
        console.log(err)
    }

  })

  const handleSubmit = async(e) => {
    e.preventDefault();

    // CRITICAL: When uploading files, you must use FormData instead of raw JSON
    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("photo", formData.photo); // Appends the binary file directly


    editMutation.mutate({id:food._id, data:data});
  
  };

  const handleClear = () => {
    setFormData({ name: "", price: "", description: "", photo: null });
    setPreviewUrl("");
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-4">
      <div className="mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Add New Food Item</h1>
        <p className="mt-1 text-sm text-gray-500">
          Fill out the details and upload a photo to add this item to the database.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none sm:text-sm"
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
                min="0"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                className="block w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-gray-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none sm:text-sm"
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
              value={formData.description}
              onChange={handleChange}
              placeholder="Detail the ingredients, allergen tags, portions..."
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none sm:text-sm"
            />
          </div>

          {/* Drag & Drop File Upload Input */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Food Photo
            </label>
            <div className="mt-1 flex justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 py-6 hover:border-orange-500 transition-colors bg-white">
              <div className="space-y-1 text-center">
                {/* SVG Icon */}
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4-4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-600 justify-center">
                  <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-orange-600 focus-within:outline-none hover:text-orange-500">
                    <span>Upload a file</span>
                    <input 
                      id="file-upload" 
                      name="photo" 
                      type="file" 
                      accept="image/*" // Restricts picker to images only
                      className="sr-only" // Hides native ugly button but keeps it accessible
                      onChange={handleFileChange} 
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
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
            <div className="relative aspect-video w-full max-w-sm overflow-hidden rounded-md border border-gray-200 bg-white">
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
        <div className="flex items-center justify-end space-x-3 border-t border-gray-200 pt-5">
          <button
            type="button"
            className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
            onClick={handleClear}
          >
            Clear Form
          </button>
          <button
            type="submit"
            className="rounded-lg bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 transition-colors"
          >
            {editMutation.isPending?"Saving...":"Save Item"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditFood;