import axios from './axios';

export const getCategoriesRequest = async () => {
    return axios.get('/category');
  };
  
  export const createCategoryRequest = async (category) => {
    return axios.post('/category', category);
  };
  
  export const deleteCategoryRequest = async (id) => {
    return axios.delete(`/category/${id}`);
  };
  
  // Tags
  export const getTagsRequest = async () => {
    return axios.get('/tags');
  };
  
  export const createTagRequest = async (tag) => {
    return axios.post('/tags', tag);
  };
  
  export const deleteTagRequest = async (id) => {
    return axios.delete(`/tags/${id}`);
  };
  