import React, { useState, useEffect } from 'react';
import {
    Box,
    useMediaQuery,
    TextField,
    Select, MenuItem, Button, StepLabel, Stepper, Step, FormControl, InputLabel, StepContent, Typography
} from '@mui/material';
import Navbar from "../../components/navbar";
import SinglePostWidget from "../widgets/SinglePostWidget";
import {stringify, v4 as uuidv4} from 'uuid';
import PaypalButton from "../../components/Payment/PaypalButton";
import Divider from "@mui/material/Divider";
import {useSelector} from "react-redux";
import {useParams} from 'react-router-dom';
import {setPosts} from "../../state";
import {timeStampToDate} from "../../utils/formatDate";
import SinglePostSkeleton from "../../components/Skeletons/SinglePostSkeleton";
const vndPaymentMethods = [
    {
        value: 3,
        label: 'ZaloPay E-Wallet',
        isEmbed: false

    },
    {
        value: 1,
        label: 'ATM Card (ZaloPay gateway)',
        isEmbed: false

    },
    {
        value: 2,
        label: 'Visa, Mastercard, JCB (ZaloPay gateway)',
        isEmbed: false
    }
];


const currencies = ['USD', 'VND'];

function getSteps() {
    return ['Select Currency', 'Select Payment Method'];
}

const serverUrl =  process.env.REACT_APP_API_GATEWAY

const PostDonation = () => {
    const token = useSelector((state) => state.token);
    const userId = useSelector((state) => state.userId);

    const [isLoading, setIsLoading] = useState(true);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const [activeStep, setActiveStep] = useState(0);
    const [currency, setCurrency] = useState(currencies[0]);
    const [amount, setAmount] = useState('');
    const [post, setPost] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('');
    const params = useParams();
    const postId = params.id
    const getPost = async () => {
        const response = await fetch( serverUrl + "Post/" + postId, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`}
        });

        var responseData = await response.json();
        console.log('File: PostDeatailPage.jsx, Line 76:  ' + JSON.stringify(responseData));
        setPost(responseData);
        setIsLoading(false)
    }

    useEffect(() => {
        getPost();
    },[]);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleCurrencyChange = (event) => {
        setCurrency(event.target.value);
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
        // TODO: Validate
    };




    const handleSelectPaymentMethod = async (event, option) => {
        console.log('File: PostDeatailPage.jsx, Line 83: ' + option.label)
        const response = await fetch( serverUrl + `donation`,{
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                postId: postId,
                amount: amount,
                bankingType: option.value,
                paymentService: 1
            })
        })

        const updatedPost = await response.json();
        console.log('File: PostDeatailPage.jsx, Line 109: ' + updatedPost.redirecUrl );
        window.open(updatedPost.redirecUrl, '_blank', 'noreferrer');
    };

    const generatePaymentMethodOptions = () => {
        if(currency === "VND")
        {
            return vndPaymentMethods.map((option) => (
                option.isEmbed ? option.component :
                    <Button onClick={(event) => handleSelectPaymentMethod(event, option)}>{option.label}</Button>
            ))
        }
        else
        {
            return <PaypalButton postId={postId} amount={amount}></PaypalButton>
        }
    }


    if(isLoading){
        return  Array.from(new Array(3)).map((el,index) => (<SinglePostSkeleton key={index}/>)
        )
    }
    return (
        <Box>
            <Navbar/>
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="0.5rem"
                justifyContent="space-between"
            >
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <SinglePostWidget
                        key={uuidv4()}
                        postId={postId}
                        postUserId={post?.userId}
                        postAuthorUsername={post.author.displayName}
                        location="{location}"
                        caption={post.content}
                        postImageUrls={post.imageUrls}
                        userProfilePhoto={post.author.avatarUrl}
                        likes={5}
                        commentCount={post.numberOfComment}
                        createdAt={timeStampToDate(post.createdAt)}
                        expectedReceivedDate={timeStampToDate(post.expectedReceivedDate)}
                        expectedAmount={post.expectedAmount}
                        views={post.views}
                        likes={post.likes}
                        currency={post.currency}
                    />
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}>

                    <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((label, index) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                                <StepContent  TransitionComponent={index === 0 ? "none" : ""}>
                                    <FormControl fullWidth>
                                        {index === 0 ? (
                                            <>
                                                <InputLabel id="currency-label" >Currency</InputLabel>
                                                <Select
                                                    labelId="currency-label"
                                                    id="currency"
                                                    value={currency}
                                                    onChange={handleCurrencyChange}
                                                >
                                                        <MenuItem key={post.currency} value={post.currency}>{post.currency}</MenuItem>

                                                </Select>
                                                <TextField
                                                    label="Amount"
                                                    value={amount}
                                                    onChange={handleAmountChange}
                                                    type="number"
                                                    fullWidth
                                                    margin="normal"
                                                />
                                            </>
                                        ) : (
                                             generatePaymentMethodOptions()
                                        )}
                                    </FormControl>

                                </StepContent>
                            </Step>
                        ))}
                        <Divider style={{ marginTop: '1rem' }} />
                        <div style={{ marginTop: '1rem' }}>
                            <Button disabled={activeStep === 0} onClick={handleBack}>
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                disabled={(activeStep === 0 && !amount) || (activeStep === 1 && !paymentMethod)}
                            >
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </div>
                    </Stepper>
                </Box>
            </Box>
        </Box>
    );
}
export default PostDonation