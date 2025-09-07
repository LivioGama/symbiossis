import {ImageResponse} from 'next/og'

export const runtime = 'edge'

export const GET = async () =>
  new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          backgroundColor: '#0A0A1A',
          backgroundImage:
            'radial-gradient(circle at 15% 50%, rgba(103, 84, 240, 0.08), transparent 25%), radial-gradient(circle at 85% 30%, rgba(87, 94, 255, 0.08), transparent 25%)',
        }}>
        <div
          style={{
            fontSize: 72,
            position: 'relative',
            zIndex: 1,
            color: 'white',
            fontWeight: 700,
          }}>
          Symbiossis
        </div>
        <div
          style={{
            fontSize: 28,
            position: 'relative',
            zIndex: 1,
            marginTop: 24,
            color: '#FAFAFA',
            fontWeight: 500,
          }}>
          Your tailor-made digital &quot;psychologist&quot;
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
