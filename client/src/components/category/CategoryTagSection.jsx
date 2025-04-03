import { useEffect } from "react";
import { useCategory } from '../../hooks/useCategory';
import { Label } from '../ui';

export function CategoryTagSelector({ selectedCategory, setSelectedCategory, selectedTags, setSelectedTags }) {
  const { categories, tags, getCategories, getTags } = useCategory();

  useEffect(() => {
    getCategories();
    getTags();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleTagChange = (e) => {
    const tag = e.target.value;
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(updatedTags);
  };

  return (
    <div className="my-2">
      <label className="block mb-2 text-xs text-zinc-300">Categoría</label>
      <select
        className="p-1 text-xs text-zinc-400 bg-zinc-700 rounded-md" 
        id="category"
        onChange={handleCategoryChange}
        value={selectedCategory || ''}>
        <option value="">Selecciona una categoría</option>
        {categories.map(category => (
          <option key={category._id} value={category._id}>{category.name}</option>
        ))}
      </select>

      <label className="block mt-3 mb-2 text-xs text-zinc-300">Etiquetas</label>
      <div className="flex flex-wrap gap-2 mt-2 text-zinc-400">
        {tags.map(tag => (
          <label key={tag._id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={tag._id}
              checked={selectedTags.includes(tag._id)}
              onChange={handleTagChange}
            />
            <span className="text-xs">{tag.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

