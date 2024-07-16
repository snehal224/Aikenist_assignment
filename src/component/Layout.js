import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import GridOnIcon from '@mui/icons-material/GridOn';
import imagesrc from './logo.jpg';

const ImageGrid = () => {
  const [selectedBoxes, setSelectedBoxes] = useState(new Set());
  const [showGridSelection, setShowGridSelection] = useState(false);

  const toggleBoxSelection = (index) => {
    const newSelectedBoxes = new Set(selectedBoxes);
    if (newSelectedBoxes.has(index)) {
      newSelectedBoxes.delete(index);
    } else {
      newSelectedBoxes.add(index);
    }
    setSelectedBoxes(newSelectedBoxes);
  };

  const maxRow = Math.max(
    ...Array.from(selectedBoxes).map((index) => Math.floor(index / 3)),
    0
  );
  const maxCol = Math.max(
    ...Array.from(selectedBoxes).map((index) => index % 3),
    0
  );

  return (
    <Box display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh">
      <Button
        variant="contained"
        onClick={() => setShowGridSelection(!showGridSelection)}
        startIcon={<GridOnIcon />}
      >
      </Button>
      {showGridSelection && (
        <Box display="flex" flexDirection="column" marginTop="10px">
          {Array.from({ length: 3 }, (_, rowIndex) => (
            <Box key={rowIndex} display="flex">
              {Array.from({ length: 3 }, (_, colIndex) => {
                const index = rowIndex * 3 + colIndex;
                return (
                  <Box
                    key={colIndex}
                    width="30px"
                    height="30px"
                    border="1px solid black"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                      cursor: 'pointer',
                      margin: '2px',
                      backgroundColor: selectedBoxes.has(index)
                        ? 'lightblue'
                        : 'white',
                    }}
                    onClick={() => toggleBoxSelection(index)}
                  >
                  </Box>
                );
              })}
            </Box>
          ))}
        </Box>
      )}
      <Box
        marginTop="20px"
        width="400px"
        height="400px"
        overflow="hidden"
        border="1px solid #ccc"
      >
        <Box
          display="grid"
          width="100%"
          height="100%"
          sx={{
            display: 'grid',
            gridTemplateRows: `repeat(${maxRow + 1}, 1fr)`,
            gridTemplateColumns: `repeat(${maxCol + 1}, 1fr)`,
            gap: '2rem',
          }}
        >
          {Array.from({ length: (maxRow + 1) * (maxCol + 1) }, (_, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                border: selectedBoxes.has(index)
                  ? 'none'
                  : '1px solid transparent',
              }}
            >
              {selectedBoxes.has(index) && (
                <Box
                  component="img"
                  src={imagesrc}
                  alt="example"
                  sx={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                  }}
                />
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ImageGrid;
