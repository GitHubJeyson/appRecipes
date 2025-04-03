import { useState } from "react";
import ContentContext from '../context/contentContext.js';
import { getContentRequest, updateContentRequest, insertContentRequest } from './apiContent.js';

export function ContentProvider({ children }) {
    const [content, setContent] = useState({ title: "", introduction: "" });
    const [isContentExist, setIsContentExist] = useState(false);

    
    const getContent = async () => {
      try {
        const res = await getContentRequest();
        if (res.data && res.data.title && res.data.introduction) {
          setContent(res.data);
          setIsContentExist(true);
        } else {
        setIsContentExist(false);
        }
      } catch (error) {
        console.error('Error al obtener el contenido:', error);
        setIsContentExist(false);
      }
    };

    const insertContent = async (content) => {
        try {
            const res = await insertContentRequest(content);
            return res.data;
        } catch (error) {
            console.error('Error al insertar el contenido:', error);
        }
    };
    
    const updateContent = async (content) => {
      try {
        await updateContentRequest(content);     
      } catch (error) {
        console.error('Error al actualizar el contenido:', error);
      }
    };
    
    return (
        <ContentContext.Provider
          value={{
            content,
            isContentExist,
            getContent,
            insertContent,
            updateContent,
          }}
        >
          {children}
        </ContentContext.Provider>
    );
}
