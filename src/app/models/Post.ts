import { Photo } from "@capacitor/camera"

export interface IPost{
    postId: string,
    postType: number,
    viewCount: number,
    userId: string,
    title: string,
    description?: string,
    imageUrl?: string,
    tags?: string,
}

export interface IAddPost{
    postType: number,
    userId: string,
    title: string,
    description?: string,
    media?: Photo,
    imageUrl?: string | null,
    tags?: string,
}

export const defaultAddPost: IAddPost = {
    postType: 0,
    userId: "",
    title: "",
    description: ""
}


export const defaultPost: IPost = {
    postId: "",
    postType: 0,
    viewCount: 0,
    userId: "",
    title: ""
}