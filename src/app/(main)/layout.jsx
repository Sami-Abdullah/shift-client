import AtelierChat from '@/components/main/chat/AtelierChat';
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';

import React from 'react';

const MainLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
      <AtelierChat />
    </div>
  );
};

export default MainLayout;