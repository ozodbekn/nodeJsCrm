const sendErrorResponse = (error, response) => {
  console.log(error);

  response.status(400).send({ message: "Xatolik: ", error: error.message });
};

module.exports = { sendErrorResponse };
