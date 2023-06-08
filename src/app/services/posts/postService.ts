import { CapacitorHttp, HttpResponse } from '@capacitor/core';

export class PostService {
  // use config
  url = 'https://localhost:7129/api/';
  apiKey = ''; // <-- Enter your own key here!

  constructor() { }
  // Example of a GET request
  getAllPosts = async () => {
    const options = {
      url: `${this.url}Posts/GetPosts/D407A68B-85FF-4AAA-9F93-0F1784D810EC`,
      //   headers: { 'X-Fake-Header': 'Fake-Value' },
      //   params: { size: 'XL' },
    };

    return await CapacitorHttp.get(options);

    // or...
    // const response = await CapacitorHttp.request({ ...options, method: 'GET' })
  }

  getPost = async (postId: string) =>{
    const options = {
      url: `${this.url}Posts/GetPost/${postId}`,
      //   headers: { 'X-Fake-Header': 'Fake-Value' },
      //   params: { size: 'XL' },
    };
    return await CapacitorHttp.get(options);
  }
}