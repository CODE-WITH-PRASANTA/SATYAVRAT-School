import React, { useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import "./AccordionSection.css";

const AccordionSection = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);

  return (
    <div className={`AccordionSection ${open ? "AccordionSection--open" : ""}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="AccordionSection__header"
      >
        <span className="AccordionSection__title">{title}</span>

        <span
          className={`AccordionSection__icon ${
            open ? "AccordionSection__icon--rotate" : ""
          }`}
        >
          <FiChevronDown />
        </span>
      </button>

      <div
        ref={contentRef}
        className={`AccordionSection__content ${
          open ? "AccordionSection__content--open" : ""
        }`}
        style={{
          maxHeight: open ? `${contentRef.current?.scrollHeight || 0}px` : "0px",
        }}
      >
        <div className="AccordionSection__body">{children}</div>
      </div>
    </div>
  );
};

export default AccordionSection;