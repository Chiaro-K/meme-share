import { CapacitorHttp, HttpResponse } from '@capacitor/core';

export class UserService {
  // use config
  url = 'https://localhost:7129/api/';
  apiKey = ''; // <-- Enter your own key here!

  constructor() { }
  getUser = async (userId: string) =>{
    const options = {
      url: `${this.url}Users/${userId}`,
      //   headers: { 'X-Fake-Header': 'Fake-Value' },
      //   params: { size: 'XL' },
    };
    return await CapacitorHttp.get(options);
  }
}