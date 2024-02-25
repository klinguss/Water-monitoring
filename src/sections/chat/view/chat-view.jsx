import dayjs from 'dayjs';
import MDEditor from '@uiw/react-md-editor';
import { useRef, useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

import { Stack, Container, Typography } from '@mui/material';

import InputBox from '../Inputbox';

const genAI = new GoogleGenerativeAI('AIzaSyAUxUTmEJwfqy5pgrwIc3IsvlFNMDPid6Q');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

const ChatWindow = () => {
  const chatContainerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Auto-scroll to the bottom of the chat container when new messages are added
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = async (inputText) => {
    if (!inputText) {
      return;
    }

    // Update messages with the user message
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: inputText, sender: 'user', timestamp: new Date() },
    ]);

    setLoading(true);

    try {
      const result = await model.generateContent(inputText);
      const text = result.response.text();

      // Check if the response is code before updating messages
      const isCode = text.includes('```');

      // Update messages with the AI response
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text,
          sender: 'ai',
          timestamp: new Date(),
          isCode, // Add a flag to identify code snippets
        },
      ]);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('generateContent error: ', error);
    }
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Chat</Typography>
      </Stack>
      <Stack spacing={3} sx={{ height: 1 }}>
        <div className="chat-container" ref={chatContainerRef}>
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender === 'user' ? 'user' : 'ai'}`}>
              {message.isCode ? (
                <MDEditor.Markdown source={message.text} style={{ whiteSpace: 'pre-wrap' }} />
              ) : (
                <>
                  <p className="message-text">{message.text}</p>
                  <span className={`time ${message.sender === 'user' ? 'user' : 'ai'}`}>
                    {message.timestamp
                      ? dayjs(message.timestamp).format('DD.MM.YYYY HH:mm:ss')
                      : ''}
                  </span>
                </>
              )}
            </div>
          ))}
        </div>
      </Stack>
      <Stack spacing={3} sx={{ height: 8 }}>
        <InputBox sendMessage={sendMessage} loading={loading} />
      </Stack>
    </Container>
  );
};

export default ChatWindow;
