import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { BsFillSendFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { addComments } from "../redux/slice";

const Articles = ({
  articleId,
  articleTitle,
  articleName,
  articleText,
  articleImg,
  articleLink,
  articleWriter,
}) => {
  const [openComment, setOpenComment] = useState(false);
  const [viewComment, setViewComment] = useState(false);
  const [likeArticle, setLikeArticle] = useState(false);
  const [commentDetails, setCommentDetails] = useState("");
  const [commentsArray, setCommentsArray] = useState([]);

  const dispatch = useDispatch();
  const allComments = useSelector((store) => store.appReducer.comments);
  const articleComments = useSelector(
    (store) => store.appReducer.comments[articleId]
  );

  // const commentsListRef = collection(db, "comments");

  // useEffect(() => {
  //   const getComments = async () => {
  //     const commentsData = await getDocs(commentsListRef);
  //     const filteredData = commentsData.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }));
  //     setCommentsArray(filteredData);
  //   };

  //   getComments();
  // }, []);

  const addComment = async () => {
    try {
      // await addDoc(commentsListRef, {
      //   name: "John",
      //   comment: commentDetails,
      // });
      dispatch(addComments({ articleId, comment: commentDetails }));
      console.log(commentDetails);
      console.log(allComments);
      setOpenComment(!openComment);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-5 my-5 text-gray-400  mx-5 rounded-lg shadow-inner shadow-gray-500 py-5 xl:mt-0">
      <div className="flex gap-4">
        <img
          src={
            articleImg
              ? articleImg
              : "https://undsgn.com/wp-content/uploads/2018/04/ltotbngnzzu-uai-1600x900.jpg"
          }
          alt=""
          className="w-[7.5vw] h-[5vh] xl:w-[2.5vw] xl:h-[5vh] object-cover rounded-full"
        />
        <div>
          <span>{articleName}</span>
          <span className="text-[13px] text-gray-400 block">
            {articleWriter}
          </span>
        </div>
      </div>
      <div className="mt-2 text-justify">
        <h2 className="font-bold">{articleTitle}</h2>
        <p className="mt-2">{articleText}</p>
      </div>
      {articleImg && (
        <div className="my-3">
          <img
            src={articleImg}
            className="max-w-full max-h-full object-cover rounded-xl"
            alt="Article Img"
          />
        </div>
      )}
      <div>
        <a
          href={articleLink}
          className="underline text-[#F2FC89]"
          target="_blank"
        >
          Read more
        </a>
      </div>
      <div className="flex gap-4">
        <span
          onClick={() => {
            setLikeArticle(!likeArticle);
          }}
          className="cursor-pointer"
        >
          {likeArticle ? (
            <AiFillHeart className="mt-2 text-xl text-red-600 hover:text-red-600" />
          ) : (
            <AiOutlineHeart className="mt-2 text-xl text-white hover:text-red-600" />
          )}
        </span>
        <p className="cursor-pointer flex  gap-1">
          {" "}
          <span
            className="cursor-pointer flex mt-2 gap-2"
            onClick={() => {
              setOpenComment(!openComment);
            }}
          >
            <BiCommentDetail className=" text-xl" />
            <span className="text-sm mt-[-1px]">Comment </span>
          </span>
          <span
            onClick={() => {
              setViewComment(!viewComment);
            }}
            className="mt-[5px]"
          >
            {articleComments && <span>({articleComments.length})</span>}
          </span>
        </p>
      </div>
      <div className="mt-4">
        {viewComment && (
          <>
            {articleComments && (
              <>
                {articleComments.map((article, index) => {
                  return (
                    <div key={index}>
                      <p className="capitalize">{article.toLowerCase()}</p>
                    </div>
                  );
                })}
              </>
            )}
          </>
        )}
      </div>
      <div>
        {openComment && (
          <div className="flex flex-col border-b-2 border-gray-700 w-[50vw] mt-2 ms-0">
            <textarea
              autoFocus
              value={commentDetails}
              onChange={(e) => setCommentDetails(e.target.value)}
              placeholder="Write your comment here..."
              cols=""
              rows="1"
              className="px-1 capitalize py-1 mt-1 w-[50vw]  outline-none mb-2 text-sm Vsmall:w-[60vw] lg:text-lg bg-transparent "
            ></textarea>
            <span className="flex mt-0 justify-end items-end w-[50vw] mb-3">
              <button onClick={addComment} type="button">
                <BsFillSendFill />
              </button>
            </span>
          </div>
        )}
      </div>
      <hr className="my-5" />
    </div>
  );
};
export default Articles;
