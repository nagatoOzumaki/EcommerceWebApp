import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import { Store } from '../components/Providers/StoreProvider';

function Shipping() {
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const router = useRouter();
  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=/shipping');
    }
  }, []);
  return (
    <div>
      <h1>Hello shipping you are {state.userInfo?.name} </h1>
    </div>
  );
}

export default Shipping;
