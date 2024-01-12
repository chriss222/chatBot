import { Box, Avatar, Typography } from '@mui/material'
import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    const blocks = message.split("```");
    console.log(blocks)
    return blocks;
  }
}

function isCodeBlock(str: string) {
  if (
    str.includes("=") || 
    str.includes(";") || 
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("#") ||
    str.includes("/")
  ) {
    return true
  }
  return false
}

const ChatBox = ({ 
  content, 
  role 
}: { 
  content: string, 
  role: "user" | "assistant" 
}) => {
  const auth = useAuth();
  const messageBlocks = extractCodeFromString(content);

  return (
    role === "assistant" ? (
      <Box
        sx={{
          display: 'flex',
          p: 2,
          bgcolor: '#004d5612',
          my: 2,
          gap: 2
        }}
      >
        <Avatar sx={{ ml: '0' }}>
          <img src="openai.png" alt="openai" width={"30px"} />
        </Avatar>
        <Box>
          {
            !messageBlocks && (
              <Typography sx={{ fontSize: '20px' }}>
                {content}
              </Typography>
            )
          }
          {
            messageBlocks && messageBlocks?.length && messageBlocks.map((block) => (
              isCodeBlock(block) ? (
                <SyntaxHighlighter style={coldarkDark}>
                  {block}
                </SyntaxHighlighter>
              ) : (
                <Typography sx={{ fontSize: '20px' }}>
                  {block}
                </Typography>
              )
            ))
          }
        </Box>
      </Box>
    ) : (
      <Box
        sx={{
          display: 'flex',
          p: 2,
          bgcolor: '#004d56',
          gap: 2
        }}
      >
        <Avatar sx={{ ml: '0', bgcolor: 'black', color: 'white' }}>
          {auth?.user?.name[0]}
          {auth?.user?.name.split("")[1][0]}
        </Avatar>
        <Box>
          <Typography fontSize={"20px"}>
            {content}
          </Typography>
        </Box>
      </Box>
    )
  )
}

export default ChatBox