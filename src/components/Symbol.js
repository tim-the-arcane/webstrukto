import React from "react";
import SymbolButtons from "./SymbolButtons";

const Symbol = ({ id, title, type, editSymbol, moveSymbol, removeSymbol }) => {
  return (
    <div className={"Symbol Symbol--" + type}>
      <div className="Symbol__header">
        <span className="Symbol__title">{title}</span>
        <SymbolButtons
          editSymbol={editSymbol}
          moveSymbol={moveSymbol}
          removeSymbol={removeSymbol}
          id={id}
          title={title}
          type={type}
        />
      </div>
    </div>
  );
};

export default Symbol;
