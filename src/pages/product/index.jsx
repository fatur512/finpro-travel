import { useEffect, useState } from "react";

export async function getServerSideProps() {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();

  return {
    props: {
      products: data,
    },
  };
}

const ProductPage = (props) => {
  const { products } = props;
  // const [products, setProducts] = useState([]);
  // useEffect(() => {
  //   fetch('https://fakestoreapi.com/products')
  //     .then((res) => res.json())
  //     .then((json) => setProducts(json));
  // }, []);

  return (
    <div>
      <div>Halaman Product</div>
      {products.map((product) => (
        <h1 key={product.id}>{product.title}</h1>
      ))}
    </div>
  );
};

export default ProductPage;
