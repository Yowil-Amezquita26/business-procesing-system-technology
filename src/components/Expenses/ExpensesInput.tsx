import { EXPENSE } from "@/types";
import { Input } from "antd";
import React from "react";

interface ExpensesInputProps{
    record: EXPENSE;
    currency: string;
    value: string;
    focusedInput: string | null;
    handleFocus: ( key: string)=> void;
    handleTotals: () => void;
    handleEdit: (record: EXPENSE, value: string) => void;
}


export  function ExpensesInput({
  record,
  currency,
  value,
  focusedInput,
  handleFocus,
  handleTotals,
  handleEdit,
}:ExpensesInputProps) {

  return (
    <Input
      value={
        focusedInput === record.ID_ATRIBUTO
          ? value
          : `${currency} ${
              value === undefined
                ? "0.00"
                : Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(parseFloat(value))
            }`
      }
      type={"text"}
      onChange={(e) => {
        handleEdit(record, e.target.value);
      }}
      onFocus={() => handleFocus(record.ID_ATRIBUTO)}
      onBlur={(e) => handleTotals()}
      min={0}
    />
  );
}


