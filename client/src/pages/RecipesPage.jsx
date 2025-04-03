import { useEffect, useState, useRef } from "react";
import { useRecipes } from "../hooks/useRecipes.js";
import { useCategory } from '../hooks/useCategory.js'
import RecipeCard from "../components/recipes/RecipeCard.jsx";
import { ImFileEmpty } from "react-icons/im";

export function RecipesPage() {
  const { recipes, getRecipes } = useRecipes();
  const { categories, tags, getCategories, getTags } = useCategory();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [showTags, setShowTags] = useState(false);

  const tagsContainerRef = useRef(null);

  useEffect(() => {
    getRecipes();
    getCategories();
    getTags();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (tagsContainerRef.current && !tagsContainerRef.current.contains(e.target)) {
        setShowTags(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleTagChange = (e) => {
    const tag = e.target.value;
    setSelectedTags(prevTags =>
      prevTags.includes(tag)
        ? prevTags.filter(t => t !== tag)
        : [...prevTags, tag]
    );
  };

  const filteredRecipes = recipes.filter(recipe => {
    const matchesCategory = selectedCategory ? recipe.category === selectedCategory : true;
    const matchesTags = selectedTags.length > 0
      ? selectedTags.every(tag => recipe.tags.includes(tag))
      : true;
    return matchesCategory && matchesTags;
  });

  const toggleTags = () => {
    setShowTags(!showTags);
  };

  return (
    <div className="flex flex-col items-center min-h-[calc(95vh-100px)]">
      {recipes.length > 0 && (
        <div className="flex justify-between items-center p-2 bg-zinc-800 rounded-lg shadow-sm mb-4 z-10">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <label className="block text-xs text-zinc-300 pb-1">Categoría</label>
              <select
                className="text-xs py-1 text-zinc-400 border border-zinc-600 bg-zinc-800 rounded-md focus:outline-none"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">Todas</option>
                {categories.map(category => (
                  <option key={category._id} value={category._id}>{category.name}</option>
                ))}
              </select>
            </div>

            <div className="relative mt-[20px]" ref={tagsContainerRef}>
              <button
                onClick={toggleTags}
                className="text-xs text-zinc-400 border border-zinc-600 rounded-md px-4 py-[5px]"
              >
                {showTags ? 'Ocultar etiquetas' : 'Mostrar etiquetas'}
              </button>

              {showTags && (
                <div className="absolute p-2 bg-zinc-800 border border-zinc-600 rounded-md">
                  {tags.map(tag => (
                    <label key={tag._id} className="flex items-center space-x-2 text-xs">
                      <input
                        type="checkbox"
                        value={tag._id}
                        checked={selectedTags.includes(tag._id)}
                        onChange={handleTagChange}
                        className="text-xs text-zinc-400"
                      />
                      <span className="text-xs text-zinc-400">{tag.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="w-full" role="region" aria-labelledby="recipe-list">
        {filteredRecipes.length === 0 ? (
          <div className="flex flex-col justify-center items-center p-10 text-center">
            <ImFileEmpty className="text-6xl text-gray-400 mb-4" />
            <h1 className="font-semibold text-xl text-gray-600">Aún no hay recetas</h1>
          </div>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                recipe={recipe}
                key={recipe._id}
                showComments={false}
                showDelete={true}
                showEdit={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

