import React from "react";

interface Props<T> {
  items: T[];
  heading: string;
  onSelectItem: (item: T) => void;
  disabled?: boolean;
}

const DropDown = <T extends string>({
  items,
  heading,
  onSelectItem,
  disabled,
}: Props<T>) => {
  return (
    <div className="dropdown">
      <button
        className="btn btn-success dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        disabled={disabled}
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
