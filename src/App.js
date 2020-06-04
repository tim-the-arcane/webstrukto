import React, { Component } from "react";
import { v4 as uuid } from "uuid";
import arrayMove from "array-move";

import Symbol from "./components/Symbol";
import EditModal from "./components/EditModal";
import AddModal from "./components/AddModal";

class App extends Component {
  state = {
    symbolTemplate: {
      title: "",
      type: "Process",
      parentSymbol: 0,
    },
    symbols: [
      {
        id: 1,
        title: "Öffne webstrukto",
        type: "Process",
        parentSymbol: 0,
      },
      {
        id: 2,
        title: "Erstelle Diagramm",
        type: "Process",
        parentSymbol: 0,
      },
      {
        id: 3,
        title: "So lange Diagramm nicht fertig",
        type: "TestLastLoop",
        parentSymbol: 0,
      },
      {
        id: 4,
        title: "Füge Symbol hinzu",
        type: "TestFirstLoop",
        parentSymbol: 3,
      },
      {
        id: 5,
        title: "Bearbeite Symbole",
        type: "Process",
        parentSymbol: 3,
      },
      {
        id: 6,
        title: "Setze Titel",
        type: "Process",
        parentSymbol: 4,
      },
      {
        id: 7,
        title: "Setze Typ",
        type: "Process",
        parentSymbol: 4,
      },
      {
        id: 8,
        title: "Prüfe Typ",
        type: "Condition",
        parentSymbol: 0,
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
          parentSymbol: 0,
        },
      ],
    });
  };

  getSymbols = symbolId => {
    return this.state.symbols.filter(
      symbol => symbol.parentSymbol === symbolId
    );
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
      symbolToEdit: {},
    });
  };

  removeSymbol = symbolId => {
    this.setState({
      symbols: this.state.symbols.filter(
        symbol => symbol.id !== symbolId && symbol.parentSymbol !== symbolId
      ),
    });
  };

  addSymbol = () => {
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
    const rootSymbolCount = this.state.symbols.filter(
      symbol => symbol.parentSymbol === 0
    ).length;

    return (
      <div className="App">
        <header id="masthead">
          <div className="container">
            <h1 className="logo">
              webstrukto <br />
              <span
                style={{
                  fontSize: "0.5em",
                  lineHeight: "1em",
                }}
              >
                – der Struktogramm-Editor für's Web
              </span>
            </h1>
          </div>
        </header>
        <div className="container">
          {rootSymbolCount > 0 && (
            <div className="Symbols">
              {this.getSymbols(0).map(symbol => (
                <Symbol
                  key={symbol.id}
                  getSymbols={this.getSymbols}
                  symbol={symbol}
                  removeSymbol={this.removeSymbol}
                  editSymbol={this.editSymbol}
                  moveSymbol={this.moveSymbol}
                />
              ))}
            </div>
          )}
          {rootSymbolCount === 0 && (
            <div className="Symbols--empty">
              <p onClick={() => this.addSymbol()}>
                Füge ein Symbol hinzu um zu beginnen.
              </p>
            </div>
          )}
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
