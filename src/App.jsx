import GlobalStyle from "./components/style/GlobalStyle";
import { AuthProvider } from "./context/AuthContext";
import Router from "./shared/Router";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
