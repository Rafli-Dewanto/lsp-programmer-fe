'use client';

import { Button } from '@/components/ui/button';
import { GetOrderResponse } from '@/services/order/types';
import { formatCurrency } from '@/utils/string';
import { Printer } from 'lucide-react';

interface InvoicePrintProps {
  order: GetOrderResponse;
}

const InvoicePrint = ({ order }: InvoicePrintProps) => {
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const content = `
      <html>
        <head>
          <title>Invoice #${order.id}</title>
          <style>
            body {
              font-family: system-ui, -apple-system, sans-serif;
              padding: 2rem;
              color: #1a1a1a;
            }
            .invoice-header {
              text-align: center;
              margin-bottom: 2rem;
            }
            .invoice-title {
              color: #db2777;
              font-size: 1.5rem;
              font-weight: bold;
              margin: 0;
            }
            .order-info {
              margin-bottom: 2rem;
            }
            .customer-info {
              margin-bottom: 2rem;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 2rem;
            }
            th, td {
              padding: 0.75rem;
              text-align: left;
              border-bottom: 1px solid #e5e7eb;
            }
            th {
              background-color: #fdf2f8;
              font-weight: 600;
            }
            .total-section {
              text-align: right;
              font-weight: bold;
            }
            .status-badge {
              display: inline-block;
              padding: 0.25rem 0.75rem;
              border-radius: 9999px;
              font-size: 0.875rem;
              font-weight: 500;
              background-color: #dcfce7;
              color: #15803d;
            }
            @media print {
              .no-print {
                display: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="invoice-header">
            <h1 class="invoice-title">CakeVille Bakery</h1>
            <p>Invoice #${order.id}</p>
            <p>${new Date(order.created_at).toLocaleString()}</p>
          </div>

          <div class="order-info">
            <h2>Order Information</h2>
            <p>Status: <span class="status-badge">${order.status}</span></p>
            <p>Order ID: ${order.id}</p>
            <p>Order Date: ${new Date(order.created_at).toLocaleString()}</p>
          </div>

          <div class="customer-info">
            <h2>Customer Information</h2>
            <p>Name: ${order.customer.name}</p>
            <p>Email: ${order.customer.email}</p>
            <p>Delivery Address: ${order.delivery_address}</p>
          </div>

          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map(item => `
                <tr>
                  <td>${item.cake.title}</td>
                  <td>${item.quantity}</td>
                  <td>${formatCurrency(item.price, 'id-ID')}</td>
                  <td>${formatCurrency(item.price * item.quantity, 'id-ID')}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="total-section">
            <p>Total: ${formatCurrency(order.total_price, 'id-ID')}</p>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  return (
    <Button
      onClick={handlePrint}
      variant="outline"
      className="text-pink-600 border-pink-200 hover:bg-pink-50"
    >
      <Printer className="w-4 h-4 mr-2" />
      Print Invoice
    </Button>
  );
};

export default InvoicePrint;