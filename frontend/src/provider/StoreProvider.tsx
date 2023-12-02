'use client'; // isomorf pode ser algo no servidor do lado do client
import store from '@/redux/store';
import {Provider} from 'react-redux';

function StoreProvider({ children }: { children: React.ReactNode }) {

  return <Provider store = {store}>{children}</Provider>


}

export default StoreProvider