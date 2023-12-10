import { user } from '@angular/fire/auth';
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
  
  searchPosts = async (term: string) => {
    const options = {
      url: `${this.url}Posts/search/${term}`,
      headers: { 'Content-Type': 'application/json' },
    };
    return await CapacitorHttp.get(options);
  };

  getSavedPosts = async (userId: string) => {
    const options = {
      url: `${this.url}Posts/savedPosts/${userId}`,
      headers: { 'Content-Type': 'application/json' },
    };
    return await CapacitorHttp.get(options);
  };

  getPostTypes = async () => {
    const options = {
      url: `${this.url}Posts/postTypes`,
      headers: { 'Content-Type': 'application/json' },
    };
    return await CapacitorHttp.get(options);
  };

  createPost = async (post: IAddPost) => {
    //TODO
    post.userId = 'a7c232a9-8625-4beb-9719-e50162a6901a';

    const options = {
      headers: { 'Content-Type': 'application/json' },
      url: `${this.url}Posts`,
      method: 'POST',
      data: post,
    };

    return await CapacitorHttp.post(options);
  };

  incrementPostView = async (postId: string) => {
    const options = {
      headers: { 'Content-Type': 'application/json' },
      url: `${this.url}Posts/increment-view-count`,
      method: 'PATCH',
      data: { postId: postId },
    };

    return await CapacitorHttp.patch(options);
  };

  savePost= async (postId: string, userId: string) => {
    const options = {
      headers: { 'Content-Type': 'application/json' },
      url: `${this.url}Posts/save-post`,
      method: 'POST',
      data: { postId: postId, userId: userId },
    };

    return await CapacitorHttp.post(options);
  };
}
