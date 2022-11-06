import React, { useState, SetStateAction, useEffect } from 'react';
import Switch from 'react-input-switch';
import './App.css';

function App() {
  const [value, setValue] = useState<string>('null')

  const handleChange = (value: SetStateAction<string>) => {
    chrome.storage.sync.set({ enable: value }, () => {
      setValue(value)
    });
  }

  useEffect(() => {
    chrome.storage.sync.get(['enable'], (data) => {
      setValue(data.enable)
    });
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        {value !== 'null' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label>Toggle event listener</label>
            <Switch
              on="yes"
              off="no"
              name="switch-chrome-extension"
              value={value}
              onChange={(value: SetStateAction<string>) => handleChange(value)}
              styles={{
                track: {
                  borderRadius: '50px',
                },
                trackChecked: {
                  borderRadius: '50px',
                },
                button: {
                  borderRadius: '50px',
                  width: '36px',
                },
                buttonChecked: {
                  borderRadius: '50px',
                  width: '36px',
                  inset: '2px 2px 2px 34px',
                },
                container: {
                  width: '72px',
                  height: '36px',
                },
              }}
            />
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
