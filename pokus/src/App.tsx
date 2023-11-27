import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./contexts/Authorization";
import HomePage from "./pages/Startpage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrePage";
import GroupsPage from "./pages/GroupsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateGroupsPage from "./pages/CreateGroupsPage";
import UserDetailPage from "./pages/UserDetailPage";
import AdminUsersPage from "./pages/AdminUsersPage";
import AdminGroupsPage from "./pages/AdminGroupsPage";
import MembershipRequestsPage from "./pages/MembershipRequestsPage";
import MemberGroupsPage from "./pages/MemberGroupsPage";
import GroupPostsPage from "./pages/GroupPostsPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/groups"
            element={
              <ProtectedRoute>
                <GroupsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-settings"
            element={
              <ProtectedRoute>
                <UserDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="create-group"
            element={
              <ProtectedRoute>
                <CreateGroupsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-admin-groups"
            element={
              <ProtectedRoute>
                <AdminGroupsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-member-groups"
            element={
              <ProtectedRoute>
                <MemberGroupsPage />
              </ProtectedRoute>
            }
          />
          <Route path="/groups/:groupId/posts" element={<GroupPostsPage />} />
          <Route
            path="/membership-requests/:groupId"
            element={
              <ProtectedRoute>
                <MembershipRequestsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <AdminUsersPage />
              </ProtectedRoute>
            }
          />
          {/* Fallback route for unknown paths */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
