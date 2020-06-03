import React, { Component } from "react";
import Symbols from "./Symbols";
import SymbolButtons from "./_SymbolButtons";

class Symbol extends Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: props.symbol,
      childSymbols: props.childSymbols || [],
    };
  }

  editSymbol = this.props.editSymbol;
  moveSymbol = this.props.moveSymbol;
  removeSymbol = this.props.removeSymbol;
  renderChildren = this.props.renderChildren;

  componentDidUpdate(prevProps) {
    if (
      this.props.childSymbols !== prevProps.childSymbols ||
      this.props.symbol !== prevProps.symbol
    ) {
      this.setState({
        symbol: this.props.symbol,
        childSymbols: this.props.childSymbols,
      });
    }
  }

  render() {
    return (
      <div
        className={"Symbol Symbol--" + (this.state.symbol.type || "Process")}>
        <div className="Symbol__header">
          <span className="Symbol__title">{this.state.symbol.title}</span>
          <SymbolButtons
            editSymbol={this.editSymbol}
            moveSymbol={this.moveSymbol}
            removeSymbol={this.removeSymbol}
            symbol={this.state.symbol}
          />
        </div>

        {this.state.childSymbols.length > 0 && (
          <div className={"Symbol__children"}>
            <Symbols
              symbols={this.state.childSymbols}
              editSymbol={this.editSymbol}
              moveSymbol={this.moveSymbol}
              removeSymbol={() => this.removeSymbol}
              rootOnly={false}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Symbol;
