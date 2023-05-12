import React, { ChangeEvent, ReactNode, useState } from "react";
import Cards, { Focused } from "react-credit-cards-2";
import "node_modules/react-credit-cards-2/dist/es/styles-compiled.css";
import { TextField } from "@mui/material";

const PaymentForm = () => {
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

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

  return (
    <div className="payment">
      <div className="payment__card">
        <Cards
          number={state.number}
          expiry={state.expiry}
          cvc={state.cvc}
          name={state.name}
          focused={state.focus as Focused}
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
          type="number"
          name="number"
          className="payment__inputs-input"
          label="Card Number"
          onChange={handleInputChange as VoidFunction}
        />
      </form>
    </div>
  );
};

export default PaymentForm;
