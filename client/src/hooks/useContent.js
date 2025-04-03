import { useContext} from "react";
import ContentContext from '../context/contentContext'


export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error("useContent debe usarse dentro de un ContentProvider");
  return context;
};