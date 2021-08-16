const globalStyles = {
  styles: {
    global: {
      body: {
        bg: "teal.900",
        bgImage: "url(/images/Wallpaper.png)",
        bgSize: "cover",
        color: "teal.50",
      },
      h1: {
        bgGradient: "linear(to-r, teal.50,teal.300)",
        bgClip: "text",
      },
      h2: {
        fontWeight: "semibold",
        p: "10px",
      },
      a: {
        color: "teal.100",
        _hover: {
          color: "teal.800",
          textDecoration: "underline",
        },
      },
      video: {
        transform: "scaleX(-1)",
      },
    },
  },
};

export default globalStyles;
