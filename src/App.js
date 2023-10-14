import "./App.css";
import { StaticFaceMesh } from "./components/staticFaceMesh";
import { VideoMesh } from "./components/videoMesh";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-content">
          <StaticFaceMesh />
        </div>
      </header>
    </div>
  );
}

export default App;
