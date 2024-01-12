import React from 'react'

const Footer = () => {
  return (
    <footer>
        <div
            style={{
                width: '100%',
                padding: 20,
                minHeight: '20vh',
                maxHeight: '30vh',
                marginTop: 60
            }}
        >
            <p
                style={{
                    fontSize: '30px',
                    textAlign: 'center'
                }}
            >
                GPT-3.5-TURBO 🤖
            </p>
        </div>
    </footer>
  )
}

export default Footer