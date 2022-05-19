import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";

import HomePage from "./components/search/HomePage";

function App() {

  return (
    <Router className="App" >
      <Routes>
        <Route
          path={`/home`}
          element={<HomePage />}
        />
        <Route
          path="*"
          element={<Navigate to={`/home`} replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
