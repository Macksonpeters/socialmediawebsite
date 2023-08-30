import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Link, NavLink } from "react-router-dom";
import useApiGet from "./hooks/UseApiGet";
import Articles from "./Components/Articles";
import { db } from "./firebase";
import GetUserName from "./Components/modals/GetUserName";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const App = () => {
  const userName = useSelector((store) => store.appReducer.name);
  const navigate = useNavigate();

  const {
    data: dataA,
    isFetching: isFetchingA,
    isLoading: isLoadingA,
    error: errorA,
  } = useApiGet("FetchNews", "https://newsapi.org/v2/top-headlines?country=us");
  // console.log(dataA, errorA);
  // let Data = dataA?.data?.articles;

  const {
    data: dataB,
    isFetching: isFetchingB,
    isLoading: isLoadingB,
    error: errorB,
  } = useApiGet(
    "FetchNewsFromNigeria",
    "https://newsapi.org/v2/top-headlines?country=ng"
  );
  console.log(dataB, errorB);

  if (isLoadingA || isLoadingB) {
    return <p>loading...</p>;
  }

  let Data = dataA?.data?.articles;
  let DataNg = dataB?.data?.articles;

  return (
    <div className="w-full  xl:mt-10">
      {dataA && dataB && userName == "" && <GetUserName />}
      <div className="xl:hidden flex justify-end mx-5 mt-2  text-sm text-[#F2FC89]">
        <a href="#nigerianNews">Click for Nigerian News</a>
      </div>
      <div className="xl:flex xl:w-full">
        <div className=" xl:block  xl:w-[50vw]">
          {Data != undefined && (
            <>
              {Data.map((data, index) => {
                return (
                  <div key={index}>
                    <Articles
                      articleId={index}
                      articleImg={data.urlToImage}
                      articleName={data.source.name}
                      articleTitle={data.title}
                      articleText={data.description}
                      articleLink={data.url}
                      articleWriter={data?.author}
                    />
                  </div>
                );
              })}
            </>
          )}{" "}
        </div>
        <div
          id="nigerianNews"
          className=" xl:bg-[#0e1421] xl:shadow-lg xl:shadow-gray-800 xl:py-5  xl:block xl:w-[30vw] xl:fixed xl:right-10 xl:h-[100vh] xl:overflow-y-scroll nigerianNews"
        >
          <p className="text-center mb-5 font-bold text-[#F2FC89] text-lg merriWeatherFont">
            Nigerian News
          </p>
          {Data != undefined && (
            <>
              {DataNg.map((data, index) => {
                return (
                  <div key={index}>
                    <Articles
                      articleId={data.publishedAt}
                      articleImg={data.urlToImage}
                      articleName={data.author}
                      articleTitle={data.title}
                      articleText={data.description}
                      articleLink={data.url}
                      articleWriter={data?.source.name}
                    />
                  </div>
                );
              })}
            </>
          )}{" "}
        </div>
      </div>
    </div>
  );
};

export default App;
