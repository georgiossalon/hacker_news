import { usePost } from 'application/react-query-hooks';
import React from 'react';
import PostAuthor from './PostAuthor';
import PostLink from './PostLink';

type PostExcerptProps = { id: string };

function PostExcerpt({ id }: PostExcerptProps) {
  const { data: post, isLoading, isError, isSuccess } = usePost(id);
  if (isLoading) <div>Loading...</div>;

  if (isError) <div>Error...</div>;

  if (!isSuccess) return null;

  const { title, by } = post;

  return (
    <article key={id}>
      <h4>{title}</h4>
      <div>
        <PostAuthor {...{ by }} />
      </div>
      <PostLink {...{ postId: id }} />
    </article>
  );
}

export default PostExcerpt;
