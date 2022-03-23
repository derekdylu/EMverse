import React, {useState, useEffect, useRef} from 'react'
import {Box, Grid, Button} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Theme from '../Themes/Theme';
// NOTE why can't import in index.js

const Menu = () => {
    const [opened, setOpened] = useState(false);
    


    return (
    <ThemeProvider theme={Theme}>
    <div style={{backgroundColor: "#686868"}}>
        <Box
            sx={{
                width: 300,
                height: 960,
                backgroundColor: "#fff",
            }}
        >
            <img src="/logo_tmp.png" style={{maxWidth: '50px', marginLeft: '25px', marginTop: '50px'}}></img>
            <Grid
                container
                direction="column"
                justifyContent="bottom"
                alignItems="center"
                mt="350px"
            >
                <Button item variant="text">
                    泡泡總覽
                </Button>
                <Button item variant="text">
                    留下我的看法
                </Button>
                <Button item variant="text">
                    如何操作
                </Button>
                <Grid
                    container
                    boxShadow= "0px 4px 30px rgba(255, 153, 0, 0.65)"
                    height="100px"
                    mt="10px"
                    justifyContent="top"
                    alignItems="center"
                >
                    <Button item variant="back">
                        X
                    </Button>
                </Grid>
            </Grid>
        </Box>
    </div>
    </ThemeProvider>
  )
}

export default Menu