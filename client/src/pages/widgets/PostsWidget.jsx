import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { setPosts } from "../../state";
import { v4 as uuidv4 } from 'uuid';



import SinglePostWidget from './SinglePostWidget';

import SinglePostSkeleton from "../../components/Skeletons/SinglePostSkeleton";

const PostsWidget = ({ username, isProfile = false}) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);

    const serverUrl =  process.env.REACT_APP_ENV === "Development" ? "http://localhost:3001/" : process.env.REACT_APP_SERVER_URL 


    const getPosts = async () => {
        // const response = await fetch( serverUrl + "p", {
        //     method: "GET",
        //     headers: { Authorization: `Bearer ${token}`}
        // });
        // var data = await response.json();
        const data = [
            {
                "_id":"63f19362618edabfc8738eff",
                "username":"mjherzalla",
                "userId":"63f19345618edabfc8738eb2",
                "location":"98125",
                "caption":"c",
                "postImageUrls":[
                    {
                        "url":"https://res.cloudinary.com/diskudcr3/image/upload/v1676776290/chatter/lxalbkladyeav9llumqn.png",
                        "filename":"chatter/lxalbkladyeav9llumqn",
                        "_id":"63f19362618edabfc8738f00"
                    }
                ],
                "userProfilePhoto":"https://i.stack.imgur.com/l60Hf.png",
                "likes":{

                },
                "commentCount":0,
                "createdAt":"2023-02-19T03:11:30.883Z",
                "updatedAt":"2023-02-19T03:11:30.883Z",
                "__v":0
            },
            {
                "_id":"63f04333657eaf79d6a389d4",
                "username":"moomle22",
                "userId":"63f042a6657eaf79d6a38940",
                "location":"bahrain",
                "caption":"y",
                "postImageUrls":[
                    {
                        "url":"https://res.cloudinary.com/diskudcr3/image/upload/v1676690227/chatter/gl3xq9dnuua0m9rmlfj1.png",
                        "filename":"chatter/gl3xq9dnuua0m9rmlfj1",
                        "_id":"63f04333657eaf79d6a389d5"
                    }
                ],
                "userProfilePhoto":"https://i.stack.imgur.com/l60Hf.png",
                "likes":{
                    "Hakerrrr":true
                },
                "commentCount":2,
                "createdAt":"2023-02-18T03:17:07.397Z",
                "updatedAt":"2023-02-19T03:12:41.948Z",
                "__v":0
            }
        ]
        dispatch(setPosts({ posts: data }));
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
            _id,
            userId,
            username,
            location,
            caption,
            postImageUrls,
            userProfilePhoto,
            likes,
            commentCount,
            createdAt
        }) => (
            <SinglePostWidget
            key={uuidv4()}
            postId={_id}
            postUserId={userId}
            postAuthorUsername={username}
            location={location}
            caption={caption}
            postImageUrls={postImageUrls}
            userProfilePhoto={userProfilePhoto}
            likes={likes}
            commentCount={commentCount}
            createdAt={createdAt}
            />
        )
        
        )
        }
       </>
    )
}

export default PostsWidget;