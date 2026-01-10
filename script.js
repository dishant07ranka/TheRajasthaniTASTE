<script>
// QR & WhatsApp Update Function
function updateCheckout() {
    const total = parseInt(document.getElementById('total').textContent) || 0;
    
    // QR amount show
    const qrAmount = document.getElementById('qr-total');
    if (qrAmount) qrAmount.textContent = total;
    
    // WhatsApp order message
    const name = document.getElementById('name') ? document.getElementById('name').value : 'Customer';
    const phone = document.getElementById('phone') ? document.getElementById('phone').value : '';
    const address = document.getElementById('address') ? document.getElementById('address').value : '';
    
    const whatsappBtn = document.getElementById('whatsapp-confirm') || document.getElementById('whatsapp-order');
    if (whatsappBtn) {
        whatsappBtn.href = `https://wa.me/919928166780?text=*TheRajasthaniTaste Order*%0A%0A👤 Name: ${name}%0A📱 Phone: ${phone}%0A📍 Address: ${address}%0A%0A💰 *Total: ₹${total}*%0A🛒 Items: ${cart.map(item => item.name + ' x' + item.qty + 'kg').join('%0A')}`;
    }
}

// Cart render hone ke baad call karo (renderCart function ke end mein add)
document.addEventListener('DOMContentLoaded', function() {
    // Existing code...
    updateCheckout(); // Yeh line add karo
});

// Form change pe update
document.addEventListener('input', updateCheckout);
</script>
