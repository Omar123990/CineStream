const config = {
  theme: {
    extend: {
      keyframes: {
        loader: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(300%)" },
        },
      },
      animation: {
        loader: "loader 2s infinite ease-in-out",
      },
      colors: {
        purple: "#B76DFF",
      },
    },
  },
};

export default config;
