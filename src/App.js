import React, { Component } from "react";
import { v4 as uuid } from "uuid";

import Symbols from "./components/Symbols";

class App extends Component {
  state = {
    symbols: [
      {
        id: uuid(),
        title: "Schritt 1",
      },
      {
        id: uuid(),
        title: "Schritt 2",
      },
      {
        id: uuid(),
        title: "Schritt 3",
      },
      {
        id: uuid(),
        title: "Schritt 4",
      },
    ],
  };

  addSymbol = (symbol) => {
    this.setState({
      symbols: [
        ...this.state.symbols,
        {
          ...symbol,
          id: uuid(),
        },
      ],
    });
  };

  removeSymbol = (symbolId) => {
    console.log(symbolId);
    this.setState({
      symbols: this.state.symbols.filter((symbol) => symbol.id !== symbolId),
    });
  };

  render() {
    return (
      <div className="App">
        <Symbols symbols={this.state.symbols} removeSymbol={this.removeSymbol} />
        <div className="container">
          <div className="card">
            <button
              onClick={() => this.addSymbol({ title: "test", type: "Process" })}
            >
              Symbol hinzufügen
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
