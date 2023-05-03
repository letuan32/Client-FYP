import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {setPost} from "../../state";
import {fToNow, timeStampToDate} from "../../utils/formatDate";

import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined, PaymentOutlined,
    ShareOutlined,
    RequestQuoteOutlined,
    PriceChangeOutlined, PriceCheckOutlined,
    VolunteerActivismOutlined
} from "@mui/icons-material";

import {
    IconButton,
    Typography,
    useTheme,
    Box,
    useMediaQuery, Modal, Button, ListItem, ListItemAvatar, ListItemText, TextField, InputAdornment
} from "@mui/material";
import FlexBetween from "../../components/CustomStyledComponents/FlexBetween";
import Following from "../../components/Following";
import LikeBox from "../../components/LikeBox"
import CommentBox from "../../components/Comment/Comment";
import {useEffect} from "react";
import MediaCarousel from "./MediaCarousel";
import DonationAmount from "./DonationAmount";


const SinglePostWidget = ({
                              postId,
                              postUserId,
                              postAuthorUsername,
                              postAuthorEmail,
                              location,
                              caption,
                              mediaUrls,
                              documentUrls,
                              userProfilePhoto,
                              createdAt,
                              expectedAmount,
                              currency
                          }) => {
    const [postIdState, setPostIdState] = useState(postId)
    const navigate = useNavigate();
    const [isComments, setIsComments] = useState(false)
    const [likeData, setLikeData] = useState(null)
    const [isLongCaption, setIsLongCaption] = useState(false);
    const isNonMobileScreens = useMediaQuery("(min-width: 800px)");
    const commentCount = 5

    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);


    const {username} = useSelector((state) => state.user)

    // const isLiked = Boolean(likes[username]);
    // const likeCount = Object.keys(likes).length;

    const isAuthor = postAuthorUsername === username


    const {palette} = useTheme();
    const {dark} = palette.primary;
    const {main, medium} = palette.neutral;


    const serverUrl = process.env.REACT_APP_ENV === "Development" ? "https://localhost:7010/" : process.env.REACT_APP_API_GATEWAY



    useEffect(() => {
        console.log('File: SinglePostWidget.jsx, Line 76:  ');
    }, [postIdState])
    const handleCommentToggle = () => {
        setIsComments(!isComments)
    }

    const handleCaptionToggle = () => {
        setIsLongCaption(!isLongCaption)
    }

    return (
        <Box
            m="0 0 2rem 0"
            sx={{
                backgroundColor: palette.background.alt,
                borderRadius: "0.75rem",
                padding: isNonMobileScreens ? "1.5rem 1.5rem 0.75rem 1.5rem" : "1.5rem 0"
            }}
        >

            <Box
                sx={{
                    padding: !isNonMobileScreens ? "0 0.75rem" : ""
                }}
            >
                <Following
                    followingId={postUserId}
                    name={postAuthorUsername}
                    subtitle={location}
                    userProfilePhotoUrl={userProfilePhoto}
                    isAuthor={isAuthor}
                />
                <Typography color={main} sx={{mt: "1rem"}}>
                    {caption.length > 100 ? isLongCaption ? caption : `${caption.substring(0, 100)}...` : caption}
                </Typography>
                {caption.length > 100 ? (
                    <Typography
                        onClick={handleCaptionToggle}
                        sx={{
                            cursor: 'pointer',
                            "&:hover": {
                                color: palette.light
                            }
                        }} color={medium}>
                        {isLongCaption ? 'View less' : 'view More'}
                    </Typography>
                ) : null}
            </Box>

            <Box>
                <MediaCarousel mediaUrls={mediaUrls}  />
            </Box>
            {/*<FlexBetween mt="0.25rem">*/}
            {/*    <FlexBetween gap="1rem">*/}
            {/*        <FlexBetween gap="0.3rem">*/}
            {/*            <IconButton onClick={() => setIsComments(!isComments)}>*/}
            {/*                <ChatBubbleOutlineOutlined/>*/}
            {/*            </IconButton>*/}
            {/*            <Typography>{1111}</Typography>*/}
            {/*        </FlexBetween>*/}
            {/*    </FlexBetween>*/}

            {/*    <IconButton>*/}
            {/*        <ShareOutlined/>*/}
            {/*    </IconButton>*/}
            {/*</FlexBetween>*/}

            {/*TODO: Data from server*/}
            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">
                    <FlexBetween gap="0.3rem">
                        <IconButton>
                            <RequestQuoteOutlined></RequestQuoteOutlined>
                        </IconButton>
                        <Typography>{expectedAmount} {currency}</Typography>
                    </FlexBetween>

                    <FlexBetween gap="0.3rem">
                        <IconButton>
                            <PriceCheckOutlined></PriceCheckOutlined>
                        </IconButton>
                        {/*TODO: Realtime*/}
                        <DonationAmount postId={postId} currency={currency}  />
                    </FlexBetween>

                    <FlexBetween gap="0.3rem">
                        <IconButton
                            onClick={() => {
                                navigate(`/post/${postId}`);
                                navigate(0);
                            }}>
                            <VolunteerActivismOutlined></VolunteerActivismOutlined>
                            <Typography>Donation</Typography>

                        </IconButton>
                    </FlexBetween>
                </FlexBetween>
            </FlexBetween>
            <Box
                sx={{
                    padding: !isNonMobileScreens ? "0 0.75rem" : ""
                }}
            >
                {/* Liked By  */}

                {/*{commentCount ? (*/}
                {/*    <Typography*/}
                {/*        onClick={handleCommentToggle}*/}
                {/*        sx={{*/}
                {/*            cursor: 'pointer',*/}
                {/*            mb: "1rem",*/}
                {/*            "&:hover": {*/}
                {/*                color: palette.background.light*/}
                {/*            }*/}
                {/*        }} color={medium}>*/}
                {/*        {!isComments ? `View ${commentCount > 1 ? "all" + " " + commentCount + " " + "comments" : commentCount + " " + "comment"}` : 'Hide comments'}*/}
                {/*    </Typography>*/}
                {/*) : null}*/}


                <Typography
                    fontWeight="200"
                    fontSize="0.79rem"
                    marginBottom="1rem"
                >Posted {fToNow(createdAt)}</Typography>

            </Box>
            {isComments && (<CommentBox postId={postId}
                                        commentCount={1111}
                                        isNonMobileScreens={isNonMobileScreens}/>)}

        </Box>
    )
}

export default SinglePostWidget
