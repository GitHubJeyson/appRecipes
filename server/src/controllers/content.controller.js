import Content from '../models/content.model.js';


export const getContent = async (req, res) => {
  try {
    const content = await Content.findOne();
    if (!content) {
        return res.status(404).json({ message: 'Contenido no encontrado' });
    }
    res.json(content);
  } catch (error) {
    console.error('Error al obtener el contenido:', error);
    res.status(500).json({ message: 'Error al obtener el contenido' });
  }
};

export const insertContent = async (req, res) => {
    try {
      if (req.user.role !== 'admin') {
        console.log('Acceso denegado. Se requiere rol de administrador.')
        return res.status(403).json({ message: error.message });
      }
      const { title, introduction } = req.body;
      const newContent = new Content({
          title,
          introduction,
      });
      await newContent.save();
      return res.json(newContent);
    } catch (error) {
        console.error('Error al insertar el contenido:', error);
        res.status(500).json({ message: 'Error al insertar el contenido' });        
    }
};

export const updateContent = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      console.log('Acceso denegado. Se requiere rol de administrador.')
      return res.status(403).json({ message: error.message });
    }
    const { _id } = req.body;
    const { title, introduction } = req.body.data;
    const content = await Content.findOneAndUpdate(
      { _id },
      { title, introduction },
      { new: true }
    );
    if (!content) {
      return res.status(404).json({ message: 'Contenido no encontrado' });
    }
    return res.status(200).json(content);
  } catch (error) {
    console.error('Error al actualizar el contenido:', error);
    res.status(500).json({ message: 'Error al actualizar el contenido' });
  }
};
