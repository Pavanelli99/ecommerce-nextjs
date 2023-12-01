'use client'
import { ProductInterface } from "@/interfaces";
import { AddProductToCart } from "@/redux/cartSlice";
import { Button, message } from "antd";
import react from "react";
import { useDispatch } from "react-redux";

function AddToCartBtn({product}: {product: ProductInterface}){

  const Dispatch = useDispatch()

return(
  <div>
    <Button
    type="primary"
    onClick={(e) => {
      Dispatch(
        AddProductToCart({
          ... product,
          quantity: 1,
        })
      );
      message
    }


    </div>
)
}