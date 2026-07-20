import React from 'react';
import { useSelector } from 'react-redux';

import SimpleUserAddScreen from './SimpleUserAddScreen';
import AdvanceUserAddScreen from './AdvanceUserAddScreen';
import type { RootState } from '../../redux/store';

const AddScreen = () => {
  const business = useSelector((state: RootState) => state.session.business);
  const isSimpleUser = business?.mode === 'simple';

  if (isSimpleUser) {
    return <SimpleUserAddScreen />;
  }

  return <AdvanceUserAddScreen />;
};

export default AddScreen;