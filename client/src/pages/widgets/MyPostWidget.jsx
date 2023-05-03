import { useState } from 'react'
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { storage } from '../../firebase';
import { storage } from '../../firebase/firebase';
import {
    EditOutlined
    ,DeleteOutlined
    ,AttachFileOutlined
    ,GifBoxOutlined
    ,ImageOutlined
    ,MicOutlined
    ,MoreHorizOutlined
} from '@mui/icons-material';

import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery,
    CircularProgress,
} from '@mui/material';

import FlexBetween from '../../components/CustomStyledComponents/FlexBetween';
import Dropzone from 'react-dropzone'
import UserAvatar from '../../components/CustomStyledComponents/UserAvatar';
import { setPosts } from "../../state" 
import { useDispatch, useSelector } from 'react-redux';
import WidgetWrapper from '../../components/CustomStyledComponents/WidgetWrapper';
import { postSchema } from '../../utils/Schemas';

const MyPostWidget = ({ profilePhotoUrl }) => {
    const dispatch = useDispatch()
    const [imageUrls, setImageUrls] = useState([]);
    const [errors, setErrors] = useState({});
    const [uploadedUrls, setUploadUrls] = useState([]);
    const [image, setImage] =useState(null);
    const [post, setPost] = useState("");
    const { palette } = useTheme();
    const { username } = useSelector((state) => state.user)
    const token = useSelector((state) => state.token);
    const [loading, setLoading] = useState(false);
    
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const { mediumMain, medium} = palette.neutral;

    const handleDrop = (acceptedFiles) => {
        acceptedFiles = acceptedFiles.slice(0,isNonMobileScreens ? 5 : 4)

        setImageUrls(acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        })));

        setImage(acceptedFiles)
        console.log("Loaded file")


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
        setImage(null);
        setPost("")
    }

    const uploadFilesToFirebase = () => {
        var progress = 0; // initialize progress
        var count = imageUrls.length; // count the number of files
        imageUrls.forEach((file) => {
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
                    setUploadUrls([...uploadedUrls, downloadURL])
                })
            })
        })
    }
    
    const handleSubmit = async(e) => {
      e.preventDefault();
      try {
        setLoading(true)
        await postSchema.validate({ caption: post, images: imageUrls }, { abortEarly: false });
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
          await postSchema.validate({ caption: post, images: imageUrls }, { abortEarly: false });
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
    <WidgetWrapper m="0 0 2rem 0" sx={{ textAlign: "center"}}>
    <Button>Sharing your story here</Button>
    </WidgetWrapper>
  )
}

export default MyPostWidget