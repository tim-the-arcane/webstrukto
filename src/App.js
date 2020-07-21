import React, { Component } from "react";
import { v4 as uuid } from "uuid";
import arrayMove from "array-move";
import "typeface-roboto";

import UndoIcon from "@material-ui/icons/UndoRounded";
import RedoIcon from "@material-ui/icons/RedoRounded";
import SaveIcon from "@material-ui/icons/SaveRounded";
import FolderOpenIcon from "@material-ui/icons/FolderOpenRounded";
import DeleteForeverIcon from "@material-ui/icons/DeleteForeverRounded";

import ProjectTitle from "./components/ProjectTitle";
import Symbol from "./components/Symbol";
import EditModal from "./components/EditModal";
import AddModal from "./components/AddModal";
import ContainerSymbol from "./components/Symbol/ContainerSymbol";

const SYMBOL_TEMPLATE = {
  title: "",
  type: "Process",
  parentSymbol: 0,
};

const INITIAL_STATE = {
  projectTitle: "Neues Struktogramm",
  symbols: [],
  undoStack: [],
  redoStack: [],
  toggleAddModal: true,
  toggleEditModal: false,
  symbolToEdit: {
    title: "",
    type: "Process",
  },
  symbolToFill: 0,
};

let localStorageContent = JSON.parse(localStorage.getItem("saveState"));

class App extends Component {
  state =
    localStorageContent !== null ? localStorageContent : { ...INITIAL_STATE };

  saveFile = (blob, filename) => {
    const dataURI = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = dataURI;
    a.download = filename;
    a.click();

    return true;
  };

  saveState = saveToDisk => {
    localStorage.setItem("saveState", JSON.stringify(this.state));

    if (saveToDisk) {
      const currentDate = new Date().toLocaleDateString("de-DE");
      const projectTitle = this.state.projectTitle;
      const fileName = `webstrukto-${currentDate}-${projectTitle}.json`;

      const cleanedSnapshot = { ...this.state, undoStack: [], redoStack: [] };

      const fileToSave = new Blob([JSON.stringify(cleanedSnapshot)], {
        type: "application/json",
        name: "webstrukto",
      });

      this.saveFile(fileToSave, fileName);
    }

    return true;
  };

  openFile = async file => {
    let reader = new FileReader();

    reader.onload = () => {
      const fileContent = reader.result;

      this.importFile(fileContent);
    };

    reader.readAsText(file);
  };

  importFile = async fileContent => {
    this.setState({
      ...JSON.parse(fileContent),
    });

    return true;
  };

  loadState = async () => {
    const loadedState = await this.openFile();

    this.setState(loadedState);
  };

  clearState = () => {
    localStorage.setItem("saveState", null);
    this.setState({ ...INITIAL_STATE });
    return true;
  };

  updateProjectTitle = title => {
    this.setState(
      {
        projectTitle: title,
      },
      () => this.saveState(false)
    );
  };

