import { NextResponse } from 'next/server'
import Twilio from 'twilio'

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({})) as any
    const to = body?.to || ''

    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const apiKey = process.env.TWILIO_API_KEY
    const apiSecret = process.env.TWILIO_API_SECRET
    const twimlAppSid = process.env.TWILIO_TWIML_APP_SID || undefined

    if (!accountSid || !apiKey || !apiSecret) {
      return NextResponse.json({ ok: false, error: 'Missing TWILIO_ACCOUNT_SID / TWILIO_API_KEY / TWILIO_API_SECRET env vars' }, { status: 500 })
    }

    const AccessToken = Twilio.jwt.AccessToken
    const VoiceGrant = AccessToken.VoiceGrant

    const identity = `web-user-${Math.random().toString(36).slice(2, 9)}`

    const token = new AccessToken(accountSid, apiKey, apiSecret)
    token.identity = identity

    const voiceGrant = new VoiceGrant({
      outgoing: twimlAppSid ? { applicationSid: twimlAppSid } : undefined,
      incoming: true
    })

    token.addGrant(voiceGrant)

    const jwt = token.toJwt()

    return NextResponse.json({ ok: true, token: jwt, identity, to })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || String(err) }, { status: 500 })
  }
}
