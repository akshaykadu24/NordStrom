import React from "react";
import "./AdminCard.css";
import { db } from "../../Firebase/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { useToast } from "@chakra-ui/react";

const AdminCard = ({ product, updatefun }) => {
  const toast = useToast();
  const deleteItem = async (id) => {
    const itemDoc = doc(db, "admin-collection-asos", id);
    await deleteDoc(itemDoc);
    updatefun();
    toast({
      title: "item deleted",
      status: "error",
      isClosable: true,
      position: "top",
      duration: 3000,
    });
  };
  return (
    <div id={product.id} className="admin-item-card">
      <i className="fa-solid fa-x" onClick={() => deleteItem(product.id)}></i>
      <img src={product.image} alt={product.cardDetails} />
      <h2>{product.title}</h2>
      <p>
        <b>Price: $</b>
        {product.price}
      </p>
      <p>
        <b>Category: </b>
        {product.category}
      </p>
      <p>
        <b>Gender: </b>
        {product.gender}
      </p>
      <p>
        <b>productID: </b>
        {product.id}
      </p>
    </div>
  );
};

export default AdminCard;
