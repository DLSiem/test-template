//  generate random code

const randomCode = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

//  generate random code

console.log("Random Code:->", randomCode());
