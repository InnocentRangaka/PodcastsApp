import React, { useState } from 'react';
import { IconButton, Collapse, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';


const DescriptionLayout = ({ description }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="show-description flex-row">
      <div className='show-description-title'>
            <IconButton onClick={handleToggle}>
                {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
            <span>Description</span>
      </div>
      <Collapse in={isOpen}>
        <Typography variant="body2" color="textSecondary" component="p" className="">
            {description}
        </Typography>
      </Collapse>
    </div>
  );
};

export default DescriptionLayout;
