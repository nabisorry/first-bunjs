import React from "react";

type ProductProps = {
  userId: number;
  title: string;
  completed: boolean;
};

const Product = ({ userId, title }: ProductProps) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>userId : {userId}</p>
    </div>
  );
};

export default Product;
