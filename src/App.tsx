import React, { useState, SetStateAction, useEffect } from 'react';
import Switch from 'react-input-switch';
import './App.css';

function App() {
  const [value, setValue] = useState<string>('no')

  const onChange = (value: SetStateAction<string>) => {
    chrome.storage.local.set({ enable: value }, () => {
      setValue(value)
    });
  }

  useEffect(() => {
    chrome.storage.local.get('enable', (data) => {
      setValue(data.enable)
    });
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <Switch
          on="yes"
          off="no"
          name="switch-chrome-extension"
          value={value}
          onChange={(value: SetStateAction<string>) => onChange(value)}
          styles={{
            track: (checked: boolean) => ({
              backgroundColor: checked ? 'red' : 'blue'
            }),
            button: (checked: boolean) => ({
              backgroundColor: checked ? 'blue' : 'yellow'
            })
          }}
        />
      </header>
    </div>
  );
}

export default App;
