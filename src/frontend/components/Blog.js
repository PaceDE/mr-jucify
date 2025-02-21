import React from "react";

import Banner from "./Banner";

import image1 from '../images/1.jpg';
import image2 from '../images/2.jpg';
import image3 from '../images/3.jpg';

const Blog = () => {
  const data = [
    {"id": 0, "title": "Best Fruit Online!", "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa rerum perferendis recusandae pariatur nemo beatae eum deserunt aspernatur porro molestiae!", "author": "Abik", "image": image1},
    {"id": 1, "title": "Best Fruit Online!", "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa rerum perferendis recusandae pariatur nemo beatae eum deserunt aspernatur porro molestiae!", "author": "Dipesh", "image": image2},
    {"id": 2, "title": "Best Fruit Online!", "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa rerum perferendis recusandae pariatur nemo beatae eum deserunt aspernatur porro molestiae!", "author": "Loozala", "image": image3},
    {"id": 3, "title": "Best Fruit Online!", "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa rerum perferendis recusandae pariatur nemo beatae eum deserunt aspernatur porro molestiae!", "author": "Saugat", "image": image2},
    {"id": 4, "title": "Best Fruit Online!", "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa rerum perferendis recusandae pariatur nemo beatae eum deserunt aspernatur porro molestiae!", "author": "Urjala", "image": image1},
    {"id": 6, "title": "Best Fruit Online!", "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa rerum perferendis recusandae pariatur nemo beatae eum deserunt aspernatur porro molestiae!", "author": "Test", "image": image2},
  ];


  return (
    <div className="blog-page">
      <div className="mb-10">
        <Banner pageTitle={"blog"} />
      </div>
      <div className="w-4/5 m-auto flex flex-wrap justify-center">
          {data.map(d => (
            <div className="w-[300px] mx-5 mb-10 px-3 py-2 flex flex-col shadow-md blog-card" key={d["id"]}>
              <div className="w-full h-[300px] border-b blog-img-div">
                <img src={d["image"]} alt="image" className="w-full h-full object-cover blog-img" />
              </div>
              <div className="p-2 flex flex-col content">
                <div className="my-1 text-lg font-semibold">
                  {d["title"]}
                </div>
                <div className="mb-2 text-sm text-gray-600 text-justify">
                  {d["description"]}
                </div>
                <div className="mt-2 text-sm font-semibold">
                  @{d["author"]}
                </div>
              </div>
            </div>

          ))}
          
          
      </div>
    </div>
  );
};

export default Blog;
