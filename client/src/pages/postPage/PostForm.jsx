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
    MenuItem, useMediaQuery, IconButton, Avatar, useTheme, List, ListItem, ListItemAvatar, ListItemText, FormGroup,
} from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import React, {useState} from "react";
import FlexBetween from "../../components/CustomStyledComponents/FlexBetween";
import {DeleteOutlined, EditOutlined} from "@mui/icons-material";
import Dropzone from "react-dropzone";
import {useDispatch, useSelector} from "react-redux";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../firebase/firebase";
import {postSchema} from "../../utils/Schemas";
import Navbar from "../../components/navbar";
import {useNavigate} from "react-router-dom";
import {stringify, v4 as uuidv4} from 'uuid';
import {createPostAsync} from "../../apiService/baseApi";
import {useStore} from "react-redux";
import setUpInterceptor from "../../apiService/setupInterceptor";

const currencies = [
    {
        value: '2',
        label: 'USD',
    },
    {
        value: '1',
        label: 'VND',
    }
];

const categories = [
    {

        label: "Request financial assistance",
        value: '1',
    },
    {

        label: "Sharing",
        value: '2'
    },
    {

        label: "Fundraising",
        value: '3',
    }
];

const PostForm = () => {
    const store = useStore();
    setUpInterceptor(store);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const [errors, setErrors] = useState({});
    const { palette } = useTheme();
    const { username } = useSelector((state) => state.user)
    const token = useSelector((state) => state.token);
    const refreshToken = useSelector((state) => state.refreshToken);

    const [loading, setLoading] = useState(false);
    const [isAgreePolicy, setIsAgreePolicy] = useState(false);
    const [formState, setFormState] = useState({
        content: null,
        location: null,
        mediaUrls: [],
        documentUrls: [],
        expectedAmount: 0,
        expectedReceivedDate: null,
        postCategoryEnum: null,
        currencyEnum: "1"
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
    const [downloadMediaFileUrls, setDownloadMediaFileUrls] = useState([]);

    const [uploadDocumentFiles, setUploadDocumentFiles] = useState(null);
    const [uploadDocumentFileUrls, setUploadDocumentFileUrls] =useState([]);
    const [downloadDocumentFileUrls, setDownloadDocumentFileUrls] = useState([]);

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

    const handleFormInputChange = async (event) => {
        const { name, value } = event.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
        try {
            setLoading(true)
            await postSchema.validate(
                {
                    content: formState.content,
                    images: uploadMediaFileUrls,
                    documents: uploadDocumentFileUrls,
                    expectedAmount: formState.expectedAmount,
                    expectedReceivedDate: formState.expectedReceivedDate,
                    currencyEnum: formState.currencyEnum,
                    location: formState.location,
                    postCategoryEnum: formState.postCategoryEnum,
                }, { abortEarly: false });
            setErrors({});
            setLoading(false)
        } catch (err) {
            const validationErrors = {};
            err.inner.forEach(error => {
                validationErrors[error.path] = error.message;
            });
            setErrors(validationErrors);
        }

    };

    const handleDocumentDrop = (acceptedFiles) => {
        acceptedFiles = acceptedFiles.slice(0,isNonMobileScreens ? 5 : 4)

        setUploadDocumentFileUrls(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));

        setUploadDocumentFiles(acceptedFiles)
    };


    const handlePost = async (e) => {
        await uploadFilesToFirebase();


        setFormState(prevState => ({
            ...prevState,
            'documentUrls': downloadDocumentFileUrls,
            'mediaUrls': downloadMediaFileUrls
        }));

        const postData = {
            content: formState.content,
            location: formState.location,
            mediaUrls: formState.mediaUrls,
            documentUrls: formState.documentUrls,
            expectedAmount: Number(formState.expectedAmount),
            expectedReceivedDate: formState.expectedReceivedDate,
            postCategoryEnum: parseInt(formState.postCategoryEnum),
            currencyEnum: parseInt(formState.currencyEnum),
        };
        console.log('File: PostForm.jsx, Line 197:  ');
        var createPostResult = await createPostAsync(postData, token, refreshToken);

        const posts = await createPostResult.json();
        console.log('File: PostForm.jsx, Line 198: handlePost: posts', posts);
        setLoading(false);

        // dispatch(setPosts({ posts }));
        // setUploadMediaFiles(null);
        // setPost("")
    }

    const uploadFilesToFirebase = () => {
        if(uploadMediaFileUrls !== null) {
            uploadMediaFileUrls.forEach((file) => {
                const fileRef = ref(storage, `user-resource/${file.name}_${uuidv4()}`)
                const uploadTask = uploadBytesResumable(fileRef, file)

                uploadTask.on('state_changed', (snapshot) => {
                }, (error) => {
                    console.log("error :(")
                }, () => {
                    console.log("success!!")
                    getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
                        // Add the downloadURL to the uploadedUrls array
                        setDownloadMediaFileUrls([...uploadMediaFileUrls, downloadURL])
                    })
                })
            })
        }

        if(uploadDocumentFileUrls !== null) {
            uploadDocumentFileUrls.forEach((file) => {
                const fileRef = ref(storage, `user-resource/${file.name}_${uuidv4()}`)
                const uploadTask = uploadBytesResumable(fileRef, file)
                uploadTask.on('state_changed', (snapshot) => {
                }, (error) => {
                    console.log("error :(")
                }, () => {
                    console.log("success!!")
                    getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
                        // Add the downloadURL to the uploadedUrls array
                        setDownloadDocumentFileUrls([...uploadMediaFileUrls, downloadURL])
                    })
                })
            })
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true)
        try {
            await postSchema.validate(
                {
                    content: formState.content,
                    images: uploadMediaFileUrls,
                    documents: uploadDocumentFileUrls,
                    expectedAmount: formState.expectedAmount,
                    expectedReceivedDate: formState.expectedReceivedDate,
                    currencyEnum: formState.currencyEnum,
                    location: formState.location,
                    postCategoryEnum: formState.postCategoryEnum,
                }, { abortEarly: false });
            setErrors({});
            await handlePost();
        } catch (err) {
            const validationErrors = {};
            err.inner.forEach(error => {
                validationErrors[error.path] = error.message;
            });
            setErrors(validationErrors);
        }
    }

    const handlePolicyCheckboxChange = (event) => {
        setIsAgreePolicy(event.target.checked);
    }

    const handleBlur = async() => {
        setErrors({});
    }



    return (
        <Box
            >
            <Navbar/>
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
                            name={"content"}
                            value={formState.content}
                            label="Share your story here"
                            multiline
                            rows={4}
                            variant="outlined"
                            onChange={handleFormInputChange}
                            fullWidth
                            required  // <-- add required attribute
                            error={errors.content !== undefined}
                            helperText={errors.content}
                            sx={{
                                mb: 2,
                            }}
                        />
                        <TextField
                            id="outlined-password-input"
                            name={"location"}
                            value={formState.location}
                            label="Address"
                            type="text"
                            variant="outlined"
                            fullWidth
                            error={errors.location !== undefined}
                            helperText={errors.location}
                            onChange={handleFormInputChange}
                            sx={{
                                mb: 2,
                            }}
                        />


                        <TextField
                            fullWidth
                            id="category"
                            name={"postCategoryEnum"}
                            variant="outlined"
                            select
                            label="Select category"
                            value={formState.postCategoryEnum}
                            onChange={handleFormInputChange}
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
                            name={"expectedAmount"}
                            value={formState.expectedAmount}
                            label="Expected amount"
                            type="number"
                            onChange={handleFormInputChange}
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
                            name={"currencyEnum"}
                            value={formState.currencyEnum}
                            select
                            label="Currency "
                            onChange={handleFormInputChange}
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
                            name={"expectedReceivedDate"}
                            label="Expected date to get money"
                            type="date"
                            fullWidth
                            onChange={handleFormInputChange}
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
                                                        {uploadDocumentFiles.map(document => (
                                                            <ListItem>
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


                        <FormControlLabel
                            control={<Checkbox onChange={handlePolicyCheckboxChange} />}
                            label={
                                <>
                                    I have read and agree with{' '}
                                    <a target={"_blank"}  href={window.location.origin  + '/policy'}>tern and policy</a>
                                </>
                            }
                        />
                        <div style={{marginTop: "1rem"}}>
                            <Button
                                onClick={handleSubmit}
                                color="primary"
                                variant="contained"
                                disabled={!isAgreePolicy || loading}
                            >
                                Submit
                            </Button >
                            {!isAgreePolicy && (
                                <p style={{ color: 'red' }}>Please agree to the policy before submitting.</p>
                            )}

                        </div>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};

export default PostForm;
