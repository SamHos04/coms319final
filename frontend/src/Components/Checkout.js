import React, { useState } from 'react';

function Checkout() {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        creditCardNumber: ''
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
            isValid = false;
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
            isValid = false;
        }

        if (!formData.creditCardNumber.trim()) {
            newErrors.creditCardNumber = 'Credit card number is required';
            isValid = false;
        } else if (!/^\d{16}$/.test(formData.creditCardNumber.replace(/\s+/g, ''))) {
            newErrors.creditCardNumber = 'Credit card number must be 16 digits';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "creditCardNumber") {
            // Format credit card number
            let formattedInput = value.replace(/[^\d]/g, '').substring(0, 16);
            formattedInput = formattedInput.replace(/(.{4})/g, '$1 ').trim();
            setFormData(prevState => ({
                ...prevState,
                [name]: formattedInput
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Order submitted:', formData);
            alert('Order has been submitted! Thank you.');
            setFormData({
                name: '',
                address: '',
                creditCardNumber: ''
            });
        }
    };

    return (
        <div className="container mt-5">
            <h2>Checkout Form</h2>
            <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input
                        type="text"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address:</label>
                    <input
                        type="text"
                        className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="creditCardNumber" className="form-label">Credit Card Number:</label>
                    <input
                        type="text"
                        className={`form-control ${errors.creditCardNumber ? 'is-invalid' : ''}`}
                        id="creditCardNumber"
                        name="creditCardNumber"
                        value={formData.creditCardNumber}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.creditCardNumber && <div className="invalid-feedback">{errors.creditCardNumber}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Submit Order</button>
            </form>
        </div>
    );
}

export default Checkout;
