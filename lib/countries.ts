export interface Country {
  name: string
  dial: string
  rate: number // Rate per minute in USD
  flag: string
}

export const COUNTRIES: Country[] = [
  { name: 'United States', dial: '+1', rate: 0.01, flag: '🇺🇸' },
  { name: 'United Kingdom', dial: '+44', rate: 0.02, flag: '🇬🇧' },
  { name: 'Canada', dial: '+1', rate: 0.01, flag: '🇨🇦' },
  { name: 'Australia', dial: '+61', rate: 0.03, flag: '🇦🇺' },
  { name: 'Germany', dial: '+49', rate: 0.02, flag: '🇩🇪' },
  { name: 'France', dial: '+33', rate: 0.02, flag: '🇫🇷' },
  { name: 'Spain', dial: '+34', rate: 0.02, flag: '🇪🇸' },
  { name: 'Italy', dial: '+39', rate: 0.02, flag: '🇮🇹' },
  { name: 'Netherlands', dial: '+31', rate: 0.02, flag: '🇳🇱' },
  { name: 'Sweden', dial: '+46', rate: 0.02, flag: '🇸🇪' },
  { name: 'Norway', dial: '+47', rate: 0.03, flag: '🇳🇴' },
  { name: 'Denmark', dial: '+45', rate: 0.02, flag: '🇩🇰' },
  { name: 'India', dial: '+91', rate: 0.005, flag: '🇮🇳' },
  { name: 'Pakistan', dial: '+92', rate: 0.006, flag: '🇵🇰' },
  { name: 'Bangladesh', dial: '+880', rate: 0.005, flag: '🇧🇩' },
  { name: 'Japan', dial: '+81', rate: 0.04, flag: '🇯🇵' },
  { name: 'South Korea', dial: '+82', rate: 0.04, flag: '🇰🇷' },
  { name: 'China', dial: '+86', rate: 0.03, flag: '🇨🇳' },
  { name: 'Brazil', dial: '+55', rate: 0.02, flag: '🇧🇷' },
  { name: 'Mexico', dial: '+52', rate: 0.015, flag: '🇲🇽' },
  { name: 'Argentina', dial: '+54', rate: 0.02, flag: '🇦🇷' },
  { name: 'South Africa', dial: '+27', rate: 0.025, flag: '🇿🇦' },
  { name: 'Nigeria', dial: '+234', rate: 0.015, flag: '🇳🇬' },
  { name: 'Egypt', dial: '+20', rate: 0.01, flag: '🇪🇬' },
  { name: 'Turkey', dial: '+90', rate: 0.015, flag: '🇹🇷' },
  { name: 'Poland', dial: '+48', rate: 0.015, flag: '🇵🇱' },
  { name: 'Portugal', dial: '+351', rate: 0.02, flag: '🇵🇹' },
  { name: 'Switzerland', dial: '+41', rate: 0.04, flag: '🇨🇭' },
  { name: 'Belgium', dial: '+32', rate: 0.02, flag: '🇧🇪' }
]

export function getCountryByDial(dial: string): Country | undefined {
  return COUNTRIES.find(c => dial.startsWith(c.dial))
}

export function getRateByCountry(countryName: string): number {
  const country = COUNTRIES.find(c => c.name === countryName)
  return country?.rate || 0.02
}

export default COUNTRIES
