import { useState } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import User_1 from "../assets/Users/Profile-Pic-S.png"
import post_1 from "../assets/posts/library-06.jpg"
import Comments from "./Comments";

// import Comments from "../comments/Comments";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const arr = ['https://www.westend61.de/images/0001152661pw/golden-retriever-looking-away-while-standing-on-rock-in-lake-against-mountain-during-winter-CAVF61777.jpg', 'https://cdn.britannica.com/67/19367-050-885866B4/Valley-Taurus-Mountains-Turkey.jpg']

  const liked = false;

  return (
    arr.map((image) => (
      <div className="px-14 mb-12">
        <div className="bg-white shadow-md p-8 rounded-lg ">
          <div className="flex items-center justify-between">
            <div className="flex gap-5">
              <img src={User_1} alt="" width={40} height={40} className='rounded-full' />
              <div className="flex flex-col">
                <Link
                  to={`/profile/1234tyui`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <span className="font-bold">Bonnie Green</span>
                </Link>
                <span className="text-xs">1 min ago</span>
              </div>
            </div>
            <MoreHorizIcon />
          </div>
          <div className="my-5">
            <p>Hey look at my library is it cool?</p>
            <img src={image} alt="" className="w-full h-full object-cover mt-5" />
          </div>
          <div className="flex items-center gap-5 flex-wrap">
            <div className="flex items-center gap-3 cursor-pointer text-sm">
              {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
              12
            </div>
            <div className="flex items-center gap-3 cursor-pointer text-sm" onClick={() => setCommentOpen(!commentOpen)}>
              <TextsmsOutlinedIcon />
              2
            </div>
            <div className="flex items-center gap-3 cursor-pointer text-sm">
              <SendOutlinedIcon />
            </div>
          </div>
          {commentOpen && <Comments />}
        </div>
      </div>))
  );
};

export default Post;