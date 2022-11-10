import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import User_1 from "../assets/Users/Profile-Pic-S.png"


export default function Share() {
    return (
        <div className='px-14 my-3'>
            <div className="w-full h-full rounded-xl shadow-md ">
                <div className="p-2.5">
                    <div className="flex items-center">
                        <img className="w-12 h-12 rounded-full object-cover mr-2.5" src={User_1} alt="" />
                        <input
                            placeholder="Share what's on your mind"
                            className="border-none w-full focus:outline-none"
                        />
                    </div>
                    <hr className="m-5" />
                    <div className="flex flex-wrap items-center justify-between">
                        <div className="flex flex-wrap m-3">
                            <div className="flex items-center m-2 cursor-pointer">
                                <PermMediaIcon htmlColor="tomato" className="text-lg mr-1" />
                                <span className="md:text-md sm:text-sm font-semibold">Photo or Video</span>
                            </div>
                            <div className="flex items-center m-2 cursor-pointer">
                                <LabelIcon htmlColor="blue" className="text-lg mr-1" />
                                <span className="md:text-md sm:text-sm font-medium">Tag</span>
                            </div>
                            <div className="flex items-center m-2 cursor-pointer">
                                <LocationOnIcon htmlColor="green" className="text-lg mr-1" />
                                <span className="md:text-md sm:text-sm font-medium">Location</span>
                            </div>
                            <div className="flex items-center m-2 cursor-pointer">
                                <EmojiEmotionsIcon htmlColor="goldenrod" className="text-lg mr-1" />
                                <span className="md:text-md sm:text-sm font-medium">Feelings</span>
                            </div>
                        </div>
                        <button className="border-none p-1.5 rounded bg-green-600 font-medium mr-5 cursor-pointer text-white">Share</button>
                    </div>
                </div>
            </div>
        </div>
    );
}