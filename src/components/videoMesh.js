import React, { useRef } from "react";
import * as faceMesh from "@tensorflow-models/facemesh";
import Webcam from "react-webcam";
import { drawMesh } from "../utilities";

export function VideoMesh() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Load Facemesh
  const runFacemesh = async () => {
    const net = await faceMesh.load({
      inputResolution: { width: 640, height: 640 },
      scale: 0.8,
    });
    setInterval(() => {
      detect(net);
    }, 100);
  };

  // Detect function

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set Video Params
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      // Set canvas params
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
      // Make detections
      const face = await net.estimateFaces(video);
      // Get canvas context
      const context = canvasRef.current.getContext("2d");
      drawMesh(face, context);
    }
  };

  runFacemesh();
  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 9,
            width: 640,
            height: "auto",
          }}
        />
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
            width: 640,
            height: Webcam.height,
          }}
        />
      </header>
    </div>
  );
}
