'use client'
import { gas } from '@/server/api'
import { Button } from '@mui/joy'


export default function Home() {

  return (
    <main>
      Hello

      <Button onClick={async () => {
        const output = await gas('0xe3e7a2bf703cbbb3d250b61dfd0804e5492dbf61')
        
        console.log(output)


      }}>Gas</Button>
     
    </main>
  )
}
