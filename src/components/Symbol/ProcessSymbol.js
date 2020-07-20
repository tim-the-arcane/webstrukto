import React from "react";

import SymbolButtons from "./_SymbolButtons";

const ProcessSymbol = props => {
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
      </div>
    </div>
  );
};

export default ProcessSymbol;
