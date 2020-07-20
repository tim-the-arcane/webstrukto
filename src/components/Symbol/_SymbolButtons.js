import React from "react";

import {
  DeleteForeverTwoTone,
  ArrowDownwardTwoTone,
  ArrowUpwardTwoTone,
  EditTwoTone,
  AddTwoTone,
} from "@material-ui/icons";

const SymbolButtons = ({
  symbol,
  editSymbol,
  moveSymbol,
  removeSymbol,
  addSymbol,
}) => {
  return (
    <div className="Symbol__buttons">
      {addSymbol && (
        <button
          className="Symbol__button Symbol__button--add-child"
          onClick={() => addSymbol(symbol.id)}>
          <span
            role="img"
            aria-label={`Sub-Symbol zu '${symbol.title} hinzufügen'`}>
            <AddTwoTone />
          </span>
        </button>
      )}
      <button
        className="Symbol__button Symbol__button--move-up"
        onClick={() => moveSymbol(symbol.id, "UP")}>
        <span role="img" aria-label={`move Symbol titled '${symbol.title}' up`}>
          <ArrowUpwardTwoTone />
        </span>
      </button>
      <button
        className="Symbol__button Symbol__button--move-down"
        onClick={() => moveSymbol(symbol.id, "DOWN")}>
        <span
          role="img"
          aria-label={`move Symbol titled '${symbol.title}' down`}>
          <ArrowDownwardTwoTone />
        </span>
      </button>
      <button
        className="Symbol__button Symbol__button--edit"
        onClick={() => editSymbol(symbol)}>
        <span role="img" aria-label={`remove Symbol titled '${symbol.title}'`}>
          <EditTwoTone />
        </span>
      </button>
      <button
        className="Symbol__button Symbol__button--delete"
        onClick={() => removeSymbol(symbol.id)}>
        <span role="img" aria-label={`remove Symbol titled '${symbol.title}'`}>
          <DeleteForeverTwoTone />
        </span>
      </button>
    </div>
  );
};

export default SymbolButtons;
