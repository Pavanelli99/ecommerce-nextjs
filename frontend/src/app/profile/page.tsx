'use client';
import React, { useState } from 'react';
import { Tabs, TabsProps } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import ProductList from './components/ProductList';
import CategoriesList from './components/CategoriesList';

function Profile() {

  const searchParams = useSearchParams()
  const id = searchParams.get("id")

  const [selectedTab, setSelectedTab] = useState<string>(id || "1");
  const router = useRouter();

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Products',
      children: <ProductList/>,
    },
    {
      key: '2',
      label: 'Categories',
      children: <CategoriesList />,
    },
    {
      key: '3',
      label: 'Orders',
      children: 'Content of Tab Orders',
    },
    {
      key: '4',
      label: 'Users',
      children: 'Content of Tab Users',
    },
  ];




  return (
    <div className='p-5'>
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={(key) => {
          router.push(`/profile?id=${key}`);
          setSelectedTab(key);
        }}
        activeKey={selectedTab}
      >
      </Tabs>
    </div>
  );
}

export default Profile;