import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useRecipes } from "../hooks/useRecipes.js";
import { recipeSchema } from '../schemas/recipe.js';
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { Button, ButtonLink, Card, Input, Label, Textarea } from "../components/ui";
import { CategoryTagSelector } from '../components/category/CategoryTagSection.jsx';

export function RecipeFormPage() {
  const { createRecipe, getRecipe, updateRecipe } = useRecipes();
  const navigate = useNavigate();
  const params = useParams();
  
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);

  const { register, setValue, handleSubmit, control, formState: { errors } } = useForm({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      cookingtime: { hour: 0, minute: 0 },
      ingredients: [],
      category: selectedCategory,
      tags: selectedTags
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const onSubmit = async (data) => {
    try {
      if (params.id) {
        await updateRecipe(params.id, { ...data, category: selectedCategory, tags: selectedTags });
      } else {
        await createRecipe({ ...data, category: selectedCategory, tags: selectedTags });
      }
    } catch (error) {
      console.log(error);
    }
    navigate("/recipes");
  };

  useEffect(() => {
    const loadRecipe = async () => {
      if (params.id) {
        const recipe = await getRecipe(params.id);
        setValue("title", recipe.title);
        setValue("description", recipe.description);
        setValue("imageUrl", recipe.imageUrl);
        setValue("ingredients", recipe.ingredients);
        setValue("instructions", recipe.instructions);
        setValue("cookingtime", recipe.cookingtime);
        setSelectedCategory(recipe.category);
        setSelectedTags(recipe.tags || []);
      }
    };
    loadRecipe();
  }, [params.id, setValue]);

  return (
      <Card>
        <form onSubmit={handleSubmit(onSubmit)} role="form">
          <Label htmlFor="title">Título</Label>
          <Input type="text" id="title" name="title" placeholder="Title"
            {...register("title")}
            autoFocus />
          {errors.title && (<p className="text-red-500 text-xs italic py-1">{errors.title.message}</p>)}

          <Label htmlFor="description">Descripción</Label>
          <Textarea name="description" id="description" rows={6} maxLength={600} placeholder="Description"
            {...register("description")}
          />
          {errors.description && (<p className="text-red-500 text-xs italic py-1">{errors.description.message}</p>)}

          <Label htmlFor="imageUrl">Imagen</Label>
          <Input type="text" id="imageUrl" name="imageUrl" placeholder="image Url"
            {...register("imageUrl", {
              required: "La URL de la imagen es obligatoria",
              pattern: {
                value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                message: "La URL no es válida",
              },
            })}
          />
          {errors.imageUrl && (<p className="text-red-500 text-xs italic py-1">{errors.imageUrl.message}</p>)}

          <Label htmlFor="ingredients-list">Ingredientes</Label>
          <div id="ingredients-container">
            {fields.map((field, index) => (
              <div key={field.id} className="ingredient">

                <div className="input-group">
                  <input type="text" id={`ingredient-${index}-name`} placeholder="Nombre del ingrediente" className="bg-zinc-700 mr-2 text-zinc-500 placeholder:text-zinc-500 text-xs p-1 my-1 rounded-md"
                    {...register(`ingredients[${index}].name`)}
                    defaultValue={field.name}
                    autoFocus aria-labelledby={`ingredient-${index}-name`} />
                </div>

                <div className="input-group">
                  <input type="text" id={`ingredient-${index}-quantity`} placeholder="Cantidad" className="bg-zinc-700 text-zinc-500 placeholder:text-zinc-500 text-xs p-1 my-1 rounded-md"
                    {...register(`ingredients[${index}].quantity`)}
                    defaultValue={field.quantity}
                    autoFocus aria-labelledby={`ingredient-${index}-quantity`} />
                </div>

                <button type="button" onClick={() => remove(index)}
                className="flex bg-red-600 px-2 py-2 rounded-md text-zinc-300 text-xs hover:text-zinc-400 my-1">
                  Eliminar
                </button>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => append({ name: "", quantity: "" })}
          className="flex bg-red-600 px-2 py-2 rounded-md text-zinc-300 text-xs hover:text-zinc-400 my-1">
            Agregar ingrediente
          </button>
          {errors.ingredients && (<p className="text-red-500 text-xs italic py-1">{errors.ingredients.message}</p>)}

          <Label htmlFor="instructions">Instrucciónes</Label>
          <Textarea name="instructions" id="instructions" rows={10} maxLength={1980} placeholder="¡A cocinar! Preparación"
            {...register("instructions")}
          />
          {errors.instructions && (<p className="text-red-500 text-xs italic py-1">{errors.instructions.message}</p>)}

          <Label htmlFor="cookingtime-hour">Tiempo de preparación</Label>
          <div>
            <span htmlFor="cookingtime-hour" className="text-zinc-300 text-xs font-mono my-2">Horas</span>
            <Input type="number" id="cookingtime-hour" name="cookingtime.hour" placeholder="Horas" min="0"
              {...register("cookingtime.hour", { valueAsNumber: true })} />
            {errors.cookingtime?.hour && (<p className="text-red-500 text-xs italic py-1">{errors.cookingtime.hour.message}</p>)}
          </div>
          <div>
            <span htmlFor="cookingtime-minute" className="text-zinc-300 text-xs font-mono my-2">Minutos</span>
            <Input type="number" id="cookingtime-minute" name="cookingtime.minute" placeholder="Minutos" min="0"
              {...register("cookingtime.minute", { valueAsNumber: true })} />
            {errors.cookingtime?.minute && (<p className="text-red-500 text-xs italic py-1">{errors.cookingtime.minute.message}</p>)}
          </div>

          <CategoryTagSelector
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />

          <div className="flex space-x-4">
            <Button type="submit">Guardar</Button>
            <ButtonLink to={`/recipes`}><p>Cancelar</p></ButtonLink>
          </div>
        </form>
      </Card>
  );
}
