'use client';
import { CartState } from '@/redux/cartSlice';
import { Popover, Button, message, notification, Badge } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState('');
  const [loading, setLoading] = useState(false);
  const pathName = usePathname();

  const { cartItems }: CartState = useSelector((state: any) => state.cart);

  const dispatch = useDispatch();

  const isPrivatePage =
    pathName !== '/auth/login' && pathName !== '/auth/register';

  const content = (
    <div className="flex flex-col gap-2 p-2">
      <div
        className="flex gap-2 items-center cursor-pointer text-md"
        onClick={() => {
          router.push('/profile');
        }}
      >
        <i className="ri-user-line text-xl"></i>
        <span>Profile</span>
      </div>
      <div
        className="flex gap-2 items-center cursor-pointer text-md"
        onClick={() => {
          router.push('/logout');
        }}
      >
        <i className="ri-logout-box-r-line"></i>
        <span>Logout</span>
      </div>
    </div>
  );

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    // when the cartitems changes, we will save cart items in cart
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

  }, [cartItems]);

  const getCurrentUser = async () => {
    try {
      setLoading(true);
      // get axios in backend
      setCurrentUser('Beto');
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
    <div>
      {isPrivatePage && (
        <>
          <div className="bg-primary py-2 px-5 flex justify-between items-center">
            <div
              className="flex gap-2 cursor-pointer"
              onClick={() => router.push('/')}
            >
              <h1 className="text-2xl font-bold text-red-500">Frame</h1>
              <h1 className="text-2xl font-bold text-yellow-500">Shop</h1>
            </div>

            <div className="flex gap-5 items-center">
              <Badge count={cartItems.length} className="cursor-pointer">
                <i
                  className="ri-shopping-cart-line text-white text-2xl"
                  onClick={() => router.push('/cart')}
                ></i>
              </Badge>

              <Popover content={content} trigger="click">
                <div className="flex h-8 w-8 bg-white p-2 rounded-full items-center justify-center cursor-pointer">
                  {/* <span>{currentUser.name[0]}</span> */}
                  <span>B</span>
                </div>
              </Popover>
            </div>
          </div>
          <div className="p-5">{children}</div>
        </>
      )}
    </div>
  );
}

export default LayoutProvider;