import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function SalesReportGraph({ salesData }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
      title: {
        display: true,
        text: 'Sales Report Overview (Monthly)',
      },
    },
    hover: {
      mode: 'nearest',
      intersect: true,
    },
  };


  const data = {
    labels: salesData.labels, 
    datasets: [
      {
        label: 'Gross Sales',
        data: salesData.grossSales,
        borderColor: '#4a90e2',
        backgroundColor: 'rgba(74, 144, 226, 0.3)',
      },
      {
        label: 'Net Revenue',
        data: salesData.netRevenue,
        borderColor: '#50c878',
        backgroundColor: 'rgba(80, 200, 120, 0.3)',
      },
      {
        label: 'Refunded',
        data: salesData.refunded,
        borderColor: '#ff6b6b',
        backgroundColor: 'rgba(255, 107, 107, 0.3)',
      },
      {
        label: 'New Customers',
        data: salesData.newCustomers,
        borderColor: '#ffbe76',
        backgroundColor: 'rgba(255, 190, 118, 0.3)',
      },
      {
        label: 'Orders',
        data: salesData.orders,
        borderColor: '#a29bfe',
        backgroundColor: 'rgba(162, 155, 254, 0.3)',
      },
    ],
  };

  return <Line options={options} data={data} />;
}

export default SalesReportGraph;
