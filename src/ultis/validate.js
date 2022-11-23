const validator = key => {
  const validate = {
    number: [
      {
        pattern: new RegExp(/^\d+$/),
        message: "only allow number",
      },
    ],
    email: [
      {
        type: "email",
        message: "The input is not valid E-mail!",
      },
    ],
  };
  return validate[key];
};

export default validator;
