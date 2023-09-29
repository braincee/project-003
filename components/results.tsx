import { Box, Card, Grid, Typography, Stack } from '@mui/joy'
import truncateEthAddress from 'truncate-eth-address'
//! canvas-confetti is the right package to use https://github.com/catdad/canvas-confetti
// import Confetti from 'react-confetti'
import confetti from 'canvas-confetti'
import { useState, useEffect } from 'react'

interface OutputProps {
  txCount: number
  topTransaction: {
    tx_hash: string | undefined
  }
  topMinerPaid: string
  topMinerTxs: string
  gasBurned: string
  uniqueMiners: string[]
  allMinersUnique: boolean
}

export default async function Results({
  output,
}: {
  output: OutputProps | undefined
}) {
  const defaults = {
    spread: 360,
    ticks: 50,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    shapes: ['star'],
    colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8'],
  }

  useEffect(() => {
    if (output) {
      setTimeout(() => {
        confetti({
          ...defaults,
          particleCount: 40,
          scalar: 1.2,
          shapes: ['star'],
        })
        confetti({
          ...defaults,
          particleCount: 50,
          scalar: 1.75,
          shapes: ['circle'],
        })
      }, 500)
    }
  }, [output])

  console.log(output)
  return (
    <Box>
      <Stack sx={{ display: 'flex', alignItems: 'center' }}>
        <video width='200' height='200' autoPlay loop playsInline>
          <source src='/bat-480.mov' type='video/mp4; codecs=hvc1' />
          <source src='/bat-480.webm' type='video/webm' />
        </video>
      </Stack>
      <Grid container spacing={2}>
        <Grid xs={12} md={6}>
          <Card
            sx={{
              mt: 2,
              p: 2,
              textAlign: 'center',
              backgroundColor: '#92DCE5',
              width: '100%',
              height: '120px',
              '@media (max-width: 767px)': {
                width: '80%',
                margin: '0 auto',
              },
            }}
          >
            <Typography level='title-lg'>
              Transaction Count: {output?.txCount}
            </Typography>
          </Card>
        </Grid>
        <Grid xs={12} md={6} spacing={2}>
          <Grid>
            <Card
              sx={{
                mt: 2,
                p: 2,
                textAlign: 'center',
                backgroundColor: '#F8F7F9',
                width: '100%',
                height: '60px',
                '@media (max-width: 767px)': {
                  width: '80%',
                  margin: '0 auto',
                },
              }}
            >
              <Typography level='title-lg'>
                Gas Used: {output?.gasBurned}
              </Typography>
            </Card>
            <Grid>
              <Card
                sx={{
                  mt: 2,
                  p: 2,
                  textAlign: 'center',
                  backgroundColor: '#49D49D',
                  width: '100%',
                  '@media (max-width: 767px)': {
                    width: '80%',
                    margin: '0 auto',
                    marginTop: '10px',
                  },
                }}
              >
                <Typography level='title-lg'>
                  Top Transaction:{' '}
                  {output?.topTransaction?.tx_hash &&
                    truncateEthAddress(output.topTransaction?.tx_hash)}
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        {output?.allMinersUnique ? (
          <>
            <Grid xs={12} md={6}>
              <Card
                sx={{
                  mt: 2,
                  p: 2,
                  textAlign: 'center',
                  backgroundColor: '#F7EC59',
                  width: '100%',
                  height: '70px',
                  '@media (max-width: 767px)': {
                    width: '80%',
                    margin: '0 auto',
                  },
                }}
              >
                <Typography level='title-lg'>
                  Top Miner (Transactions):{' '}
                  {truncateEthAddress(output?.topMinerTxs)}
                </Typography>
              </Card>
            </Grid>
            <Grid xs={12} md={6}>
              <Card
                sx={{
                  mt: 2,
                  p: 2,
                  textAlign: 'center',
                  backgroundColor: '#F7EC59',
                  width: '100%',
                  height: '60px',
                  '@media (max-width: 767px)': {
                    width: '80%',
                    margin: '0 auto',
                  },
                }}
              >
                <Typography level='title-md'>
                  Top Miner Paid: {truncateEthAddress(output?.topMinerPaid)}
                </Typography>
              </Card>
            </Grid>
          </>
        ) : (
          <Grid xs={12}>
            <Card
              sx={{
                mt: 2,
                p: 2,
                textAlign: 'center',
                backgroundColor: '#F7EC59',
                width: '100%',
                '@media (max-width: 767px)': {
                  width: '80%',
                  margin: '0 auto',
                },
              }}
            >
              <Typography level='title-md'>
                Top Miner Paid:{' '}
                {output?.topMinerPaid &&
                  truncateEthAddress(output.topMinerPaid)}
              </Typography>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}
