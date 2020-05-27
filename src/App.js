import React, { Component } from "react";
import { v4 as uuid } from "uuid";
import arrayMove from "array-move";

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

  editSymbol = (symbolId, editedSymbol) => {
    this.setState({
      symbols: this.state.symbols.map((symbol) => {
        if (symbol.id === symbolId) {
          return editedSymbol;
        }

        return symbol;
      }),
    });
  };

  moveSymbol = (
    symbolId,
    to
  ) => {

    const from = this.state.symbols.findIndex((symbol) => symbol.id === symbolId);

    switch(to){
      case "UP":
        to = from-1;
        break;
      case "DOWN":
        to = from+1;
        break;
      default:
        // 
    }

    this.setState({
      symbols: arrayMove(this.state.symbols, from, to),
    });
  };

  removeSymbol = (symbolId) => {
    this.setState({
      symbols: this.state.symbols.filter((symbol) => symbol.id !== symbolId),
    });
  };

  render() {
    return (
      <div className="App">
        <Symbols
          symbols={this.state.symbols}
          editSymbol={this.editSymbol}
          moveSymbol={this.moveSymbol}
          removeSymbol={this.removeSymbol}
        />
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
