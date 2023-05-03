import {Typography} from "@mui/material";
import {onValue, ref} from "firebase/database";
import {useEffect, useState} from "react";
import {realtimeDB} from "../../firebase/firebase";

const PostStatus = ({postId}) => {
    const [status, setStatus] = useState('');
    useEffect(() => {
        const postRef = ref(realtimeDB, `post-approval/${postId}`);
        onValue(postRef, (snapshot) => {
            const data = snapshot.val();
            setStatus(data.ApproveStatus);
        });
    }, [])
  return (
    <Typography color={(status === 'banned' && 'error') || 'success'}>
        {status}
    </Typography>
  )
}

export default PostStatus