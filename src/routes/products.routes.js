import {Router} from "express";
import productManager from "../managers/productManager.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
      const { limit } = req.query; 
      const products = await productManager.getProducts(limit);
  
      res.status(200).json(products);
    } catch (error) {
      console.log(error);
    }
  });
  
router.get("/:pid", async (req, res) => {
    try {
      const { pid } = req.params;  // aqui se lee por parametro el product id
  
      const product = await productManager.getProductById(parseInt(pid)); // Todos los parámetros siempre vienen en formato string, por eso se parsea (tra forma seria en vez de (parseInt(pid))), (Number(pid)) o la mas moderna (+pid)
  
      res.status(200).json(product); //express siempre devuelve status 200, aqui se declara de todas formas
    } catch (error) {
      console.log(error);
    }
  });

  router.post("/", async (req, res) => {

    try {
      const product = req.body;

      const newProduct = await productManager.addProduct(product);

      res.status(201).json(newProduct);

    } catch (error) {
      console.loge(error);
    }

  })

  router.delete("/:pid", async (req, res) => {

    try {
      const {pid} = req.params;
      
      await productManager.deleteProduct(pid);

      res.status(201).json({message: "Producto eliminado"});

    } catch (error) {
      console.loge(error);
    }

  })




export default router;