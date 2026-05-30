import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

function Home() {
  return (
    <section className="page">
      <h1>Life OS</h1>
      <p>
        Welcome to the Life OS frontend. This starter app is built with React,
        TypeScript, SCSS, and React Router.
      </p>
    </section>
  );
}

function About() {
  return (
    <section className="page">
      <h1>About</h1>
      <p>
        This monorepo keeps the frontend and backend separate while using
        TypeScript in both places.
      </p>
    </section>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <nav className="main-nav">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
