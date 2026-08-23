import { apiCustomer } from '@/api/apiCustomer';

export const uploadProfileImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  
  const { data } = await apiCustomer.post('/api/upload/user/single', formData);
  
  return data;
};

export const deleteProfileImage = async () => {
  const { data } = await apiCustomer.delete('/api/user/avatar');
  return data;
};
