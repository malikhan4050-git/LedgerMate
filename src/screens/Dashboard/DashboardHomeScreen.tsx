import React from 'react';

import { useAppSelector } from '../../redux/hooks';
import AdvanceDashboardScreen from './AdvanceDashboardScreen';
import SimpleDashboardScreen from './SimpleDashboardScreen';

const DashboardHomeScreen = () => {
  const mode = useAppSelector(state => state.session.business?.mode ?? 'simple');

  if (mode === 'advanced') {
    return <AdvanceDashboardScreen />;
  }

  return <SimpleDashboardScreen />;
};

export default DashboardHomeScreen;
