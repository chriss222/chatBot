import React, { useEffect } from 'react'
import { Box, Typography, Button } from '@mui/material'
import CustomInput from '../components/shared/CustomInput'
import { IoIosLogIn } from 'react-icons/io'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.user) {
      return navigate("/chat")
    }
  }, [auth])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    try {
      toast.loading("Signing In", { id: "1" });
      await auth?.login(email, password);
      toast.success("Signed in Successfully", { id: "1" })
    } catch (error) {
      console.log(error);
      toast.success("Sign in Failed", { id: "1" })
    }
  }

  return (
    <Box
      width={'100%'}
      height={'100%'}
      display={'flex'}
      flex={1}
    >
      <Box 
        padding={8} 
        mt={8} 
        display={{
          md:'flex', 
          sm: 'none', 
          xs: 'none'
        }}
      >
        <img src="airobot.png" alt="Robot" width={"400px"} />
      </Box>
      <Box
        display={'flex'}
        flex={{
          xs: 1,
          md: 0.5
        }}
        justifyContent={'center'}
        alignItems={'center'}
        padding={2}
        ml={'auto'}
        mt={16}
      >
        <form
          style={{
            margin: 'auto',
            padding: '30px',
            boxShadow: '10px 10px 20px #000',
            borderRadius: '10px',
            border: 'none'
          }}
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
        >
          <Box
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
          >
            <Typography 
              variant='h4'
              padding={2}
              textAlign={'center'}
              fontWeight={600} 
            >
              Login
            </Typography>
            <CustomInput type='email' name='email' label='email' />
            <CustomInput type='password' name='password' label='password' />
            <Button 
              type='submit'
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: '400px',
                borderRadius: 2,
                bgcolor: '#00fffc',
                ":hover": {
                  bgcolor:'white',
                  color: 'black'
                }
              }}
              endIcon={<IoIosLogIn />}
            >
              Login  
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default Login