import { RootState } from 'application/store';
import { Post } from 'shared/models';

export const selectPosts = (state: RootState) => state.posts.posts;

export const selectPostIds = (state: RootState) => state.posts.postIds;

export const selectPostById = (state: RootState, postId?: number) =>
  state.posts.posts.find((post: Post) => post.id === postId);

export const selectPostsStatus = (state: RootState) => state.posts.status;

export const selectedPost = (state: RootState) => state.posts.selectedPost;

export const selectedPostStatus = (state: RootState) =>
  state.posts.selectedPostStatus;
