import React, { Component } from "react";
import { v4 as uuid } from "uuid";
import arrayMove from "array-move";

import Symbols from "./components/Symbols";
import EditModal from "./components/EditModal";
import AddModal from "./components/AddModal";

class App extends Component {
  state = {
    symbolTemplate: {
      title: "",
      type: "Process",
      childSymbols: [],
      parentSymbol: 0,
    },
    symbols: [
      {
        id: 1,
        title: "Öffne webstrukto",
        type: "Process",
        childSymbols: [],
        parentSymbol: 0,
      },
      {
        id: 2,
        title: "Erstelle Diagramm",
        type: "Process",
        childSymbols: [],
        parentSymbol: 0,
      },
      {
        id: 4,
        title: "So lange Diagramm nicht fertig",
        type: "TestFirstLoop",
        childSymbols: [5, 6],
        parentSymbol: 0,
      },
      {
        id: 5,
        title: "Füge Symbol hinzu",
        type: "Process",
        childSymbols: [],
        parentSymbol: 4,
      },
      {
        id: 6,
        title: "Bearbeite Symbole",
        type: "Process",
        childSymbols: [],
        parentSymbol: 4,
      },
    ],
    toggleAddModal: true,
    toggleEditModal: false,
    symbolToEdit: {
      title: "",
      type: "Process",
    },
  };

  createSymbol = symbol => {
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

  updateSymbol = editedSymbol => {
    this.setState({
      symbols: this.state.symbols.map(symbol => {
        if (symbol.id === editedSymbol.id) {
          return editedSymbol;
        }

        return symbol;
      }),
      toggleEditModal: false,
    });
  };

  removeSymbol = symbolId => {
    console.log(symbolId);

    this.setState({
      symbols: this.state.symbols.filter(symbol => symbol.id !== symbolId),
    });
  };

  addSymbol = symbol => {
    this.setState({
      toggleEditModal: false,
      toggleAddModal: true,
    });
  };

  editSymbol = symbol => {
    this.setState({
      symbolToEdit: symbol,
      toggleAddModal: false,
      toggleEditModal: true,
    });
  };

  moveSymbol = (symbolId, to) => {
    console.log(`Move Symbol ${symbolId} ${to}`);

    const from = this.state.symbols.findIndex(symbol => symbol.id === symbolId);

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

  render() {
    return (
      <div className="App">
        <header>
          <div className="container">
            <h1 className="logo">
              webstrukto <br />
              <span
                style={{
                  fontSize: "0.5em",
                  lineHeight: "1em",
                }}>
                – der Struktogramm-Editor für's Web
              </span>
            </h1>
          </div>
        </header>
        <div className="container">
          <Symbols
            symbols={this.state.symbols}
            editSymbol={this.editSymbol}
            moveSymbol={this.moveSymbol}
            removeSymbol={this.removeSymbol}
            rootOnly={true}
          />
        </div>
        <div className="container">
          <AddModal
            toggleModal={() =>
              this.setState({ toggleAddModal: !this.state.toggleAddModal })
            }
            active={this.state.toggleAddModal}
            symbol={this.state.symbolTemplate}
            createSymbol={this.createSymbol}
          />
        </div>
        <div className="container">
          <EditModal
            toggleModal={() =>
              this.setState({ toggleEditModal: !this.state.toggleEditModal })
            }
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
