import {
    Card,
    CardContent,
    Divider,
    Box,
    Typography,
    TextField,
    FormControlLabel,
    Checkbox,
    Button,
    Grid,
    RadioGroup,
    Radio,
    FormControl,
    MenuItem, useMediaQuery, IconButton, Avatar, useTheme, List, ListItem, ListItemAvatar, ListItemText,
} from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import React, {useState} from "react";
import FlexBetween from "../../components/CustomStyledComponents/FlexBetween";
import {DeleteOutlined, EditOutlined} from "@mui/icons-material";
import Dropzone from "react-dropzone";
import {useDispatch, useSelector} from "react-redux";
import {setPosts} from "../../state";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../firebase/firebase";
import {postSchema} from "../../utils/Schemas";

const currencies = [
    {
        value: 'USD',
        label: 'USD',
    },
    {
        value: 'VND',
        label: 'VND',
    }
];

const agreement = [
    "I agree to the terms and conditions",
    "I agree to the privacy policy",
    "I confirm that the information provided in this form is true and accurate"];
const categories = [
    {

        label: "Request financial assistance",
        value: "1",
    },
    {

        label: "Sharing",
        value: "2"
    },
    {

        label: "Fundraising",
        value: "3",
    }
];

const PostForm = () => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({});
    const [post, setPost] = useState("");
    const { palette } = useTheme();
    const { username } = useSelector((state) => state.user)
    const token = useSelector((state) => state.token);
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({
        checkedA: false,
        checkedB: false,
        checkedC: false,
    });

    const acceptMediaExtensions = {
        extension: [".jpg", ".jpeg", ".png", ".gif", ".webp", ".mp4", ".webm"],
        mime: [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
            "video/mp4",
            "video/webm"
        ]
    }
    const acceptDocumentExtensions = {
        extension: [".pdf"],
        mime: ["application/pdf"]
    }

    const [uploadMediaFiles, setUploadMediaFiles] =useState(null);
    const [uploadMediaFileUrls, setUploadMediaFileUrls] = useState([]);

    const [uploadDocumentFiles, setUploadDocumentFiles] = useState(null);
    const [uploadDocumentFileUrls, setUploadDocumentFileUrls] =useState(null);


    const [value, setValue] = useState("");

    const handleChange2 = (event) => {
        setValue(event.target.value);
    };

    const [selectCategory, setSelectCategory] = useState("");

    const handleChange3 = (event) => {
        setSelectCategory(event.target.value);
    };


    const handleMediaDrop = (acceptedFiles) => {
        acceptedFiles = acceptedFiles.slice(0,isNonMobileScreens ? 5 : 4)

        const isValidFile = acceptedFiles.filter(file => {
            return  !acceptMediaExtensions.mime.includes(file.type);
        });
        if (isValidFile.length > 0) {
            alert("Invalid file type");
            return;
        }

        setUploadMediaFileUrls(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));

        setUploadMediaFiles(acceptedFiles)
        console.log("Loaded file")


    };

    const handleDocumentDrop = (acceptedFiles) => {
        acceptedFiles = acceptedFiles.slice(0,isNonMobileScreens ? 5 : 4)

        setUploadDocumentFileUrls(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));

        setUploadDocumentFiles(acceptedFiles)
        console.log("Loaded document file")
    };


    const handlePost = async (e) => {

        uploadFilesToFirebase();

        const formData = new FormData();
        formData.append("username", username);
        formData.append('caption', post);

        const serverUrl =  process.env.REACT_APP_ENV === "Development" ? "http://localhost:3001/" : process.env.REACT_APP_SERVER_URL



        const response = await fetch( serverUrl + `p`,{
            method: "POST",
            headers: { Authorization: `Bearer ${token}`},
            body:formData
        })

        const posts = await response.json();


        setLoading(false);

        dispatch(setPosts({ posts }));
        setUploadMediaFiles(null);
        setPost("")
    }

    const uploadFilesToFirebase = () => {
        var progress = 0; // initialize progress
        var uploadUrls = uploadMediaFileUrls.concat(uploadDocumentFileUrls);
        uploadUrls.forEach((file) => {
            const fileRef = ref(storage, `user-resource/${file.name}`)
            const uploadTask = uploadBytesResumable(fileRef, file)

            uploadTask.on('state_changed', (snapshot) => {
                progress += snapshot.bytesTransferred / snapshot.totalBytes;
            }, (error) => {
                console.log("error :(")
            }, () => {
                console.log("success!!")
                getDownloadURL(uploadTask.snapshot.ref).then(downloadURL =>{
                    // Add the downloadURL to the uploadedUrls array
                    setUploadMediaFileUrls([...uploadMediaFileUrls, downloadURL])
                })
            })
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            setLoading(true)
            await postSchema.validate({ caption: post, images: uploadMediaFileUrls }, { abortEarly: false });
            setErrors({});
            handlePost();
        } catch (err) {
            const validationErrors = {};
            err.inner.forEach(error => {
                validationErrors[error.path] = error.message;
            });
            setErrors(validationErrors);
        }
    }

    const handleBlur = async() => {
        setErrors({});
    }

    const handleChange = async(e) => {
        setPost(e.target.value)
        if(post.length > 2){
            try {
                await postSchema.validate({ caption: post, medias: uploadMediaFileUrls, documents: uploadDocumentFileUrls }, { abortEarly: false });
                setErrors({});
            } catch (err) {
                const validationErrors = {};
                err.inner.forEach(error => {
                    validationErrors[error.path] = error.message;
                });
                setErrors(validationErrors);
            }
            return;
        }
    }

    return (
        <Box
            >
            <Card
                variant="outlined"
                sx={{
                    p: 0,
                }}
            >
                <Box
                    sx={{
                        padding: "15px 30px",
                    }}
                    display="flex"
                    alignItems="center"
                >
                    <Box flexGrow={1}>
                        <Typography
                            sx={{
                                fontSize: "18px",
                                fontWeight: "500",
                            }}
                        >
                            Create Post to raise money
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <CardContent
                    sx={{
                        padding: "30px",
                    }}
                >
                    <form>
                        <TextField
                            id="postContent"
                            label="Share your story here"
                            multiline
                            rows={4}
                            variant="outlined"
                            fullWidth
                            sx={{
                                mb: 2,
                            }}
                        />
                        <TextField
                            id="outlined-password-input"
                            label="Address"
                            type="text"
                            variant="outlined"
                            fullWidth
                            sx={{
                                mb: 2,
                            }}
                        />


                        <TextField
                            fullWidth
                            id="category"
                            variant="outlined"
                            select
                            label="Select category"
                            value={selectCategory}
                            onChange={handleChange3}
                            sx={{
                                mb: 2,
                            }}
                        >
                            {categories.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>


                        <TextField
                            id="expectedAmount"
                            label="Expected amount"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{
                                mb: 2,
                                width: '50ch'
                            }}
                        />
                        <TextField
                            id="currency"
                            select
                            label="Currency"
                            defaultValue="VND"
                            sx={{
                                mb: 2,
                                width: '30ch'
                            }}
                        >
                            {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            id="date"
                            label="Expected date to get money"
                            type="date"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{
                                mb: 2,
                            }}
                        />

                        <Dropzone
                            acceptedFiles={acceptMediaExtensions.mime}
                            multiple={true}
                            onDrop={handleMediaDrop}
                        >
                            {({ getRootProps, getInputProps}) => (
                                <FlexBetween>

                                    <Box
                                        {...getRootProps()}
                                        border={errors.images ? `2px dashed red` : `2px dashed ${palette.primary.main}`}
                                        p="1rem"
                                        width="100%"
                                        sx={{ "&:hover": { cursor: "pointer"}}}
                                    >
                                        <input onBlur={handleBlur} {...getInputProps()}/>
                                        {!uploadMediaFiles ? (
                                            <div>
                                                <p>Add Images or Video Here</p>
                                                <em>(Only {acceptMediaExtensions.extension.join(", ")} files will be accepted)</em>
                                            </div>
                                        ): (
                                            <FlexBetween>
                                                <FlexBetween>
                                                    {uploadMediaFileUrls.map(img => (
                                                        <img
                                                            width="70rem"
                                                            height="70rem"
                                                            style={{
                                                                margin: "0 0.25rem",
                                                                border: `0.2rem solid ${palette.primary.dark}`
                                                            }}
                                                            src={img.preview} alt={img.name} key={img.preview} />
                                                    ))}
                                                </FlexBetween>

                                                <IconButton>
                                                    <EditOutlined/>
                                                </IconButton>
                                            </FlexBetween>
                                        )}

                                    </Box>
                                    {uploadMediaFiles && (
                                        <IconButton
                                            onClick={() => setUploadMediaFiles(null)}
                                        >
                                            <DeleteOutlined/>
                                        </IconButton>
                                    )}
                                </FlexBetween>
                            )}
                        </Dropzone>
                        <div style={{
                            marginTop: "1rem",
                            marginBottom: "1rem",
                        }}></div>
                        <Dropzone
                            acceptedFiles={acceptDocumentExtensions.mime}
                            multiple={true}
                            onDrop={handleDocumentDrop}
                        >
                            {({ getRootProps, getInputProps}) => (
                                <FlexBetween>
                                    <Box
                                        {...getRootProps()}
                                        border={errors.images ? `2px dashed red` : `2px dashed ${palette.primary.main}`}
                                        p="1rem"
                                        width="100%"
                                        sx={{ "&:hover": { cursor: "pointer"}}}
                                    >
                                        <input onBlur={handleBlur} {...getInputProps()}/>
                                        {!uploadDocumentFiles ? (
                                            <div>
                                                <p>Add document here</p>
                                                <em>(Only *.pdf will be accepted)</em>
                                            </div>
                                        ): (
                                            <FlexBetween>
                                                <FlexBetween>
                                                    <List>
                                                        {uploadDocumentFiles.map(document, index => (
                                                            <ListItem key={index}>
                                                                <ListItemAvatar>
                                                                    <Avatar>
                                                                        <FolderIcon />
                                                                    </Avatar>
                                                                </ListItemAvatar>
                                                                <ListItemText
                                                                    primary={document.name}
                                                                />
                                                            </ListItem>
                                                        ))}
                                                    </List>
                                                </FlexBetween>

                                                <IconButton>
                                                    <EditOutlined/>
                                                </IconButton>
                                            </FlexBetween>
                                        )}

                                    </Box>
                                    {uploadDocumentFiles && (
                                        <IconButton
                                            onClick={() => setUploadDocumentFiles(null)}
                                        >
                                            <DeleteOutlined/>
                                        </IconButton>
                                    )}
                                </FlexBetween>
                            )}
                        </Dropzone>


                        <div style={{marginTop: "1rem"}}>
                            <Button color="primary" variant="contained">
                                Submit
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};

export default PostForm;
