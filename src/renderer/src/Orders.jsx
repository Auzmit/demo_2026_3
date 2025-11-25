import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

function OrderCard({ order }) {
  return <>
    <div className="orderCard" key={order.id}>
      <table>
        <tr>
          <td>№</td>
          <td>{order.id}</td>
        </tr>
        <tr>
          <td>Артикль: </td>
          <td>{order.order_article}</td>
        </tr>
        <tr>
          <td>Код для клиента: </td>
          <td>{order.code_for_client}</td>
        </tr>
        <tr>
          <td>Дата заказа: </td>
          <td>{order.order_date.toLocaleDateString()}</td>
        </tr>
        <tr>
          <td>Дата доставки: </td>
          <td>{order.delivery_date.toLocaleDateString()}</td>
        </tr>
        <tr>
          <td>Адрес доставки: </td>
          <td>{order.delivery_point}</td>
        </tr>
        <tr>
          <td>Клиент: </td>
          <td>{order.auth_client_full_name}</td>
        </tr>
        <tr>
          <td>Статус заказа: </td>
          <td>{order.order_status}</td>
        </tr>
      </table>
    </div>
  </>
}

// let initialOrders = [];
function Orders({ user, setUser }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async function getOrders() {
      const res = await window.api.getOrders();
      setOrders(res);
      // initialOrders = JSON.parse(JSON.stringify(res));
    })()
  }, []);
  
  const navigate = useNavigate();
  return (
    <>
      <h2>{user.name}<br/> Роль: {user.role}</h2>

      <button onClick={() => navigate('/store')}>Вернуться в магазин</button>

      <h1 style={{textAlign: "center"}}>Заказы</h1>

      <div className="ordersContainer" style={{width: "700px", margin: "auto", marginTop: "5%"}}>
        {orders.map((order) => <OrderCard order={order} />)}
      </div>
    </>
  )
}

export default Orders;
