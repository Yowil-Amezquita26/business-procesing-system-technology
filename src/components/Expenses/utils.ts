import { EXPENSE } from "@/types";

function calculateTotals (tableData: EXPENSE[]){
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
          const numericValue = parseFloat(next.VALOR || "0");
          return prev + numericValue;
        }, 0);
      const VALORAsString = VALOR.toString();

      return { ...item, VALOR: VALORAsString };
    });

    const updatedTotalsV = updatedTotals.map((item) => {
      if (item.SUMAREN === null) {
        const VALOR = updatedTotals
          .filter((item) => item.SUMAREN !== null)
          .reduce((prev, next) => {
            const numericValue = parseFloat(next.VALOR || "0");
            const valor =
              next.ORIGEN_ATRIBUTO === "D" ? -numericValue : numericValue;
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

    return (newTableData)
  };

  export { calculateTotals};