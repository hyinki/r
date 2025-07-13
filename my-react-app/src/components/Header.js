import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

/* Salt DS UI components */
import {
  FlexLayout,
  FlexItem,
  StackLayout,
  Drawer,
  Button,
  NavigationItem,
  useResponsiveProp
} from "@salt-ds/core";

/* Icons */
import {
  MenuIcon,
  CloseIcon,
  SymphonyIcon,
  StackoverflowIcon,
  GithubIcon,
  LightIcon,
  DarkIcon
} from "@salt-ds/icons";

/* Logo */
import logo from "../assets/logo.png";

/* ---------------------- Theme Hook ---------------------- */
const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    // Check for saved theme preference or default to 'light'
    try {
      const savedTheme = window.localStorage?.getItem('theme');
      return savedTheme || 'light';
    } catch (error) {
      return 'light';
    }
  });

  useEffect(() => {
    // Apply theme to document root
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-mode', theme);

    // Also set class for compatibility
    if (theme === 'dark') {
      document.documentElement.classList.add('salt-theme-dark');
      document.documentElement.classList.remove('salt-theme-light');
      document.body.classList.add('salt-theme-dark');
      document.body.classList.remove('salt-theme-light');
    } else {
      document.documentElement.classList.add('salt-theme-light');
      document.documentElement.classList.remove('salt-theme-dark');
      document.body.classList.add('salt-theme-light');
      document.body.classList.remove('salt-theme-dark');
    }

    // Save theme preference
    try {
      window.localStorage?.setItem('theme', theme);
    } catch (error) {
      // Handle localStorage errors gracefully
      console.warn('Unable to save theme preference:', error);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
};

/* ---------------------- Desktop Header ---------------------- */
const DesktopAppHeader = ({ items, utilities, offset, theme, toggleTheme }) => {
  const location = useLocation();

  return (
    <header>
      <FlexLayout
        justify="space-between"
        gap={3}
        style={{
          paddingLeft: "var(--salt-spacing-300)",
          paddingRight: "var(--salt-spacing-300)",
          backgroundColor: "var(--salt-container-primary-background)",
          position: "fixed",
          width: "100%",
          zIndex: 10,
          boxShadow:
            offset > 0 ? "var(--salt-overlayable-shadow-scroll)" : "none",
          borderBottom:
            "var(--salt-size-border) solid var(--salt-separable-primary-borderColor)",
          transition: "background-color 0.3s ease, border-color 0.3s ease"
        }}
      >
        <FlexItem align="center">
          <a href="/" style={{ display: "block" }}>
            <img
              src={logo}
              alt="logo"
              style={{
                display: "block",
                height: "calc(var(--salt-size-base) - var(--salt-spacing-150))",
                cursor: "pointer"
              }}
            />
          </a>
        </FlexItem>

        <nav>
          <ul
            style={{
              display: "flex",
              listStyle: "none",
              padding: 0,
              margin: 0
            }}
          >
            {items.map(({ label, path }) => (
              <li key={label}>
                <NavigationItem
                  href={path}
                  active={location.pathname === path}
                  style={{ fontSize: "1.4rem" }}
                >
                  {label}
                </NavigationItem>
              </li>
            ))}
          </ul>
        </nav>

        <FlexItem align="center">
          <StackLayout direction="row" gap={1}>
            {/* Theme Toggle Button */}
            <Button
              appearance="transparent"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              onClick={toggleTheme}
              style={{
                transition: 'all 0.3s ease',
                transform: theme === 'dark' ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            >
              {theme === 'light' ? <DarkIcon /> : <LightIcon />}
            </Button>

            {/* Separator */}
            <div style={{
              width: '1px',
              height: '24px',
              backgroundColor: 'var(--salt-separable-secondary-borderColor)',
              margin: '0 var(--salt-spacing-50)',
              transition: 'background-color 0.3s ease'
            }} />

            {/* Utility Buttons */}
            {utilities.map(({ key, icon, url }) => (
              <Button
                key={key}
                appearance="transparent"
                aria-label={key}
                onClick={() => window.open(url, '_blank')}
                style={{
                  transition: 'color 0.3s ease'
                }}
              >
                {icon}
              </Button>
            ))}
          </StackLayout>
        </FlexItem>
      </FlexLayout>
    </header>
  );
};

/* ---------------------- Mobile Header ---------------------- */
const MobileAppHeader = ({ items, utilities, offset, theme, toggleTheme }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const handleClick = () => setDrawerOpen(false);

  const handleNavClick = (path) => {
    // Use React Router's programmatic navigation
    window.location.href = path;
    setDrawerOpen(false);
  };

  return (
    <header>
      <StackLayout
        direction="row"
        gap={3}
        style={{
          width: "100%",
          height: "calc(var(--salt-size-base) + var(--salt-spacing-200))",
          backgroundColor: "var(--salt-container-primary-background)",
          zIndex: "calc(var(--salt-zIndex-drawer) + 1)",
          position: "fixed",
          borderBottom:
            "var(--salt-size-border) solid var(--salt-separable-primary-borderColor)",
          boxShadow: offset > 0 ? "var(--salt-shadow-1)" : "none",
          transition: "background-color 0.3s ease, border-color 0.3s ease"
        }}
      >
        <FlexItem
          style={{
            justifyContent: "center",
            display: "flex",
            paddingLeft: "var(--salt-spacing-100)"
          }}
        >
          <Button
            onClick={() => setDrawerOpen((open) => !open)}
            appearance="transparent"
            aria-label={drawerOpen ? "Close menu" : "Open menu"}
            style={{
              alignSelf: "center",
              transition: 'color 0.3s ease'
            }}
          >
            {drawerOpen ? <CloseIcon /> : <MenuIcon />}
          </Button>
        </FlexItem>

        <FlexItem align="center">
          <a href="/" style={{ display: "block" }}>
            <img
              src={logo}
              alt="logo"
              style={{
                display: "block",
                height: "calc(var(--salt-size-base) - var(--salt-spacing-150))",
                cursor: "pointer"
              }}
            />
          </a>
        </FlexItem>

        <FlexItem
          style={{
            justifyContent: "center",
            display: "flex",
            paddingRight: "var(--salt-spacing-100)"
          }}
        >
          <Button
            appearance="transparent"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            onClick={toggleTheme}
            style={{
              alignSelf: "center",
              transition: 'all 0.3s ease',
              transform: theme === 'dark' ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          >
            {theme === 'light' ? <DarkIcon /> : <LightIcon />}
          </Button>
        </FlexItem>
      </StackLayout>

      <Drawer
        open={drawerOpen}
        className={`salt-theme-${theme}`}
        style={{
          paddingTop: "calc(var(--salt-size-base) + var(--salt-spacing-200))",
          paddingLeft: 0,
          backgroundColor: theme === 'dark' ? '#242424' : '#ffffff',
          color: theme === 'dark' ? '#ffffff' : '#000000',
          transition: "all 0.3s ease"
        }}
        onOpenChange={() => setDrawerOpen(false)}
      >
        <div
          className={`salt-theme-${theme}`}
          style={{
            backgroundColor: theme === 'dark' ? '#242424' : '#ffffff',
            color: theme === 'dark' ? '#ffffff' : '#000000',
            minHeight: "100vh",
            transition: "all 0.3s ease",
            padding: 0
          }}
        >
          <nav>
            <ul style={{
              listStyle: "none",
              padding: 0,
              margin: 0
            }}>
              {items.map(({ label, path }) => (
                <li key={label}>
                  <div
                    onClick={() => handleNavClick(path)}
                    style={{
                      padding: "var(--salt-spacing-100) var(--salt-spacing-300)",
                      fontSize: "1.4rem",
                      color: theme === 'dark' ? '#ffffff' : '#000000',
                      backgroundColor: location.pathname === path
                        ? (theme === 'dark' ? '#404040' : '#f0f0f0')
                        : 'transparent',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      borderRadius: '4px',
                      margin: '2px var(--salt-spacing-100)'
                    }}
                    onMouseEnter={(e) => {
                      if (location.pathname !== path) {
                        e.target.style.backgroundColor = theme === 'dark' ? '#353535' : '#f5f5f5';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (location.pathname !== path) {
                        e.target.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {label}
                  </div>
                </li>
              ))}

              {/* Separator */}
              <li style={{
                height: '1px',
                backgroundColor: theme === 'dark' ? '#404040' : '#e0e0e0',
                margin: 'var(--salt-spacing-100) var(--salt-spacing-300)',
                transition: 'background-color 0.3s ease'
              }} />

              {/* Theme Toggle in Mobile Drawer */}
              <li>
                <div
                  onClick={toggleTheme}
                  style={{
                    fontSize: "1.4rem",
                    cursor: "pointer",
                    padding: "var(--salt-spacing-100) var(--salt-spacing-300)",
                    color: theme === 'dark' ? '#ffffff' : '#000000',
                    backgroundColor: "transparent",
                    border: "none",
                    width: "100%",
                    textAlign: "left",
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--salt-spacing-100)",
                    transition: 'all 0.3s ease',
                    borderRadius: "4px",
                    margin: '2px var(--salt-spacing-100)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = theme === 'dark' ? '#353535' : '#f5f5f5';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                  }}
                >
                  <span style={{
                    transform: theme === 'dark' ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                    display: 'inline-block',
                    color: theme === 'dark' ? '#ffffff' : '#000000'
                  }}>
                    {theme === 'light' ? <DarkIcon /> : <LightIcon />}
                  </span>
                  <span style={{ color: theme === 'dark' ? '#ffffff' : '#000000' }}>
                    {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                  </span>
                </div>
              </li>

              {/* Separator */}
              <li style={{
                height: '1px',
                backgroundColor: theme === 'dark' ? '#404040' : '#e0e0e0',
                margin: 'var(--salt-spacing-100) var(--salt-spacing-300)',
                transition: 'background-color 0.3s ease'
              }} />

              {utilities.map(({ key, icon, url }) => (
                <li key={key}>
                  <div
                    onClick={() => {
                      window.open(url, '_blank');
                      handleClick();
                    }}
                    style={{
                      padding: "var(--salt-spacing-100) var(--salt-spacing-300)",
                      fontSize: "1.4rem",
                      color: theme === 'dark' ? '#ffffff' : '#000000',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      borderRadius: '4px',
                      margin: '2px var(--salt-spacing-100)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--salt-spacing-100)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = theme === 'dark' ? '#353535' : '#f5f5f5';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                    }}
                  >
                    <span style={{ color: theme === 'dark' ? '#ffffff' : '#000000' }}>
                      {icon}
                    </span>
                    <span style={{ color: theme === 'dark' ? '#ffffff' : '#000000' }}>
                      {key}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Drawer>
    </header>
  );
};

/* ---------------------- Wrapper Component ---------------------- */
const Header = () => {
  const [offset, setOffset] = useState(0);
  const isMobile = useResponsiveProp({ xs: true, sm: false }, false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const items = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Services", path: "/service" }
  ];

  const utilities = [
    {
      icon: <SymphonyIcon />,
      key: "Symphony",
      url: "https://symphony.com"
    },
    {
      icon: <StackoverflowIcon />,
      key: "Stack Overflow",
      url: "https://stackoverflow.com"
    },
    {
      icon: <GithubIcon />,
      key: "GitHub",
      url: "https://github.com"
    }
  ];

  return isMobile ? (
    <MobileAppHeader
      items={items}
      utilities={utilities}
      offset={offset}
      theme={theme}
      toggleTheme={toggleTheme}
    />
  ) : (
    <DesktopAppHeader
      items={items}
      utilities={utilities}
      offset={offset}
      theme={theme}
      toggleTheme={toggleTheme}
    />
  );
};

export default Header;