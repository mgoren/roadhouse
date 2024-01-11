import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from 'components/Static/Home';
import MaterialLayout from 'components/Layout/';
import ScrollToAnchor from 'components/ScrollToAnchor';

export default function App() {
  return (
    <>
      <Router>
        <ScrollToAnchor />
        <MaterialLayout>
          <Routes>
            <Route exact path="/" element=<Home /> />
          </Routes>
        </MaterialLayout>
      </Router>
    </>
  );
}
