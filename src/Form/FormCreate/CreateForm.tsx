import React, { Component, ChangeEvent } from 'react';
import { TextField, Button, MenuItem, InputAdornment, Checkbox, FormControlLabel, Link, Typography, Container, Box, ListItemIcon } from '@mui/material';
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
    passwordError: string | undefined;
    fullNameError: string | undefined;
    emailError: string | undefined;
    phoneNumberError: string | undefined;
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
            passwordError: '',
            fullNameError: '',
            emailError: '',
            phoneNumberError: ''
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
        } else {
            this.setState(prevState => ({
                ...prevState,
                [name]: value
            }), () => {
                if (name === 'password') {
                    this.validatePassword(value);
                }
            });
        }
    };
    validatePassword = (password: string) => {
        const strongRegex = new RegExp(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})'
        );
        if (!strongRegex.test(password)) {
            this.setState({
                passwordError: 'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter and one number.',
            });
        } else {
            this.setState({
                passwordError: '',
            });
        }
    };
    validateFields = () => {
        const { fullName, email, phoneNumber } = this.state;
        let fullNameError = '', emailError = '', phoneNumberError = '', termsAcceptedError = '';
        if (!fullName) fullNameError = 'This field is required';
        if (!email) emailError = 'This field is required';
        if (!phoneNumber) phoneNumberError = 'This field is required';
        this.setState({
            fullNameError,
            emailError,
            phoneNumberError,
        });
        return !(fullNameError || emailError || phoneNumberError || termsAcceptedError);
    };
    handleSubmit = () => {
        if (this.validateFields()) {
            console.log(this.state);
        }
    };
    togglePasswordVisibility = () => {
        this.setState({ showPassword: !this.state.showPassword });
    };
    render() {
        const selectedCountry = this.countries.find(c => c.value === this.state.country);

        return (
            <Box   sx={{
                width: 'full',
                padding: '1.5rem',
                backgroundColor: 'white',
                boxShadow: 8,
                borderRadius: '8px',
              }}>
     

                <Box sx={{ mt: 5, width: '60%', height:'fit', margin: '0 auto', }}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Need an Account - Sign Up
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom sx={{ color: 'blue' }}>
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
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Password"
                        name="password"
                      
                        type={this.state.showPassword ? 'text' : 'password'}
                        value={this.state.password}
                        onChange={this.handleChange}
                        error={Boolean(this.state.passwordError)}
                        helperText={this.state.passwordError}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button onClick={this.togglePasswordVisibility} size="small">
                                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </Button>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <FormControlLabel
                        control={ <Checkbox color="primary"/>  }

                        label={<span>I agree to the <Link href="#">Terms & Conditions</Link></span>}
                    />
                    <Button variant="contained" color="primary" sx={{ml:'7rem',width:'50%'}} onClick={this.handleSubmit}>
                        Sign Up
                    </Button>
                    <Typography variant="body2" sx={{ mt: 2, fontWeight: 'bold' }}>
                        Already have an account? <Link href="#">Sign In</Link>
                    </Typography>
                </Box>
         
            </Box>
        );
    }
}

export default CreateForm;
