// Initial form of the dropdown menu
//It is functional and all but doesn't have the inteneded behavoir due to picker select

import React, { useState } from 'react';
import { View, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const DropdownComponent = ({ options, onSelectOption }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSelect = (option) => {
    setSelectedOption(option);
    onSelectOption(option);
  };

  return (
    <View>
      <RNPickerSelect
        onValueChange={(value) => handleSelect(value)}
        items={options.map((option) => ({ label: option, value: option }))}
        value={selectedOption}
      />
    </View>
  );
};

export default DropdownComponent;