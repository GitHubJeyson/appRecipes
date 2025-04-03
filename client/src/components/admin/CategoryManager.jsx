import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useCategory } from "../../hooks/useCategory";
import { Button, Input, Message } from "../ui";

export const CategoryManager = () => {
  const { categories, setCategories, setTags, getCategories, createCategory, deleteCategory, tags, getTags, createTag, deleteTag, errors } = useCategory();
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      categories: [],
      tags: [],
    }
  });

  const { fields: categoryFields, append: appendCategory, remove: removeCategory } = useFieldArray({
    control,
    name: "categories",
  });

  const { fields: tagFields, append: appendTag, remove: removeTag } = useFieldArray({
    control,
    name: "tags",
  });

  const handleAddItem = async (type, data) => {
    try {
      const itemExists = type === "category"
        ? categories.some(category => category.name.toLowerCase() === data.name.toLowerCase())
        : tags.some(tag => tag.name.toLowerCase() === data.name.toLowerCase());

      if (itemExists) {
        const message = type === "category" ? `La categoría "${data.name}" ya existe.` : `La etiqueta "${data.name}" ya existe.`;
        alert(message);
        return;
      }

      const createItem = type === "category" ? createCategory : createTag;
      const newItem = await createItem(data);
      type === "category" ? setCategories(prev => [...prev, newItem]) : setTags(prev => [...prev, newItem]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteItem = async (type, id) => {
    try {
      const deleteItem = type === "category" ? deleteCategory : deleteTag;
      await deleteItem(id);
      type === "category" ? setCategories(categories.filter(item => item._id !== id)) : setTags(tags.filter(item => item._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data) => {
    try {
      for (let category of data.categories) {
        await handleAddItem("category", category);
      }
      for (let tag of data.tags) {
        await handleAddItem("tag", tag);
      }
      // Limpiar los campos del formulario después de guardarlos
      reset({ categories: [], tags: [] });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategories();
    getTags();
  }, []);

  return (
    <div className="w-[calc(60vh-100px)] p-6 bg-zinc-900 rounded-lg shadow-lg shadow-zinc-950">
        {errors.map((error, i) => (
          <Message message={error} key={i} />
        ))}
      <form onSubmit={handleSubmit(onSubmit)} role="form">
        <div>
          <div className="text-2xl mb-6 text-zinc-300 font-semibold">
          <h3>Categorías</h3>
          </div>
          {categoryFields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-4">
              <Input
                placeholder="Nombre de la categoría"
                {...register(`categories[${index}].name`, { required: "Este campo es obligatorio" })}
                defaultValue={field.name}
              />
              <Button type="button" onClick={() => removeCategory(index)}>
                Eliminar
              </Button>
            </div>
          ))}
          <Button type="button" onClick={() => appendCategory({ name: "" })}>
            Añadir categoría
          </Button>
        </div>

        <div>
          <div className="text-xl my-6 text-zinc-300 font-semibold">
          <h3>Etiquetas</h3>
          </div>
          {tagFields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-4">
              <Input
                placeholder="Nombre de la etiqueta"
                {...register(`tags[${index}].name`, { required: "Este campo es obligatorio" })}
                defaultValue={field.name}
              />
              <Button type="button" onClick={() => removeTag(index)}>
                Eliminar
              </Button>
            </div>
          ))}
          <Button type="button" onClick={() => appendTag({ name: "" })}>
            Añadir etiqueta
          </Button>
        </div>

        <div className="flex mt-4">
          <Button type="submit">Guardar</Button>
        </div>
      </form>

      <div className="mt-8">
        <div className="text-xl text-zinc-300 font-semibold">
            <h3>Categorías Existentes</h3>
        </div>
        {categories.length === 0 ? (
          <div className="text-md text-zinc-400">
            <p>No hay categorías disponibles.</p>
          </div>
        ) : (
          categories.map(cat => (
            <div key={cat._id} className="flex justify-between text-md mt-4 text-zinc-400">
              {cat.name}{" "}
              <Button onClick={() => handleDeleteItem("category", cat._id)}>
                Eliminar
              </Button>
            </div>
          ))
        )}
      </div>

      <div className="mt-8">
        <div className="text-xl text-zinc-300 font-semibold">
        <h3>Etiquetas Existentes</h3>
        </div>
        {tags.length === 0 ? (
          <div className="text-md my-2 text-zinc-400">
            <p>No hay etiquetas disponibles.</p>
          </div>
        ) : (
          tags.map(tag => (
            <div key={tag._id} className="flex justify-between text-md mt-4 text-zinc-400">
              {tag.name}{" "}
              <Button onClick={() => handleDeleteItem("tag", tag._id)}>
                Eliminar
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
