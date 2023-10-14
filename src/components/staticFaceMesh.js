import React, { useRef, useEffect, useState } from "react";
import * as faceMesh from "@tensorflow-models/facemesh";
import { drawMesh } from "../utilities";

export function StaticFaceMesh() {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const loadImage = () => {
      const image = imageRef.current;
      if (image.complete && image.naturalWidth) {
        setImageDimensions({ width: image.naturalWidth, height: image.naturalHeight });
      } else {
        image.onload = () => {
          setImageDimensions({ width: image.naturalWidth, height: image.naturalHeight });
        };
      }
    };

    loadImage();
  }, []);

  useEffect(() => {
    const runFacemesh = async () => {
      const net = await faceMesh.load({
        inputResolution: { width: 640, height: 640 },
        scale: 0.8,
      });

      // Set canvas dimensions based on the loaded image's dimensions
      const canvas = canvasRef.current;
      canvas.width = imageDimensions.width;
      canvas.height = imageDimensions.height;

      // Make detections
      const face = await net.estimateFaces(imageRef.current);
      // Get canvas context
      const context = canvas.getContext("2d");

      // drawmesh - app/utilities/drawmesh
      drawMesh(face, context);
    };

    runFacemesh();
  }, [imageDimensions]);

  return (
    <div className="StaticImageMesh">
      {/* Load image dynamically */}
      <img
        ref={imageRef}
        src="images/woman.jpeg"
        alt="random"
        style={{}} // Hide the image element
        onError={(e) => {
          console.error("Error loading image:", e);
        }}
      />

      {/* Canvas width and height */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: imageDimensions.width, // Set canvas width based on the loaded image's natural width
          height: imageDimensions.height, // Set canvas height based on the loaded image's natural height
        }}
      />
    </div>
  );
}
