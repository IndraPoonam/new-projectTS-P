import React, { Component, ChangeEvent, MouseEvent } from 'react';
import {
    TextField, Button, MenuItem, InputAdornment, Checkbox, FormControlLabel, Link, Typography, Box,
    ListItemIcon, OutlinedInput, InputLabel, FormControl, Grid, IconButton, Hidden
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface Country {
    label: string;
    value: string;
    flag: string;
    countryCode: string;
}

interface State {
    fullName: string;
    email: string;
    country: string;
    phoneNumber: string;
    password: string;
    showPassword: boolean;
    termsAccepted: boolean;
    fullNameError: string;
    emailError: string;
    phoneNumberError: string;
    passwordError: string;
    termsAcceptedError: string;
    passwordRequirements: {
        minLength: boolean;
        hasNumber: boolean;
        hasUpperCase: boolean;
        hasLowerCase: boolean;
    };
    isSubmitted: boolean;
}

class CreateForm extends Component<{}, State> {
    countries: Country[] = [
        { label: 'UAE', value: 'UAE', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_the_United_Arab_Emirates.svg/640px-Flag_of_the_United_Arab_Emirates.svg.png', countryCode: '+971' },
        { label: 'Oman', value: 'Oman', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Flag_of_Oman.svg/1024px-Flag_of_Oman.svg.png', countryCode: '+968' },
        { label: 'KSA', value: 'KSA', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Flag_of_Saudi_Arabia.svg/640px-Flag_of_Saudi_Arabia.svg.png', countryCode: '+966' },
        { label: 'Bahrain', value: 'Bahrain', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Flag_of_Bahrain.svg/640px-Flag_of_Bahrain.svg.png', countryCode: '+973' },
        { label: 'Qatar', value: 'Qatar', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Flag_of_Qatar.svg/640px-Flag_of_Qatar.svg.png', countryCode: '+974' },
        { label: 'Kuwait', value: 'Kuwait', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Flag_of_Kuwait.svg/640px-Flag_of_Kuwait.svg.png', countryCode: '+965' },
        { label: 'New Zealand', value: 'New Zealand', flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Flag_of_New_Zealand.svg/640px-Flag_of_New_Zealand.svg.png', countryCode: '+64' }
    ];

    constructor(props: {}) {
        super(props);
        this.state = {
            fullName: '',
            email: '',
            country: 'UAE',
            phoneNumber: '+971',
            password: '',
            showPassword: false,
            termsAccepted: false,
            fullNameError: '',
            emailError: '',
            phoneNumberError: '',
            passwordError: '',
            termsAcceptedError: '',
            passwordRequirements: {
                minLength: false,
                hasNumber: false,
                hasUpperCase: false,
                hasLowerCase: false,
            },
            isSubmitted: false,
        };
    }

    handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === 'country') {
            const selectedCountry = this.countries.find(c => c.value === value);
            const countryCode = selectedCountry ? selectedCountry.countryCode : '';
            this.setState(prevState => ({
                ...prevState,
                [name]: value,
                phoneNumber: countryCode
            }));
        } else if (name === 'termsAccepted') {
            this.setState(prevState => ({
                ...prevState,
                termsAccepted: (e.target as HTMLInputElement).checked
            }));
        } else {
            this.setState(prevState => ({
                ...prevState,
                [name]: value
            }), () => {
                if (name === 'password') {
                    this.checkPasswordCriteria(value);
                }
            });
        }
    };

    handleClickShowPassword = () => {
        this.setState(prevState => ({
            showPassword: !prevState.showPassword
        }));
    };

    handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    checkPasswordCriteria = (password: string) => {
        this.setState({
            passwordRequirements: {
                minLength: password.length >= 8,
                hasNumber: /\d/.test(password),
                hasUpperCase: /[A-Z]/.test(password),
                hasLowerCase: /[a-z]/.test(password),
            }
        });
    };

    validateFields = () => {
        const { fullName, email, phoneNumber, password, termsAccepted } = this.state;
        let fullNameError = '', emailError = '', phoneNumberError = '', passwordError = '', termsAcceptedError = '';

        if (!fullName) fullNameError = 'This field is required';
        if (!email) emailError = 'This field is required';
        if (!phoneNumber) phoneNumberError = 'This field is required';
        if (!password) passwordError = 'This field is required';
        if (!termsAccepted) termsAcceptedError = 'You must accept the terms and conditions';

        this.setState({
            fullNameError,
            emailError,
            phoneNumberError,
            passwordError,
            termsAcceptedError
        });

        return !(fullNameError || emailError || phoneNumberError || passwordError || termsAcceptedError);
    };

    handleSubmit = () => {
        if (this.validateFields()) {
            console.log(this.state);
        }
    };

    renderPasswordCriteria = () => {
        const { password } = this.state;
        const { passwordRequirements } = this.state;

        if (!password) return null;

        return (
            <Box mt={2} sx={{ display: 'flex', flexDirection: 'column' }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="body2" color={passwordRequirements.minLength ? 'green' : 'red'}>
                            Minimum 8 characters
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2" color={passwordRequirements.hasNumber ? 'green' : 'red'}>
                            At least one number
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="body2" color={passwordRequirements.hasUpperCase ? 'green' : 'red'}>
                            At least one uppercase letter
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2" color={passwordRequirements.hasLowerCase ? 'green' : 'red'}>
                            At least one lowercase letter
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        );
    };

    render() {
        const selectedCountry = this.countries.find(c => c.value === this.state.country);
        return (
            <Box
                sx={{
                    width: '100%',
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "#f3f3f3",
                }}
            >
                <Hidden smDown>
                    <Box sx={{ width: '50%', height: '95vh' }}>
                        <img style={{ width: '100%', height: '100%' }} src='https://warrantyapp-308736-react.b308736.dev.eastus.az.svc.builder.cafe/static/media/signup_left_image.016c1705.png' alt="Form" />
                    </Box>
                </Hidden>
                <Box sx={{
                    width: '50%',
                    padding: '1rem',
                    backgroundColor: 'white',
                    boxShadow: 8,
                    borderRadius: '5px',
                    marginRight: '4rem',
                    '@media screen and (max-width: 768px)': { width: '100%', marginRight: 0 }
                }}>
                    <Box sx={{ mt: 5, width: '80%', margin: '0 auto' }}>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', '@media screen and (max-width: 768px)': { fontSize: '1.3rem' } }}>
                            Need an Account - Sign Up
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom sx={{ color: 'blue', fontWeight: 'bold', fontSize: '1rem' }}>
                            Basic Information
                        </Typography>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Full Name"
                            name="fullName"
                            value={this.state.fullName}
                            onChange={this.handleChange}
                            error={Boolean(this.state.fullNameError)}
                            helperText={this.state.fullNameError}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Email Address"
                            name="email"
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            error={Boolean(this.state.emailError)}
                            helperText={this.state.emailError}
                        />
                        <TextField
                            select
                            fullWidth
                            margin="normal"
                            label="Country"
                            name="country"
                            value={this.state.country}
                            onChange={this.handleChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        {selectedCountry && <img />}
                                    </InputAdornment>
                                ),
                            }}
                        >
                            {this.countries.map((country) => (
                                <MenuItem key={country.value} value={country.value}>
                                    <ListItemIcon>
                                        <img src={country.flag} alt={country.label} style={{ width: 20 }} />
                                    </ListItemIcon>
                                    {country.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Phone Number"
                            name="phoneNumber"
                            type="tel"
                            value={this.state.phoneNumber}
                            onChange={this.handleChange}
                            error={Boolean(this.state.phoneNumberError)}
                            helperText={this.state.phoneNumberError}
                            // InputProps={{
                            //     startAdornment: (
                            //       <InputAdornment position="start">
                            //         {formValues.country && (
                            //           <Typography variant="body1" sx={{ color: 'black', marginRight: '10px' }}>
                            //             {countries.find(country => country.name === formValues.country)?.code || ''}
                            //           </Typography>
                            //         )}
                            //       </InputAdornment>
                            //     ),
                            //   }}

                        />
                        <FormControl margin="dense" sx={{ marginTop: '10px', width: '100%' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={this.state.showPassword ? 'text' : 'password'}
                                value={this.state.password}
                                name="password"
                                onChange={this.handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={this.handleClickShowPassword}
                                            onMouseDown={this.handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                error={Boolean(this.state.passwordError)}
                            />
                            {this.state.passwordError && (
                                <Typography variant="caption" color="error">
                                    {this.state.passwordError}
                                </Typography>
                            )}
                        </FormControl>
                        {this.renderPasswordCriteria()}
                        <FormControlLabel
                            control={<Checkbox color="primary" checked={this.state.termsAccepted} onChange={this.handleChange} name="termsAccepted" />}
                            label={<span>I agree to the <Link href="#">Terms & Conditions</Link></span>}
                        />
                        {this.state.termsAcceptedError && <Typography color="error">{this.state.termsAcceptedError}</Typography>}
                        <Button variant="contained" color="primary" sx={{ ml: '7rem', width: '50%' }} onClick={this.handleSubmit}>
                            Sign Up
                        </Button>
                        <Typography variant="body2" sx={{ mt: 2, fontWeight: 'bold' }}>
                            Already have an account? <Link href="#">Sign In</Link>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        );
    }
}

export default CreateForm;
