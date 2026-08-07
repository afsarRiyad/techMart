import React, { useState } from 'react';
import { Camera, X } from 'lucide-react';
import { useProfileImageUpload, useProfileImageDelete } from '../../features/user/hooks/useProfileImageUpload';
import { updateProfile } from '../../features/user/services/userServices';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const ProfileImageUpload = ({ currentImage, username }) => {
  const [preview, setPreview] = useState(currentImage || null);
  const [file, setFile] = useState(null);
  const uploadMutation = useProfileImageUpload();
  const removeMutation = useProfileImageDelete();
  const queryClient = useQueryClient();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }

      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      const uploadResult = await uploadMutation.mutateAsync(file);
      
      if (uploadResult?.data?.url) {
        await updateProfile({ 
          avatar: uploadResult.data.url,
          avatarPublicId: uploadResult.data.publicId 
        });
        toast.success('Profile image updated successfully');
        queryClient.invalidateQueries({ queryKey: ['me'] });
      }
    } catch (error) {
      console.error('Upload error:', error);
    }
    setFile(null)
  };

  const handleRemove = () => {
    removeMutation.mutate(undefined, {
      onSuccess: () => {
        setPreview(null);
        setFile(null);
      },
    });
  };

  const handleCancel = () => {
    setPreview(currentImage || null);
    setFile(null);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative group">
        {/* Image Container */}
        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-gray-200 bg-gray-100">
          {preview ? (
            <img
              src={preview}
              alt={`${username}'s profile`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-3xl font-bold text-gray-400">
                {username?.charAt(0)?.toUpperCase() || '?'}
              </span>
            </div>
          )}
        </div>

        {/* Upload Button Overlay */}
        <label className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-black transition-colors shadow-lg">
          <Camera size={15} />
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
            onChange={handleFileChange}
            className="hidden"
            disabled={uploadMutation.isPending}
          />
        </label>

        {/* Remove Button */}
        {preview && (
          <button
            onClick={handleRemove}
            className="absolute -top-2 -right-1 bg-red-500 text-white p-2 rounded-full cursor-pointer hover:bg-red-600 transition-colors shadow-lg"
            title="Remove image"
          >
            <X size={11} />
          </button>
        )}
      </div>

      {/* Action Buttons */}
      {file && (
        <div className="flex gap-2">
          <button
            onClick={handleUpload}
            disabled={uploadMutation.isPending}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploadMutation.isPending ? 'Uploading...' : 'Save Image'}
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      )}

      {/* File Info */}
      {file && (
        <p className="text-sm text-gray-500">
          {file.name} ({(file.size / 1024).toFixed(1)} KB)
        </p>
      )}
    </div>
  );
};

export default ProfileImageUpload;
