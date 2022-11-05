import Icon from "./Icon";
import { useState } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import axios from "axios";

function Post({ post }) {
  const [description, setDescription] = useState(post.description);
  const [showTranslation, setShowTranslation] = useState(false);
  const translateText = async () => {
    await axios
      .post(`https://libretranslate.de/detect`, {
        q: description,
      })
      .then((response) => {
        const sourceLanguage = response.data[0].language;
        let data = {
          q: description,
          source: sourceLanguage,
          target: "tr",
          format: "text",
        };

        axios
          .post(`https://libretranslate.de/translate`, data)
          .then((response) => {
            setDescription(response.data.translatedText);
          });
      });
    setShowTranslation(true);
  };

  const originalText = () => {
    setDescription(post.description);
    setShowTranslation(false);
  };

  return (
    <div className="relative card space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center -m-2">
          <div className="w-8 h-8 overflow-hidden rounded-full cursor-pointer">
            <img className="w-full" src={post.profile} alt={post.profile} />
          </div>
          <h2 className=" font-semibold">{post.username}</h2>
        </div>
        <BiDotsHorizontalRounded className="w-5 h-5 cursor-pointer" size={20} />
      </div>
      <div className="relative -mx-5 aspect-square overflow-hidden">
        <img className="w-full" src={post.image} alt={post.username} />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between mb-2">
          <div className="flex items-center gap-4">
            <Icon
              className="cursor-pointer hover:opacity-50"
              name="heart"
              size={24}
            />
            <Icon
              className="cursor-pointer hover:opacity-50"
              name="message"
              size={24}
            />
            <Icon
              className="cursor-pointer hover:opacity-50"
              name="share"
              size={24}
            />
          </div>
          <Icon
            className="cursor-pointer hover:opacity-50"
            name="bookmark"
            size={24}
          />
        </div>
        <span className=" font-semibold">{`${post.likes} likes`}</span>
        <p>
          <span className="font-semibold">{post.username} </span>
          {description}
        </p>
        <h3 className="text-xs text-gray-500">
          {post.createdAt}
          {showTranslation ? (
            <span
              onClick={originalText}
              className="text-black font-semibold text-xs cursor-pointer mx-2"
            >
              See Original
            </span>
          ) : (
            <span
              onClick={translateText}
              className="text-black font-semibold text-xs cursor-pointer mx-2"
            >
              See Translation
            </span>
          )}
        </h3>
      </div>

      <div className="h-[1px] relative left-0 right-0 bg-gray-200 -mx-5"></div>

      <div className="flex gap-4">
        <Icon className="cursor-pointer " name="emoji" size={30} />
        <input
          className="focus:outline-none w-full"
          type="text"
          placeholder="Add a comment"
        />
        <button className="text-blue-500">Post</button>
      </div>
    </div>
  );
}

export default Post;
