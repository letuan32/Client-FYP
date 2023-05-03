import {Typography} from "@mui/material";
import {onValue, ref} from "firebase/database";
import {useEffect, useState} from "react";
import {realtimeDB} from "../../firebase/firebase";

const DonationAmount = ({postId, currency}) => {
    const [donationAmount, setDonationAmount] = useState(0);
    useEffect(() => {
        const postRef = ref(realtimeDB, `post-approval/${postId}`);
        onValue(postRef, (snapshot) => {
            const data = snapshot.val();
            setDonationAmount(data.Amount);
        });
    }, [])
  return (
    <Typography>
        {donationAmount ?? 0} {currency}
    </Typography>
  )
}

export default DonationAmount