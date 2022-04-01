import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
    components: {
        MuiButton: {
          styleOverrides: {
            text: {
                width: '300px',
                color: "#664500",
                borderRadius: 5,
                fontWeight: "bold",
                fontSize: "16pt",
                marginBottom: "15px",
                "&:hover": {
                    color: "#fff",
                    backgroundColor: "#FFCB4C",
                }
            },
            back: {
                width: '300px',
                height: "100px",
                color: "#664500",
                borderRadius: 5,
                fontWeight: "regular",
                fontSize: "16pt",
                "&:hover": {
                    color: "#FFCB4C",
                    backgroundColor: "#fff",
                }
            }
          },
        },
    },
});

export default Theme