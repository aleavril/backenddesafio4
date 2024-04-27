import fs from "fs";

let products = [];
let pathFile = "./src/data/products.json";

const addProduct = async (product) => {
  const { title, description, price, thumbnail, code, stock } = product; //se desestructura el producto para recibir los parametros indiferentemente del orden de la llegada
  await getProducts();
  const newProduct = {
    id: products.length + 1,
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    status: true,
  };

  if (Object.values(newProduct).includes(undefined)) {
    console.log("Todos los campos son obligatorios");
    return;
  }

  const productExists = products.find((product) => product.code === code);
  if (productExists) {
    console.log(`El producto ${title} con el código ${code} ya existe`);
    return;
  }

  products.push(newProduct);

  await fs.promises.writeFile(pathFile, JSON.stringify(products));
};

const getProducts = async (limit) => { //recibe el limite de la query
  const productsJson = await fs.promises.readFile(pathFile, "utf8");
  products = JSON.parse(productsJson) || [];

  if (!limit) return products; //si no recibe limite se retornan TODOS los productos

  return products.slice(0, limit); //si recibe limite lo muestra desde la posicion 0 hasta la posicion recibida por parametro
};

const getProductById = async (id) => {
  await getProducts();
  const product = products.find((product) => product.id === id);
  if (!product) {
    throw Error(`No se encontró el producto con el id ${id}`);
  }

  return product;
};

const updateProduct = async (id, dataProduct) => {
  await getProducts();
  const index = products.findIndex((product) => product.id === id);
  products[index] = {
    ...products[index],
    ...dataProduct,
  };

  await fs.promises.writeFile(pathFile, JSON.stringify(products));
};

const deleteProduct = async (id) => {
  await getProducts();
  products = products.filter((product) => product.id !== id);
  await fs.promises.writeFile(pathFile, JSON.stringify(products));
};

export default {  //se exportan asi las funciones 
  addProduct,
  getProductById,
  getProducts,
  updateProduct,
  deleteProduct,
};
