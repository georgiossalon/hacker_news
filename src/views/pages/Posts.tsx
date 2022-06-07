import React from 'react';
import PostExcerpt from 'views/components/PostExcerpt';
import { usePosts } from 'application/react-query-hooks';

function Posts() {
  const {
    data: postIds,
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
  } = usePosts();

  if (isLoadingPosts) {
    return <div>Loading...</div>;
  }

  if (isErrorPosts) {
    return <div>Error</div>;
  }

  return (
    <section>
      <h1>Posts</h1>
      {postIds?.slice(0, 20).map((id) => (
        <PostExcerpt key={id} {...{ id }} />
      ))}
    </section>
  );
}

export default Posts;
