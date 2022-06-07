import React from 'react';
import PostExcerpt from 'views/components/PostExcerpt';
import postsApi from 'infrastructure/services/api/posts/postsApi';
import { useQuery } from 'react-query';
import { Post } from 'shared/models';

// TODO move both fetch hooks to an extra file
function usePost(id: string) {
  return useQuery<Post, Error>(['post', id], () => postsApi.getPostById(id));
}

function usePosts() {
  return useQuery<string[], Error>('posts', postsApi.getPostIds);
}

function Posts() {
  // const [posts, setPosts] = useState<Post[]>([]);
  const {
    data: postIds,
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
  } = usePosts();
  // useEffect(() => {
  //   if (!postIds || postIds.length === 0) return;
  // const fetchPosts = async () => {
  //   await forEachAsync(postIds.slice(0, 20), async (id: string) => {
  //     const { data: post } = usePost(id);
  //     post && setPosts((prev) => prev.concat(post));
  //   });
  // };
  // forEachAsync(postIds.slice(0, 20), async (id: string) => {
  //   const { data: post } = usePost(id);
  //   post && setPosts((prev) => prev.concat(post));
  // });
  // TODO check if I need the status
  // if (status === PostsStatus.initial) {
  //   dispatch(fetchPosts(''));
  // }
  // }, [postIds]);

  if (isLoadingPosts) {
    // TODO add loading spinner
    return <div>Loading...</div>;
  }

  if (isErrorPosts) {
    return <div>Error</div>;
  }

  return (
    <section>
      <h1>Posts</h1>
      {postIds?.slice(0, 20).map((id) => (
        <div key={id}>{id}</div>
      ))}
      {/* {posts?.map((post) => (
        <PostExcerpt key={post.id} {...{ post }} />
      ))} */}
    </section>
  );
}

export default Posts;
