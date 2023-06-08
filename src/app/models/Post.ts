export interface IPost{
    postId: string,
    postType: number,
    userId: string,
    title: string,
    description?: string,
    imageUrl?: string,
    tags?: string,
}

export const defaultPost: IPost = {
    postId: "",
    postType: 0,
    userId: "",
    title: ""
}