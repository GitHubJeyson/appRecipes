import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useRecipes } from "../hooks/useRecipes.js";
import { recipeSchema } from '../schemas/recipe.js';
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { Button, ButtonLink, Card, Input, Label, Textarea } from "../components/ui";

export function RecipeFormPage() {
  const { createRecipe, getRecipe, updateRecipe } = useRecipes();
  const { register, setValue, handleSubmit, control, formState: { errors } } = useForm({ 
    resolver: zodResolver(recipeSchema), 
    defaultValues: {
      cookingtime: { hour: 0, minute: 0},
      ingredients: []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients", // Se vincula al campo de ingredientes
  });

  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = async (data) => {
    try {
      if (params.id) {
        await updateRecipe(params.id, data);
      } else {
        await createRecipe({ ...data });
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
      }
    };
    loadRecipe();
  }, []);


  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)} className="w-[700px]">
        <Label htmlFor="title">Título</Label>
        <Input type="text" name="title" placeholder="Title"
          {...register("title")}
          autoFocus/>
        {errors.title && (<p className="text-red-500 text-xs italic py-1">{errors.title.message}</p>)}

        <Label htmlFor="description">Descripción</Label>
        <Textarea name="description" id="description" rows={6} maxLenght={600} placeholder="Description"
          {...register("description")}
        />
        {errors.description && (<p className="text-red-500 text-xs italic py-1">{errors.description.message}</p>)}
        
        <Label htmlFor="imageUrl">Imagen</Label>
        <Input type="text" name="imageUrl" placeholder="image Url"
          {...register("imageUrl", {
            required: "La URL de la imagen es obligatoria",
            pattern: {
                value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                message: "La URL no es válida",
              },
            })}
          />
        {errors.imageUrl && (<p className="text-red-500 text-xs italic py-1">{errors.imageUrl.message}</p>)}

        <Label htmlFor="ingredients">Ingredientes</Label>
          <div id="ingredients-container">
            {fields.map((field, index) => (
              <div key={field.id} className="ingredient">
                <input type="text" placeholder="Nombre del ingrediente" className="bg-zinc-700 mr-2 text-zinc-400 px-4 py-1 my-2 rounded-md"
                  {...register(`ingredients[${index}].name`)}
                  defaultValue={field.name}
                autoFocus/>
                <input type="text" placeholder="Cantidad" className="bg-zinc-700 text-zinc-400 mr-2 px-4 py-1 my-2 rounded-md"
                  {...register(`ingredients[${index}].quantity`)}
                  defaultValue={field.quantity}
                autoFocus/>
                <button type="button" onClick={() => remove(index)}
                  className="bg-red-600 px-4 py-1 mr-3 rounded-md my-2">
                  Eliminar
                </button>
            </div>
            ))}
          </div>
          <button type="button" onClick={() => append({ name: "", quantity: "" })}
          className="bg-red-600 px-4 py-1 mr-3 rounded-md my-2">
            Agregar ingrediente
          </button>
          {errors.ingredients && (<p className="text-red-500 text-xs italic py-1">{errors.ingredients.message}</p>)}

        <Label htmlFor="instructions">Instrucciónes</Label>
        <Textarea name="instructions" id="instructions" rows={10} maxLenght={1980} placeholder="¡A cocinar! Preparación"
          {...register("instructions")}
        />
        {errors.instructions && (<p className="text-red-500 text-xs italic py-1">{errors.instructions.message}</p> )}

        <Label htmlFor="cookingtime">Tiempo de cocción</Label>
        <div>
          <Label htmlFor="cookingtime-hour">Horas</Label>
          <Input type="number" name="cookingtime.hour" placeholder="Horas" min="0"
            {...register("cookingtime.hour", { valueAsNumber: true })}/>
          {errors.cookingtime?.hour && (<p className="text-red-500 text-xs italic py-1">{errors.cookingtime.hour.message}</p>)}
        </div>
        <div>
          <Label htmlFor="cookingtime-minute">Minutos</Label>
          <Input type="number" name="cookingtime.minute" placeholder="Minutos" min="0"
            {...register("cookingtime.minute", { valueAsNumber: true })}/>
          {errors.cookingtime?.minute && (<p className="text-red-500 text-xs italic py-1">{errors.cookingtime.minute.message}</p>
          )}
        </div>
        
        <div className="flex">
        <Button>Guardar</Button>
        <ButtonLink to={`/recipes`}><p>Cancelar</p></ButtonLink>
        </div>
      </form>
    </Card>
  );
}
