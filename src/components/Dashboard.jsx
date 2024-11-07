import { MdDashboard } from "react-icons/md";
import { BiShoppingBag } from "react-icons/bi";
import { FiClipboard } from "react-icons/fi";
import { FaUserFriends } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import lastLogo2 from "../Images/lastLogo2.png";
import Styles from "../Styles/Dashboard.module.css";
import React, { useState, useEffect } from 'react';
import DashboardContent from '../components/DashboardContent';
import ProductsContent from '../components/ProductsContent';
import OrdersContent from '../components/OrdersContent';
import CustomersContent from '../components/CustomersContent';
import MarketingContent from '../components/MarketingContent';
import { FaCogs } from 'react-icons/fa'; // Example for Settings
import { MdDesignServices } from 'react-icons/md'; // Example for Designs
import { FiPackage } from 'react-icons/fi'; // Example for Integrations

function Dashboard() {
  const [userName, setUserName] = useState('Guest');
  const [selectedContent, setSelectedContent] = useState('Dashboard'); 

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserName(user.firstName.toUpperCase() || 'GUEST');
    }
  }, []);

  const handleContentChange = (content) => {
    setSelectedContent(content);
  };

  const renderContent = () => {
    switch (selectedContent) {
      case 'Dashboard':
        return <DashboardContent />;
      case 'Products':
        return <ProductsContent />;
      case 'Orders':
        return <OrdersContent />;
      case 'Customers':
        return <CustomersContent />;
      case 'Marketing':
        return <MarketingContent />;
      default:
        return <DashboardContent />;
    }
  };

  const getMenuItemClass = (menuItem) => {
    return selectedContent === menuItem ? Styles.selectedMenuItem : '';
  };

  return (
    <div className={Styles.Dashboard}>
      <div className={Styles.DashboardInner}>
        <div className={Styles.announcement}>
          <p className={Styles.user}>HELLO, {userName}</p>
        </div>
        <div className={Styles.DashboardSide}>
          <div className={Styles.Main}>
            <img src={lastLogo2} alt="Marketplace Logo" />
            <div className={Styles.MainText}>
              <p>Audit</p>
            </div>
          </div>
          <div className={Styles.DashboardMenu}>
            <div
              className={`${Styles.MenuItem} ${getMenuItemClass('Dashboard')}`}
              onClick={() => handleContentChange('Dashboard')}
            >
              <MdDashboard className={`${Styles.Icon} ${selectedContent === 'Dashboard' ? Styles.selectedIcon : ''}`} />
              <p className={selectedContent === 'Dashboard' ? Styles.selectedText : ''}>Dashboard</p>
            </div>
            <div
              className={`${Styles.MenuItem} ${getMenuItemClass('Products')}`}
              onClick={() => handleContentChange('Products')}
            >
              <BiShoppingBag className={`${Styles.Icon} ${selectedContent === 'Products' ? Styles.selectedIcon : ''}`} />
              <p className={selectedContent === 'Products' ? Styles.selectedText : ''}>Products</p>
            </div>
            <div
              className={`${Styles.MenuItem} ${getMenuItemClass('Orders')}`}
              onClick={() => handleContentChange('Orders')}
            >
              <FiClipboard className={`${Styles.Icon} ${selectedContent === 'Orders' ? Styles.selectedIcon : ''}`} />
              <p className={selectedContent === 'Orders' ? Styles.selectedText : ''}>Orders</p>
            </div>
            <div
              className={`${Styles.MenuItem} ${getMenuItemClass('Customers')}`}
              onClick={() => handleContentChange('Customers')}
            >
              <FaUserFriends className={`${Styles.Icon} ${selectedContent === 'Customers' ? Styles.selectedIcon : ''}`} />
              <p className={selectedContent === 'Customers' ? Styles.selectedText : ''}>Customers</p>
            </div>
            <div
              className={`${Styles.MenuItem} ${getMenuItemClass('Marketing')}`}
              onClick={() => handleContentChange('Marketing')}
            >
              <BsGraphUp className={`${Styles.Icon} ${selectedContent === 'Marketing' ? Styles.selectedIcon : ''}`} />
              <p className={selectedContent === 'Marketing' ? Styles.selectedText : ''}>Marketing</p>
            </div>
            <div className={Styles.Admin}>
             <p>Admin</p>
            </div>
            <div
  className={`${Styles.MenuItem} ${getMenuItemClass('Integrations')}`}
  onClick={() => handleContentChange('Integrations')}
>
  <FiPackage className={`${Styles.Icon} ${selectedContent === 'Integrations' ? Styles.selectedIcon : ''}`} />
  <p className={selectedContent === 'Integrations' ? Styles.selectedText : ''}>Integrations</p>
</div>

<div
  className={`${Styles.MenuItem} ${getMenuItemClass('Designs')}`}
  onClick={() => handleContentChange('Designs')}
>
  <MdDesignServices className={`${Styles.Icon} ${selectedContent === 'Designs' ? Styles.selectedIcon : ''}`} />
  <p className={selectedContent === 'Designs' ? Styles.selectedText : ''}>Designs</p>
</div>

<div
  className={`${Styles.MenuItem} ${getMenuItemClass('Settings')}`}
  onClick={() => handleContentChange('Settings')}
>
  <FaCogs className={`${Styles.Icon} ${selectedContent === 'Settings' ? Styles.selectedIcon : ''}`} />
  <p className={selectedContent === 'Settings' ? Styles.selectedText : ''}>Settings</p>
</div>

          </div>
        </div>
        <div className={Styles.DashboardShow}>
          <div className={Styles.Details}>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
