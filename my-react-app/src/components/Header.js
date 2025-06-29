import React, { useState, useEffect, useRef } from 'react';
import { FlexLayout, Drawer, Button, Link } from '@salt-ds/core';

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Close sidebar if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false); // Close the sidebar if clicked outside
      }
    };

    // Listen to mouse click events
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Clean up the event listener when component unmounts
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toggle sidebar open/close
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Left Sidebar */}
      <Drawer open={isSidebarOpen} onClose={toggleSidebar} position="left">
        <div ref={sidebarRef} style={{ padding: '1rem' }}>
          <Button sentiment="neutral" appearance="transparent" onClick={toggleSidebar} style={{ marginBottom: '1rem' }}>
          ☰ {/* Close button inside the sidebar */}
          </Button>
          <Link href="/" style={{ display: 'block', marginBottom: '1rem' }}>Home</Link>
          <Link href="/about" style={{ display: 'block', marginBottom: '1rem' }}>About</Link>
          <Link href="/services" style={{ display: 'block', marginBottom: '1rem' }}>Services</Link>
          <Link href="/contact" style={{ display: 'block' }}>Contact</Link>
        </div>
      </Drawer>

      {/* Main Header Content */}
      <header style={{ backgroundColor: '#f1f1f1', padding: '2rem', width: '100%' }}>
        <FlexLayout justifyContent="space-between" alignItems="center">
          {/* Hamburger Button */}
          

          <Button sentiment="neutral" appearance="transparent" onClick={toggleSidebar}>
          ☰
    </Button>

          {/* Centered Logo */}
          <div style={{ flexGrow: 1, textAlign: 'center', fontSize: '24px' }}>
            MyApp
          </div>
        </FlexLayout>
      </header>
      
      
    </div>
  );
}

export default Header;
