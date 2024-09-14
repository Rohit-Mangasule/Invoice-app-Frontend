import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateInvoice = () => {
  const [invoice, setInvoice] = useState({
    invoiceNumber: '',
    date: '',
    currency: '',
    items: [{ name: '', price: 0, quantity: 1, taxes: [{ title: '', rate: 0 }] }]
  });
  const navigate = useNavigate();

  const handleItemChange = (e, itemIndex, taxIndex) => {
    const { name, value } = e.target;
    const items = [...invoice.items];
    if (taxIndex !== undefined) {
      items[itemIndex].taxes[taxIndex][name] = value;
    } else {
      items[itemIndex][name] = value;
    }
    setInvoice({ ...invoice, items });
  };

  const addItem = () => {
    setInvoice({
      ...invoice,
      items: [...invoice.items, { name: '', price: 0, quantity: 1, taxes: [{ title: '', rate: 0 }] }]
    });
  };

  const addTax = (itemIndex) => {
    const updatedItems = [...invoice.items];
    updatedItems[itemIndex].taxes.push({ title: '', rate: '' });
    setInvoice({ ...invoice, items: updatedItems });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://invoice-app-backend-zfw9.onrender.com/create', invoice);
      
      // console.log('Invoice created:', response.data);
      
      const invoiceId = response.data._id; 
      navigate(`/view/${invoiceId}`); // Redirect to /view/:id
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create Invoice</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="invoiceNumber" className="form-label">Invoice Name</label>
          <input
            type="text"
            className="form-control"
            id="invoiceNumber"
            name="invoiceNumber"
            value={invoice.invoiceNumber}
            onChange={(e) => setInvoice({ ...invoice, invoiceNumber: e.target.value })}
            required
          />
        </div>
        <div className="row mb-3">
  <div className="col-md-6">
    <label htmlFor="currency" className="form-label">Currency</label>
    <select
      className="form-select"
      id="currency"
      name="currency"
      value={invoice.currency}
      onChange={(e) => setInvoice({ ...invoice, currency: e.target.value })}
      required
    >
      <option value="">Select Currency</option>
      <option value="INR">INR</option>
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
    </select>
  </div>
  
  <div className="col-md-6">
    <label htmlFor="date" className="form-label">Date</label>
    <input
      type="date"
      className="form-control"
      id="date"
      name="date"
      value={invoice.date}
      onChange={(e) => setInvoice({ ...invoice, date: e.target.value })}
      required
    />
  </div>
</div>
        <h4>Items</h4>
        {invoice.items.map((item, itemIndex) => (
          <div key={itemIndex} className="border p-3 mb-3">
            <div className="mb-3">
              <label htmlFor={`itemName-${itemIndex}`} className="form-label">Item Name</label>
              <input
                type="text"
                className="form-control"
                id={`itemName-${itemIndex}`}
                name="name"
                value={item.name}
                onChange={(e) => handleItemChange(e, itemIndex)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor={`itemPrice-${itemIndex}`} className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                id={`itemPrice-${itemIndex}`}
                name="price"
                value={item.price}
                onChange={(e) => handleItemChange(e, itemIndex)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor={`itemQuantity-${itemIndex}`} className="form-label">Quantity</label>
              <input
                type="number"
                className="form-control"
                id={`itemQuantity-${itemIndex}`}
                name="quantity"
                value={item.quantity}
                onChange={(e) => handleItemChange(e, itemIndex)}
                required
              />
            </div>

            <h5>Taxes</h5>
{item.taxes.map((tax, taxIndex) => (
  <div key={taxIndex} className="mb-3">
    <div className="row">
      <div className="col-md-6">
        <label htmlFor={`taxTitle-${itemIndex}-${taxIndex}`} className="form-label">Tax Title</label>
        <select
          className="form-select"
          id={`taxTitle-${itemIndex}-${taxIndex}`}
          name="title"
          value={tax.title}
          onChange={(e) => handleItemChange(e, itemIndex, taxIndex)}
          required
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
          required
        />
      </div>
    </div>
  </div>
))}

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => addTax(itemIndex)}
            >
              Add Tax
            </button>
          </div>
        ))}
        <div className="d-flex justify-content-start mb-3">
  <button
    type="button"
    className="btn btn-primary me-2"
    onClick={addItem}
  >
    Add Item
  </button>
  <button type="submit" className="btn btn-success">
    Create Invoice
  </button>
</div>

      </form>
    </div>
  );
};

export default CreateInvoice;
