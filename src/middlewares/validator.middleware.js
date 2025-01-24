export const validateSchema = (schema) => (req, res, next) => {
    try {
      schema.parse(req.body);
      //console.log("Validación exitosa");
      next();
    } catch (error) {
      return res
        .status(400)
        .json({ message: error.errors.map((error) => error.message) })
    }
  };
  