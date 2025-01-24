import { useRecipes } from "../../hooks/useRecipes";
import { Button, ButtonLink, Card } from "../ui";

export function RecipeCard({ recipe }) {
  const { deleteRecipe } = useRecipes();
 
  return (
  <Card>
  <header className="flex justify-between items-start mb-4">
    <h1 className="text-2xl py-2 font-semibold text-zinc-400">{recipe.title}</h1>
    <div className="flex gap-x-2 items-center">
      <Button onClick={() => deleteRecipe(recipe._id)}>
        <p className="text-zinc-200 hover:text-zinc-300">Eliminar</p>
      </Button>
      
      <ButtonLink to={`/recipes/${recipe._id}`}>
        <p className="text-slate-200 hover:text-zinc-300">Editar</p>
      </ButtonLink>
    </div>
  </header>

  <div className="h-[200px] mb-2 text-ellipsis line-clamp-6">
    <h4 className="text-xl mb-2 text-zinc-400 font-semibold">Descripcion:</h4>
    <p className="text-zinc-500 overflow-hidden">{recipe.description}</p>
  </div>

  <div className="h-[60px] text-ellipsis line-clamp-6">
    <h4 className="text-xl text-zinc-400 font-semibold">Ingredientes:</h4>
    <ul className="list-disc list-inside text-zinc-300 text-sm">
      {recipe.ingredients.map((ingredient) => (
        <li key={ingredient._id} className="text-zinc-500">
          {ingredient.name}: {ingredient.quantity}
        </li>
      ))}
    </ul>
  </div>

  <div className="h-[400px] overflow-auto">
    <h4 className="text-xl mb-2 text-zinc-400 font-semibold">Instrucciones:</h4>
    <pre className="text-zinc-500 overflow-auto">
    {recipe.instructions}
    </pre>
  </div>

  <div className="h-[60px]">
    <h4 className="text-xl mb-2 text-zinc-400 font-semibold">Tiempo de cocción:</h4>
    <p className="text-zinc-500 text-sm">
      {recipe.cookingtime.hour} hora{recipe.cookingtime.hour !== 1 && 's'} y {recipe.cookingtime.minute} minuto{recipe.cookingtime.minute !== 1 && 's'}
    </p>
  </div>

</Card>

  );
}
