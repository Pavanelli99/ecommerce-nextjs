
import React, { useEffect, useState } from 'react';
import ProductForm from '../components/ProductForm';
import { useRouter } from 'next/router'; // Corrigindo a importação para useRouter
import { message } from 'antd';
import axios from 'axios';
import { uploadImageAndReturnUrls } from 'd:/TADS2020/Novo_ppc/framework/ecommerce-nextjs/ecommerce-nextjs/frontend/src/helpers/imageHanding';


function AddProduct() {
  const [selectedFiles, setSelectedFiles] = useState([]); // Corrigindo a inicialização do state
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // interface AddFormProps para o formulário de adição de produto
  interface AddFormProps {
    name: string;
    description: string;
    price: number;
    categoryId: string; // Ou o tipo apropriado para o ID da categoria
    stock: number;
    // Adicione outros campos conforme necessário para o seu formulário
  }


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
