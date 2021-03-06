import React, { useState, useContext } from 'react';
import {
    Button, CssBaseline, makeStyles, Checkbox,
    TextField, Typography, FormControlLabel,
    Link, Grid, Box, Container, Avatar, MenuItem
} from '@material-ui/core';

import Alert from '@material-ui/lab/Alert';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { AuthContext } from '../context/authContext/AuthState'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn() {
    const classes = useStyles();
    const authContext = useContext(AuthContext);
    const { loginUser, alerts, removeAlert } = authContext;

    const [selectedUser, setSelectedUser] = useState({})
    const { username, password } = selectedUser;

    const users = [
        { label: 'Peter Schroeder', username: 'Peter2776', password: 'Peter.Shcroeder' },
        { label: 'Jessica Boulos', username: 'Jessica2480', password: 'Jessica.Boulos' }
    ]

    const handleChange = e => setSelectedUser({
        ...selectedUser,
        [e.target.name]: e.target.value
    })


    const handleLogin = async e => {
        e.preventDefault();
        await loginUser(selectedUser)
    }

    const handleUserChange = e => {
        setSelectedUser(e.target.value)
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>

                {alerts &&
                    <Grid container spacing={2}>
                        {alerts.map(alert => (
                            <Grid item xs={12}>
                                <Alert onClose={() => removeAlert(alert._id)} key={alert._id} severity={alert.severity}>{alert.msg}</Alert>
                            </Grid>
                        ))}
                    </Grid>
                }
                <form className={classes.form} noValidate>

                    <TextField
                        onChange={handleUserChange}
                        value={selectedUser}
                        label="Select User" select
                        name="selectedUser" >
                        <MenuItem key='-1'>--None--</MenuItem>
                        {users.map((user, i) => (
                            <MenuItem key={i} value={user}>{user.label}</MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required onChange={handleChange}
                        fullWidth value={username}
                        label="username"
                        name="username"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth onChange={handleChange}
                        name="password" value={password}
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth onClick={handleLogin}
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}