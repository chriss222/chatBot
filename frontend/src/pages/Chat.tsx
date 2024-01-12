import React, { useLayoutEffect, useRef, useState } from 'react'
import { Avatar, Box, Typography, Button, IconButton } from '@mui/material'
import { useAuth } from '../context/AuthContext'
import { red } from '@mui/material/colors';
import ChatBox from '../components/chat/ChatBox';
import { IoMdSend } from 'react-icons/io';
import { getUserChats, sendChatRequest } from '../helpers/api-communicator';
import toast from 'react-hot-toast';

type Message = {
  role: "user" | "assistant",
  content: string
}

const Chat = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true);
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = {
      role: "user",
      content
    }
    setChatMessages((prev) => [...prev, newMessage]);
    const chatData = await sendChatRequest(content);
    setLoading(false);
    setChatMessages([...chatData.chats]);
  }

  const handleDelete = async () => {
    
  }

  useLayoutEffect(() => {
    if (auth?.isLogged && auth.user) {
      toast.loading("Loading chats", { id: "loadChats" });
      getUserChats().then((data) => {
        setChatMessages([...data.chats]);
        toast.success("Success", { id: "loadChats" });
      }).catch(error => {
        console.log(error);
        toast.error("Failed to load chats", { id: "loadChats" })
      })
    }
  }, [auth])

  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        width: '100%',
        height: '100%',
        mt: 3,
        gap: 3
      }}
    >
      <Box
        sx={{
          display: { md: 'flex', xs: 'none', sm: 'none' },
          flex: 0.2,
          flexDirection: 'column'
        }}
      >
        <Box 
          sx={{
            display: 'flex', 
            width: '100%', 
            height: '60vh', 
            bgcolor: 'rgb(17, 29, 39)',
            borderRadius: 5,
            flexDirection: 'column',
            mx: 3
          }}
          >
            <Avatar
              sx={{
                mx: 'auto',
                my: 2,
                bgcolor: 'white',
                color: 'black',
                fontWeight: 700
              }}
            >
              {auth?.user?.name[0]}
              {auth?.user?.name.split("")[1][0]}
            </Avatar>
            <Typography
              sx={{
                mx: 'auto',
                fontFamily: 'work sans',
                my: 4,
                p: 3
              }}
            >
              You are talking to a  ChatBOT
            </Typography>
            <Typography
              sx={{
                mx: 'auto',
                fontFamily: 'work sans',
                my: 4,
                p: 3
              }}
            >
              You can ask questions related to Knowlegdge, Business, Adices, Education etc. But avoid sharing personal information
            </Typography>
            <Button
              sx={{
                width: '200px',
                my: 'auto',
                color: 'white',
                fontWeight: '700',
                borderRadius: 3,
                mx: 'auto',
                bgcolor: red[300],
                ":hover": {
                  bgcolor: red.A400
                }
              }}
            >
              Clear Chat
            </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: 'column',
          px: 3
        }}
      >
        <Typography 
          sx={{
            textAlign: 'center',
            fontSize: '40px',
            color: 'white',
            mb: 2,
            mx: 'auto'
          }}
        >
          GPT 3.5 - Turbo
        </Typography>
        <Box
          sx={{
            width: '100%',
            height: '60vh',
            borderRadius: 3,
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'scroll',
            overflowX: 'hidden',
            scrollBehavior: 'smooth'
          }}
        >
          {chatMessages.map((chat, i) => (
            <ChatBox 
              key={i}
              content={chat?.content}
              role={chat?.role}
            />
          ))}
          {
            loading && (
              <Typography
                sx={{
                  mx: 'auto',
                  fontFamily: 'work sans',
                  my: 4,
                  p: 3
                }}
              >
                Getting your response...
              </Typography>
            )
          }
        </Box>
        <div 
          style={{
            width: '100%',
            padding: '20px',
            borderRadius: '8px',
            backgroundColor: 'rgb(17, 27, 39)',
            display: 'flex',
            marginRight: 'auto'
          }}
        >
          <input 
            type="text" 
            style={{
              width: '100%',
              backgroundColor: 'transparent',
              padding: '10px',
              border: 'none',
              outline: 'none',
              color: 'white',
              fontSize: '20px'
            }}
            ref={inputRef}
          />
          <IconButton 
            sx={{
              ml: 'auto',
              color: 'white'
            }}
            onClick={handleSubmit}
          >
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  )
}

export default Chat