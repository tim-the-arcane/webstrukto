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
          onClick={() => addSymbol(symbol.id)}
          title={`Sub-Symbol zu '${symbol.title} hinzufügen'`}>
          <span role="img">
            <AddTwoTone />
          </span>
        </button>
      )}
      <button
        className="Symbol__button Symbol__button--move-up"
        onClick={() => moveSymbol(symbol.id, "UP")}
        title={`Bewege '${symbol.title}' nach oben`}>
        <span role="img">
          <ArrowUpwardTwoTone />
        </span>
      </button>
      <button
        className="Symbol__button Symbol__button--move-down"
        onClick={() => moveSymbol(symbol.id, "DOWN")}
        title={`Bewege '${symbol.title}' nach unten`}>
        <span role="img">
          <ArrowDownwardTwoTone />
        </span>
      </button>
      <button
        className="Symbol__button Symbol__button--edit"
        onClick={() => editSymbol(symbol)}
        title={`Bearbeite '${symbol.title}'`}>
        <span role="img">
          <EditTwoTone />
        </span>
      </button>
      <button
        className="Symbol__button Symbol__button--delete"
        onClick={() => removeSymbol(symbol.id)}
        title={`Lösche '${symbol.title}'`}>
        <span role="img">
          <DeleteForeverTwoTone />
        </span>
      </button>
    </div>
  );
};

export default SymbolButtons;
