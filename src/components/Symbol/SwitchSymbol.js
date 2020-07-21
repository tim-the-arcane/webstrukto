import React from "react";
import SymbolButtons from "./_SymbolButtons";

const SwitchSymbol = props => {
  return (
    <div className={"Symbol Symbol--" + props.symbol.type}>
      <div className="Symbol__header">
        <span className="Symbol__title">{props.symbol.title}</span>
        <SymbolButtons
          symbol={props.symbol}
          addSymbol={props.addSymbol}
          editSymbol={props.editSymbol}
          moveSymbol={props.moveSymbol}
          removeSymbol={props.removeSymbol}
        />
        <div className="svg-wrapper">
          <svg>
            <line x1="0" y1="0" x2="50%" y2="100%" />
            <line x1="50%" y1="100%" x2="100%" y2="0" />
          </svg>
        </div>
      </div>

      <div className={"Symbol__children"}>{props.children}</div>
    </div>
  );
};

export default SwitchSymbol;
