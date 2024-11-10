import React from 'react';
import { FaDollarSign, FaChartLine, FaUndo, FaUserPlus, FaShoppingCart, FaBoxOpen, FaStar } from 'react-icons/fa';
import Styles from "../Styles/DashboardContent.module.css";
import SalesReportGraph from '../components/SalesReportGraph';

function DashboardContent() {
  const salesData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    grossSales: [500, 700, 800, 600, 900, 1000],
    netRevenue: [450, 650, 780, 580, 850, 950],
    refunded: [50, 60, 20, 40, 30, 20],
    newCustomers: [10, 20, 30, 25, 40, 45],
    orders: [100, 120, 150, 130, 170, 190],
  };

  return (
    <div className={Styles.DashboardContent}>
      <div className={Styles.DashboardContentInner}>
        <div className={Styles.refundBody}> 
          <div className={Styles.refund}>
            <FaDollarSign className={Styles.icon} />
            <p>Gross Sales <span>$0</span></p>
          </div>
          <div className={Styles.refund}>
            <FaChartLine className={Styles.icon} />
            <p>Net Revenue <span>$0</span></p>
          </div>
          <div className={Styles.refund}>
            <FaUndo className={Styles.icon} />
            <p>Refunded <span>$0</span></p>
          </div>
          <div className={Styles.refund}>
            <FaUserPlus className={Styles.icon} />
            <p>New Customers <span>0</span></p>
          </div>
          <div className={Styles.refund}>
            <FaShoppingCart className={Styles.icon} />
            <p>Orders <span>0</span></p>
          </div>
        </div>

        <div className={Styles.salesReportGraphContainer}>
          <SalesReportGraph salesData={salesData} />
        </div>

        <div className={Styles.reportOverview}>
          <div className={Styles.refund2}>
            <p>Gross Sales <span>$0</span><div className={Styles.underline}></div></p>
            <FaDollarSign className={Styles.icon} />
          </div>
          <div className={Styles.refund2}>
            <p>Net Revenue <span>$0</span><div className={Styles.underline}></div></p>
            <FaChartLine className={Styles.icon} />
          </div>
          <div className={Styles.refund2}>
            <p>Refunded <span>$0</span><div className={Styles.underline}></div></p>
            <FaUndo className={Styles.icon} />
          </div>
          <div className={Styles.refund2}>
            <p>New Customers <span>0</span><div className={Styles.underline}></div></p>
            <FaUserPlus className={Styles.icon} />
          </div>
          <div className={Styles.refund2}>
            <p>Orders <span>0</span><div className={Styles.underline}></div></p>
            <FaShoppingCart className={Styles.icon} />
          </div>
          <div className={Styles.refund2}>
            <p>Refunds <span>0</span><div className={Styles.underline}></div></p>
            <FaUndo className={Styles.icon} />
          </div>
        </div>

        <div className={Styles.topSelling}>
          <div className={Styles.announ}>
            <FaStar className={Styles.topSellingIcon} /> 
            <p>Top Selling products</p>
          </div>
          <div className={Styles.topSellingInner}>
            <FaBoxOpen className={Styles.perspectiveIcon} />
            <p>
              No product founds <span>Your top selling product’s performance will appear here.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardContent;
