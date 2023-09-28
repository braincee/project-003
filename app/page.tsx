'use client'

import { motion } from 'framer-motion'
import { Input, Box, Card, Typography, Chip, Grid } from '@mui/joy'
import { gas } from '@/server/api'
import { useState } from 'react'

export default function Home() {
  const [inputValue, setInputValue] = useState<string>('')
  const [output, setOutput] = useState<any>(null)
  const [status, setStatus] = useState<string>('idle')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleSubmit = async () => {
    try {
      const result = await gas(inputValue)
      setOutput(result)
      console.log(result)
      setInputValue('')
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleInputKeyPress = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      setStatus('loading')
      await handleSubmit()
      setStatus('success')
    }
  }

  return (
    <main>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '60vh',
          '@media (max-width: 767px)': {
            px: 5,
          },
        }}
      >
        <Card
          sx={{
            width: '100%',
            '@media (min-width: 768px)': {
              width: '400px',
            },
          }}
        >
          <motion.div whileHover={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}>
            <Input
              placeholder='Enter Wallet Address'
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyPress}
            />
          </motion.div>
        </Card>
      </Box>
    </main>
  )
}