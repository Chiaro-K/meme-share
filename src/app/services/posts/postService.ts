import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { IAddPost } from 'src/app/models/Post';

export class PostService {
  // use config
  url = 'https://localhost:7129/api/';
  apiKey = ''; // <-- Enter your own key here!

  constructor() {}
  // Example of a GET request
  getAllPosts = async (postType: string) => {
    //TODO
    const options = {
      url: `${this.url}Posts/getPosts/${postType}`,
      headers: { 'Content-Type': 'application/json' },
    };
    return await CapacitorHttp.get(options);
  };

  getUserUploads = async (fireId: string) => {
    //TODO
    const options = {
      url: `${this.url}Posts/getUserUploads/${fireId}`,
      headers: { 'Content-Type': 'application/json' },
    };
    return await CapacitorHttp.get(options);
  };

  getPost = async (postId: string) => {
    const options = {
      url: `${this.url}Posts/${postId}`,
      headers: { 'Content-Type': 'application/json' },
    };
    return await CapacitorHttp.get(options);
  };

  getPostTypes = async () =>{
    const options = {
      url: `${this.url}Posts/postTypes`,
      headers: { 'Content-Type': 'application/json' },
    };
    return await CapacitorHttp.get(options);
  }

  createPost = async (post: IAddPost) => {
    //TODO
    post.userId = 'AD230952-27D0-4E27-98C8-460D74BB6696';

    const options = {
      headers: { 'Content-Type': 'application/json' },
      url: `${this.url}Posts`,
      method: "POST",
      data: post
    };

    return await CapacitorHttp.post(options);
  };
}
