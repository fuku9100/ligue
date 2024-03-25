import { BrowserRouter, Route, Switch, Suspense } from "react-router-dom";
import { Helmet } from "react-helmet";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import Admin from "./Pages/Admin";
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={Admin} />
            <Route path="/admin" component={Admin} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
        <Footer />
      </div>
      <Helmet>
        <title>My App</title>
      </Helmet>
    </BrowserRouter>
  );
}

export default App;

