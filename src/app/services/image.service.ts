import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  collection,
  doc,
  docData,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
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
    console.log(cameraFile);

    const user = this.auth.currentUser;
    const generatedId = uuidv4();

    let parentPath = '';

    switch (cameraFile.format.toUpperCase()) {
      case 'JPEG':
      case 'PNG':
      case 'BMP':
        {
          parentPath = 'images';
        }
        break;
      case 'GIF':
        parentPath = 'gifs';
        break;
      case 'MP4':
      case 'WEBM':
        parentPath = 'videos';
        break;
    }
    const path =
      imageType === 'avatar'
        ? `avatars/${user!.uid}/profile.webp`
        : `uploads/${generatedId}.${cameraFile.format}`;

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
