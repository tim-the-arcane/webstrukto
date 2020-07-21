import React, { useState, useEffect } from "react";

import ArrowLeftTwoTone from "@material-ui/icons/ArrowLeftTwoTone";

import SymbolForm from "./_SymbolForm";

const EditModal = ({ active, symbol, editSymbol, toggleModal }) => {
  const [symbolToEdit, setSymbolToEdit] = useState(symbol);

  useEffect(() => {
    setSymbolToEdit(symbol);
  }, [symbol]);

  if (!active) {
    return null;
  }

  return (
    <div className="EditModal">
      <h3>Symbol bearbeiten</h3>
      <button className="resetParentSymbol" onClick={() => toggleModal()}>
        <span role="img">
          <ArrowLeftTwoTone stroke="5" />
        </span>
        zurücksetzen
      </button>
      <SymbolForm
        symbol={symbolToEdit}
        submitLabel={"Übernehmen"}
        submitHandler={editSymbol}
      />
    </div>
  );
};

export default EditModal;
