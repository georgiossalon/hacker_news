import postsApi from 'infrastructure/services/api/posts/postsApi';
import { useQuery } from 'react-query';
import { Post } from 'shared/models';

export function usePost(id: string) {
  return useQuery<Post, Error>(['post', id], () => postsApi.getPostById(id));
}

export function usePosts() {
  return useQuery<string[], Error>('posts', postsApi.getPostIds);
}
