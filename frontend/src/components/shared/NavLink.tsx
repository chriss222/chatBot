import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
    to: string;
    bg: string;
    text: string;
    textColor: string;
    onClick?: () => Promise<void>;
}

const NavLink = ({ 
    to, 
    bg, 
    text, 
    textColor, 
    onClick 
}: Props) => {
    return (
        <Link 
            className='navlink'
            to={to}
            style={{
                background: bg,
                color: textColor
            }}
            onClick={onClick}
        >
            {text}
        </Link>
    )
}

export default NavLink