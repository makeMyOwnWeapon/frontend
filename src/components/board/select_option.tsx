import React, {useState} from "react";
import {SidebarContainer, Option} from '../../styles/MainStyles'

const SidebarOptions = () => {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
  
    const options = [
      { id: 1, label: 'Option 1' },
      { id: 2, label: 'Option 2' },
      { id: 3, label: 'Option 3' },
      { id: 4, label: 'Option 4' }
    ];
  
    const handleOptionClick = (id: number) => {
      setSelectedOption(id);
    };
  
    return (
      <SidebarContainer>
        {options.map(option => (
          <Option
            key={option.id}
            onClick={() => handleOptionClick(option.id)}
            style={{ backgroundColor: selectedOption === option.id ? '#ccc' : 'transparent' }}
          >
            {option.label}
          </Option>
        ))}
      </SidebarContainer>
    );
  };
  
  export default SidebarOptions;