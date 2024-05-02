import React from "react";

interface Item {
  id: number;
  name: string;
}

interface ListComponentProps {
  items: Item[];
  onItemSelect: (item: Item) => void;
}

const ListComponent: React.FC<ListComponentProps> = ({ items, onItemSelect }) => {

  return (
    <ul>
      {items.map(item => (
        <li key={item.id} onClick={() => onItemSelect(item)}>
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default ListComponent;
