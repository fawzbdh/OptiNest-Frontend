import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@mui/material/Chip';
function FileList({ files, onRemove }) {
  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {files.map((file, index) => (
          <Chip key={index} label={file.name} onDelete={() => onRemove(index)} style={{ margin: '5px' }} />
        ))}
      </div>
    </div>
  );
}
FileList.propTypes = {
  onRemove: PropTypes.func.isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  ).isRequired
};
export default FileList;
