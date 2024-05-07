import React, { useState } from 'react';

function Checkout() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    creditCard: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
        alert('Order placed successfully!');
        // Redirect to a thank you page or reset form
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to place order.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />

      <label htmlFor="address">Address:</label>
      <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />

      <label htmlFor="creditCard">Credit Card Number:</label>
      <input type="text" id="creditCard" name="creditCard" value={formData.creditCard} onChange={handleChange} />

      <button type="submit">Submit Order</button>
    </form>
  );
}

export default Checkout;
