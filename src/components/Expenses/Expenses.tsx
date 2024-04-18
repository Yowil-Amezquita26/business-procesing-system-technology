"use client";
import { Form} from "antd";
import { useState } from "react";
import expenses from "./expenses.json";
import { EXPENSE } from "@/types";
import { ExpensesTable } from "./ExpensesTable";
import { calculateTotals } from "./utils";

export function Expenses() {
  const [form] = Form.useForm();
  const [tableData, setTableData] = useState<EXPENSE[]>(expenses);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const currency: string = "RD$";

  const handleFocus = (key: string) => {
    setFocusedInput(key);
  };
  const handleTotals = () => {
    setFocusedInput(null);
    
    setTableData(calculateTotals(tableData));
  };

  const handleEdit = async (record: EXPENSE, value: string) => {
    const cleanedValue: string = value.replace(/[^0-9.]/g, "");
    const newValue: string = cleanedValue !== "" ? cleanedValue : "0";
    const newTableData: EXPENSE[] = tableData.map((item) =>
      item.ID_ATRIBUTO === record.ID_ATRIBUTO
        ? { ...item, VALOR: newValue }
        : item
    );
    setTableData(newTableData);
  };

  const filteredData = tableData
    .filter((item) => item.ESTADO === "A")
    .sort((a, b) => {
      if (a.ORDEN < b.ORDEN) return -1;
      if (a.ORDEN > b.ORDEN) return 1;
      return a.ORDEN - b.ORDEN;
    });
  return (
    <>
      <Form form={form}>
        <ExpensesTable
          data={filteredData}
          focusedInput={focusedInput}
          handleFocus={handleFocus}
          handleEdit={handleEdit}
          handleTotals={handleTotals}
        ></ExpensesTable>
      </Form>
    </>
  );
}
