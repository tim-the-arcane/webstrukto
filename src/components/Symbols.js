import React, { Component } from "react";

import Symbol from "./Symbol";

export class Symbols extends Component {
  constructor(props) {
    super(props);
    this.state = {
      symbols: props.symbols,
      rootOnly: props.rootOnly,
    };
  }

  editSymbol = this.props.editSymbol;
  moveSymbol = this.props.moveSymbol;
  removeSymbol = this.props.removeSymbol;

  componentDidUpdate(prevProps) {
    if (this.props.symbols !== prevProps.symbols) {
      this.setState({
        symbols: this.props.symbols,
      });
    }
  }

  fetchChildren = symbol => {
    if (!symbol.childSymbols || symbol.childSymbols.length === 0) return [];

    return symbol.childSymbols.map(childId => {
      return this.state.symbols.filter(symbol => symbol.id === childId)[0];
    });
  };

  render() {
    // Render placeholder instead of Symbols when list empty
    if (this.props.symbols.length === 0) {
      return (
        <div className="Symbols Symbols--empty">
          <p>Füge ein Symbol hinzu, um anzufangen...</p>
        </div>
      );
    }

    return (
      <div className="Symbols">
        {this.state.symbols.map(symbol => {
          if (this.state.rootOnly && symbol.parentSymbol !== 0) {
            return null;
          }

          return (
            <Symbol
              key={symbol.id}
              symbol={symbol}
              symbolList={this.state.symbols}
              editSymbol={this.editSymbol}
              moveSymbol={this.moveSymbol}
              removeSymbol={this.removeSymbol}
              childSymbols={this.fetchChildren(symbol)}
              fetchChildren={this.fetchChildren}
            />
          );
        })}
      </div>
    );
  }
}

export default Symbols;
