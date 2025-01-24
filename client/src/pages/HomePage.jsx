import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useRecipes } from "../hooks/useRecipes.js";
import { ImFileEmpty } from "react-icons/im";
import { Card, Img } from "../components/ui";

function HomePage() {
  const { recipes, getAllRecipes } = useRecipes();
  
    useEffect(() => {
    getAllRecipes();
  }, []);

  return (
      <>
      <div className="bg-red-500 flex justify-center items-center mb-5">
      <header className="bg-zinc-800 p-10">
        <h1 className="text-5xl py-2 font-bold">Las mejores recetas</h1>
        <p className="text-md text-slate-400">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos
          fugit doloremque molestias recusandae labore repellat amet dicta tempore
          necessitatibus facilis repellendus voluptas ducimus maiores deserunt sed
          quo ratione provident debitis aut, voluptatem aliquam iste blanditiis
          ex? Voluptatibus, fuga quasi necessitatibus cumque optio error enim,
          officia accusantium vitae doloremque, molestias modi.
        </p>

        <Link
          className="bg-zinc-500 text-white px-4 py-2 rounded-md mt-4 inline-block"
          to="/register"
        >
          Get Started
        </Link>
      </header>
      </div>
    <>
      <div className="flex flex-col items-center p-4" role="region" aria-labelledby="recipe-list">
        {recipes.length === 0 ? (
          <div className="flex flex-col justify-center items-center p-10 text-center">
            <ImFileEmpty className="text-6xl text-gray-400 mb-4" />
            <h1 className="font-semibold text-xl text-gray-500">
              Aún no hay recetas
            </h1>
            </div>
        ) : (


          <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 ">
          {recipes.map((recipe) => ( 
          <Card key={recipe._id}>
              {recipe.imageUrl && (
              <Img
                src={recipe.imageUrl}
                alt={recipe.title}
              />
              )}

            <h1 className="text-2xl font-semibold text-zinc-400">{recipe.title}</h1>

            <div className="h-[100px] mb-2 overflow-auto">
              <p className="text-zinc-500 overflow-hidden">{recipe.description}</p>
            </div>
            
            <div className="h-[60px] overflow-auto">
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
              <h4 className="text-xl text-zinc-400 font-semibold">Tiempo de cocción:</h4>
              <p className="text-zinc-500 text-sm">
                {recipe.cookingtime.hour} hora{recipe.cookingtime.hour !== 1 && 's'} y {recipe.cookingtime.minute} minuto{recipe.cookingtime.minute !== 1 && 's'}
              </p>
            </div>
          </Card>

              ))}
          </div>
          )}
        </div>
    </>
  </>
  );
}

export default HomePage;
