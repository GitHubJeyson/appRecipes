import { useState,useEffect } from "react";
import CategoryContext from '../context/categoryContext.js';
import { getCategoriesRequest, createCategoryRequest, deleteCategoryRequest, getTagsRequest, createTagRequest, deleteTagRequest } from "./apiCategory.js";


export function CategoryProvider({ children }) {
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [errors, setErrors] = useState([]);


    useEffect(() => {
      if (errors.length > 0) {
        const timer = setTimeout(() => {
          setErrors([]);
        }, 5000);
        return () => clearTimeout(timer);
      }
    }, [errors]);

    const getCategories = async () => {
      try {
        const res = await getCategoriesRequest();
        setCategories(res.data);
      } catch (error) {
        setErrors(error.response.data.message);
      }
    };

    const createCategory = async (category) => {
        try {
          const res = await createCategoryRequest(category);
          return res.data;
        } catch (error) {
          setErrors(error.response.data.message);
        }
      };
  
    const deleteCategory = async (id) => {
      try {
        const res = await deleteCategoryRequest(id);
        if (res.status === 204) return setCategories(categories.filter((category) => category._id !== id));
      } catch (error) {
        setErrors(error.response.data.message);
      }
    };

    //Tags

    const getTags = async () => {
      try {
        const res = await getTagsRequest();
        setTags(res.data);
      } catch (error) {
        setErrors(error.response.data.message);
      }
    };
    
    const createTag = async (tag) => {
        try {
          const res = await createTagRequest(tag);
          return res.data;
        } catch (error) {
          setErrors(error.response.data.message);
        }
      };
      
    const deleteTag = async (id) => {
      try {
        const res = await deleteTagRequest(id);
        if (res.status === 204) return setTags(tags.filter((tag) => tag._id !== id));
      } catch (error) {
        setErrors(error.response.data.message);
      }
    };
      
  

    return (
      <CategoryContext.Provider
        value={{
          categories,
          setCategories,
          setTags,
          getCategories,
          createCategory,
          deleteCategory,
          tags,
          getTags,
          createTag,
          deleteTag,
          errors,
        }}
      >
        {children}
      </CategoryContext.Provider>
    );
  }