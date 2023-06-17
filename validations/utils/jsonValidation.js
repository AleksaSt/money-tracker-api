const isValidJSON = body => {
  try {
    JSON.stringify(body);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = {
  isValidJSON,
};
