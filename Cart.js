import React from 'react';
import { useCart, useDispatchCart } from '../components/contextReducer';

export default function Cart() {
  const data = useCart();
  const dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center text-white fs-3'>The Cart is Empty!</div>
      </div>
    );
  }

  const handleRemove = (index) => {
    dispatch({ type: "REMOVE", index });
  };

  const handleCheckOut = async () => {
    const userEmail = localStorage.getItem("userEmail");
    const orderDate = new Date().toDateString();

    try {
      const response = await fetch("http://localhost:4000/api/orderData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: orderDate
        })
      });

      if (response.status === 200) {
        dispatch({ type: "DROP" });
      } else {
        // Handle error responses here
        console.error("Order failed");
      }
    } catch (error) {
      // Handle fetch errors here
      console.error("Error while sending order request", error);
    }
  };

  const totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div>
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        <table className='table table-hover'>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col'>Remove</th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button
                    type="button"
                    className="btn p-0"
                    onClick={() => handleRemove(index)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className='fs-2'>Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          <button className='btn bg-success mt-5' onClick={handleCheckOut}>
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}
