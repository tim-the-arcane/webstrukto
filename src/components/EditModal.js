import React, { useState, useEffect } from "react";

import SymbolForm from "./_SymbolForm";

const EditModal = ({ active, symbol, editSymbol }) => {
  const [symbolToEdit, setSymbolToEdit] = useState(symbol);

  useEffect(() => {
    setSymbolToEdit(symbol);
  }, [symbol]);

  if (!active) {
    return null;
  }

  return (
    <div className="EditModal">
      <h4>Symbol bearbeiten</h4>
      <SymbolForm
        symbol={symbolToEdit}
        submitLabel={"Übernehmen"}
        submitHandler={editSymbol}
      />
    </div>
  );
};

export default EditModal;
