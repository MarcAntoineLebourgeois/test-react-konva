import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect } from "react-konva";

function App() {
  const [annotations, setAnnotations] = useState([]);
  const [newAnnotation, setNewAnnotation] = useState([]);
  const handleMouseDown = (event) => {
    if (newAnnotation.length === 0) {
      const { x, y } = event.target.getStage().getPointerPosition();
      setNewAnnotation([{ x, y, width: 0, height: 0, key: "0" }]);
    }
  };
  const handleMouseUp = (event) => {
    if (newAnnotation.length === 1) {
      const sx = newAnnotation[0].x;
      const sy = newAnnotation[0].y;
      const { x, y } = event.target.getStage().getPointerPosition();
      const annotationToAdd = {
        x: sx,
        y: sy,
        width: x - sx,
        height: y - sy,
        key: annotations.length + 1,
      };
      annotations.push(annotationToAdd);
      setNewAnnotation([]);
      setAnnotations(annotations);
    }
  };
  const handleMouseMove = (event) => {
    if (newAnnotation.length === 1) {
      const sx = newAnnotation[0].x;
      const sy = newAnnotation[0].y;
      const { x, y } = event.target.getStage().getPointerPosition();
      setNewAnnotation([
        {
          x: sx,
          y: sy,
          width: x - sx,
          height: y - sy,
          key: "0",
        },
      ]);
    }
  };
  const annotationsToDraw = [...annotations, ...newAnnotation];

  const stageCanvasRef = useRef(null);
  const [size, setSize] = useState();
  useEffect(() => {
    if (stageCanvasRef?.current) {
      setSize({
        width: stageCanvasRef?.current?.offsetWidth,
        height: stageCanvasRef?.current?.offsetHeight,
      });
    }
  }, [stageCanvasRef]);

  return (
    <>
      <div style={{ width: "100vw", height: "6vh", backgroundColor: "blue" }} />
      <div
        style={{
          width: "100vw",
          height: "58vh",
          backgroundColor: "red",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <svg
          id="testSVG"
          width={1920}
          height={1080}
          style={{ width: "auto", height: "full", maxHeight: "100%" }}
          viewBox="0 0 1920 1080"
        >
          <foreignObject
            ref={stageCanvasRef}
            width={1920}
            height={1080}
            style={{ backgroundColor: "yellow" }}
          >
            <Stage
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onTouchStart={handleMouseDown}
              onTouchMove={handleMouseMove}
              onTouchEnd={handleMouseUp}
              width={1920}
              height={1080}
              style={{ backgroundColor: "green" }}
            >
              <Layer>
                {annotationsToDraw.map((value) => {
                  return (
                    <Rect
                      x={value.x}
                      y={value.y}
                      width={value.width}
                      height={value.height}
                      fill="transparent"
                      stroke="black"
                    />
                  );
                })}
              </Layer>
            </Stage>
          </foreignObject>
        </svg>
      </div>
      <div
        style={{ width: "100vw", height: "36vh", backgroundColor: "blue" }}
      />
    </>
  );
}

export default App;
