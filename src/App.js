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
    },
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
