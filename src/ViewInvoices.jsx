import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ViewInvoices = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get('https://invoice-app-backend-zfw9.onrender.com/invoices'); // Fetching data from backend
        setInvoices(response.data);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <div className="container">
      <h2>Invoices</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Invoice Number</th>
            <th>Subtotal</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice._id}>
              <td>{invoice.invoiceNumber}</td>
              <td>{invoice.subtotal}</td>
              <td>{invoice.totalAmount}</td>
              <td>
                <Link to={`/view/${invoice._id}`} className="btn btn-info me-2">View</Link>
                <Link to={`/edit/${invoice._id}`} className="btn btn-primary">Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewInvoices;
