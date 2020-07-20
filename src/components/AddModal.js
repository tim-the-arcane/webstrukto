import React from "react";

import SymbolForm from "./_SymbolForm";

const AddModal = ({
  active,
  toggleModal,
  symbol,
  createSymbol,
  symbolToFill,
}) => {
  if (!active) {
    return (
      <div className="AddModal" onClick={toggleModal}>
        <button>Symbol hinzufügen</button>
      </div>
    );
  }

  symbol = { ...symbol, parentSymbol: symbolToFill };

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
        symbolToFill={symbolToFill}
      />
    </div>
  );
};

export default AddModal;
