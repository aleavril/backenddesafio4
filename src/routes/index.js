import {Router} from "express";
import productsRouters from "./products.routes.js"
import cartsRouters from "./carts.routes.js"
const router = Router();

//en el archivo app.js se le agregaria la ruta /api aqui en la indexacion, seria /api/products y /api/carts
router.use("/products", productsRouters); //endpoint de productos 
router.use("/carts", cartsRouters); //endpoint de carritos


export default router;