document.addEventListener('DOMContentLoaded', () => {
    const orderForm = document.getElementById('order-form');
  
    orderForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      
      const formData = new FormData(orderForm);
      const formDataObject = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value;
      });
  
      try {
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formDataObject)
        });
  
        if (response.ok) {
          console.log('Order placed successfully!');
        } else {
          console.error('Failed to place order:', response.statusText);
        }
      } catch (error) {
        console.error('Error placing order:', error.message);
      }
    });
  });
  