import React, { useState } from 'react';

function Checkout() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    creditCard: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    // Basic validation for empty fields
    if (!formData.name || !formData.address || !formData.creditCard) {
      setMessage('All fields are required');
      return false;
    }
    // Example: Simple credit card validation (placeholder for real validation logic)
    if (formData.creditCard.length !== 16) {
      setMessage('Credit card number must be 16 digits long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        setMessage('Order placed successfully!');
        setFormData({name: '', address: '', creditCard: ''}); // Reset form on success
      } else {
        setMessage('Failed to place order: ' + data.message);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setMessage('Failed to place order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

      <label htmlFor="address">Address:</label>
      <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />

      <label htmlFor="creditCard">Credit Card Number:</label>
      <input type="text" id="creditCard" name="creditCard" value={formData.creditCard} onChange={handleChange} required />

      <button type="submit" disabled={loading}>Submit Order</button>
      {message && <p className={message.startsWith('Order placed') ? 'success' : 'error'}>{message}</p>}
    </form>
  );
}

export default Checkout;
