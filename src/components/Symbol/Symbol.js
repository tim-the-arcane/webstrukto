import React from "react";

import ProcessSymbol from "./ProcessSymbol";
import TestFirstLoopSymbol from "./TestFirstLoopSymbol";

const Symbol = props => {
  const symbols = props.getSymbols(props.symbol.id);

  switch (props.symbol.type) {
    case "Process":
      return (
        <ProcessSymbol
          symbol={props.symbol}
          removeSymbol={props.removeSymbol}
          moveSymbol={props.moveSymbol}
          editSymbol={props.editSymbol}
        />
      );
    case "TestFirstLoop":
      return (
        <TestFirstLoopSymbol
          symbol={props.symbol}
          removeSymbol={props.removeSymbol}
          moveSymbol={props.moveSymbol}
          editSymbol={props.editSymbol}>
          {symbols.map(child => (
            <Symbol
              key={child.id}
              symbol={child}
              moveSymbol={props.moveSymbol}
              removeSymbol={props.removeSymbol}
              editSymbol={props.editSymbol}
              getSymbols={props.getSymbols}
            />
          ))}
        </TestFirstLoopSymbol>
      );
    default:
      return null;
  }
};

export default Symbol;
