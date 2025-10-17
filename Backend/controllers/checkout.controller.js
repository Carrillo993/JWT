const create = async (req, res) => {
  try {
    return res.status(201).json({ //creamos el codigo 201 apra que envie el msj a frontend y me aseguro que el frontend vea res.ok === true
      message: "Checkout successful",
      cart: req.body,
      user: req.user,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const checkoutController = {
  create,
};
