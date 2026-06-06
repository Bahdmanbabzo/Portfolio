import { createContext, useContext, useState } from 'react';
import PropTypes from "prop-types";

const PictureContext = createContext(null);

export function PictureProvider({ children }) {
  const [activeImageUrl, setActiveImageUrl] = useState(null);
  return (
    <PictureContext.Provider value={{ activeImageUrl, setActiveImageUrl }}>
      {children}
    </PictureContext.Provider>
  );
}

PictureProvider.propTypes = {
  children: PropTypes.node,
};

export function usePicture() {
  return useContext(PictureContext);
}
