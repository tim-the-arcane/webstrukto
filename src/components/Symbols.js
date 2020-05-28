import React, { Component } from "react";

import Symbol from "./Symbol";

export class Symbols extends Component {
  constructor(props) {
    super(props);
    this.state = {
      symbols: props.symbols,
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

  render() {
    return (
      <div className="Symbols container">
        {this.state.symbols.map((symbol) => (
          <Symbol
            key={symbol.id}
            symbol={symbol}
            editSymbol={this.editSymbol}
            moveSymbol={this.props.moveSymbol}
            removeSymbol={this.removeSymbol}
          />
        ))}
      </div>
    );
  }
}

export default Symbols;