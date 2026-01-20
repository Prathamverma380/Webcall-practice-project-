'use client'

import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { FiPhone, FiX, FiClock } from 'react-icons/fi'
import COUNTRIES from '../lib/countries'

const Card = styled.div`
  border-radius: 12px;
  padding: 20px;
  width: 100%;
  max-width: 420px;
`;

const KEYS = [1,2,3,4,5,6,7,8,9,'*',0,'#']

export default function DialPad() {
  const [number, setNumber] = useState('')
  const [calling, setCalling] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [selectedIdx, setSelectedIdx] = useState(0)

  const countries = useMemo(() => COUNTRIES, [])
  const selectedCountry = countries[selectedIdx]

  useEffect(() => {
    // subtle mount animation hint
    const t = setTimeout(() => {}, 200)
    return () => clearTimeout(t)
  }, [])

  function append(d: string) {
    setNumber((s) => s + d)
  }
  function backspace() {
    setNumber((s) => s.slice(0, -1))
  }

  async function startCall() {
    setCalling(true)
    try {
      const res = await fetch('/api/twilio/token', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ to: number }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Token failure')
      console.log('Twilio token', data)
      alert('Call started (placeholder). Implement Twilio Voice SDK integration.')
    } catch (err: any) {
      alert('Call failed: ' + err.message)
    } finally {
      setCalling(false)
    }
  }

  return (
    <Card className="card-backdrop">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button onClick={() => setShowHistory(false)} className={`px-3 py-1 rounded-full ${!showHistory ? 'bg-sky-400/20 text-sky-300' : 'bg-transparent text-slate-300'}`}>Keypad</button>
          <button onClick={() => setShowHistory(true)} className={`px-3 py-1 rounded-full ${showHistory ? 'bg-slate-700/40 text-slate-100' : 'bg-transparent text-slate-300'}`}><FiClock /></button>
        </div>
        <div className="text-sm text-slate-300">{showHistory ? 'Call History' : 'Dial'}</div>
      </div>

      <div className="mb-4">
        <div className="flex gap-3 mb-3 items-center">
          <select value={selectedIdx} onChange={(e) => setSelectedIdx(Number(e.target.value))} className="bg-slate-700/40 text-slate-100 px-3 py-2 rounded flex-1">
            {countries.map((c, i) => (
              <option key={c.dial + i} value={i}>{c.name} ({c.dial})</option>
            ))}
          </select>
          <button onClick={backspace} className="p-2 rounded-md bg-slate-700/30 hover:bg-slate-700/50 text-slate-200">⌫</button>
        </div>

        <div className="mt-1 text-center py-4">
          <div className="text-2xl font-semibold number-display text-slate-100">{number || 'Enter number'}</div>
        </div>
      </div>

      {!showHistory ? (
        <div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            {KEYS.map((d) => (
              <button key={String(d)} onClick={() => append(String(d))} className="dial-button w-full aspect-square rounded-full bg-slate-700/30 flex items-center justify-center text-2xl text-slate-100 hover:scale-105 transition">
                {d}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between mt-2">
            <button onClick={() => setNumber('')} className="p-3 rounded-full bg-red-600 text-white primary-glow"> <FiX /> </button>
            <div className="text-sm text-emerald-300">Current {selectedCountry?.name} rate: 0.03$/min</div>
            <button onClick={startCall} disabled={!number || calling} className="p-3 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 text-slate-900 shadow"> <FiPhone /> </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="p-3 rounded-md bg-slate-800/40">No recent calls yet.</div>
        </div>
      )}
    </Card>
  )
}
