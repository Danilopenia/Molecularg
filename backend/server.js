require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conectar a MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Error conectando a MongoDB:", err));

// Modelos de MongoDB
const Producto = mongoose.model("Producto", new mongoose.Schema({
  nombre: String,
  descripcion: String,
  precio: Number,
  imagen: String,
  stock: Number,
  categoria: String,
}));

const Venta = mongoose.model("Venta", new mongoose.Schema({
  productos: [{ nombre: String, cantidad: Number, precio: Number }],
  total: Number,
  fecha: { type: Date, default: Date.now },
}));

// Rutas para productos
app.get("/productos", async (req, res) => {
  const productos = await Producto.find();
  res.json(productos);
});

app.post("/productos", async (req, res) => {
  const nuevoProducto = new Producto(req.body);
  await nuevoProducto.save();
  res.json(nuevoProducto);
});

app.put("/productos/:id", async (req, res) => {
  const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(producto);
});

app.delete("/productos/:id", async (req, res) => {
  await Producto.findByIdAndDelete(req.params.id);
  res.json({ message: "Producto eliminado" });
});

// Rutas para registrar ventas
app.post("/ventas", async (req, res) => {
  const nuevaVenta = new Venta(req.body);
  await nuevaVenta.save();
  res.json(nuevaVenta);
});

app.get("/ventas", async (req, res) => {
  const ventas = await Venta.find();
  res.json(ventas);
});

// Ruta para pagos con Stripe
app.post("/create-checkout-session", async (req, res) => {
  try {
    const { carrito } = req.body;

    const line_items = carrito.map((producto) => ({
      price_data: {
        currency: "usd",
        product_data: { name: producto.nombre },
        unit_amount: producto.precio * 100, // Convertir a centavos
      },
      quantity: producto.cantidad,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creando sesión de pago:", error);
    res.status(500).json({ error: "No se pudo procesar el pago" });
  }
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
