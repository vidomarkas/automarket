const displayPrice = (price) => {
  const priceFormatter = new Intl.NumberFormat("en-UK", {
    style: "currency",
    currency: "GBP",
  });
  return priceFormatter.format(price).slice(0, -3);
};

export default displayPrice;
