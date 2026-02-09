import React from 'react';

interface TinaProviderProps {
  children: React.ReactNode;
}

const TinaProvider: React.FC<TinaProviderProps> = ({ children }) => {
  return <>{children}</>;
};

export default TinaProvider;