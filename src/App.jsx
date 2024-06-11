import GlobalStyle from "./components/style/GlobalStyle";
import { AuthProvider } from "./context/AuthContext";
import Router from "./shared/Router";

function App() {
  return (
    <AuthProvider>
      <GlobalStyle />
      <Router />
    </AuthProvider>
  );
}

export default App;
