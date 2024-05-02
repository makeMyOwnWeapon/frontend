import React, {useState} from "react";
import styles from "../../styles/SidebarOptions.module.css";

interface OptionItem {
  id: number;
  label: string;
}

const SidebarOptions = () => {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const options = [
      { id: 1, label: 'Option 1' },
      { id: 2, label: 'Option 2' },
      { id: 3, label: 'Option 3' },
      { id: 4, label: 'Option 4' }
    ];
  
    const handleOptionClick = (id: number) => {
      setSelectedOption(id);
    };
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    };

    return (
      <div className={styles.sidebarContainer}>
        <div className={styles.sidebarBackground}>
        {options.map(option => (
          <div
            key={option.id}
            className={`${styles.option} ${selectedOption === option.id ? styles.optionActive : ''}`}
            onClick={() => handleOptionClick(option.id)}
          >
            {option.label}
          </div>
        ))}
        <div style={{ display: 'flex', margin: '10px', padding: '5px' }}>
          <input
            className={styles.input}
            type="text"
            placeholder="Search options..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        </div>
      </div>
    );
  };
  
  export default SidebarOptions;
