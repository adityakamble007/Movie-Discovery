const config = {
  plugins: ["@tailwindcss/postcss"],
  
};
// tailwind.config.js (only if you want to extend default values)
module.exports = {
  theme: {
    extend: {
      backdropBlur: {
        xs: '2px',
      },
    },
  },
};


export default config;
