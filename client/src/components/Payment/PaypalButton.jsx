import { PayPalScriptProvider, PayPalButtons, FUNDING  } from "@paypal/react-paypal-js";
import {useSelector} from "react-redux";

const paypalToken =  process.env.REACT_APP_ENV === "Development" ? process.env.REACT_APP_PAYPAL_TOKEN : process.env.REACT_APP_PAYPAL_TOKEN
const serverUrl =  process.env.REACT_APP_API_GATEWAY

const PaypalButton = ({postId, amount}) => {
    const token = useSelector((state) => state.token);
    const userId = useSelector((state) => state.userId);
    const createInternalTransaction = async () => {
        const response = await fetch(serverUrl + `donation`,{
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                postId: postId,
                amount: amount,
                bankingType: null,
                paymentService: 2
            })
        });
        return response.json();
    };


    const createOrder = async (data, actions) => {

        var internalTransaction = await createInternalTransaction();
        console.log('File: PaypalButton.jsx, Line 32:  ' + internalTransaction.internalTransactionId);

        return actions.order.create({
            purchase_units: [
                {
                    reference_id: postId,
                    amount: {
                        value: amount
                    },
                    shipping: null,
                    invoice_id: internalTransaction.internalTransactionId,
                    custom_id: userId,
                },
            ],
        });
    };

    const onApprove = (data, actions) => {
        return actions.order.capture().then(function(details) {
            // Show a success message to the buyer
            console.log('File: PaypalButton.jsx, Line 23:   ' + JSON.stringify(details));
            console.log('File: PaypalButton.jsx, Line 26: Capture:  ' + JSON.stringify(actions.order.capture()));
            console.log('File: PaypalButton.jsx, Line 26: Date:  ' + JSON.stringify(data));
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