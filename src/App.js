import './App.css'
import { AuthProvider } from "./context/AuthContext";
import HighlightInput from "./components/HighlightInput";

function App() {

  return (
    <div className="App">
      <AuthProvider>  
        <header className="App-header">
          <h1 className='title'>Nota Clínica</h1>
        </header>
        <HighlightInput />
      </AuthProvider>
    </div>
  );
}

export default App;
