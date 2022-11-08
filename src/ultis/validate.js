const validator = key => {
  const validate = {
    number: [
      {
        pattern: new RegExp(/^\d+$/),
        message: "only allow number",
      },
    ],
  };
  return validate[key];
};

export default validator;
