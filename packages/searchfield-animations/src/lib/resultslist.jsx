import { Children, useEffect, useState, useLayoutEffect } from "react";
import { calculateBoundingBoxes } from "./util/util";
import { usePrevious } from "./hooks/usePrevious";

export default function ResultsList({children}) {
  const [bBox, setBBox] = useState({});
  const [prevBBox, setPrevBBox] = useState({});
  const prevChildren = usePrevious(children);

  useEffect(() => {
    const newBoundingBox = calculateBoundingBoxes(children);
    setBBox(newBoundingBox);
  }, [children]);

  useEffect(() => {
    const prevBoundingBox = calculateBoundingBoxes(prevChildren);
    setPrevBBox(prevBoundingBox);
  }, [prevChildren]);

  const domNodeFadeIn = (domNode) => {
    if(!domNode) {
      return;
    }

    domNode.style.opacity = "0";

    requestAnimationFrame(() => {

      domNode.style.transition = "opacity 150ms linear";
      domNode.style.opacity = "1";

      requestAnimationFrame(() => {
        domNode.style.transition = "opacity 0s";
      });
    });
  };

  useLayoutEffect(() => {
    const hasPrevBoundingBox = Object.keys(prevBBox).length;
    const domDelayed = [];

    if (hasPrevBoundingBox) {
      Children.forEach(children, child => {
        const domNode = child.ref?.current; 
        const existingBox = prevBBox[child.key];
        const lastBox = bBox[child.key];

        if (!existingBox) {
          if (!domNode.style.opacity) {
            domNode.style.opacity = "0";
            domDelayed.push(domNode);
          }
          return;
        }

        const changeInY = existingBox.top - lastBox.top; 

        if (changeInY) {
          requestAnimationFrame(() => {
            domNode.style.transform = `translateY(${changeInY}px)`;
            domNode.style.transition = "transform 0s";
          
            requestAnimationFrame(() => {
              domNode.style.transform = "";
              domNode.style.transition = "transform 250ms";
            });
          });
        }
      });

      setTimeout(() => {
        domDelayed.forEach((domNode) => {
          domNodeFadeIn(domNode);
        })
      }, 250);
    }
    else {
      Children.forEach(children, child => {
        const existingBox = prevBBox[child.key];
        if (existingBox) {
          domNodeFadeIn(child.ref?.current);
        }
      });
    }
  }, [bBox, prevBBox, children]);

  return children;
}