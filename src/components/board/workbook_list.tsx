import React from "react";
import styles from "../../styles/ListComponent.module.css";
interface Item{
    id: number;
    name: string;
}

interface ListComponentProps {
    items: Item[];
    onItemSelect: (item: Item) => void;
}

const ListComponent: React.FC<ListComponentProps> = ({ items, onItemSelect }) => {
    return (
      <ul className={styles.listContainer}>
        {items.map(item => (
          <li key={item.id} className={styles.listItem} onClick={() => onItemSelect(item)}>
            {item.name}
          </li>
        ))}
      </ul>
    );
};

export default ListComponent;
