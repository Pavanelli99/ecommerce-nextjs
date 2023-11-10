'user client';
import { current } from "@reduxjs/toolkit";
import { Button, Popover, message } from "antd";
import { useEffect, useState } from "react";

function LayoutProvider({ children }: { children: React.ReactNode }) {

  const [currentUser, setCurrentUser] = useState('');
  const [loading, setLoading] = useState(false)


  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );

  useEffect(() => {
    getCurrentUser()

  }, [])



  const getCurrentUser = async () => {
    try {
      //get axios in backend
      setCurrentUser('dudu');

    } catch (error: any) {
      message.error(error.message)

    }finally {
      setLoading(false);
    }

  }

  return (
<div>
  <div className="bg-primaty py-5 px-5 flex justify-between items-center">
    <div className="flex">
      <h1 className="2xl font-bold text-red-500">Frame-Shop</h1>
    </div>
    <div className="flex gap-5 items-center">
    <i className="ri-shopping-cart-line text-white"></i>

    <div>
      <Popover content={content} title="Title" trigger="click">
      <div className="flex h-8 w-8 bg-white"> {currentUser} </div>
    </Popover>
    </div>
    </div>
  </div>
</div>);

}


