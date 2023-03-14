import {InputAdornment, ListItemAvatar, MenuItem, Select, Box, TextField, Input, Button} from '@mui/material';
import { useState } from 'react';
import Avatar from "@mui/material/Avatar";
import PaypalButton from "./PaypalButton";
import {PayPalScriptProvider} from "@paypal/react-paypal-js";


const paymentMethods = [
    {
        value: 'zalopayapp',
        label: 'ZaloPay E-Wallet ',
    },
    {
        value: 'amt',
        label: 'ATM Card ',
    },
    {
        value: 'CC',
        label: 'Visa, Mastercard, JCB',
    },
];

const Payment = () => {
    const [amount, setAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    return (
        <form>
            <TextField
                label="Amount"
                value={amount}
                onChange={handleAmountChange}
                InputProps={{
                    endAdornment: <InputAdornment position="end">VND</InputAdornment>,
                }}
                fullWidth
                margin="normal"
                variant="outlined"
            />

            <Select
                label="Payment Method"
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
                fullWidth
                margin="normal"
                variant="outlined"
            >
                {paymentMethods.map((method) => (
                    <MenuItem key={method.value} value={method.value}>
                        <Box display="flex" alignItems="center" gap="8px">
                            <div>{method.label}</div>

                        </Box>
                    </MenuItem>
                ))}

            </Select>

            <Button type="submit">Submit</Button>
        </form>
    );
}

export default Payment;