import React from "react";

const SymbolButtons = ({id, title, type, editSymbol, moveSymbol, removeSymbol}) => {
  return (
    <div className="Symbol__buttons">
      <button
        className="Symbol__button Symbol__button--move-up"
        onClick={() => moveSymbol(id, "UP")}
      >
        <span role="img" aria-label={`remove Symbol titled '${title}'`}>
          UP
        </span>
      </button>
      <button
        className="Symbol__button Symbol__button--move-down"
        onClick={() => moveSymbol(id, "DOWN")}
      >
        <span role="img" aria-label={`remove Symbol titled '${title}'`}>
          DO
        </span>
      </button>
      <button
        className="Symbol__button Symbol__button--edit"
        onClick={() =>
          editSymbol(id, { id: id, title: "neuer Titel", type: type })
        }
      >
        <span role="img" aria-label={`remove Symbol titled '${title}'`}>
          🖋️
        </span>
      </button>
      <button
        className="Symbol__button Symbol__button--delete"
        onClick={() => removeSymbol(id)}
      >
        <span role="img" aria-label={`remove Symbol titled '${title}'`}>
          🗑️
        </span>
      </button>
    </div>
  );
};

export default SymbolButtons;
