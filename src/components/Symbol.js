import React from "react";

const Symbol = ({ id, title, type, editSymbol, removeSymbol }) => {
  return (
    <div className={"Symbol Symbol--" + type}>
      <div className="Symbol__header">
        <span className="Symbol__title">{title}</span>
        <div className="Symbol__buttons">
          <button
            className="Symbol__button Symbol__button--edit"
            onClick={() =>
              editSymbol(id, { id: id, title: "neuer Titel", type: type })
            }
          >
            <span role="img" aria-label={`remove Symbol titled '${title}'`}>
              🖋️
            </span>
          </button>
          <button
            className="Symbol__button Symbol__button--delete"
            onClick={() => removeSymbol(id)}
          >
            <span role="img" aria-label={`remove Symbol titled '${title}'`}>
              🗑️
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Symbol;