  setSymbolState = symbols => {
    const newStackEntry = this.state.symbols;

    this.setState(
      {
        undoStack: [...this.state.undoStack, newStackEntry],
        redoStack: [],
        symbols: symbols.symbols,
        toggleEditModal: false,
        symbolToEdit: {},
      },
      () => this.saveState(false)
    );
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

  createSymbol = symbol => {
    let symbolId = uuid();
    let newSymbols = [];
    let containers = [];
    newSymbols.push({ ...symbol, id: symbolId });

    switch (symbol.type) {
      case "TestFirstLoop":
      case "TestLastLoop":
        containers.push(...this.createContainer(symbolId, 1));

        break;

      case "Branch":
        containers.push(...this.createContainer(symbolId, 2));

        break;

      /**
       * @Todo Add logic for switch case symbol
       * @Todo Add logic for procedure/method symbol
       */

      default:
        break;
    }

    newSymbols.push(...containers);
    console.log(newSymbols);

    this.setSymbolState({
      symbols: [...this.state.symbols, ...newSymbols],
    });
  };

  createContainer = (parentSymbolId, count) => {
    let containers = [];

    for (let i = 0; i < count; i++) {
      containers.push({
        title: "",
        type: "Container",
        id: uuid(),
        parentSymbol: parentSymbolId,
      });
    }

    return containers;
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

  addSymbol = (parent = false) => {
    this.setState({
      toggleEditModal: false,
      toggleAddModal: true,
      symbolToFill: parent,
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

    this.setSymbolState({
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
            <h1>
              webstrukto
              <span>– Der Struktogramm-Editor fürs Web</span>
            </h1>
            <div className="MenuBar">
              <button
                onClick={() => this.undo()}
                disabled={this.state.undoStack.length === 0}>
                <span role="img" aria-label="Rückgängig">
                  <UndoIcon />
                </span>
                <span>Rückgängig</span>
              </button>
              <button
                onClick={() => this.redo()}
                disabled={this.state.redoStack.length === 0}>
                <span role="img" aria-label="Wiederholen">
                  <RedoIcon />
                </span>
                <span>Wiederholen</span>
              </button>
              <button
                disabled={
                  this.state.undoStack.length === 0 &&
                  this.state.redoStack.length === 0
                }
                onClick={() => this.saveState(true)}>
                <span role="img" aria-label="Projekt speichern">
                  <SaveIcon />
                </span>
                <span>Projekt speichern</span>
              </button>
              <input
                type="file"
                onChange={e => this.openFile(e.target.files[0])}
                id="fileUploadField"
                style={{
                  display: "none",
                }}
              />
              <button
                onClick={() => {
                  document.getElementById("fileUploadField").click();
                }}>
                <span role="img" aria-label="Projektdatei öffnen">
                  <FolderOpenIcon />
                </span>
                <span>Öffnen</span>
              </button>
              <button
                disabled={this.state === INITIAL_STATE}
                onClick={() => {
                  if (window.confirm("Wirklich löschen?")) this.clearState();
                }}>
                <span role="img" aria-label="Projekt löschen">
                  <DeleteForeverIcon />
                </span>
                <span>Löschen</span>
              </button>
            </div>
          </div>
        </header>

        <div className="wrapper">
          <article id="diagram">
            <div className="container">
              <ProjectTitle
                title={this.state.projectTitle}
                updateProjectTitle={this.updateProjectTitle}
              />

              <div id="canvas">
                {rootSymbolCount > 0 && (
                  <div className="Symbols">
                    {this.getSymbols(0).map(symbol => (
                      <Symbol
                        key={symbol.id}
                        symbol={symbol}
                        addSymbol={this.addSymbol}
                        getSymbols={this.getSymbols}
                        editSymbol={this.editSymbol}
                        moveSymbol={this.moveSymbol}
                        removeSymbol={this.removeSymbol}
                        symbolToFill={this.state.symbolToFill}
                      />
                    ))}

                    <ContainerSymbol
                      symbol={{ id: 0 }}
                      addSymbol={this.addSymbol}
                      symbolToFill={this.state.symbolToFill}
                    />
                  </div>
                )}
                {rootSymbolCount === 0 && (
                  <div className="Symbols--empty">
                    <p onClick={() => this.addSymbol(false)}>
                      Füge ein Symbol hinzu, um zu beginnen.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </article>

          <aside id="control">
            <AddModal
              toggleModal={() =>
                this.setState({ toggleAddModal: !this.state.toggleAddModal })
              }
              active={this.state.toggleAddModal}
              symbol={SYMBOL_TEMPLATE}
              createSymbol={this.createSymbol}
              symbolToFill={this.state.symbolToFill}
              resetParentSymbol={() => {
                this.setState({ symbolToFill: 0 });
              }}
            />

            {this.state.toggleEditModal && (
              <EditModal
                toggleModal={() =>
                  this.setState({
                    toggleEditModal: !this.state.toggleEditModal,
                  })
                }
                active={this.state.toggleEditModal}
                symbol={this.state.symbolToEdit}
                editSymbol={this.updateSymbol}
              />
            )}
          </aside>
          <a
            id="forkMe"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/tim-the-arcane/webstrukto">
            <img
              width="149"
              height="149"
              src="https://github.blog/wp-content/uploads/2008/12/forkme_right_white_ffffff.png?resize=149%2C149"
              alt="Fork me on GitHub"
            />
          </a>
        </div>
      </div>
    );
  }
}

export default App;
