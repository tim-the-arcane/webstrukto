import React from "react";

const Symbol = ({ title, type }) => {
  return (
    <div className={"Symbol Symbol--" + type}>
      <div className="Symbol__header">
        <span className="Symbol__title">{title}</span>
      </div>
    </div>
  );
};

export default Symbol;
