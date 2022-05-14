import { Children } from "react";

/**
 * Source: https://medium.com/ft-product-technology/animating-list-reordering-with-react-hooks-1aa0d78a24dc
 * @param children 
 * @returns 
 */
export const calculateBoundingBoxes = (children) => {
  const boundingBoxes = {};

  Children.forEach(children, child => {
    const domNode = child.ref?.current;
    if (!domNode) {
      return;
    }
    const nodeBoundingBox = domNode.getBoundingClientRect();

    boundingBoxes[child.key] = nodeBoundingBox; 
  });

  return boundingBoxes;
};