import { defaultTheme } from "react-admin";

export const lightTheme = {
  palette: {
    primary: {
      main: "#4f3cc9",
    },
    secondary: {
      light: "#5f5fc4",
      main: "#283593",
      dark: "#001064",
      contrastText: "#fff",
    },
    background: {
      default: "#fcfcfe",
    },
    mode: "light" as "light",
  },
  shape: {
    borderRadius: 5,
  },
  sidebar: {
    width: 260,
    paddingLeft: 6,
  },
  components: {
    ...defaultTheme.components,
    RaMenuItemLink: {
      styleOverrides: {
        root: {
          borderLeft: "3px solid #fff",
          "&.RaMenuItemLink-active": {
            borderLeft: "3px solid #4f3cc9",
            backgroundColor: "#5a968b !important",
            color: "#000000 !important",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation1: {
          boxShadow: "none",
        },
        root: {
          border: "1px solid #e0e0e3",
          backgroundClip: "padding-box",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorSecondary: {
          color: "black",
          backgroundColor: "#a1dfc1",
        },
      },
    },

    MuiLinearProgress: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "#f5f5f5",
        },
        barColorPrimary: {
          backgroundColor: "#d7d7d7",
        },
      },
    },
  },
};
