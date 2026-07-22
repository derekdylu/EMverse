import React from 'react'
import { Link } from 'react-router-dom';
import {Box, Grid, Button} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Theme from '../Themes/Theme';

const Menu = (menu) => {

    return (
        <>
            <ThemeProvider theme={Theme} >
                <Grid 
                    container
                    display="flex"
                    direction="column"
                    alignItems="center"
                    style={{backgroundColor: "#fff"}}
                >
                    <Box
                        sx={{
                            width: 300,
                            height: 960,
                            backgroundColor: "#fff",
                        }}
                    >
                        <img src="/logo_tmp.png" alt="em-verse" style={{maxWidth: '50px', marginLeft: '25px', marginTop: '50px'}} />
                        <Grid
                            container
                            direction="column"
                            justifyContent="bottom"
                            alignItems="center"
                            mt="350px"
                        >
                            <Link to='/home' style={{ textDecoration: 'none' }}>
                                <Button item variant="text">
                                    泡泡總覽
                                </Button>
                            </Link>
                            <Link to='/input' style={{ textDecoration: 'none' }}>
                                <Button item variant="text">
                                    留下我的看法
                                </Button>
                            </Link>
                            <Link to='/about' style={{ textDecoration: 'none' }}>
                                <Button item variant="text">
                                    如何操作
                                </Button>
                            </Link>
                            {/* <Grid
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
                            </Grid> */}
                        </Grid>
                    </Box>
                </Grid>
            </ThemeProvider>
        </>
    
  )
}

export default Menu
