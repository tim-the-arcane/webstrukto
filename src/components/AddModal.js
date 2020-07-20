import React from "react";

import SymbolForm from "./_SymbolForm";
import { ArrowLeftTwoTone } from "@material-ui/icons";

const AddModal = ({
  active,
  toggleModal,
  symbol,
  createSymbol,
  symbolToFill,
  resetParentSymbol,
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
      <h3>
        {symbolToFill === 0 ? "Symbol hinzufügen" : "Untersymbol hinzufügen"}
      </h3>
      {symbolToFill !== 0 && (
        <button
          className="resetParentSymbol"
          onClick={() => resetParentSymbol()}>
          <span role="img">
            <ArrowLeftTwoTone stroke="5" />
          </span>
          zurücksetzen
        </button>
      )}
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
