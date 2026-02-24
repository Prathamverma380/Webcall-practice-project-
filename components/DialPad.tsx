'use client'

import { useEffect, useMemo, useState, useRef } from 'react'
import styled from 'styled-components'
import { FiPhone, FiPhoneOff, FiX, FiClock, FiMic, FiMicOff, FiDollarSign } from 'react-icons/fi'
import { Device, Call } from '@twilio/voice-sdk'
import COUNTRIES from '../lib/countries'
import { supabase } from '../lib/supabaseClient'

const Card = styled.div`
  border-radius: 16px;
  padding: 24px;
  width: 100%;
  max-width: 440px;
`;

const KEYS = [1,2,3,4,5,6,7,8,9,'*',0,'#']

export default function DialPad() {
  const [number, setNumber] = useState('')
  const [calling, setCalling] = useState(false)
  const [callStatus, setCallStatus] = useState<string>('')
  const [showHistory, setShowHistory] = useState(false)
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [balance, setBalance] = useState<number>(0)
  const [userId, setUserId] = useState<string | null>(null)
  const [callCost, setCallCost] = useState(0)
  
  const deviceRef = useRef<Device | null>(null)
  const activeCallRef = useRef<Call | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const callStartTimeRef = useRef<number>(0)

  const countries = useMemo(() => COUNTRIES, [])
  const selectedCountry = countries[selectedIdx]

  // Fetch user and balance
  useEffect(() => {
    const fetchUserAndBalance = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        setUserId(session.user.id)
        // Fetch balance
        try {
          const res = await fetch(`/api/credits?userId=${session.user.id}`)
          const data = await res.json()
          if (data.ok) {
            setBalance(data.balance)
          }
        } catch (e) {
          console.log('Could not fetch balance')
          setBalance(1.00) // Default
        }
      }
    }
    fetchUserAndBalance()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUserId(session.user.id)
        try {
          const res = await fetch(`/api/credits?userId=${session.user.id}`)
          const data = await res.json()
          if (data.ok) setBalance(data.balance)
        } catch (e) {
          setBalance(1.00)
        }
      } else {
        setUserId(null)
        setBalance(0)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (deviceRef.current) {
        deviceRef.current.destroy()
      }
    }
  }, [])

  function append(d: string) {
    setNumber((s) => s + d)
    // Send DTMF digit if on active call
    if (activeCallRef.current) {
      activeCallRef.current.sendDigits(String(d))
    }
  }
  
  function backspace() {
    setNumber((s) => s.slice(0, -1))
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const startCallTimer = () => {
    setCallDuration(0)
    setCallCost(0)
    callStartTimeRef.current = Date.now()
    timerRef.current = setInterval(() => {
      setCallDuration(prev => {
        const newDuration = prev + 1
        // Calculate cost in real-time
        const minutes = newDuration / 60
        const cost = minutes * selectedCountry.rate
        setCallCost(cost)
        return newDuration
      })
    }, 1000)
  }

  const stopCallTimer = async () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    
    // Deduct credits if call was connected
    if (callDuration > 0 && userId) {
      const minutes = callDuration / 60
      const cost = minutes * selectedCountry.rate
      
      try {
        const res = await fetch('/api/credits', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            amount: cost,
            callDuration,
            destination: selectedCountry.dial + number,
            rate: selectedCountry.rate
          })
        })
        const data = await res.json()
        if (data.ok) {
          setBalance(data.newBalance)
        }
      } catch (e) {
        console.log('Could not deduct credits')
      }
    }
  }

  async function startCall() {
    if (!number) return
    
    setCalling(true)
    setCallStatus('Connecting...')
    
    try {
      // Get Twilio token from our API
      const fullNumber = selectedCountry.dial + number
      const res = await fetch('/api/twilio/token', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ to: fullNumber }) 
      })
      const data = await res.json()
      
      if (!res.ok || !data.ok) {
        throw new Error(data?.error || 'Failed to get token')
      }

      // Initialize Twilio Device
      const device = new Device(data.token, {
        logLevel: 1,
        codecPreferences: [Call.Codec.Opus, Call.Codec.PCMU]
      })
      
      deviceRef.current = device

      // Wait for device to be ready
      await device.register()
      
      // Make the call
      const call = await device.connect({
        params: { To: fullNumber }
      })
      
      activeCallRef.current = call

      // Handle call events
      call.on('accept', () => {
        setCallStatus('Connected')
        startCallTimer()
      })

      call.on('ringing', () => {
        setCallStatus('Ringing...')
      })

      call.on('disconnect', () => {
        setCallStatus('Call ended')
        setCalling(false)
        stopCallTimer()
        activeCallRef.current = null
        setTimeout(() => setCallStatus(''), 2000)
      })

      call.on('cancel', () => {
        setCallStatus('Call cancelled')
        setCalling(false)
        stopCallTimer()
        activeCallRef.current = null
        setTimeout(() => setCallStatus(''), 2000)
      })

      call.on('error', (error) => {
        console.error('Call error:', error)
        setCallStatus(`Error: ${error.message}`)
        setCalling(false)
        stopCallTimer()
        activeCallRef.current = null
      })

    } catch (err: any) {
      console.error('Call setup error:', err)
      setCallStatus(`Failed: ${err.message}`)
      setCalling(false)
      setTimeout(() => setCallStatus(''), 3000)
    }
  }

  function endCall() {
    if (activeCallRef.current) {
      activeCallRef.current.disconnect()
    }
    if (deviceRef.current) {
      deviceRef.current.destroy()
      deviceRef.current = null
    }
    setCalling(false)
    stopCallTimer()
    setCallStatus('')
    setIsMuted(false)
  }

  function toggleMute() {
    if (activeCallRef.current) {
      const newMuteState = !isMuted
      activeCallRef.current.mute(newMuteState)
      setIsMuted(newMuteState)
    }
  }

  return (
    <Card className="card-backdrop">
      {/* Balance Display */}
      <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiDollarSign className="text-emerald-400" />
            <span className="text-sm text-slate-300">Balance</span>
          </div>
          <div className="text-xl font-bold text-emerald-400">
            ${balance.toFixed(2)}
          </div>
        </div>
        {calling && callCost > 0 && (
          <div className="mt-2 text-xs text-amber-400 text-right">
            Call cost: ${callCost.toFixed(4)}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowHistory(false)} 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${!showHistory ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200'}`}
          >
            ☎️ Keypad
          </button>
          <button 
            onClick={() => setShowHistory(true)} 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${showHistory ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-300 border border-purple-500/30' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <FiClock className="inline mr-1" /> History
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex gap-3 mb-4 items-center">
          <select 
            value={selectedIdx} 
            onChange={(e) => setSelectedIdx(Number(e.target.value))} 
            className="bg-slate-800/60 text-slate-100 px-4 py-3 rounded-xl flex-1 border border-white/10 focus:border-cyan-500/50 focus:outline-none transition-all"
          >
            {countries.map((c, i) => (
              <option key={c.dial + i} value={i}>{c.flag} {c.name} ({c.dial})</option>
            ))}
          </select>
          <button 
            onClick={backspace} 
            className="p-3 rounded-xl bg-slate-800/60 hover:bg-red-500/20 text-slate-300 hover:text-red-400 border border-white/10 hover:border-red-500/30 transition-all duration-300"
          >
            ⌫
          </button>
        </div>

        <div className="text-center py-6 px-4 rounded-xl bg-slate-900/50 border border-white/5">
          <div className="text-3xl font-bold number-display text-white">
            {number || <span className="text-slate-500">Enter number</span>}
          </div>
          {callStatus && (
            <div className="mt-3 text-sm font-medium">
              <span className={`px-3 py-1 rounded-full ${callStatus.includes('Connected') ? 'bg-green-500/20 text-green-400' : callStatus.includes('Error') || callStatus.includes('Failed') ? 'bg-red-500/20 text-red-400' : 'bg-cyan-500/20 text-cyan-400'}`}>
                {callStatus}
                {calling && callDuration > 0 && ` • ${formatDuration(callDuration)}`}
              </span>
            </div>
          )}
        </div>
      </div>

      {!showHistory ? (
        <div>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {KEYS.map((d) => (
              <button 
                key={String(d)} 
                onClick={() => append(String(d))} 
                className="dial-button w-full aspect-square rounded-2xl flex items-center justify-center text-2xl font-semibold text-white"
              >
                {d}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between mt-4 px-2">
            {calling ? (
              <>
                <button 
                  onClick={toggleMute} 
                  className={`p-4 rounded-full transition-all duration-300 ${isMuted ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30' : 'bg-slate-700/60 text-slate-300 hover:bg-slate-700'}`}
                >
                  {isMuted ? <FiMicOff size={20} /> : <FiMic size={20} />}
                </button>
                <div className="text-lg font-semibold text-cyan-400">
                  {callStatus === 'Connected' ? formatDuration(callDuration) : callStatus}
                </div>
                <button 
                  onClick={endCall} 
                  className="p-4 rounded-full bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/40 hover:shadow-red-500/60 hover:scale-105 transition-all duration-300"
                >
                  <FiPhoneOff size={20} />
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => setNumber('')} 
                  className="p-4 rounded-full bg-slate-700/60 text-red-400 hover:bg-red-500/20 hover:text-red-300 border border-white/10 hover:border-red-500/30 transition-all duration-300"
                >
                  <FiX size={20} />
                </button>
                <div className="text-sm text-emerald-400 font-medium">
                  {selectedCountry?.flag} ${selectedCountry?.rate.toFixed(3)}/min
                </div>
                <button 
                  onClick={startCall} 
                  disabled={!number || calling} 
                  className="p-4 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-500/40 hover:shadow-emerald-500/60 hover:scale-105 transition-all duration-300 disabled:opacity-40 disabled:hover:scale-100 disabled:hover:shadow-emerald-500/40 call-button-glow"
                >
                  <FiPhone size={20} />
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-slate-800/40 text-slate-400 text-center border border-white/5">
            📞 No recent calls yet
          </div>
        </div>
      )}
    </Card>
  )
}
