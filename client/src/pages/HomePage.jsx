import { useEffect, useState, useRef } from "react";
import { useRecipes } from "../hooks/useRecipes.js";
import { useContent } from '../hooks/useContent.js';
import { useCategory } from '../hooks/useCategory.js';
import RecipeCard from "../components/recipes/RecipeCard.jsx";
import { ImFileEmpty } from "react-icons/im";
import { useAuth } from '../hooks/useAuth.js';

function HomePage() {
  const { recipes, getAllRecipes } = useRecipes();
  const { content, getContent } = useContent();
  const { categories, tags, getCategories, getTags } = useCategory();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();
  const [showTags, setShowTags] = useState(false);

  const tagsContainerRef = useRef(null);

  useEffect(() => {
    getAllRecipes();
    getContent();
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

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
    const matchesSearchTerm = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? recipe.category === selectedCategory : true;
    const matchesTags = selectedTags.length > 0
      ? selectedTags.every(tag => recipe.tags.includes(tag))
      : true;
    return matchesSearchTerm && matchesCategory && matchesTags;
  });

  const toggleTags = () => {
    setShowTags(!showTags);
  };

  const showDelete = user?.role === 'admin';
  if (!content) return <p>Cargando contenido...</p>;

  return (
    <>
      <div className="flex flex-col items-center mb-2">
        <header className="bg-zinc-800 rounded-md shadow-lg p-2">
          <h1 className="text-xl mb-2 font-bold text-center">{content.title}</h1>
          <p className="text-xs text-slate-400">
            {content.introduction}
          </p>
        </header>
      </div>
      {filteredRecipes.length > 0 && (
      <div className="flex justify-center p-2">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Buscar recetas..."
          className="text-xs px-2 py-2 rounded-md w-80 bg-zinc-800 text-zinc-500"
        />
      </div>
      )}
      {filteredRecipes.length > 0 && (
      <div className="flex justify-between items-center p-2 mb-6 bg-zinc-800 rounded-lg shadow-sm z-10">
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
            <h1 className="font-semibold text-xl text-gray-600">
              Aún no hay recetas
            </h1>
          </div>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                recipe={recipe}
                key={recipe._id}
                showComments={true}
                showFavorites={true}
                showDelete={showDelete}
                showEdit={false}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default HomePage;
