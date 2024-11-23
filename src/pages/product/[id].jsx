import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export async function getServerSideProps(context) {
  const res = await fetch("https://fakestoreapi.com/products/" + context.params.id);
  const data = await res.json();

  return {
    props: {
      product: data,
    },
  };
}

const DetailLearn = (props) => {
  const router = useRouter();
  const { product } = props;
  // const [product, setProduct] = useState({});

  // useEffect(() => {
  //   if (router.query.id) {
  //     fetch('https://fakestoreapi.com/products/' + router.query.id)
  //       .then((res) => res.json())
  //       .then((json) => setProduct(json));
  //   }
  // }, [router.query.id]);

  return (
    <div>
      <h1>Detail Product {router.query.id}</h1>
      <img src={product.image} alt={product.title} className="w-20" />
      <h2>Nama : {product.title}</h2>
    </div>
  );
};

export default DetailLearn;
