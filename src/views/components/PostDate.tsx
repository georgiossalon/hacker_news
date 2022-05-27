import React from 'react';
import { formatDistanceToNow } from 'date-fns';

function PostDate({ time }: { time: number }) {
  let timeAgo = '';
  if (time) {
    // TODO timestamp?? what is time?
    const timePeriod = formatDistanceToNow(time);
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <span>
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
}

export default PostDate;
