import React from "react";
import AddTwoTone from "@material-ui/icons/AddTwoTone";

import SymbolPlaceholder from "./_SymbolPlaceholder";
import Blank from "./_SymbolBlank";

const ContainerSymbol = props => {
  return (
    <div
      className={"ContainerSymbol"}
      style={
        props.symbolToFill === props.symbol.id
          ? { outline: "rgba(255, 143, 0, .6) solid 5px" }
          : {}
      }>
      {props.children}

      {props.children.length === 0 && props.symbolToFill !== props.symbol.id && (
        <div onClick={() => props.addSymbol(props.symbol.id)}>
          <Blank />
        </div>
      )}

      {props.symbolToFill === props.symbol.id && <SymbolPlaceholder />}

      {props.symbolToFill !== props.symbol.id && (
        <button
          onClick={() => props.addSymbol(props.symbol.id)}
          title="Untersymbol hinzufügen"
          className="ContainerSymbol__addSymbol">
          <span role="img" style={{ display: "flex" }}>
            <AddTwoTone
              onClick={() => props.addSymbol(props.symbol.id)}
              style={{ flex: 1, fontSize: "15px" }}
            />
          </span>
        </button>
      )}
    </div>
  );
};

export default ContainerSymbol;
