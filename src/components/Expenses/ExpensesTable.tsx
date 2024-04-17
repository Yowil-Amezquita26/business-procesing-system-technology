import { EXPENSE } from '@/types'
import { Table } from 'antd';
import React from 'react'
import { ExpensesInput } from './ExpensesInput';

interface ExpensesTableProps{
  data: EXPENSE[]
  focusedInput: string | null;
  handleFocus: (key: string) => void;
  handleEdit: (record: EXPENSE, value: string) => void;
  handleTotals: () => void;
}

export function ExpensesTable({data,focusedInput,handleFocus,handleEdit,handleTotals}: ExpensesTableProps) {
  const currency: string = "RD$";

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
      key: "Débito",
      render: (value: string, record: EXPENSE) =>
        record.ORIGEN_ATRIBUTO === "D" && (
          <ExpensesInput
            record={record}
            currency={currency}
            value={value}
            focusedInput={focusedInput}
            handleFocus={handleFocus}
            handleEdit={handleEdit}
            handleTotals={handleTotals}
          />
        )
    },
    {
      title: "Crédito",
      dataIndex: "VALOR",
      key: "Crédito",
      render: (value: string, record: EXPENSE) =>
        record.ORIGEN_ATRIBUTO === "C" && (
          <ExpensesInput
            record={record}
            currency={currency}
            value={value}
            focusedInput={focusedInput}
            handleFocus={handleFocus}
            handleEdit={handleEdit}
            handleTotals={handleTotals}
          />
        )
    },
  ];
  const filteredData = data
    .filter((item) => item.ESTADO === "A")
    .sort((a, b) => {
      if (a.ORDEN < b.ORDEN) return -1;
      if (a.ORDEN > b.ORDEN) return 1;
      return a.ORDEN - b.ORDEN;
    });
  
  return (
    <Table
    columns = {columns}
    dataSource={filteredData}
    pagination={false}
    bordered
    />
  )
}
