import React from "react";

import SymbolPlaceholder from "./_SymbolPlaceholder";
import Blank from "./_SymbolBlank";

const ContainerSymbol = props => {
  return (
    <div className={"ContainerSymbol"}>
      {props.children}

      {props.symbolToFill === props.symbol.id && <SymbolPlaceholder />}

      {props.symbolToFill !== props.symbol.id && (
        <Blank addSymbol={props.addSymbol} parentSymbolId={props.symbol.id} />
      )}
    </div>
  );
};

export default ContainerSymbol;
