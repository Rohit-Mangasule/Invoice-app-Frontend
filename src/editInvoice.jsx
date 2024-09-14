import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditInvoice = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(`https://invoice-app-backend-zfw9.onrender.com/invoices/${id}`);
        setInvoice(response.data);
      } catch (error) {
        console.error('Error fetching the invoice:', error);
      }
    };
    fetchInvoice();
  }, [id]);

  

  const handleItemChange = (e, itemIndex, taxIndex) => {
    const { name, value } = e.target;
    const updatedItems = [...invoice.items];
    if (taxIndex !== undefined) {
      updatedItems[itemIndex].taxes[taxIndex][name] = value;
    } else {
      updatedItems[itemIndex][name] = value;
    }
    setInvoice({ ...invoice, items: updatedItems });
  };

  const addItem = () => {
    setInvoice({
      ...invoice,
      items: [...invoice.items, { name: '', price: 0, quantity: 1, taxes: [{ title: '', rate: 0 }] }]
    });
  };
  const deleteItem = (index) => {
    const updatedItems = invoice.items.filter((_, i) => i !== index);
    setInvoice({ ...invoice, items: updatedItems });
  };

  const addTax = (itemIndex) => {
    const updatedItems = [...invoice.items];
    updatedItems[itemIndex].taxes.push({ title: '', rate: '' });
    setInvoice({ ...invoice, items: updatedItems });
  };

  const deleteTax = (itemIndex, taxIndex) => {
    const updatedItems = [...invoice.items];
    updatedItems[itemIndex].taxes = updatedItems[itemIndex].taxes.filter((_, i) => i !== taxIndex);
    setInvoice({ ...invoice, items: updatedItems });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.put(`https://invoice-app-backend-zfw9.onrender.com/invoices/${id}`, invoice);
        console.log('Response:', response);
  
        navigate(`/view/${id}`);
        window.location.reload();
        console.log('Updated Invoice:', invoice);

    } catch (error) {
      console.error('Error updating the invoice:', error);
    }
  };

  if (!invoice) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-5">
      <h2>Edit Invoice #{invoice.invoiceNumber}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="currency" className="form-label">Currency</label>
          <select
            className="form-select"
            id="currency"
            name="currency"
            value={invoice.currency}
            onChange={(e) => setInvoice({ ...invoice, currency: e.target.value })}
            required
          >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
        {invoice.items.map((item, itemIndex) => (
          <div key={itemIndex} className="mb-3">
            <div className="d-flex align-items-center mb-2">
              <div className="flex-fill me-2">
                <label htmlFor={`itemName-${itemIndex}`} className="form-label">Item Name</label>
                <input
                  type="text"
                  className="form-control"
                  id={`itemName-${itemIndex}`}
                  name="name"
                  value={item.name}
                  onChange={(e) => handleItemChange(e, itemIndex)}
                />
              </div>
              <div className="flex-fill me-2">
                <label htmlFor={`itemQuantity-${itemIndex}`} className="form-label">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  id={`itemQuantity-${itemIndex}`}
                  name="quantity"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(e, itemIndex)}
                />
              </div>
              <div className="flex-fill me-2">
                <label htmlFor={`itemPrice-${itemIndex}`} className="form-label">Price</label>
                <input
                  type="number"
                  className="form-control"
                  id={`itemPrice-${itemIndex}`}
                  name="price"
                  value={item.price}
                  onChange={(e) => handleItemChange(e, itemIndex)}
                />
              </div>
            </div>
            <h5>Taxes</h5>
            {item.taxes.map((tax, taxIndex) => (
  <div key={taxIndex} className="mb-3">
    <div className="row mb-2 align-items-center">
      <div className="col-md-6">
        <label htmlFor={`taxTitle-${itemIndex}-${taxIndex}`} className="form-label">Tax Title</label>
        <select
          className="form-select"
          id={`taxTitle-${itemIndex}-${taxIndex}`}
          name="title"
          value={tax.title}
          onChange={(e) => handleItemChange(e, itemIndex, taxIndex)}
        >
          <option value="">Select Tax</option>
          <option value="CGST">CGST</option>
          <option value="SGST">SGST</option>
          <option value="VAT">VAT</option>
        </select>
      </div>

      <div className="col-md-6">
        <label htmlFor={`taxRate-${itemIndex}-${taxIndex}`} className="form-label">Tax Rate (%)</label>
        <input
          type="number"
          className="form-control"
          id={`taxRate-${itemIndex}-${taxIndex}`}
          name="rate"
          value={tax.rate}
          onChange={(e) => handleItemChange(e, itemIndex, taxIndex)}
        />
      </div>
    </div>

    
    <div className="row">
      <div className="col-md-1">
        <button
          type="button"
          className="btn btn-danger w-100"
          onClick={() => deleteTax(itemIndex, taxIndex)}
        >
          Delete 
        </button>
      </div>
    </div>
  </div>
))}


            <button
              type="button"
              className="btn btn-primary"
              onClick={() => addTax(itemIndex)}
            >
              Add Tax
            </button>
            <button
              type="button"
              className="btn btn-danger ms-3"
              onClick={() => deleteItem(itemIndex)}
            >
              Delete Item
            </button>
          </div>
        ))}
        <h4> Add new items</h4>
        <button type="button" className="btn btn-primary" onClick={addItem}>
          Add Item
        </button>
        <button type="submit" className="btn btn-success ms-3">Save Changes</button>
      </form>
      <button
        className="btn btn-secondary mt-3"
        onClick={() => navigate(`/view/${id}`)}
      >
        Back to Invoice
      </button>
    </div>
  );
};

export default EditInvoice;
