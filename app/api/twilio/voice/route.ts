import { NextResponse } from 'next/server'
import Twilio from 'twilio'

// This endpoint returns TwiML instructions when Twilio connects a call
export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const to = formData.get('To') as string || ''
    const callerId = process.env.TWILIO_CALLER_ID || process.env.TWILIO_PHONE_NUMBER || ''

    const VoiceResponse = Twilio.twiml.VoiceResponse
    const twiml = new VoiceResponse()

    if (to) {
      // Format number: ensure it has + prefix for international
      const formattedNumber = to.startsWith('+') ? to : `+${to}`
      
      const dial = twiml.dial({
        callerId: callerId,
        answerOnBridge: true,
        timeout: 30
      })
      
      dial.number(formattedNumber)
    } else {
      twiml.say('No destination number provided.')
    }

    return new NextResponse(twiml.toString(), {
      headers: {
        'Content-Type': 'text/xml'
      }
    })
  } catch (err: any) {
    const VoiceResponse = Twilio.twiml.VoiceResponse
    const twiml = new VoiceResponse()
    twiml.say('An error occurred processing your call.')
    
    return new NextResponse(twiml.toString(), {
      headers: {
        'Content-Type': 'text/xml'
      }
    })
  }
}

// Also handle GET for TwiML App configuration testing
export async function GET() {
  const VoiceResponse = Twilio.twiml.VoiceResponse
  const twiml = new VoiceResponse()
  twiml.say('Voice webhook is working.')
  
  return new NextResponse(twiml.toString(), {
    headers: {
      'Content-Type': 'text/xml'
    }
  })
}
