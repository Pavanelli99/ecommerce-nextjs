import { Button } from 'antd';
import { useRouter } from 'next/navigation';

function ProductsList() {
  const router = useRouter();
  return (
    <div className="flex justify-end">
      <Button
        type="primary"
        onClick={() => {
          router.push('/profile/add_product');
        }}
      >
        Add Product
      </Button>
    </div>
  );
}

export default ProductsList;