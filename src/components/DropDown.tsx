import React from "react";

interface Props<T> {
  items: T[];
  heading: string;
  onSelectItem: (item: T) => void;
}

const DropDown = <T extends string>({
  items,
  heading,
  onSelectItem,
}: Props<T>) => {
  return (
    <div className="dropdown">
      <button
        className="btn btn-success dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {heading}
      </button>
      <ul className="dropdown-menu">
        {items.map((item, index) => (
          <li key={index}>
            <button
              className="dropdown-item"
              onClick={() => onSelectItem(item)}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDown;
