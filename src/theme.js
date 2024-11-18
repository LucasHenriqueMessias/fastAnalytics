import { createContext, useState, useMemo, useEffect } from "react";
import { createTheme } from "@mui/material/styles";
// import { Typography } from "@mui/material";



//color design tokens


export const tokens = (mode) => ({
...(mode === 'dark' ? {
//if mode = dark
lightBlue: {
  100: "#cceef3",
  200: "#99dde7",
  300: "#66cddb",
  400: "#33bccf",
  500: "#00abc3",
  600: "#00899c",
  700: "#006775",
  800: "#00444e",
  900: "#002227"
},
white: {
  100: "#ffffff",
  200: "#ffffff",
  300: "#ffffff",
  400: "#ffffff",
  500: "#333333",
  600: "#cccccc",
  700: "#999999",
  800: "#666666",
  900: "#333333"
},
darkBlue: {
  100: "#ced8e3",
  200: "#9eb1c7",
  300: "#6d8aab",
  400: "#3d638f",
  500: "#0c3c73",
  600: "#0a305c",
  700: "#072445",
  800: "#05182e",
  900: "#020c17"
},
navbar: {
  100: "#dedef0",
  200: "#bdbde0",
  300: "#9c9cd1",
  400: "#7b7bc1",
  900: "#5a5ab2",
  600: "#48488e",
  700: "#36366b",
  800: "#242447",
  500: "#121224"
},
} : {
//if mode = light
lightBlue: {
  100: "#002227",
  200: "#00444e",
  300: "#006775",
  400: "#00899c",
  500: "#00abc3",
  600: "#33bccf",
  700: "#66cddb",
  800: "#99dde7",
  900: "#cceef3",
},
darkBlue: {
  100: "#020c17",
  200: "#05182e",
  300: "#072445",
  400: "#0a305c",
  500: "#0c3c73",
  600: "#3d638f",
  700: "#6d8aab",
  800: "#9eb1c7",
  900: "#ced8e3",
},
white: {
  100: "#333333",
  200: "#666666",
  300: "#999999",
  400: "#cccccc",
  500: "#ffffff",
  600: "#ffffff",
  700: "#ffffff",
  800: "#ffffff",
  900: "#ffffff",
},
navbar: {
    100: "#121224",
    200: "#242447",
    300: "#36366b",
    400: "#48488e",
    500: "#5a5ab2",
    600: "#7b7bc1",
    700: "#9c9cd1",
    800: "#bdbde0",
    900: "#dedef0",
},
})
})

//material ui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: { // Corrected typo here
      mode: mode,
      ...(mode === 'dark' ? {
        primary: {
          main: colors.darkBlue[100],
        },
        secondary: {
          main: colors.lightBlue[100],
        },
        background: {
          default: colors.darkBlue[300],
        },
        
      } : {
            primary: {
              main: colors.lightBlue[900],
            },
            secondary: {
              main: colors.darkBlue[900],
            },
            background: {
              default: colors.white[500],
            },
            //navbar: {
        //   default: colors.
        // }
      }
    ),
    },
    typography: {
      fontFamily: [
        "Source Sans Pro",
        "sans-serif"
      ].join(","),
      fontSize: 12,
      navbarItem: {
        fontFamily: "Source Sans Pro, sans-serif",
        fontSize: 14,
        fontWeight: 600,
        color: mode === 'dark' ? colors.white[100] : colors.darkBlue[900], // Change font color based on mode
      },
    },
  };
};

export const ColorModeContext = createContext({
  toggleColorMode: () => {}
});

export const useMode = () => {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem("colorMode");
    return savedMode ? savedMode : "dark";
  });

  useEffect(() => {
    localStorage.setItem("colorMode", mode);
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "light" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};


