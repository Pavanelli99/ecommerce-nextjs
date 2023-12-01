import React from 'react';
import { cookies } from 'next/headers'
import { message } from 'antd';
import axios from 'axios';
import image from 'next/image';

async function getProduct(productId: string) {

  try {
    const cookStore = cookies().get("token")?.value

    const resp = await axios.get(
      `${process.env.DOMAIN}/product/'${productId}`, {
      headers: {
        Autorization: `Bearer ${cookStore}`,
        Cookie: cookStore,
      },
    });
    return resp.data || [];
  } catch (error: any) {
    console.log(error.message);

  }

}

async function ProductInfo({ params, }: { params: { productId: string } }) {

  const product = await getProduct(params.productId);



  return (
    <div className='mt-10 px-10'>
      {product && (
        <div className='grid grid-cols-2 gap-5 p-5'>
          <ProductImages product={product}></ProductImages>


      </div>

      )}
      <div>ProductInfo</div>

    </div>
  )
}

export default ProductInfo;