import { Route, Routes } from "react-router-dom";
import { useInterceptor } from "./Hooks/useInterceptor";
import { Activities } from "./pages/Activities";
import { IndividualMonth } from "./pages/IndividualMonth";
import { MonthlyStats } from "./pages/MonthlyStats";

function App() {
  useInterceptor();

  return (
    <Routes>
      <Route path="/" element={<Activities />}></Route>
      <Route path="/stats" element={<MonthlyStats />}></Route>
      <Route path="/stats/:year/:month" element={<IndividualMonth />}></Route>
    </Routes>
  );
}

export default App;
