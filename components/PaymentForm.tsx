import React, { ChangeEvent, ReactNode, useContext, useState } from "react";
import Cards, { Focused } from "react-credit-cards-2";
import "node_modules/react-credit-cards-2/dist/es/styles-compiled.css";
import { Button, TextField } from "@mui/material";
import { addDoc, collection, setDoc } from "firebase/firestore";
import { Context } from "@/pages/_app";
import { useAuthState } from "react-firebase-hooks/auth";

const PaymentForm = () => {
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
    country: "",
    city: "",
    street: "",
    house: "",
    floor: "",
    apartment: "",
  });

  const {
    apartment,
    city,
    country,
    cvc,
    expiry,
    floor,
    focus,
    house,
    name,
    number,
    street,
  } = state;

  const handleInputChange = (
    event: ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    child: ReactNode
  ): void => {
    const name = event.target.name;
    const value = event.target.value;

    setState((prev) => ({ ...prev, [name as string]: value as string }));
  };

  const Pay = () => {};

  return (
    <div className="payment">
      <form className="payment__inputs">
        <TextField
          type="text"
          variant="outlined"
          name="country"
          className="payment__inputs-input"
          label="Country"
          onChange={handleInputChange as VoidFunction}
        />
        <TextField
          type="text"
          variant="outlined"
          name="city"
          className="payment__inputs-input"
          label="City"
          onChange={handleInputChange as VoidFunction}
        />
        <TextField
          type="text"
          variant="outlined"
          name="street"
          className="payment__inputs-input"
          label="Street"
          onChange={handleInputChange as VoidFunction}
        />
        <TextField
          type="text"
          variant="outlined"
          name="house"
          className="payment__inputs-input"
          label="House"
          onChange={handleInputChange as VoidFunction}
        />
        <TextField
          type="text"
          variant="outlined"
          name="floor"
          className="payment__inputs-input"
          label="Floor"
          onChange={handleInputChange as VoidFunction}
        />
        <TextField
          type="text"
          variant="outlined"
          name="apartment"
          className="payment__inputs-input"
          label="Apartment"
          onChange={handleInputChange as VoidFunction}
        />
      </form>
      <div className="payment__card">
        <Cards
          number={number}
          expiry={expiry}
          cvc={cvc}
          name={name}
          focused={focus as Focused}
        />
      </div>
      <form className="payment__inputs">
        <TextField
          type="number"
          variant="outlined"
          name="cvc"
          className="payment__inputs-input"
          label="CVC"
          onChange={handleInputChange as VoidFunction}
        />
        <TextField
          variant="outlined"
          type="date"
          name="expiry"
          className="payment__inputs-input"
          onChange={handleInputChange as VoidFunction}
        />
        <TextField
          variant="outlined"
          type="text"
          name="name"
          className="payment__inputs-input"
          label="Your Name"
          onChange={handleInputChange as VoidFunction}
        />
        <TextField
          variant="outlined"
          type="numberzz"
          name="number"
          className="payment__inputs-input"
          label="Card Number"
          onChange={handleInputChange as VoidFunction}
        />
      </form>
      <Button onClick={Pay}>Оплатить</Button>
    </div>
  );
};

export default PaymentForm;
