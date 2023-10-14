import "./App.css";
import { StaticImageMesh } from "./components/staticImageMesh";
import { VideoMesh } from "./components/videoMesh";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-content">
          <StaticImageMesh />
        </div>
      </header>
    </div>
  );
}

export default App;
