import React from 'react';
import { Post } from 'shared/models';
import PostAuthor from './PostAuthor';
import PostLink from './PostLink';

type PostExcerptProps = { post: Post };

function PostExcerpt({ post }: PostExcerptProps) {
  const { id, title, by } = post;
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
