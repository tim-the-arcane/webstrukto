import React from "react";
import SymbolButtons from "./_SymbolButtons";

const Symbol = ({ symbol, editSymbol, moveSymbol, removeSymbol }) => {
  return (
    <div className={"Symbol Symbol--" + ( symbol.type || "Process")}>
      <div className="Symbol__header">
        <span className="Symbol__title">{symbol.title}</span>
        <SymbolButtons
          editSymbol={editSymbol}
          moveSymbol={moveSymbol}
          removeSymbol={removeSymbol}
          symbol={symbol}
        />
      </div>
    </div>
  );
};

export default Symbol;
