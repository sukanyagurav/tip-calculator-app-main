/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  theme: {

  screens:{
    sm:'480px',
    md:'658px',
    lg:'976px',
    xl:'1440px'
  },
    extend: {
      colors:{
        strongCyan:'hsl(172, 67%, 45%)',
        darkCyan:'hsl(183, 100%, 15%)',
        darkGrayCyan:' hsl(184, 14%, 56%)',
        lightGrayCyan: 'hsl(185, 41%, 84%)',
        lightercyan: 'hsl(189, 41%, 97%)',
        white:'hsl(0, 0%, 100%)',
      },
      fontFamily:{
        sans:['Space Mono','sans-serif']
      },
    },
  },
  plugins: [],
}

