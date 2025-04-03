import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useContent } from "../../hooks/useContent";
import { contentSchema } from '../../schemas/content';
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Button, ButtonLink, Input, Label, Textarea } from "../ui";

export const ContentManager = () => {
  const { content, insertContent, getContent, updateContent, isContentExist } = useContent();
  const { register, setValue, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(contentSchema),
  });
  
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      if (isContentExist) {
        await updateContent({data, _id: content._id});
      } else {
        await insertContent(data);
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContent();    
  }, [])
  
  useEffect(() => {
    if (content) {
      setValue("title", content.title);
      setValue("introduction", content.introduction);
    }
  }, [content, setValue]);

  return (
    <div className="flex w-[calc(80vh-100px)] p-6 bg-zinc-900 rounded-lg shadow-lg shadow-zinc-950">
      <form onSubmit={handleSubmit(onSubmit)} className="w-[700px]" role="form">
        <Label htmlFor="title">Título</Label>
        <Input
          type="text"
          id="title"
          name="title"
          placeholder="Título del contenido"
          {...register("title")}
        />
        {errors.title && (<p className="text-red-500 text-xs italic py-1">{errors.title.message}</p>)}

        <Label htmlFor="introduction">Introducción</Label>
        <Textarea
          name="introduction"
          id="introduction"
          rows={21}
          placeholder="Introducción del contenido"
          {...register("introduction")}
        />
        {errors.introduction && (<p className="text-red-500 text-xs italic py-1">{errors.introduction.message}</p>)}

        <div className="flex justify-between mt-4">
          <Button type="submit">
            {isContentExist ? "Actualizar" : "Agregar"} Contenido
          </Button>
          <ButtonLink to="/">Cancelar</ButtonLink>
        </div>
      </form>
    </div>
  );
};
