import { useState } from 'react';

import { TextField, CircularProgress } from '@mui/material';

// eslint-disable-next-line react/prop-types
const InputBox = ({ sendMessage, loading }) => {
  const [input, setInput] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && input.trim() !== '') {
      sendMessage(input);
      setInput('');
    }
  };

  return (
    <div style={{ width: '100%' }}>
      {loading && <CircularProgress sx={{ marginBottom: 1 }} />}
      <TextField
        fullWidth
        label="Type a message..."
        value={input}
        onChange={(event) => setInput(event.target.value)}
        onKeyDown={handleKeyPress}
        disabled={loading}
      />
    </div>
  );
};

export default InputBox;
