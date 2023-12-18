import { PaletteOptions } from "@mui/material"
import { createTheme } from "@mui/material/styles"

// Check: https://m2.material.io/inline-tools/color/ for playing with colors

const ColorPalette = {
  mode: "dark",
  primary: {
    main: "#759AAB",
    light: "#96B3AB"
  },
  text: {
    primary: "#ffffff",
    secondary: "#7b7b7b"
  },
  success: {
    main: "#66bb6a",
    contrastText: "#fff"
  },
  error: {
    main: "#d32f2f",
    contrastText: "#fff"
  }
} as PaletteOptions


export const lightTheme = createTheme({
  palette: ColorPalette,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1465
    }
  }
})