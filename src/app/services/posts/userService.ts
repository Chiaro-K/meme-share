import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { IAddUser } from 'src/app/models/User';

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

  getUserByFireId = async (fireId: string) =>{
    const options = {
      url: `${this.url}Users/firebaseUser/${fireId}`,
      //   headers: { 'X-Fake-Header': 'Fake-Value' },
      //   params: { size: 'XL' },
    };
    return await CapacitorHttp.get(options);
  }

  createUser = async (user: IAddUser) => {
    const options = {
      headers: { 'Content-Type': 'application/json' },
      url: `${this.url}Users`,
      method: 'POST',
      data: user,
    };

    return await CapacitorHttp.post(options);
  };
}