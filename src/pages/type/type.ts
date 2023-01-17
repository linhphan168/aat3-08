
export type Product = {
    name: string,
    price: string,
    options: {
        name: string,
        values: string[],
        // name: "color",
        // values: ["Space black", "Silver", "Gold", "Deep Purple"]
    }
    // //cách 2
    // optionname
    // opstionvalue
}

export type ShippingAddress = {
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    phoneNumber: string;
  };

  export type Card = {
    number: string;
    holderName: string;
    expireDate: string;
    cvv: string;
  };