const Button = {
  // The styles all button have in common
  baseStyle: {
    fontWeight: "bold",
    textTransform: "uppercase",
    borderRadius: "base", // <-- border radius is same for all variants and sizes
  },
  // Two sizes: sm and md
  sizes: {
    sm: {
      fontSize: "sm",
    },
    md: {
      fontSize: "md",
    },
  },
  variants: {
    outline: {
      w: "100px",
      color: "white",
      bg: "red.500",
      _hover: {
        color: "white",
        bg: "red.700",
        textDecoration: "none"
      }
    },
    solid: {
      bg: "teal.500",
      borderRadius: "5px",
      color: "white",
      _hover: {
        bg: "teal.700",
        color: "teal.50",
        textDecoration: "none"
      },
    },
  },
  // The default size and variant values
  defaultProps: {
    size: "md",
    variant: "solid",
  },
}

export default Button