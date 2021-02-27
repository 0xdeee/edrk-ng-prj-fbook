export class Post {
  isActive: boolean;
  _id: string;
  post: string;
  userId: string;
  userPhotoId: string;
  userName: string;
  isAdmin: boolean;
  profession: string;
  createdDate: Date;
  __v: number;
  id: string;
}

export class NewPost {
  constructor(
    post: string,
    userId: string,
    userName: string,
    userPhotoId: string,
    postImageId: string,
    isActive: boolean,
    isAdmin: boolean,
    profession: string
  ) {
    this.post = post;
    this.userId = userId;
    this.userName = userName;
    this.userPhotoId = userPhotoId;
    this.postImageId = postImageId;
    this.isActive = isActive;
    this.isAdmin = isAdmin;
    this.profession = profession;
  }
  post: string;
  userId: string;
  userName: string;
  userPhotoId: string;
  postImageId: string;
  isActive: boolean;
  isAdmin: boolean;
  profession: string;
}
