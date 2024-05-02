import React, { useState } from "react";

const SidebarOptions = () => {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const options = [
      { id: 1, label: '인증번호 확인하기' },
      { id: 2, label: '-' },
      { id: 3, label: '문의하기' },
      { id: 4, label: '탈퇴하기' }
    ];
  
    const handleOptionClick = (id: number) => {
      setSelectedOption(id);
    };
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    };

    return (
      <div>
        {options.map(option => (
          <div
            key={option.id}
            onClick={() => handleOptionClick(option.id)}
          >
            {option.label}
          </div>
        ))}
        <div>
          <input
            type="text"
            placeholder="Search options..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
    );
};

export default SidebarOptions;
