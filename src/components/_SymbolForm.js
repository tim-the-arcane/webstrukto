import React, { useState, useEffect } from "react";

const SymbolForm = ({ symbol, submitLabel, submitHandler }) => {
  const [title, setTitle] = useState(symbol.title);
  const [type, setType] = useState(symbol.type || "Process");
  const [id, setId] = useState(symbol.id);

  useEffect(() => {
    setTitle(symbol.title);
    setType(symbol.type);
    setId(symbol.id);
  }, [symbol]);

  return (
    <form
      onReset={(e) => {
        e.preventDefault();
        setTitle(symbol.title);
        setType(symbol.type);
      }}
      onSubmit={(e) => {
        e.preventDefault();
        submitHandler({ id: id, title: title, type: type });
      }}
    >
      <label htmlFor="title">Titel</label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="type">Typ</label>
      <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
        <option value="Process">Prozess</option>
        <option value="TestFirstLoop">Kopfgesteuerte Schleife</option>
        <option value="TestLastLoop">Fußgesteuerte Schleife</option>
      </select>
      <button type="submit">{submitLabel}</button>
      <button type="reset">Reset</button>
    </form>
  );
};

export default SymbolForm;
