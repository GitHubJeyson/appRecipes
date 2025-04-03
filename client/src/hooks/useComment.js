import { useContext} from "react";
import CommentContext from '../context/commentContext.js'


export const useComments = () => {
  const context = useContext(CommentContext);
  if (!context) throw new Error("useComments must be used within a CommentProvider");
  return context;
};