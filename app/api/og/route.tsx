import {NextResponse} from 'next/server'
import axios from 'axios'

export const runtime = 'edge'

export const GET = async () => {
  try {
    const imageUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/hero.webp`
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
    })

    return new NextResponse(response.data, {
      headers: {
        'Content-Type': 'image/webp',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error('Error fetching OG image:', error)
    return new NextResponse('Image not found', {status: 404})
  }
}
