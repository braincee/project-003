import { Box, Card, Grid, Typography, Stack } from '@mui/joy'
import truncateEthAddress from 'truncate-eth-address'

export default async function Results({ output }: { output: any }) {
  await new Promise((resolve) => setTimeout(resolve, 3000))
  return (
    <Box>
      <Stack sx={{ display: 'flex', alignItems: 'center' }}>
        <video width='480' height='480' autoPlay loop playsInline>
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
              backgroundColor: '#e57373',
              width: '100%',
              '@media (max-width: 767px)': {
                width: '80%',
                margin: '0 auto',
              },
            }}
          >
            <Typography level='h3'>
              Transaction Count: {output.txCount}
            </Typography>
          </Card>
        </Grid>
        <Grid xs={12} md={6}>
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
            <Typography level='h3'>Gas Used: {output.gasUsed}</Typography>
          </Card>
        </Grid>
        {output.allMinersUnique ? (
          <>
            <Grid xs={12} md={6}>
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
                <Typography level='h3'>
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
                  backgroundColor: '#ffb74d',
                  width: '100%',
                  '@media (max-width: 767px)': {
                    width: '80%',
                    margin: '0 auto',
                  },
                }}
              >
                <Typography level='h3'>
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
                backgroundColor: '#ffb74d',
                width: '100%',
                '@media (max-width: 767px)': {
                  width: '80%',
                  margin: '0 auto',
                },
              }}
            >
              <Typography level='h3'>
                Top Miner Paid: {truncateEthAddress(output.topMinerPaid)}
              </Typography>
            </Card>
          </Grid>
        )}
        <Grid xs={12}>
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
            <Typography level='h3'>
              Top Transaction:{' '}
              {truncateEthAddress(output.topTransaction?.tx_hash)}
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
