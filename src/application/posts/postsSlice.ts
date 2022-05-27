/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import postsApi from 'infrastructure/services/api/posts/postsApi';
import PostsStatus from 'shared/status';
import { RootState } from 'application/store';
import { Post } from 'shared/models';
import { forEachAsync } from '../../shared/utils';

type PostsState = {
  postIds: string[];
  posts: Post[];
  status: PostsStatus;
  idsStatus: PostsStatus;
  error: any;
  selectedPost?: Post;
  selectedPostStatus?: PostsStatus;
};

const initialState: PostsState = {
  postIds: [],
  posts: [],
  status: PostsStatus.initial,
  idsStatus: PostsStatus.initial,
  error: null,
};

export const fetchPostIds = createAsyncThunk('posts/fetchPostIds', async () => {
  return postsApi.getPostIds();
});

export const fetchPosts = createAsyncThunk<any, string, { state: RootState }>(
  'posts/fetchPosts',
  async (_, { getState }) => {
    const { postIds } = getState().posts;
    const posts: any = [];
    // TODO could use a variables for the slice function
    await forEachAsync(postIds.slice(0, 20), async (id: string) => {
      const post = await postsApi.getPostById(id);
      posts.push(post);
    });
    return posts;
  },
);

export const fetchPostById = createAsyncThunk(
  'posts/fetchPostById',
  async (id: string) => {
    return postsApi.getPostById(id);
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPostIds.pending, (state) => {
      state.idsStatus = PostsStatus.loading;
    });
    builder.addCase(fetchPostIds.fulfilled, (state, { payload }) => {
      state.postIds = payload;
      state.idsStatus = PostsStatus.loaded;
    });
    builder.addCase(fetchPostIds.rejected, (state, { error }) => {
      state.error = error;
      state.idsStatus = PostsStatus.error;
    });
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = PostsStatus.loading;
    });
    builder.addCase(fetchPosts.fulfilled, (state, { payload }) => {
      state.posts = payload;
      state.status = PostsStatus.loaded;
    });
    builder.addCase(fetchPosts.rejected, (state, { error }) => {
      state.error = error;
      state.status = PostsStatus.error;
    });
    builder.addCase(fetchPostById.pending, (state) => {
      state.selectedPostStatus = PostsStatus.loading;
    });
    builder.addCase(fetchPostById.fulfilled, (state, { payload }) => {
      state.selectedPost = payload;
      state.selectedPostStatus = PostsStatus.loaded;
    });
    builder.addCase(fetchPostById.rejected, (state, { error }) => {
      state.error = error;
      state.selectedPostStatus = PostsStatus.error;
    });
  },
});

export default postsSlice.reducer;
