"use client";
import { assets } from "../../../Assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";

function page() {
  const [image, setImage] = useState("");
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Alex Bannet",
    authorImg: "/author_img.png",
  });

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setData({
      ...data,
      [name]: value,
    });
    console.log(data);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("image", image);
    formData.append("authorImg", data.authorImg);

    const response = await axios.post("/api/blogs", formData);

    if (response.data.success) {
      toast.success(response.data.msg);
      setImage(false);
      setData({
        title: "",
        description: "",
        category: "Startup",
        author: "Alex Bannet",
        authorImg: "/author_img.png",
      });
    } else {
      toast.error("Error");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="pt-5 px-5 sm:pt-12 sm:pl-16">
        <p className="text-xl">Upload Thumbnail</p>
        <label htmlFor="image">
          <Image
            className="mt-4"
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            alt="upload area"
            width={140}
            height={70}
          />
        </label>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          id="image"
          hidden
          required
        />
        <p className="text-xl mt-4">Title</p>
        <input
          value={data.title}
          name="title"
          onChange={handleChange}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
          type="text"
          placeholder="Title"
          required
        />
        <p className="text-xl mt-4">Title</p>
        <textarea
          value={data.description}
          name="description"
          onChange={handleChange}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
          type="text"
          placeholder="Write some content"
          rows={6}
          required
        ></textarea>
        <p className="text-xl mt-4">Category</p>
        <select
          name="category"
          onChange={handleChange}
          value={data.category}
          className="w-40 mt-4 px-4 py-3 border text-gray-500"
        >
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
        <button
          type="submit"
          className="mt-8 w-40 h-12 bg-black text-white block"
        >
          Add
        </button>
      </form>
    </>
  );
}

export default page;
