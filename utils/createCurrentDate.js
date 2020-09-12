const createCurrentDate = () => {
  const date = new Date();
  return date.toISOString();
};

module.exports = createCurrentDate;
