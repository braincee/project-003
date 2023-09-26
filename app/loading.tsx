'use client'
import { Box, LinearProgress, Stack } from '@mui/joy'

import Message from './message'

export default function Loading() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        px: { md: 10, xs: 2 },
        height: '100vh',
        width: '100%',
      }}
    >
      <Stack sx={{ textAlign: 'center' }}>
        <LinearProgress size='lg' thickness={20} color='primary'>
          Loading ...
        </LinearProgress>
        <Message />
      </Stack>
    </Box>
  )
}
