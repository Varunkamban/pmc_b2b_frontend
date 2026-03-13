import React from "react";
import Kanban from "components/kanban/KanbanBoard";
import { KanbanProvider } from "components/kanban/KanbanContext";
import Dashboard from "pages/HomePage";
import Tickets from "pages/Tickets";
import Login from "pages/Login/Login";
import NotFound from "pages/NotFound/NotFound";
import ProtectedRoute from "components/ProtectedRoute";
import "./styles/index.scss";
import { Routes, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 40, textAlign: "center" }}>
          <h2>Something went wrong.</h2>
          <p>Please refresh the page or contact support.</p>
          <button
            style={{ marginTop: 16, padding: "8px 24px", cursor: "pointer" }}
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function ProtectedWithKanban({ children }) {
  return (
    <ProtectedRoute>
      <KanbanProvider>{children}</KanbanProvider>
    </ProtectedRoute>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedWithKanban>
              <Dashboard />
            </ProtectedWithKanban>
          }
        />
        <Route
          path="/kanban"
          element={
            <ProtectedWithKanban>
              <Kanban />
            </ProtectedWithKanban>
          }
        />
        <Route
          path="/tickets"
          element={
            <ProtectedWithKanban>
              <Tickets />
            </ProtectedWithKanban>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
