/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pink:   { DEFAULT:'#FF2D7A', dark:'#FF1670', soft:'#FFF0F6' },
        orange: { DEFAULT:'#FF7A1A', dark:'#FF6400' },
        yellow: { DEFAULT:'#FFC72C', soft:'#FFFBEA' },
        teal:   { DEFAULT:'#27D3B6', soft:'#E8FBF8' },
        purple: { DEFAULT:'#7B3FF2', soft:'#F3EEFF' },
        navy:   { DEFAULT:'#12284C', mid:'#1E3A6E' },
        gray:   { light:'#F7F8FC', mid:'#E8EAF2', text:'#6B7280' },
      },
      fontFamily: {
        tajawal: ['Tajawal', 'Cairo', 'sans-serif'],
        cairo:   ['Cairo', 'sans-serif'],
        nunito:  ['Nunito', 'sans-serif'],
      },
      borderRadius: {
        '2xl':'16px', '3xl':'24px', '4xl':'32px',
      },
      animation: {
        'float':      'floatUp 5s ease-in-out infinite',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'spin-slow':  'spin 14s linear infinite',
        'bounce-soft':'bounceSoft 2s ease-in-out infinite',
        'blob':       'blobMorph 8s ease-in-out infinite',
        'pulse-pink': 'pulsePink 2s ease-in-out infinite',
      },
      keyframes: {
        floatUp:    { '0%,100%':{transform:'translateY(0)'},      '50%':{transform:'translateY(-14px)'} },
        floatSlow:  { '0%,100%':{transform:'translateY(0) rotate(-2deg)'}, '50%':{transform:'translateY(-10px) rotate(2deg)'} },
        bounceSoft: { '0%,100%':{transform:'translateY(0)'},      '50%':{transform:'translateY(-6px)'} },
        blobMorph:  { '0%,100%':{borderRadius:'60% 40% 30% 70% / 60% 30% 70% 40%'}, '50%':{borderRadius:'30% 60% 70% 40% / 50% 60% 30% 60%'} },
        pulsePink:  { '0%,100%':{boxShadow:'0 0 0 0 rgba(255,45,122,0.4)'}, '50%':{boxShadow:'0 0 0 12px rgba(255,45,122,0)'} },
      },
      boxShadow: {
        'pink':   '0 8px 30px rgba(255,45,122,0.3)',
        'pink-sm':'0 4px 14px rgba(255,45,122,0.2)',
        'card':   '0 4px 24px rgba(18,40,76,0.08)',
        'card-hover':'0 16px 48px rgba(255,45,122,0.15)',
      },
    },
  },
  plugins: [],
}
