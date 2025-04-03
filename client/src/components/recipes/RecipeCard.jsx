import React, { useState, useEffect } from 'react';
import { useRecipes } from "../../hooks/useRecipes";
import { Button, ButtonLink, Card, Img } from "../ui";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useAuth } from "../../hooks/useAuth";
import { CommentSection } from '../../components/comments/CommentSection';

function RecipeCard({ recipe, showComments = false, showFavorites = false, showDelete = false, showEdit = false }) {
  const { deleteRecipe, favorites, addFavorite, removeFavorite } = useRecipes();
  const [isFavorite, setIsFavorite] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    setIsFavorite(favorites.some((fav) => fav._id === recipe._id));
  }, [favorites, recipe._id]);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite(recipe._id);
    } else {
      addFavorite(recipe._id);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <Card>
      <header className="flex justify-between items-start mb-2">
        <div>
          <h1 className="text-md font-semibold text-zinc-400">
            {recipe.title}</h1>
        </div>
        <div className='flex'>
        {isAuthenticated && showDelete && (
        <div className="flex px-2 items-center">
          <Button onClick={() => deleteRecipe(recipe._id)}>
            <p>Eliminar</p>
          </Button>
        </div>
        )}
        {isAuthenticated && showEdit && (
        <div>        
          <ButtonLink to={`/recipes/${recipe._id}`}>
            <p>Editar</p>
          </ButtonLink>
        </div>
        )}
        </div>
        {isAuthenticated && showFavorites && (
          <button onClick={handleFavoriteClick}>
            {isFavorite ? (
              <FaHeart color="red"/>
            ) : (
              <FaRegHeart color="gray"/>
            )}
          </button>
        )}
      </header>

      {recipe.imageUrl && (
        <Img src={recipe.imageUrl} alt={recipe.title} />
      )}

      <h4 className="text-sm mb-2 text-zinc-400 font-semibold">Descripción:</h4>
      <div className="h-[auto] max-h-[70px] mb-2 overflow-auto scrollbar-hide">
        <p className="text-zinc-500 text-xs overflow-hidden">{recipe.description}</p>
      </div>

      <h4 className="text-sm text-zinc-400 font-semibold">Ingredientes:</h4>
      <div className="h-[auto] max-h-[100px] m-2 overflow-auto scrollbar-hide">
        <ul className="list-disc list-inside text-zinc-300 text-xs">
          {recipe.ingredients.map((ingredient) => (
            <li key={ingredient._id} className="text-zinc-500">
              {ingredient.name}: {ingredient.quantity}
            </li>
          ))}
        </ul>
      </div>

      <h4 className="text-sm text-zinc-400 font-semibold">Instrucciones:</h4>
      <div className="h-[auto] my-2 max-h-[250px] overflow-auto scrollbar-hide">
        <pre className="text-zinc-500 text-xs whitespace-pre-wrap break-words">
          {recipe.instructions}
        </pre>
      </div>

      <h4 className="text-sm text-zinc-400 font-semibold">Tiempo de preparación:</h4>
      <div className="h-[auto] text-zinc-500 my-2">
        <p className=" text-xs">
          {recipe.cookingtime.hour} hora{recipe.cookingtime.hour !== 1 && 's'} y {recipe.cookingtime.minute} minuto{recipe.cookingtime.minute !== 1 && 's'}
        </p>
      </div>

      {showComments && <CommentSection recipeId={recipe._id}/>}
      
    </Card>
  );
}

export default React.memo(RecipeCard);
