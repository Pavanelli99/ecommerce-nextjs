// use client;
import React, { useEffect, useState } from 'react';
import ProductForm from '../components/ProductForm';
import { useRouter } from 'next/router'; // Corrigindo a importação para useRouter
import { message } from 'antd';
import axios from 'axios';

function AddProduct() {
  const [selectedFiles, setSelectedFiles] = useState([]); // Corrigindo a inicialização do state
  const [loading, setLoading] = useState(false);
  const router = useRouter();



  // Função para salvar o produto com imagens
  const onSave = async (values: AddFormProps) => {
    try {
      setLoading(true);
      const imgUrls = await uploadImageAndReturnUrls(selectedFiles);
      values.price = Number(values.price)
      values.stock = Number(values.stock)


      //save product info
      const respProduct = await axios.post("http://localhost:3000/product", values);

      console.log(respProduct)
      // tendo o id do produto fazer um POST em images com as urls e id do produto






    } catch (error: any) {
      message.error(error.message);
    }
  };

  return (
    <div className="m-10">
      <h1 className="text-2xl font-bold text-gray-800">Add Product</h1>
      <hr />

      <ProductForm
        setSelectedFiles={setSelectedFiles} // Corrigindo a passagem da prop
        loading={loading}
        onSave={onSave}
      />
    </div>
  );
}

export default AddProduct;
