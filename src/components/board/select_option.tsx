import React, {useState} from "react";
import { Option, SidebarBackGround } from "../../styles/WorkBook";
import { SidebarContainer } from "../../styles/WorkBook";
import { Input } from "../../styles/Public";

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
      <SidebarContainer>
        <SidebarBackGround>
        {options.map(option => (
          <Option
            key={option.id}
            onClick={() => handleOptionClick(option.id)}
            style={{ backgroundColor: selectedOption === option.id ? '#ccc' : 'transparent' }}
          >
            {option.label}
          </Option>
        ))}

        <div style={{ display: 'flex', margin: '10px', padding: '5px' }}>
          <Input
            type="text"
            placeholder="Search options..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ flexGrow: 1, marginRight: '10px' }}
          />

        </div>
        </SidebarBackGround>
      </SidebarContainer>
    );
  };
  
  export default SidebarOptions;