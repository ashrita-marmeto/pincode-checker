const form = document.getElementById('checkout-form');

form.addEventListener('submit', function getData(e) {
    e.preventDefault();

    const pincode = document.getElementById('pcode').value;

    if (pincode.length === 6){
        fetch(`https://api.postalpincode.in/pincode/${pincode}`)
        .then(response => response.json())
        .then(data => {
            const status = document.getElementById('delivery-status');
            status.innerHTML = '';

            if(data[0].Status = 'Success') {
                const postOffices = data[0].PostOffice;
                postOffices.forEach(postOffice => {
                    const deliveryStatus = postOffice.DeliveryStatus;
                    const postOfficeName = postOffice.Name;
                    const statusMessage = `Post Office: ${postOfficeName}, Delivery status: ${deliveryStatus}`;
                    const statusText = document.createElement('p');
                    statusText.textContent = statusMessage;
                    status.appendChild(statusText);
                });  
            } else {
                status.textContent = `Error: ${data[0].Message}`;
            }
        })
        .catch (error => {
            console.error('Error fetching delivery status:', error);
        })
    } else {
        alert('Please enter a valid pincode');
    }
})


