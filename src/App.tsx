import Students from "./components/Students";
import { BrowserRouter} from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import classes from "./App.module.css";
import Edit from "./components/Edit";

function App() {

 

  return (
    <div >
      <BrowserRouter>
      
       <Routes>
       <Route path="/" element={<Students />}/>
       <Route path="/edit-user/:id" element={<Edit />}/>
       </Routes>
       </BrowserRouter>
      
    
    
    </div>
  );
}

export default App;
