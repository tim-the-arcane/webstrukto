import React, { useState, useEffect } from "react";

import SymbolForm from "./_SymbolForm";

const EditModal = ({ active, symbol, editSymbol }) => {
  const [symbolToEdit, setSymbolToEdit] = useState(symbol);

  useEffect(() => {
      setSymbolToEdit(symbol)
  }, [symbol])
  
  if (!active) {
    return null;
  }

  return (
    <SymbolForm
      symbol={symbolToEdit}
      submitLabel={"Übernehmen"}
      submitHandler={editSymbol}
    />
  );
};

export default EditModal;
