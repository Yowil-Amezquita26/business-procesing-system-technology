// "use client"
import { Form, Input, InputNumber, Table } from "antd";
import { useState } from "react";
import expenses from "./expenses.json";
import { EXPENSE } from "@/types";

interface ExpenseItem {
  key: string;
  category: string;
  debit: string | undefined;
  credit?: string | undefined;
}


export function Expenses() {
  const [form] = Form.useForm();
  const [tableData, setTableData] = useState<EXPENSE[]>(expenses);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const reg = /^-?\d*(\.\d*)?$/;
  const currency = "RD$";


  const handleFocus = (key: string) => {
    setFocusedInput(key);
  };
  const handleTotals = () => {
    setFocusedInput(null);
    const totals: EXPENSE[] = tableData.filter(
        (item) =>
            item.TIPO_ATRIBUTO === "L" && ["D", "C"].includes(item.ORIGEN_ATRIBUTO)
    );

    const updatedTotals = totals.map((item) => {
        const VALOR = tableData
            .filter(
                (item2) =>
                    item2.TIPO_ATRIBUTO !== "L" && item.ID_ATRIBUTO === item2.SUMAREN
            )
            .reduce((prev, next) => {
                // Convert VALOR to a numeric type for calculations
                const numericValue = parseFloat(next.VALOR || '0');
                return prev + numericValue;
            }, 0);

        // Convert the result back to a string
        const VALORAsString = VALOR.toString();

        return { ...item, VALOR: VALORAsString };
    });

    const updatedTotalsV = updatedTotals.map((item) => {
        if (item.SUMAREN === null) {
            const VALOR = updatedTotals
                .filter((item) => item.SUMAREN !== null)
                .reduce((prev, next) => {
                    const numericValue = parseFloat(next.VALOR || '0');
                    const valor = next.ORIGEN_ATRIBUTO === "D" ? -numericValue : numericValue;
                    return prev + valor;
                }, 0);

            const VALORAsString = VALOR.toString();

            return { ...item, VALOR: VALORAsString };
        }
        return item;
    });

    const newTableData: EXPENSE[] = tableData.map(
        (item) =>
            updatedTotalsV.find((test) => test.ID_ATRIBUTO === item.ID_ATRIBUTO) ||
            item
    );

    setTableData(newTableData);
};

  const handleEdit = async (record: EXPENSE, value: string) => {
    const cleanedValue = value.replace(/[^0-9.]/g, '');
    const newValue = cleanedValue !== '' ? cleanedValue : '0';
    const newTableData: EXPENSE[] = tableData.map((item) =>
      item.ID_ATRIBUTO === record.ID_ATRIBUTO ? { ...item, VALOR: newValue } : item
    );
    setTableData(newTableData);
  };

  const columns = [
    {
      title: "Descripción",
      dataIndex: "DESCRIPCION_ATRIBUTO",
      key: "DESCRIPCION_ATRIBUTO",
      render: (text: string, record: EXPENSE) => (
        <span>
          {record.TIPO_ATRIBUTO === "L" ? <strong>{text}</strong> : text}
        </span>
      ),
    },
    {
      title: "Débito",
      dataIndex: "VALOR",
      key: "SUMAREN",
      render: (value: string, record: EXPENSE) =>
        record.ORIGEN_ATRIBUTO === "D" ? (
          <Input
            value={
              focusedInput === record.ID_ATRIBUTO
                ? value
                : `${currency} ${value === undefined ? 0.0 : Intl.NumberFormat().format(parseFloat(value))}`
            }
            type={"text"}
            onChange={(e) =>{
              
              handleEdit(record, e.target.value)}
            } 
            onFocus={() => handleFocus(record.ID_ATRIBUTO)}
            onBlur={(e) => handleTotals()}
            min={0}
          />
        ) : null,
    },
    {
      title: "Crédito",
      dataIndex: "VALOR",
      key: "SUMAREN",
      render: (value: string, record: EXPENSE) =>
        record.ORIGEN_ATRIBUTO === "C" ? (
          <Input
            value={
              focusedInput === record.ID_ATRIBUTO
                ? value
                : `${currency} ${value === undefined ? 0.0 : Intl.NumberFormat().format(parseFloat(value))}`
            }
            type={"text"}
            onChange={(e) =>{
              
              handleEdit(record, e.target.value)}
            } 
            onFocus={() => handleFocus(record.ID_ATRIBUTO)}
            onBlur={(e) => handleTotals()}
            min={0}
          />
        ) : null,
    },
  ];
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
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={false}
          bordered
        ></Table>
      </Form>
    </>
  );
}
