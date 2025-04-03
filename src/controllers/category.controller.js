import Category from '../models/category.model.js';
import Tag from '../models/tag.model.js';

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
    res.json(categories);
  } catch (error) {
    console.error("Error al obtener las categorias:", error);
    res.status(500).json({ message: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      console.log('Acceso denegado. Se requiere rol de administrador.')
      return res.status(403).json({ message: error.message });
    }
    const { name } = req.body;
    const categoryFound = await Category.findOne({name});

    if (categoryFound) {
      return res.status(400).json({ message: ['La categoría ya existe'] });
    }

    const newCategory = new Category({
        name,
    });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error al crear la categoria:", error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => { 
  try {
    if (req.user.role !== 'admin') {
      console.log('Acceso denegado. Se requiere rol de administrador.')
      return res.status(403).json({ message: error.message });
    }
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: 'Categoria no encontrada' });
    }
    res.status(200).json({ message: 'Categoria eliminada' });

  } catch (error) {
    console.error("rror al eliminar la categoria", error);
    res.status(500).json({ message: error.message });
  }
};

//Tags

export const getTags = async (req, res) => {
  try {
    const tags = await Tag.find()
    res.json(tags);
  } catch (error) {
    console.error("Error al obtener las etiquetas:", error);
    res.status(500).json({ message: error.message });
  }
};

export const createTag = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      console.log('Acceso denegado. Se requiere rol de administrador.')
      return res.status(403).json({ message: error.message });
    }
    const { name } = req.body;
    const tagFound = await Tag.findOne({name});
    if (tagFound) {
      return res.status(400).json({ message: ['La etiqueta ya existe'] });
    }

    const newTag = new Tag({
        name,
    });
    await newTag.save();
    res.status(201).json(newTag);
  } catch (error) {
    console.error("Error al crear la etiqueta:", error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteTag = async (req, res) => { 
  try {
    if (req.user.role !== 'admin') {
      console.log('Acceso denegado. Se requiere rol de administrador.')
      return res.status(403).json({ message: error.message });
    }
    const { id } = req.params;
    const tag = await Tag.findByIdAndDelete(id);
    if (!tag) {
      return res.status(404).json({ message: 'Etiqueta no encontrada' });
    }
    res.status(200).json({ message: 'Etiqueta eliminada' });

  } catch (error) {
    console.error("Error al eliminar la etiqueta", error);
    res.status(500).json({ message: error.message });
  }
};