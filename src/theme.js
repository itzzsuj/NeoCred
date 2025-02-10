import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: {
      100: "#BDDDFC",  // Light Blue
      200: "#88BDF2",  // Sky Blue
      300: "#6A89A7",  // Gray-Blue
      400: "#384959",  // Dark Gray-Blue
    },
  },
});

export default theme;
