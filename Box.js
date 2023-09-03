import React, { useState, useRef, useEffect } from 'react';
import { useDispatchCart, useCart } from './contextReducer';

export default function Box(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  useEffect (()=>{
    setSize(priceRef.current.value)
  }, [])
  
  const handleAddtoCart = async () => {
    let finalPrice = qty * parseInt(options[size]);
    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice, // Use finalPrice here
      qty: qty,
      size: size
    });
    console.log(data);
    
  }

  return (
    <div className="card border-light mt-3 bg-dark">
      <img
        src={props.foodItem.img}
        className="card-img-top"
        alt="..."
        style={{ height: '120px', objectFit: 'fill' }}
      />
      <div className="card-body">
        <h5 className="card-title bg-dark text-white">{props.foodItem.name}</h5>
        <div className="container w-100 rounded">
          <select className="m-2 h-100 text-white bg-success rounded" onChange={(e) => setQty(e.target.value)}>
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
          <select className="m-2 h-100 text-white bg-success rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
            {priceOptions.map((data) => {
              return (
                <option key={data} value={data}>
                  {data}
                </option>
              );
            })}
          </select>
          <div className="d-inline h-100 fs-5 text-white rounded">Rs.{qty * parseInt(options[size])}/-</div>
          <hr />
          <button className={`btn btn-success justify-center ms-2`} onClick={handleAddtoCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
