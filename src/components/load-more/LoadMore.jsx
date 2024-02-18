import React, { useEffect, useState } from "react";
import "./load-more.css";

export default function LoadMore() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  async function fetchProducts() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${
          count === 0 ? 0 : count * 20
        }`
      );

      const result = await response.json();

      if (result && result.products && result.products.length) {
        setProducts((prevProducts) => [...prevProducts, ...result.products]);
        setLoading(false);
      }
      console.log(result);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [count]);

  useEffect(() => {
    if (products && products.length === 100) {
      setIsDisabled(true);
    }
  }, [products]);

  if (loading) {
    return <h2>Loading Products...</h2>;
  }

  return (
    <div className="container">
      <div className="product-container">
        {products && products.length
          ? products.map((item) => (
              <div className="product" key={item.id}>
                <div className="img-container">
                  <img src={item.thumbnail} alt={item.title} />
                </div>
                <p>{item.title}</p>
              </div>
            ))
          : null}
      </div>
      <div className="btn-container">
        <button disabled={isDisabled} onClick={() => setCount(count + 1)}>
          Load More Products
        </button>
      </div>
      {isDisabled ? <h3>You have reached 100 products.</h3> : null}
    </div>
  );
}
