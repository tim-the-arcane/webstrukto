import React from "react";

import SymbolForm from "./_SymbolForm";

const AddModal = ({ active, toggleModal, symbol, createSymbol }) => {
  if (!active) {
    return (
      <div className="AddModal" onClick={toggleModal}>
        <button>Symbol hinzufügen</button>
      </div>
    );
  }

  return (
    <div className="AddModal">
      <h3>Symbol hinzufügen</h3>
      <button className="AddModal__toggle-button" onClick={toggleModal}>
        x
      </button>
      <SymbolForm
        symbol={symbol}
        submitLabel={"Erstellen"}
        submitHandler={createSymbol}
      />
    </div>
  );
};

export default AddModal;
