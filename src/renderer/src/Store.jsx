import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

function ProductsCard({ product }) {
  return <>
    <div className="productsCard" key={product.id} style={(product.current_discount <= 15) ?
    {backgroundColor: "#7FFF00"} : {backgroundColor: "#2E8B57"} }>
      <div className="productsPhoto">
        <img src={`src/assets/${product.photo ? product.photo : 'picture.png'}`} alt="" />
      </div>

      <div className="productsInfo">
        <div className="productsHeading">{product.product_category} (артикль: {product.article})</div>
        <p>{product.product_name}</p>
        <p>В наличии: <b>{product.quantity_in_stock}</b> {product.unit_of_measurement}</p>
        <p>Производитель: {product.producer_name}</p>
        <p className="supplier">Поставщик: {product.supplier_name}</p>
        <p>Описание: {product.product_description}</p>
      </div>
      
      <div className="priceAndDiscount">
        <p className="priceHeader">Цена:</p>
        <div className="price">
          <h3>{product.price}</h3>
        </div>
        <p className="discountHeader">Скидка:</p>
        <div className="discount">
          <h3>{product.current_discount}%</h3>
        </div>
      </div>
    </div>
  </>
}

let byIncreasingCount = false;
let byIncreasingSupplier = false;
let initialProducts = [];
function Store({ user, setUser }) {
  const [products, setProducts] = useState([]);
  
  const sortProductsByQuantity = () => {
    byIncreasingCount 
      ? setProducts(products.toSorted((a, b) => a.quantity_in_stock - b.quantity_in_stock))
      : setProducts(products.toSorted((a, b) => b.quantity_in_stock - a.quantity_in_stock))
    byIncreasingCount = !byIncreasingCount
  };
  
  const sortProductsBySupplier = () => {
    byIncreasingSupplier 
      ? setProducts(products.toSorted((a, b) => a.supplier_name.localeCompare(b.supplier_name)))
      : setProducts(products.toSorted((a, b) => b.supplier_name.localeCompare(a.supplier_name)));
    byIncreasingSupplier = !byIncreasingSupplier;
  };

  const findProducts = (e) => {
    const value = e.target.value.toLowerCase();

    if (value === '') {
      setProducts(initialProducts);
    } else {
      const keysToCheck = [
        'article',
        'product_category',
        'product_name',
        'supplier_name',
        'producer_name',
        'product_description',
        'price',
        'current_discount',
      ];

      const filteredProducts = initialProducts.filter(product =>
        keysToCheck.some(key => {
          const keyValue = product[key];
          if (keyValue == null) return false;
          const strValue = keyValue.toString().toLowerCase();
          return strValue.includes(value);
        })
      );

      setProducts(filteredProducts);
    }
  };

  useEffect(() => {
    (async function getProducts() {
      const res = await window.api.getProducts();
      setProducts(res);
      initialProducts = JSON.parse(JSON.stringify(res));
    })()
  }, []);

  
  const navigate = useNavigate();
  return (
    <>
      {user.role === 'guest'
        ? <h2>Гость</h2>
        : <h2>{user.name}<br/> Роль: {user.role}</h2>}

      <button onClick={() => { setUser({}); navigate('/') }}>
        {user.role === 'guest' ? 'На страницу входа' : 'Выйти'}
      </button>

      <h1 style={{textAlign: "center"}}>Магазин</h1>

      {(user.role === 'Менеджер' || user.role === 'Администратор') ? <div style={{
        width: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>
        <div>Поиск <input onInput={(e) => findProducts(e)}></input></div>
        <button onClick={() => sortProductsByQuantity()}>Сортировать товары по количеcтву на складе</button>
        <button onClick={() => sortProductsBySupplier()}>Сортировать товары по поставщику</button>
      </div> : ''}

      {user.role === 'Администратор' ?
        <button onClick={() => navigate('/orders')}>Заказы</button> : ''}

      <div className="productsContainer" style={{width: "700px", margin: "auto", marginTop: "5%"}}>
        {products.map((product) => <ProductsCard product={product} />)}
      </div>
    </>
  )
}

export default Store;
