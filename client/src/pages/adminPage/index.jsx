import React, {useEffect, useMemo, useRef, useState} from "react";

import {
    Card, CardContent, Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip, useMediaQuery, useTheme, Button,
} from "@mui/material";
import Navbar from "../../components/navbar";
import SinglePostWidget from "../widgets/SinglePostWidget";
import {v4 as uuidv4} from "uuid";
import {timeStampToDate, timeStampToDateString} from "../../utils/formatDate";
import {useDispatch, useSelector} from "react-redux";
import SinglePostSkeleton from "../../components/Skeletons/SinglePostSkeleton";
import {realtimeDB} from "../../firebase/firebase";
import { ref, get, set, push, child, remove , onValue, off   } from "firebase/database";
import VerifyPostWidget from "../widgets/VerifyPostWidget";

const products = [
    {
        id: "1",
        name: "Sunil Joshi",
        post: "Web Designer",
        pname: "Elite Admin",
        priority: "Low",
        pbg: "primary.main",
        budget: "3.9",
    },
    {
        id: "2",
        name: "Andrew McDownland",
        post: "Project Manager",
        pname: "Real Homes WP Theme",
        priority: "Medium",
        pbg: "secondary.main",
        budget: "24.5",
    },
    {
        id: "3",
        name: "Christopher Jamil",
        post: "Project Manager",
        pname: "MedicalPro WP Theme",
        priority: "High",
        pbg: "error.main",
        budget: "12.8",
    },
    {
        id: "4",
        name: "Nirav Joshi",
        post: "Frontend Engineer",
        pname: "Hosting Press HTML",
        priority: "Critical",
        pbg: "success.main",
        budget: "2.4",
    },
];
const BasicTable = () => {
    const isNonMobileScreens = useMediaQuery("(min-width: 800px)");
    const {palette} = useTheme();
    const {dark} = palette.primary;
    const {main, medium} = palette.neutral;
    const [selectPost, setSelectPost] = useState(null);
    const [posts, setPosts] = useState(null);
    const [inProcessPosts, setInProcessPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const token = useSelector((state) => state.token);

    const serverUrl =  process.env.REACT_APP_ENV === "Development" ? "https://localhost:7010/" : process.env.REACT_APP_API_GATEWAY
    const getPosts = async () => {
        const response = await fetch( serverUrl + "Post/un-approve", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`}
        });

        var responseData = await response.json();
        setPosts(responseData.posts)
        setIsLoading(false)
    }

    const onPostSelect = (postId) => {
        selectPost !== null && removePostInProcess(selectPost.id)
        setSelectPost(posts.find((post) => post.id === postId));
        addPostInProcess(postId)
        localStorage.setItem("selectPostId", postId)
    }

    useEffect( () => {
            refreshSelectedPost();
            const requestsRef = ref(realtimeDB, 'approve-processing');
            onValue(requestsRef, (snapshot) => {
                const data = snapshot.val();
                const requestsData = data ? Object.values(data) : [];
                setInProcessPosts(requestsData);
            });
            getPosts();

            return () => {
                var selectedPostId = localStorage.getItem("selectPostId")
                off(requestsRef, null);
                if(selectedPostId === null) return;
                alert(selectedPostId )
                removePostInProcess(selectedPostId)
                localStorage.removeItem("selectPostId")

            }
    },[]);


    const addPostInProcess = (postId) => {
        const postsRef = ref(realtimeDB, "approve-processing");
        set(child(postsRef, postId.toString()), {
            postId: parseInt(postId),
            status: "Processing"});
    }

    const removePostInProcess = (postId) => {
        const nodeRef = ref(realtimeDB, `approve-processing/${postId}`);

        remove(nodeRef)
            .then(() => {
                console.log("Node removed successfully");
            })
            .catch((error) => {
                console.log("Error removing node: ", error);
            });
    }

    const refreshSelectedPost = () => {
        var selectedPostId = localStorage.getItem("selectPostId")
        if(selectedPostId === null) return;
        removePostInProcess(selectedPostId)
        localStorage.removeItem("selectPostId")
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
              >
            <Box
                flexBasis={isNonMobileScreens ? "42%" : undefined}
                mt={isNonMobileScreens ? undefined : "2rem"}
                >
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h3">Basic Table</Typography>
                    <Box
                        sx={{
                            overflow: {
                                xs: "auto",
                                sm: "unset",
                            },
                        }}
                    >
                        <Table
                            aria-label="simple table"
                            sx={{
                                mt: 3,
                                whiteSpace: "nowrap",
                            }}
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            Create by User
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            Submit on
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            Category
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography color="textSecondary" variant="h6">
                                            Amount
                                        </Typography>
                                    </TableCell>

                                    <TableCell align="right">
                                        <Typography color="textSecondary" variant="h6">
                                            Status
                                        </Typography>
                                    </TableCell>


                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {posts.map((post) => (
                                    <TableRow key={post.id}>
                                        <TableCell>
                                                    <Typography
                                                        variant="h6"
                                                        sx={{
                                                            fontWeight: "600",
                                                        }}
                                                    >
                                                        {post.author.email}
                                                    </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                {timeStampToDateString(post.createdAt)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                Financial Request
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography variant="h6">{post.expectedAmount} {post.currency}</Typography>
                                        </TableCell>

                                        <TableCell align="right">
                                            <Typography variant="h6">{post.approveStatus}</Typography>
                                        </TableCell>

                                        <TableCell align="right">
                                            {selectPost !== null && selectPost.id === post.id ? (
                                                <Button
                                                    disabled={true}
                                                    sx={{ pl: "4px", pr: "4px", color: "#000000" }}
                                                    variant="h6"
                                                >
                                                    Selected
                                                </Button>
                                            ) : inProcessPosts?.find((postInProcess) => postInProcess.postId === post.id) ? (
                                                <Button
                                                    disabled={true}
                                                    sx={{ pl: "4px", pr: "4px", color: "#000000" }}
                                                    variant="h6"
                                                >
                                                    {inProcessPosts?.find((postInProcess) => postInProcess.postId === post.id).status}
                                                </Button>
                                            ) : (
                                                <Button
                                                    sx={{
                                                        pl: "4px",
                                                        pr: "4px",
                                                        backgroundColor: "primary.main",
                                                        color: "#fff",
                                                    }}
                                                    variant="h6"
                                                    onClick={() => {
                                                        onPostSelect(post.id);
                                                    }}
                                                >
                                                    Process
                                                </Button>
                                            )}
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </CardContent>
            </Card>
        </Box>
                {selectPost !== null ? (
                    <Box
                        flexBasis={isNonMobileScreens ? "100%" : undefined}
                        mt={isNonMobileScreens ? undefined : "2rem"}
                    >
                        <VerifyPostWidget
                            key={uuidv4()}
                            postId={selectPost.id}
                            postUserId={selectPost?.userId}
                            postAuthorUsername={selectPost.author.displayName}
                            location={selectPost.location}
                            caption={selectPost.content}
                            mediaUrls={selectPost.mediaUrls}
                            documentUrls={selectPost.documentUrls}
                            userProfilePhoto={selectPost.author.avatarUrl}
                            createdAt={timeStampToDate(selectPost.createdAt)}
                            expectedReceivedDate={timeStampToDate(selectPost.expectedReceivedDate)}
                            expectedAmount={selectPost.expectedAmount}
                            currency={selectPost.currency}
                        ></VerifyPostWidget>
                    </Box>
                ) : <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <Typography variant="h5" style={{ fontSize: "24px", textAlign: "center" }}>Select post to process</Typography>
                </Box>}

        </Box>
        </Box>
    );
};

export default BasicTable;
