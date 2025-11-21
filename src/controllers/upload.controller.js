const path = require('path');
const fs = require('fs');

// Subir una imagen
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se ha proporcionado ninguna imagen' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    res.status(200).json({
      ok: true,
      message: 'Imagen subida exitosamente',
      imageUrl: imageUrl,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Subir múltiples imágenes
exports.uploadMultipleImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No se han proporcionado imágenes' });
    }

    const images = req.files.map(file => ({
      imageUrl: `/uploads/${file.filename}`,
      filename: file.filename,
      size: file.size,
      mimetype: file.mimetype
    }));

    res.status(200).json({
      ok: true,
      message: 'Imágenes subidas exitosamente',
      images: images,
      count: images.length
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar una imagen
exports.deleteImage = async (req, res) => {
  try {
    const { filename } = req.params;

    if (!filename) {
      return res.status(400).json({ error: 'No se ha proporcionado el nombre del archivo' });
    }

    const filePath = path.join(__dirname, '../../uploads', filename);

    // Verificar si el archivo existe
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Archivo no encontrado' });
    }

    // Eliminar el archivo
    fs.unlinkSync(filePath);

    res.status(200).json({
      ok: true,
      message: 'Imagen eliminada exitosamente',
      filename: filename
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener una imagen
exports.getImage = async (req, res) => {
  try {
    const { filename } = req.params;

    if (!filename) {
      return res.status(400).json({ error: 'No se ha proporcionado el nombre del archivo' });
    }

    const filePath = path.join(__dirname, '../../uploads', filename);

    // Verificar si el archivo existe
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Imagen no encontrada' });
    }

    res.sendFile(filePath);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
