import { useNavigate } from "react-router";
// import GoodsCard from "./components/GoodsCard";
import { useEffect, useState } from "react";

let byIncreasingCount = false;
let byIncreasingSupplier = false;

function ProductsCard({ product }) {
  return <>
    <div className="productsCard">
      <div className="productsPhoto">
        <img src={`src/assets/${product.photo ? product.photo : 'picture.png'}`} alt="" />
      </div>
      <div className="productsInfo">
        <div className="productsHeading">{product.product_category}</div>
        <p>{product.product_name}</p>
        {/* <p>{product.unit_of_measurement}</p>
        <p>{product.price}</p> */}
        <p>{product.supplier_name}</p>
        <p>{product.producer_name}</p>
        {/* <p>{product.product_category}</p> */}
        <p>{product.quantity_in_stock}</p>
        {/* <p>{product.product_description}</p> */}
        {/* <p>{product.photo}</p> */}
      </div>
      <div className="productsDiscount"><h3>{product.current_discount}%</h3></div>
    </div>
  </>
}

function Store({ user, setUser }) {
  const [products, setProducts] = useState([]);
  
  const sortProductsByQuantity = () => {
    byIncreasingCount 
    ? setProducts(products.toSorted((a, b) => a.quantity_in_stock - b.quantity_in_stock))
    : setProducts(products.toSorted((a, b) => b.quantity_in_stock - a.quantity_in_stock))
    byIncreasingCount = !byIncreasingCount
  }
  
  const sortProductsBySupplier = () => {
    products.toSorted();
    byIncreasingSupplier 
      ? setProducts(products.toSorted((a, b) => a.supplier_name.localeCompare(b.supplier_name)))
      : setProducts(products.toSorted((a, b) => b.supplier_name.localeCompare(a.supplier_name)));
    byIncreasingSupplier = !byIncreasingSupplier;
  }

  useEffect(() => {
    (async function getProducts() {
      const res = await window.api.getProducts();
      setProducts(res);
    })()
  }, [])
  
  const navigate = useNavigate();

  return (
    <>
      {user.role !== 'guest'
        ? <button onClick={() => { setUser({}); navigate('/') }}>Выйти</button>
        : <button onClick={() => { setUser({}); navigate('/') }}>На страницу входа</button>}
      <h1>Магазин</h1>
      {user.role !== 'guest' ? <div>
        <button onClick={() => sortProductsByQuantity()}>Сортировать товары по количеcтву на складе</button>
        <button onClick={() => sortProductsBySupplier()}>Сортировать товары по поставщику</button>
      </div> : ''}
      <div className="productsContainer">
        {products.map((product) => <ProductsCard product={product} key={product.id} />)}
      </div>
    </>
  )
}

export default Store;
