import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { collection, doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadString,
} from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage
  ) {}

  getUserProfile() {
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `users/${user!.uid}`);
    return docData(userDocRef, { idField: 'id' });
  }

  async uploadImage(cameraFile: Photo, imageType: 'avatar' | 'post') {
    const user = this.auth.currentUser;
    const generatedId = uuidv4();

    const path =
      imageType === 'avatar' ? `avatars/${user!.uid}/profile.webp` : `uploads/${generatedId}.${cameraFile.format}`;

    const storageRef = ref(this.storage, path);

    console.log('CURENT USER: ', user);

    try {
      await uploadString(storageRef, cameraFile.base64String!, 'base64');

      const imageUrl = await getDownloadURL(storageRef);
      
      if (imageType === 'avatar') {
        const userDocRef = doc(this.firestore, `users/${user!.uid}`);
        await setDoc(userDocRef, {
          imageUrl,
        });
      }
      return imageUrl;
    } catch (e) {
      return null;
    }
  }
}
