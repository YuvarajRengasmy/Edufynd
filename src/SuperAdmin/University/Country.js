import React, { useState } from 'react';

function AppendText() {
  // State to hold the current input and the appended text
  const [inputText, setInputText] = useState("");
  const [appendedText, setAppendedText] = useState("");

  // Function to handle input change
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // Function to append text when the button is clicked
  const handleAppendText = () => {
    if (inputText.trim()) {
      setAppendedText((prevText) => prevText + " " + inputText);
      setInputText(""); // Clear the input field after appending
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Append Text Example</h2>
      
      {/* Input field */}
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter text"
        style={{ padding: '5px', marginRight: '10px' }}
      />
      
      {/* Button to append text */}
      <button onClick={handleAppendText} style={{ padding: '5px 10px' }}>
        Append Text
      </button>
      
      {/* Display the appended text */}
      <div style={{ marginTop: '20px' }}>
        <h3>Appended Text:</h3>
        <p>{appendedText}</p>
      </div>
    </div>
  );
}

export default AppendText;
