import React, { createContext, useContext, useState } from 'react';
import CustomAlert from './CustomAlert';

interface AlertContextType {
  showAlert: (
    title: string,
    message: string,
    type?: 'success' | 'error' | 'warning' | 'info',
    onConfirm?: () => void  // Add this
  ) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [config, setConfig] = useState({
    title: '',
    message: '',
    type: 'success' as 'success' | 'error' | 'warning' | 'info',
    onConfirm: undefined as (() => void) | undefined,
  });

  const showAlert = (
    title: string,
    message: string,
    type: 'success' | 'error' | 'warning' | 'info' = 'success',
    onConfirm?: () => void
  ) => {
    setConfig({ title, message, type, onConfirm });
    setVisible(true);
  };

  const hideAlert = () => {
    if (config.onConfirm) {
      config.onConfirm();
    }
    setVisible(false);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <CustomAlert
        visible={visible}
        title={config.title}
        message={config.message}
        type={config.type}
        onClose={hideAlert}
      />
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within AlertProvider');
  }
  return context;
};