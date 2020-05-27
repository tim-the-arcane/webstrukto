import React, { Component } from "react";
import { v4 as uuid } from "uuid";
import arrayMove from "array-move";

import Symbols from "./components/Symbols";
import SymbolForm from "./components/_SymbolForm";
import EditModal from "./components/EditModal";

class App extends Component {
  state = {
    symbols: [
      {
        id: uuid(),
        title: "Schritt 1",
        type: "Process",
      },
      {
        id: uuid(),
        title: "Schritt 2",
        type: "Process",
      },
      {
        id: uuid(),
        title: "Schritt 3",
        type: "Process",
      },
      {
        id: uuid(),
        title: "Schritt 4",
        type: "Process",
      },
    ],
    toggleEditModal: false,
    symbolToEdit: {
      title: "",
      type: "Process",
    },
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

  updateSymbol = (editedSymbol) => {
    this.setState({
      symbols: this.state.symbols.map((symbol) => {
        if (symbol.id === editedSymbol.id) {
          return editedSymbol;
        }

        return symbol;
      }),
      toggleEditModal: false
    });
  };

  editSymbol = (symbol) => {
    this.setState({
      symbolToEdit: symbol,
      toggleEditModal: true,
    });
  };

  moveSymbol = (symbolId, to) => {
    const from = this.state.symbols.findIndex(
      (symbol) => symbol.id === symbolId
    );

    switch (to) {
      case "UP":
        to = from - 1;
        break;
      case "DOWN":
        to = from + 1;
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
          <h4>Symbol hinzufügen</h4>
          <SymbolForm
            symbol={{
              title: "test titel",
              type: "Process",
            }}
            submitLabel={"Erstellen"}
            submitHandler={this.addSymbol}
          />
        </div>
        <div className="container">
          <h4>Symbol bearbeiten</h4>
          <EditModal
            active={this.state.toggleEditModal}
            symbol={this.state.symbolToEdit}
            editSymbol={this.updateSymbol}
          />
        </div>
      </div>
    );
  }
}

export default App;
