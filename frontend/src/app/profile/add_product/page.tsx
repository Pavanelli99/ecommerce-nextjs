'use client';

import React, { useEffect, useState } from 'react';
import ProductForm from '../components/ProductForm';
import { useRouter } from 'next/navigation';
import { message, notification } from 'antd';
import axios from 'axios';
import { uploadImageAndReturnUrls } from '@/helpers/imageHanding';

function AddProduct() {
  const [selectedFiles = [], setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  interface AddFormProps {
    name: string;
    description: string;
    price: number;
    stock: number;
    rate: 0
  }

  interface ImgFormProps {
    url: string;
    productId: string;
  }

  // save product with images
  const onSave = async (values: AddFormProps) => {
    try {
      setLoading(true);
      const imgUrls = await uploadImageAndReturnUrls(selectedFiles);
      values.price = Number(values.price);
      values.stock = Number(values.stock);
      values.rate = 0;

      // save product info
      const respProduct = await axios.post(
        'http://localhost:3000/product',
        values
      );

      if (imgUrls && imgUrls.length > 0) {
        imgUrls.forEach((img) => {
          const imgForm: ImgFormProps = {
            url: img,
            productId: respProduct.data.id,
          };

          axios.post('http://localhost:3000/image', imgForm);
        });
      }

      notification.success({
        message: 'Product saved successfully',
        description: `Product ${values.name} saved successfully`,
      });
      // console.log(respProduct)
      // tendo o ID do product fazer um POST em images com as URLs e ID do produto
      router.push('/profile?id=2');
    } catch (error: any) {
      notification.error({
        message: 'Error',
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="m-10">
      <h1 className="text-2xl font-bold text-gray-800">Add Product</h1>
      <hr />

      <ProductForm
        setSelectedFiles={setSelectedFiles}
        loading={loading}
        onSave={onSave}
      />
    </div>
  );
}

export default AddProduct;