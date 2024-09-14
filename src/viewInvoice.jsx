import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ViewInvoice = () => {
  const { id } = useParams(); // Get invoice ID from the URL
  const [invoice, setInvoice] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(`https://invoice-app-backend-zfw9.onrender.com/invoices/${id}`);
        setInvoice(response.data);
      } catch (error) {
        console.error("Error fetching invoice:", error);
      }
    };
    fetchInvoice();
  }, [id]);

  // Function to print the invoice
  const printInvoice = () => {
    window.print();
  };

  if (!invoice) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Invoice #{invoice.invoiceNumber}</h2>
      
      {/* Invoice Details */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Date</th>
            <th>Currency</th>
            <th>Sub Total</th>
            <th>Total Taxes</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{invoice.date}</td>
            <td>{invoice.currency}</td>
            <td>{invoice.subtotal.toFixed(2)}</td>
            <td>{invoice.totalTaxes.toFixed(2)}</td>
            <td>{invoice.totalAmount.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      {/* Items Table */}
      <h4 className="mt-4">Invoice Items</h4>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Taxes</th>
            <th>Item Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price.toFixed(2)}</td>
              <td>
                {item.taxes.map((tax, taxIndex) => (
                  <div key={taxIndex}>
                    {tax.title}: {tax.rate}% 
                  </div>
                ))}
              </td>
              <td>{(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Print Button */}
      <button
        className="btn btn-primary"
        onClick={() => navigate(`/edit/${invoice._id}`)}
      >
        Edit Invoice
      </button>
      <button
        className="btn btn-success ms-3"
        onClick={() => window.print()}
      >
        Print Invoice
      </button>
    </div>
  );
};

export default ViewInvoice;
