const parseExpires = (expiryStr) => {
  const unit = expiryStr.slice(-1);
  const amount = parseInt(expiryStr.slice(0, -1));
  switch (unit) {
    case "d":
      return amount * 24 * 60 * 60 * 1000;
    case "h":
      return amount * 60 * 60 * 1000;
    case "m":
      return amount * 60 * 1000;
    default:
      return 30 * 24 * 60 * 60 * 1000;
  }
};

module.exports = parseExpires;
