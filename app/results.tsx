import { Box, Card, Grid, Typography, Stack } from '@mui/joy'
import truncateEthAddress from 'truncate-eth-address'
import Confetti from 'react-confetti'
import { useState, useEffect } from 'react';


export  default async function Results({ output }: { output: any }) {
  const [isConfettiActive, setIsConfettiActive] = useState(false);

  useEffect(() => {
    if (output) {
      setIsConfettiActive(true);

      setTimeout(() => {
        setIsConfettiActive(false);
      }, 10000);
    }
  }, [output]);
  
  return (
    <Box>
       {isConfettiActive && <Confetti />} 
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
              Transaction Count: {output.txCount}
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
            <Typography level='title-lg'>Gas Used: {output.gasUsed}</Typography>
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
                marginTop: '10px'
              },
            }}
          >
            <Typography level='title-lg'>
              Top Transaction:{' '}
              {truncateEthAddress(output.topTransaction?.tx_hash)}
            </Typography>
          </Card>
        </Grid>
        </Grid>
        </Grid>
        {output.allMinersUnique ? (
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
                  {truncateEthAddress(output.topMinerTxs)}
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
                  Top Miner Paid: {truncateEthAddress(output.topMinerPaid)}
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
                Top Miner Paid: {truncateEthAddress(output.topMinerPaid)}
              </Typography>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}
