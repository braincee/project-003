'use client'

import { motion } from 'framer-motion'
import { Input, Box, Card, Typography, Chip, Grid } from '@mui/joy'
import { gas } from '@/server/api'
import { useState } from 'react'
import truncateEthAddress from 'truncate-eth-address'

export default function Home() {
  const [inputValue, setInputValue] = useState<string>('')
  const [output, setOutput] = useState<any>(null)

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
      await handleSubmit()
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
        marginTop: '10px',
        '@media (min-width: 768px)': {
          height: '30vh',
        },
        '@media (max-width: 768px)': {
            marginTop: '50px',
        },
      }}
    >
      <Card
        sx={{
          display: 'flex',
          justifyContent: 'center',
          '@media (min-width: 768px)': {
            width: '400px',
          },
          backgroundColor: '#f5f5f5',
          marginBottom: '20px',
          padding: '10px',
          borderRadius: '8px',
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
      <Grid container spacing={2}
      >
        {output && (
          <>
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  mt: 2,
                  p: 2,
                  textAlign: 'center',
                  backgroundColor: '#e57373',
                  width: '100%',
                  '@media (max-width: 767px)': {
                    width: '80%',
                    margin: '0 auto',
                },
                }}
              >
                <Typography variant='body1'>
                  Transaction Count: {output.txCount}
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  mt: 2,
                  p: 2,
                  textAlign: 'center',
                  backgroundColor: '#e57373',
                  width: '100%',
                  '@media (max-width: 767px)': {
                  width: '80%',
                  margin: '0 auto',
                },
                }}
              >
                <Typography variant='body1'>Gas Used: {output.gasUsed}</Typography>
              </Card>
            </Grid>
            {output.allMinersUnique ? (
              <>
                <Grid item xs={12} md={6}>
                  <Card
                    sx={{
                      mt: 2,
                      p: 2,
                      textAlign: 'center',
                      backgroundColor: '#64b5f6',
                      width: '100%',
                     '@media (max-width: 767px)': {
                        width: '80%',
                        margin: '0 auto',
                },
                    }}
                  >
                    <Typography variant='body1'>
                      Top Miner (Transactions): {truncateEthAddress(output.topMinerTxs)}
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card
                    sx={{
                      mt: 2,
                      p: 2,
                      textAlign: 'center',
                      backgroundColor: '#ffb74d',
                      width: '100%',
                '@media (max-width: 767px)': {
                  width: '80%',
                  margin: '0 auto',
                },
                    }}
                  >
                    <Typography variant='body1'>
                      Top Miner Paid: {truncateEthAddress(output.topMinerPaid)}
                    </Typography>
                  </Card>
                </Grid>
              </>
            ) : (
              <Grid item xs={12}>
                <Card
                  sx={{
                    mt: 2,
                    p: 2,
                    textAlign: 'center',
                    backgroundColor: '#ffb74d',
                    width: '100%',
                '@media (max-width: 767px)': {
                  width: '80%',
                  margin: '0 auto',
                },
                  }}
                >
                  <Typography variant='body1'>
                    Top Miner Paid: {truncateEthAddress(output.topMinerPaid)}
                  </Typography>
                </Card>
              </Grid>
            )}
            <Grid item xs={12}>
              <Card
                sx={{
                  mt: 2,
                  p: 2,
                  textAlign: 'center',
                  backgroundColor: '#b2dfdb',
                  width: '100%',
                '@media (max-width: 767px)': {
                  width: '80%',
                  margin: '0 auto',
                },
                }}
              >
                <Typography variant='body1'>
                  Top Transaction: {truncateEthAddress(output.topTransaction?.tx_hash)}
                </Typography>
              </Card>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  </main>
  )
}
