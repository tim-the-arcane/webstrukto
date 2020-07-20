import React, { useState, useEffect } from "react";

const SymbolForm = ({
  submitLabel,
  submitHandler,
  symbol,
  symbolToFill = 0,
}) => {
  const [title, setTitle] = useState(symbol.title);
  const [type, setType] = useState(symbol.type || "Process");
  const [id, setId] = useState(symbol.id);
  const [changes, setChanges] = useState(false);

  useEffect(() => {
    setTitle(symbol.title);
    setType(symbol.type);
    setId(symbol.id);
  }, [symbol]);

  return (
    <form
      className="SymbolForm"
      onReset={e => {
        e.preventDefault();
        setTitle(symbol.title);
        setType(symbol.type);
        setChanges(false);
      }}
      onSubmit={e => {
        e.preventDefault();
        submitHandler({ ...symbol, id: id, title: title, type: type });
        e.target.reset();
      }}>
      <label htmlFor="title">Titel</label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={e => {
          setTitle(e.target.value);
          setChanges(true);
        }}
        placeholder="Titel des Symbols"
        required
      />
      <label htmlFor="type">Typ</label>
      <select
        id="type"
        value={type}
        onChange={e => {
          setType(e.target.value);
          setChanges(true);
        }}
        required>
        <option value="Process">Prozess</option>
        <option value="TestFirstLoop">Kopfgesteuerte Schleife</option>
        <option value="TestLastLoop">Fußgesteuerte Schleife</option>
      </select>
      <div className="SymbolForm__buttons">
        <button type="submit">{submitLabel}</button>
        <button disabled={!changes} type="reset">
          Reset
        </button>
      </div>
    </form>
  );
};

export default SymbolForm;
