'use client'

import { motion } from 'framer-motion'
import { Input, Box, Card } from '@mui/joy'
import { gas } from '@/server/api'
import { Suspense, useState } from 'react'
import Results from './results'
import Loading from './loading'

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
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#2B2D42',
          padding: '0 20px',
          '@media (max-width: 767px)': {
            padding: '0 10px',
          },
        }}
      >
        {status === 'idle' && (
          <Card
            sx={{
              width: '100%',
              '@media (min-width: 768px)': {
                width: '400px',
                padding: '0 20px',
              },
            }}
          >
            <motion.div
              whileHover={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}
            >
              <Input
                placeholder='Enter Wallet Address'
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyPress}
                sx={{
                  '@media (max-width: 767px)': {
              }
                }}
              />
            </motion.div>
          </Card>
        )}

        {status === 'success' && (
          <Suspense fallback={<Loading />}>
            <Results output={output} />
          </Suspense>
        )}
      </Box>
    </main>
  )
}