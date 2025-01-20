const cloudinary = require ('cloudinary');
const router = require('express').Router();
require ('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

router.delete('/:public_id', async (req, res) => {
    const { public_id } = req.params;
    console.log('Eliminando imagen con public_id:', public_id);
  
    try {
      const result = await cloudinary.uploader.destroy(public_id);
      console.log('Resultado de la eliminación:', result); 
  
      if (result.result === 'ok') {
        return res.status(200).send('Imagen eliminada exitosamente');
      } else {
        console.error('Error al eliminar la imagen:', result);
        return res.status(500).send(`Error al eliminar la imagen: ${result.error || 'Desconocido'}`);
      }
    } catch (e) {
      console.error('Error interno al eliminar la imagen:', e);
      return res.status(500).send(`Error interno: ${e.message}`);
    }
});
  
  

module.exports = router;