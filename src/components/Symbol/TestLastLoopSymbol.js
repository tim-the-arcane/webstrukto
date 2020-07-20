import React from "react";

import SymbolButtons from "./_SymbolButtons";
import SymbolPlaceholder from "./_SymbolPlaceholder";
import Blank from "./_SymbolBlank";

const TestFirstLoop = props => {
  return (
    <div
      className={"Symbol Symbol--" + props.symbol.type}
      style={
        props.symbolToFill === props.symbol.id
          ? { outline: "rgba(255, 143, 0, .6) solid 5px" }
          : {}
      }>
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

      <div
        className={
          props.children.length > 0 || props.symbolToFill === props.symbol.id
            ? "Symbol__children"
            : "Symbol__children Symbol__children--empty"
        }>
        {props.children}

        {props.children.length === 0 && props.symbolToFill !== props.symbol.id && (
          <div onClick={() => props.addSymbol(props.symbol.id)}>
            <Blank />
          </div>
        )}

        {props.symbolToFill === props.symbol.id && <SymbolPlaceholder />}
      </div>
    </div>
  );
};

export default TestFirstLoop;
