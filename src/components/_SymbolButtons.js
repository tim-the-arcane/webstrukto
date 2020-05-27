import React from "react";

const SymbolButtons = ({ symbol, editSymbol, moveSymbol, removeSymbol }) => {
  return (
    <div className="Symbol__buttons">
      <button
        className="Symbol__button Symbol__button--move-up"
        onClick={() => moveSymbol(symbol.id, "UP")}
      >
        <span role="img" aria-label={`move Symbol titled '${symbol.title}' up`}>
          ⬆️
        </span>
      </button>
      <button
        className="Symbol__button Symbol__button--move-down"
        onClick={() => moveSymbol(symbol.id, "DOWN")}
      >
        <span
          role="img"
          aria-label={`move Symbol titled '${symbol.title}' down`}
        >
          ⬇️
        </span>
      </button>
      <button
        className="Symbol__button Symbol__button--edit"
        onClick={() =>
          editSymbol(symbol.id, {
            id: symbol.id,
            title: "neuer Titel",
            type: symbol.type,
          })
        }
      >
        <span role="img" aria-label={`remove Symbol titled '${symbol.title}'`}>
          🖋️
        </span>
      </button>
      <button
        className="Symbol__button Symbol__button--delete"
        onClick={() => removeSymbol(symbol.id)}
      >
        <span role="img" aria-label={`remove Symbol titled '${symbol.title}'`}>
          🗑️
        </span>
      </button>
    </div>
  );
};

export default SymbolButtons;
