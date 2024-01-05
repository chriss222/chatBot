import React from 'react'
import TextField from '@mui/material/TextField'

type Props = {
    name: string;
    type: string;
    label: string;
}

const CustomInput = ({ name, type, label }: Props) => {
  return (
    <TextField
        margin='normal' 
        InputLabelProps={{
            style: { color: 'white' }
        }}
        InputProps={{
            style: {
                width: '400px', 
                borderRadius: 10, 
                fontSize: 20, 
                color: 'white'
            }
        }}
        name={name} 
        label={label}
        type={type}
    />
  )
}

export default CustomInput