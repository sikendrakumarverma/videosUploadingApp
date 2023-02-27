//import logo from "./logo.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./Components/Register";
import Login from "./Components/Login";
import NotFound from "./Components/PageNotFound";
import "./App.css";
import Slider from "./Components/Slider";

function App() {

  return (
    <div style={{background:"tomato"}}>
      <br />
      <BrowserRouter>
        <Routes>
          {!localStorage.getItem("loggedInUser") ?
            <Route path="/" exact element={<Login />} />
            :
            < Route path="/" />}
          <Route path="*" exact element={<NotFound />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      <div>
        <Slider />
      </div>
    </div>
  );
}

export default App;