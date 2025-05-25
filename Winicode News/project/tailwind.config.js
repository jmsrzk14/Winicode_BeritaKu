export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,html}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: '#ff8a3d',
          light: '#fff1e6',
          dark: '#e67d35',
        },
        secondary: {
          DEFAULT: '#00d1c1',
          light: '#e6f9f7',
          dark: '#00bfb0',
        },
        success: {
          DEFAULT: '#28c76f',
          light: '#e5f8ed',
        },
        danger: {
          DEFAULT: '#ff5b5c',
          light: '#ffe6e6',
        },
        warning: {
          DEFAULT: '#ff9f43',
          light: '#fff2e5',
        },
        info: {
          DEFAULT: '#00b8d9',
          light: '#e5f6fa',
        },
      },
      boxShadow: {
        card: '0 4px 24px 0 rgba(34, 41, 47, 0.1)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}