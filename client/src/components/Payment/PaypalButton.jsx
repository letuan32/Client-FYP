import { PayPalScriptProvider, PayPalButtons, FUNDING  } from "@paypal/react-paypal-js";

const paypalToken =  process.env.REACT_APP_ENV === "Development" ? process.env.REACT_APP_PAYPAL_TOKEN : process.env.REACT_APP_PAYPAL_TOKEN

const PaypalButton = () => {
    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: "10.00",
                    },
                },
            ],
        });
    };

    const onApprove = (data, actions) => {
        return actions.order.capture().then(function(details) {
            // Show a success message to the buyer
            alert("Transaction completed by " + details.payer.name.given_name + "!");
        });
    };

    return (
        <PayPalScriptProvider options={{ "client-id": paypalToken }}>
            <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
                fundingSource={FUNDING.PAYPAL}
            />
        </PayPalScriptProvider>
    );
};

export default PaypalButton;