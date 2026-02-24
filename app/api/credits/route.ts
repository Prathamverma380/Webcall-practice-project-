import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// GET - Fetch user's current balance
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ ok: false, error: 'userId is required' }, { status: 400 })
    }

    // Try to get existing credits
    const { data, error } = await supabase
      .from('user_credits')
      .select('balance')
      .eq('user_id', userId)
      .single()

    if (error && error.code === 'PGRST116') {
      // No record found - create one with initial free credits
      const initialBalance = 1.00 // $1 free credits for new users
      
      const { data: newData, error: insertError } = await supabase
        .from('user_credits')
        .insert({ user_id: userId, balance: initialBalance })
        .select('balance')
        .single()

      if (insertError) {
        // If table doesn't exist, return mock balance
        console.log('Credits table may not exist:', insertError)
        return NextResponse.json({ ok: true, balance: initialBalance, isNew: true })
      }

      return NextResponse.json({ ok: true, balance: newData.balance, isNew: true })
    }

    if (error) {
      console.error('Error fetching credits:', error)
      return NextResponse.json({ ok: true, balance: 1.00 }) // Fallback
    }

    return NextResponse.json({ ok: true, balance: data.balance })
  } catch (err: any) {
    console.error('Credits API error:', err)
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 })
  }
}

// POST - Deduct credits after a call
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { userId, amount, callDuration, destination, rate } = body

    if (!userId || amount === undefined) {
      return NextResponse.json({ ok: false, error: 'userId and amount are required' }, { status: 400 })
    }

    // Get current balance
    const { data: currentData, error: fetchError } = await supabase
      .from('user_credits')
      .select('balance')
      .eq('user_id', userId)
      .single()

    if (fetchError) {
      // If no record or table doesn't exist, return success (demo mode)
      console.log('Credits fetch error:', fetchError)
      return NextResponse.json({ ok: true, newBalance: 1.00 - amount, deducted: amount })
    }

    const currentBalance = currentData.balance
    const newBalance = Math.max(0, currentBalance - amount)

    // Update balance
    const { error: updateError } = await supabase
      .from('user_credits')
      .update({ 
        balance: newBalance,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)

    if (updateError) {
      console.error('Error updating credits:', updateError)
      return NextResponse.json({ ok: true, newBalance, deducted: amount }) // Still return success for UX
    }

    // Log the call for history (optional - if call_history table exists)
    try {
      await supabase
        .from('call_history')
        .insert({
          user_id: userId,
          destination,
          duration_seconds: callDuration,
          rate_per_min: rate,
          cost: amount,
          created_at: new Date().toISOString()
        })
    } catch (e) {
      // Call history table might not exist - that's okay
    }

    return NextResponse.json({ ok: true, newBalance, deducted: amount })
  } catch (err: any) {
    console.error('Credits deduction error:', err)
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 })
  }
}
