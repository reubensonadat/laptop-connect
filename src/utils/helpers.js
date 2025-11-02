export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
    minimumFractionDigits: 0,
  }).format(price);
};

export const formatCondition = (condition) => {
  switch (condition) {
    case 'NEW':
      return 'New';
    case 'UK_USED':
      return 'UK Used';
    case 'LOCAL_USED':
      return 'Local Used';
    default:
      return condition;
  }
};

export const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const generateWhatsAppMessage = (laptop, buyerInfo, paymentReference) => {
  const { fullName, email, phone, deliveryLocation, additionalNotes } = buyerInfo;
  
  return `Hello, I would like to purchase the following laptop:

*Product Details:*
- Brand: ${laptop.brand}
- Model: ${laptop.model}
- Processor: ${laptop.processor}
- RAM: ${laptop.ram}
- Storage: ${laptop.storage}
- Graphics: ${laptop.graphics}
- Display: ${laptop.display}
- Condition: ${formatCondition(laptop.condition)}
- Price: ${formatPrice(laptop.price)}

*Buyer Information:*
- Name: ${fullName}
- Email: ${email}
- Phone: ${phone}
- Delivery Location: ${deliveryLocation}
- Additional Notes: ${additionalNotes || 'N/A'}

*Payment Information:*
- Payment Reference: ${paymentReference}
- Payment Type: ${buyerInfo.paymentType}

Please confirm the order and provide next steps. Thank you!`;
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};