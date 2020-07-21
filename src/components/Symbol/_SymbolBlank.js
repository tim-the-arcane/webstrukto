import React from "react";

const _SymbolBlank = props => {
  return (
    <div
      className="Symbol Symbol--blank"
      onClick={() => props.addSymbol(props.parentSymbolId)}>
      <div className="Symbol__header">
        <span className="Symbol__title">
          {props.parentSymbolId === 0
            ? "Symbol hier einfügen"
            : "Untersymbol hier einfügen"}
        </span>
      </div>
    </div>
  );
};

export default _SymbolBlank;
