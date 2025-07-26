import { DB } from "../../../lib/config/db";
import BlogModel from "../../../lib/models/BlogModel";
import { writeFile } from "fs/promises";

const { NextResponse } = require("next/server");
const fs = require('fs')

const loadDb = async () => {
  return await DB;
};
loadDb();
export async function GET(request) {
  const blogId = request.nextUrl.searchParams.get("id");

  if (blogId) {
    const blog = await BlogModel.findById(blogId);
    return NextResponse.json(blog);
  } else {
    const blogs = await BlogModel.find({});
    return NextResponse.json({ blogs });
  }
}

export async function POST(request) {
  const formData = await request.formData();
  const timeStamp = Date.now();

  const image = formData.get("image");
  const imageByteData = await image.arrayBuffer();
  const buffer = Buffer.from(imageByteData);
  const path = `./public/${timeStamp}_${image.name}`;
  await writeFile(path, buffer);
  const imgUrl = `${timeStamp}_${image.name}`;

  const blogData = {
    title: `${formData.get("title")}`,
    description: `${formData.get("description")}`,
    category: `${formData.get("category")}`,
    image: `${imgUrl}`,
    author: `${formData.get("author")}`,
    authorImg: `${formData.get("authorImg")}`,
  };
  await BlogModel.create(blogData);
  console.log("Blog Saved");
  return NextResponse.json({ success: true, msg: "Blog added successfully" });
}

export async function DELETE(request){
    
    const blogId =  request.nextUrl.searchParams.get("id")
    const blogFound = BlogModel.findById(blogId)

    fs.unlink(`./public/${blogFound.image}`,()=>{})

    await BlogModel.findByIdAndDelete(blogId)

    return NextResponse.json({msg:"blog deleted"})
}