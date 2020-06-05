import React, { Component } from "react";
import { v4 as uuid } from "uuid";
import arrayMove from "array-move";

import Symbol from "./components/Symbol";
import EditModal from "./components/EditModal";
import AddModal from "./components/AddModal";

const SYMBOL_TEMPLATE = {
  title: "",
  type: "Process",
  parentSymbol: 0,
};

class App extends Component {
  state = {
    symbols: [],
    undoStack: [],
    redoStack: [],
    toggleAddModal: true,
    toggleEditModal: false,
    symbolToEdit: {
      title: "",
      type: "Process",
    },
  };

  setSymbolState = symbols => {
    const newStackEntry = this.state.symbols;

    this.setState({
      undoStack: [...this.state.undoStack, newStackEntry],
      redoStack: [],
      symbols: symbols.symbols,
      toggleEditModal: false,
      symbolToEdit: {},
    });
  };

  undo = () => {
    if (this.state.undoStack.length === 0) {
      return false;
    }

    const currentSymbolList = [...this.state.symbols];
    const previousSymbolList = [...this.state.undoStack].pop();

    this.setState({
      undoStack: [...this.state.undoStack].slice(0, -1),
      redoStack: [...this.state.redoStack, currentSymbolList],
      symbols: previousSymbolList,
    });
  };

  redo = () => {
    if (this.state.redoStack.length === 0) {
      return false;
    }

    const currentSymbolList = [...this.state.symbols];
    const nextSymbolList = [...this.state.redoStack].pop();

    this.setState({
      undoStack: [...this.state.undoStack, currentSymbolList],
      redoStack: [...this.state.redoStack].slice(0, -1),
      symbols: nextSymbolList,
    });
  };

  saveState = () => {
    localStorage.setItem("saveState", JSON.stringify(this.state));
  };

  loadState = () => {
    const loadedState = JSON.parse(localStorage.getItem("saveState"));

    this.setState(loadedState);
  };

  createSymbol = symbol => {
    this.setSymbolState({
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

  getSymbols = parentSymbolId => {
    return this.state.symbols.filter(
      symbol => symbol.parentSymbol === parentSymbolId
    );
  };

  updateSymbol = editedSymbol => {
    this.setSymbolState({
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
    this.setSymbolState({
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
          <div
            className="MenuBar"
            style={{
              marginBlock: "1rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <button
              onClick={() => this.undo()}
              disabled={this.state.undoStack.length === 0}
            >
              Rückgängig
            </button>
            <button
              onClick={() => this.redo()}
              disabled={this.state.redoStack.length === 0}
            >
              Wiederholen
            </button>
            <button onClick={() => this.saveState()}>Speichern</button>
            <button onClick={() => this.loadState()}>Laden</button>
            {/* <button onClick={() => this.export()}>Export</button> */}
          </div>
        </div>
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
            symbol={SYMBOL_TEMPLATE}
            createSymbol={this.createSymbol}
          />
        </div>
        <div className="container">
          {this.state.toggleEditModal && (
            <EditModal
              toggleModal={() =>
                this.setState({ toggleEditModal: !this.state.toggleEditModal })
              }
              active={this.state.toggleEditModal}
              symbol={this.state.symbolToEdit}
              editSymbol={this.updateSymbol}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
