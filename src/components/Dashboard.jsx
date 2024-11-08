import React, { useState, useEffect } from 'react';
import { MdDashboard, MdKeyboardArrowDown } from "react-icons/md";
import { BiShoppingBag } from "react-icons/bi";
import { FiClipboard } from "react-icons/fi";
import { FaUserFriends, FaCogs } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import { FiPackage } from "react-icons/fi";
import { MdDesignServices } from 'react-icons/md';
import lastLogo2 from "../Images/lastLogo2.png";
import Styles from "../Styles/Dashboard.module.css";
import DashboardContent from '../components/DashboardContent';
import ProductsContent from '../components/ProductsContent';
import OrdersContent from '../components/OrdersContent';
import CustomersContent from '../components/CustomersContent';
import MarketingContent from '../components/MarketingContent';
// import IntegrationsContent from '../components/IntegrationsContent';
// import DesignsContent from '../components/DesignsContent';
// import SettingsContent from '../components/SettingsContent';

function Dashboard() {
  const [userName, setUserName] = useState('Guest');
  const [selectedContent, setSelectedContent] = useState('Dashboard');
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const [ordersDropdownOpen, setOrdersDropdownOpen] = useState(false);
  const [settingsDropdownOpen, setSettingsDropdownOpen] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserName(user.firstName.toUpperCase() || 'GUEST');
    }

    const storedContent = localStorage.getItem('selectedContent');
    if (storedContent) {
      setSelectedContent(storedContent);
    }
  }, []);

  const handleContentChange = (content) => {
    setSelectedContent(content);
    localStorage.setItem('selectedContent', content);
  };

  const toggleDropdown = (dropdown) => {
    if (dropdown === "product") setProductDropdownOpen(!productDropdownOpen);
    if (dropdown === "orders") setOrdersDropdownOpen(!ordersDropdownOpen);
    if (dropdown === "settings") setSettingsDropdownOpen(!settingsDropdownOpen);
  };

  const renderContent = () => {
    switch (selectedContent) {
      case 'Dashboard': return <DashboardContent />;
      case 'Products': return <ProductsContent />;
      case 'Orders': return <OrdersContent />;
      case 'Customers': return <CustomersContent />;
      case 'Marketing': return <MarketingContent />;
      // case 'Integrations': return <IntegrationsContent />;
      // case 'Designs': return <DesignsContent />;
      // case 'Settings': return <SettingsContent />;
      default: return <DashboardContent />;
    }
  };

  const getMenuItemClass = (menuItem) => selectedContent === menuItem ? Styles.selectedMenuItem : '';

  return (
    <div className={Styles.Dashboard}>
      <div className={Styles.DashboardInner}>
        <div className={Styles.announcement}>
          <p className={Styles.user}>HELLO, {userName}</p>
        </div>
        <div className={Styles.DashboardSide}>
          <div className={Styles.Main}>
            <img src={lastLogo2} alt="Marketplace Logo" />
            <div className={Styles.MainText}><p>Audit</p></div>
          </div>
          <div className={Styles.DashboardMenu}>
            <div className={`${Styles.MenuItem} ${getMenuItemClass('Dashboard')}`} onClick={() => handleContentChange('Dashboard')}>
              <MdDashboard className={`${Styles.Icon} ${selectedContent === 'Dashboard' ? Styles.selectedIcon : ''}`} />
              <p className={selectedContent === 'Dashboard' ? Styles.selectedText : ''}>Dashboard</p>
            </div>

            {/* Products Dropdown */}
            <div className={`${Styles.MenuItem}`} onClick={() => toggleDropdown('product')}>
              <BiShoppingBag className={Styles.Icon} />
              <p>Products</p>
              <MdKeyboardArrowDown className={`${Styles.ArrowIcon} ${productDropdownOpen ? Styles.ArrowUp : ''}`} />
            </div>
            {productDropdownOpen && (
  <div className={Styles.Dropdown}>
    <p onClick={() => handleContentChange('Products')}>Product Option 1</p>
    <p onClick={() => handleContentChange('Product2')}>Product Option 2</p>
    <p onClick={() => handleContentChange('Product3')}>Product Option 3</p>
    <p onClick={() => handleContentChange('Product4')}>Product Option 4</p>
  </div>
)}

            {/* Orders Dropdown */}
            <div className={`${Styles.MenuItem}`} onClick={() => toggleDropdown('orders')}>
              <FiClipboard className={Styles.Icon} />
              <p>Orders</p>
              <MdKeyboardArrowDown className={`${Styles.ArrowIcon} ${ordersDropdownOpen ? Styles.ArrowUp : ''}`} />
            </div>
            {ordersDropdownOpen && (
              <div className={Styles.Dropdown}>
                <p onClick={() => handleContentChange('Orders')}>Order Option 1</p>
              </div>
            )}

            <div className={`${Styles.MenuItem} ${getMenuItemClass('Customers')}`} onClick={() => handleContentChange('Customers')}>
              <FaUserFriends className={`${Styles.Icon} ${selectedContent === 'Customers' ? Styles.selectedIcon : ''}`} />
              <p className={selectedContent === 'Customers' ? Styles.selectedText : ''}>Customers</p>
            </div>

            <div className={`${Styles.MenuItem} ${getMenuItemClass('Marketing')}`} onClick={() => handleContentChange('Marketing')}>
              <BsGraphUp className={`${Styles.Icon} ${selectedContent === 'Marketing' ? Styles.selectedIcon : ''}`} />
              <p className={selectedContent === 'Marketing' ? Styles.selectedText : ''}>Marketing</p>
            </div>

            <div className={Styles.Admin}><p>Admin</p></div>

            <div className={`${Styles.MenuItem} ${getMenuItemClass('Integrations')}`} onClick={() => handleContentChange('Integrations')}>
              <FiPackage className={`${Styles.Icon} ${selectedContent === 'Integrations' ? Styles.selectedIcon : ''}`} />
              <p className={selectedContent === 'Integrations' ? Styles.selectedText : ''}>Integrations</p>
            </div>

            <div className={`${Styles.MenuItem} ${getMenuItemClass('Designs')}`} onClick={() => handleContentChange('Designs')}>
              <MdDesignServices className={`${Styles.Icon} ${selectedContent === 'Designs' ? Styles.selectedIcon : ''}`} />
              <p className={selectedContent === 'Designs' ? Styles.selectedText : ''}>Designs</p>
            </div>

            {/* Settings Dropdown */}
            <div className={`${Styles.MenuItem}`} onClick={() => toggleDropdown('settings')}>
              <FaCogs className={Styles.Icon} />
              <p>Settings</p>
              <MdKeyboardArrowDown className={`${Styles.ArrowIcon} ${settingsDropdownOpen ? Styles.ArrowUp : ''}`} />
            </div>
            {settingsDropdownOpen && (
              <div className={Styles.Dropdown}>
                <p onClick={() => handleContentChange('Setting1')}>Setting Option 1</p>
                <p onClick={() => handleContentChange('Setting2')}>Setting Option 2</p>
                <p onClick={() => handleContentChange('Setting3')}>Setting Option 3</p>
                <p onClick={() => handleContentChange('Setting4')}>Setting Option 4</p>
                <p onClick={() => handleContentChange('Setting5')}>Setting Option 5</p>
              </div>
            )}
          </div>
        </div>

        <div className={Styles.DashboardShow}>
          <div className={Styles.Details}>{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
