import { Button, Paper, createStyles, Grid, makeStyles, Theme, IconButton, InputBase, Container, Typography, Box, Link } from '@material-ui/core';
import React, { useContext, useState, useEffect } from 'react';
import { appendBaseURL } from '../../src/utils/url';
import StackGrid, { easings, transitions } from 'react-stack-grid';
import SearchIcon from '@material-ui/icons/Search';
import { ChainContext } from '../_app';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        control: {
            padding: theme.spacing(2),
        },
        formContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        form: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
        },
        iconButton: {
            padding: 10,
        },
        logo: {
            display: 'grid',
            objectFit: 'cover',
            gridColumn: 'span 6',
            alignSelf: 'center',
            justifySelf: 'center',
        },
    })
);

export const Home = (): JSX.Element => {
    const chainContext = useContext(ChainContext);
    const classes = useStyles();
    const [search, setSearch] = useState('');
    const transition = transitions['fadeDown'];

    return (
        <Container maxWidth="lg">
            <Grid
                container
                justify="center"
                spacing={5}
                style={{
                    marginTop: '20%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Button variant="contained" color="primary" href={appendBaseURL('app/user', true)}>
                    Go Profile
                </Button>
                <Grid item xs={12} className={classes.formContainer}>
                    <Paper component="form" className={classes.form}>
                        <InputBase
                            className={classes.input}
                            placeholder="Search Decentramall Stores"
                            inputProps={{ 'aria-label': 'search stores' }}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <IconButton type="submit" className={classes.iconButton} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </Grid>
                <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column' }}>
                    <Box fontWeight="bold" fontSize="1.2rem" textAlign="center">
                        Stores Currently Open
                    </Box>
                </Grid>
            </Grid>
            <StackGrid
                duration={480}
                columnWidth={250}
                gutterWidth={5}
                gutterHeight={5}
                easing={easings.quartOut}
                appear={transition.appear}
                appeared={transition.appeared}
                enter={transition.enter}
                entered={transition.entered}
                leaved={transition.leaved}
                rtl={false}
                style={{ marginTop: '2rem' }}
            >
                {chainContext.spaces.filter(space =>
                    space.rent?.title.toLowerCase().includes(search.toLowerCase())).map((space) => (
                        <Paper>
                            {/* Temporarily use the url we include. We might generate a custom url in the future and can use that instead */}
                            <Link style={{textDecoration: 'none'}} href={space.rent.url.includes("http") ? space.rent.url : `https://${space.rent.url}`}>
                            <img width="250" src={URL.createObjectURL(new Blob([space.rent.logo], { type: "image/jpeg" }))} />
                            <Typography component="div" gutterBottom>
                                <Box fontWeight="bold" fontSize="1.5rem" style={{ margin: '1rem' }}>
                                    {space.rent.title}
                                </Box>
                                <Box fontSize="1rem" style={{ margin: '1rem' }}>
                                    {space.rent.description}
                                </Box>
                                <Box fontSize="1rem" style={{ margin: '1rem' }}>
                                    Category: {space.rent.category}
                                </Box>
                            </Typography>
                            </Link>
                        </Paper>
                    ))
                }
            </StackGrid>
        </Container>
    );
};

export default Home;
