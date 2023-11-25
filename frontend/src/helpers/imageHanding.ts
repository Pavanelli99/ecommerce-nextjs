import { DividerProps } from "antd"; // Import correto do Ant Design DividerProps
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Imports corrigidos para as funções do Firebase Storage

export const uploadImageAndReturnUrls = async (files:any) => {
  try {
    const storage = getStorage(); // Inicialize o Firebase Storage corretamente
    const imageRefs = await Promise.all(
      files.map((file:any) => {
        const storageRef = ref(storage, `products/${file.name}`);
        return uploadBytes(storageRef, file);
      })
    );

    const imageUrls = await Promise.all(
      imageRefs.map((imageRef) => getDownloadURL(imageRef.ref))
    );

    return imageUrls;
  } catch (error) {
    console.error('Error uploading images:', error);
    throw error;
  }
};
