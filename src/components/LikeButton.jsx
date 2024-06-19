// src/LikeButton.jsx
import React, { useState } from 'react';
import { IconButton, Badge } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';

const LikeButton = () => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const handleLikeClick = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <IconButton onClick={handleLikeClick} color="primary">
      <Badge badgeContent={likesCount} color="secondary">
        {liked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
      </Badge>
    </IconButton>
  );
};

export default LikeButton;
