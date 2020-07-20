import React from "react";

import ProcessSymbol from "./ProcessSymbol";
import TestFirstLoopSymbol from "./TestFirstLoopSymbol";
import TestLastLoopSymbol from "./TestLastLoopSymbol";
import ContainerSymbol from "./ContainerSymbol";
import BranchSymbol from "./BranchSymbol";

const SYMBOL_TYPE_PROCESS = "Process";
const SYMBOL_TYPE_TEST_FIRST_LOOP = "TestFirstLoop";
const SYMBOL_TYPE_TEST_LAST_LOOP = "TestLastLoop";
const SYMBOL_TYPE_CONTAINER = "Container";
const SYMBOL_TYPE_BRANCH = "Branch";

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

    case SYMBOL_TYPE_CONTAINER:
      Component = ContainerSymbol;
      break;

    case SYMBOL_TYPE_BRANCH:
      Component = BranchSymbol;
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
