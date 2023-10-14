import React, { useRef, useEffect, useState } from "react";
//import key points detection from teonsoflow or other wise.

export function StaticImageKeyPoints() {
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
    const runKeyPoints = async () => {
      //   CODE FOR KEYPOINTS DETECTION TO GO HERE. //
      //
      //
      // Get canvas context
      const context = canvas.getContext("2d");
      // utility function to be created
      drawKeyPoints(estimates, context);
    };

    runKeyPoints();
  }, [imageDimensions]);

  return (
    <div className="StaticImageMesh">
      {/* Load image dynamically */}
      <img
        ref={imageRef}
        src="images/woman.jpeg"
        alt="random"
        style={{}}
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
