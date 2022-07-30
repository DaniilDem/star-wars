import { Route, Routes } from "react-router-dom";
import Character from "./pages/Character";
import Main from "./pages/Main";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/character/:id" element={<Character />} />
    </Routes>
  );
}

export default App;
