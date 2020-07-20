import React from "react";

import ProcessSymbol from "./ProcessSymbol";
import TestFirstLoopSymbol from "./TestFirstLoopSymbol";
import TestLastLoopSymbol from "./TestLastLoopSymbol";

const SYMBOL_TYPE_PROCESS = "Process";
const SYMBOL_TYPE_TEST_FIRST_LOOP = "TestFirstLoop";
const SYMBOL_TYPE_TEST_LAST_LOOP = "TestLastLoop";

const Symbol = ({
  symbol,
  addSymbol,
  getSymbols,
  editSymbol,
  moveSymbol,
  removeSymbol,
  symbolToFill,
}) => {
  const symbols = getSymbols(symbol.id);

  let Component = React.Fragment;

  switch (symbol.type) {
    case SYMBOL_TYPE_PROCESS:
      Component = ProcessSymbol;
      break;

    case SYMBOL_TYPE_TEST_FIRST_LOOP:
      Component = TestFirstLoopSymbol;
      break;

    case SYMBOL_TYPE_TEST_LAST_LOOP:
      Component = TestLastLoopSymbol;
      break;

    default:
      return null;
  }

  return (
    <Component
      symbol={symbol}
      addSymbol={addSymbol}
      editSymbol={editSymbol}
      moveSymbol={moveSymbol}
      removeSymbol={removeSymbol}
      symbolToFill={symbolToFill}>
      {symbols.map(child => (
        <Symbol
          key={child.id}
          symbol={child}
          addSymbol={addSymbol}
          getSymbols={getSymbols}
          editSymbol={editSymbol}
          moveSymbol={moveSymbol}
          removeSymbol={removeSymbol}
          symbolToFill={symbolToFill}
        />
      ))}
    </Component>
  );
};

export default Symbol;
