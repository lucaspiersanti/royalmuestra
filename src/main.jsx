import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import AOS from 'aos';

import 'aos/dist/aos.css'; 

AOS.init();

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App className="font-lora" />
  </BrowserRouter>
);
