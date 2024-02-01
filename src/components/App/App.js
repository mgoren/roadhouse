import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </MaterialLayout>
      </Router>
    </>
  );
}
