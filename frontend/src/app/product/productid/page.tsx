import React from 'react';
import { cookies } from 'next/headers';
import axios from 'axios';
import Image from 'next/image';
import ProductImages from './ProductImages';
import ProductActionButtons from './ProductActionButtons';

async function getProduct(productId: string) {
  try {
    const cookStore = cookies().get('token')?.value;

    const resp = await axios.get(`${process.env.DOMAIN}/product/${productId}`, {
      headers: {
        Authorization: `Bearer ${cookStore}`,
        Cookie: cookStore,
      },
    });

    return resp.data || [];
  } catch (error: any) {
    console.log(error.message);
  }
}

async function ProductInfo({ params }: { params: { productId: string } }) {
  const product = await getProduct(params.productId);

  console.log(product);

  return (
    <div className="mt-10 px-10 ">
      {product && (
        <div className="grid grid-cols-2 gap-5 p-5  ">
          <ProductImages product={product}></ProductImages>

          <div className="flex flex-col gap-5">
            <div>
              <h1 className="text-3xl font-semibold">{product.name}</h1>
            </div>
            <div>
              <h1 className="text-xl font-semibold">Description</h1>
              <p className="text-2sm mt-5 mb-5 text-justify">{product.description}</p>
            </div>
            <div className="flex gap-5 items-center">
              <h1 className="text-5xl font-semibold">$ {product.price}</h1>
            </div>
            <ProductActionButtons product={product}></ProductActionButtons>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductInfo;