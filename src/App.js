import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RecipePage from "./pages/RecipePage";
import "../src/styles.css";

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe/:id" element={<RecipePage />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
