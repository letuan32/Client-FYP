import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { setPosts } from "../../state";
import {stringify, v4 as uuidv4} from 'uuid';
import {fToNow, timeStampToDate} from "../../utils/formatDate";
import SinglePostWidget from './SinglePostWidget';
import SinglePostSkeleton from "../../components/Skeletons/SinglePostSkeleton";

const PostsWidget = ({ username, isProfile = false}) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);

    const serverUrl =  process.env.REACT_APP_ENV === "Development" ? "https://localhost:7010/" : process.env.REACT_APP_API_GATEWAY


    const getPosts = async () => {
        const response = await fetch( serverUrl + "Post", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`}
        });

        var responseData = await response.json();
        const postData = responseData.posts;
        dispatch(setPosts({ posts: postData }));
       setIsLoading(false)
    }


    const getUserPosts = async() => {
        const response = await fetch( serverUrl + `u/${username}/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`}
       });

       const data = await response.json();
       dispatch(setPosts({ posts: data}))
       setIsLoading(false)
    }

    useEffect(() => {
        if(isProfile){
            getUserPosts();
        } else{
            getPosts();
        }
    },[]);

    if(isLoading){
        return  Array.from(new Array(3)).map((el,index) => (<SinglePostSkeleton key={index}/>)   
      )
    } 

    return (
       <>
        {
         posts?.map(({
            id,
            author: {email},
            author: {displayName},
                         mediaUrls,
                         documentUrls,
            createdById,
            location,
            content,
            imageUrls,
            author: {avatarUrl},
            likes,
            numberOfComment,
             createdAt,
                         expectedReceivedDate,
                         expectedAmount,
                         currency
        }) => (
            <SinglePostWidget
            key={uuidv4()}
            postId={id}
            postUserId={createdById}
            postAuthorUsername={displayName}
            postAuthorEmail={email}
            location={location}
            caption={content}
            mediaUrls={mediaUrls}
            documentUrls={documentUrls}
            userProfilePhoto={avatarUrl}
            createdAt={timeStampToDate(createdAt)}
            expectedReceivedDate={timeStampToDate(expectedReceivedDate)}
            expectedAmount={expectedAmount}
            currency={currency}
            />
        )
        )
        }
           <div>
               <div id="paypal-button-container" />

               <script type="text/javascript">
                   paypal.Buttons().render('#paypal-button-container');
               </script>
           </div>

       </>
    )
}

export default PostsWidget;