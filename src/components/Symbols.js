import React, { Component } from "react";

import Symbol from "./Symbol";

export class Symbols extends Component {
  constructor(props) {
    super(props);
    this.state = {
      symbols: props.symbols,
    };
  }

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
          <Symbol key={symbol.id} title={symbol.title} type={symbol.title} />
        ))}
      </div>
    );
  }
}

export default Symbols;
