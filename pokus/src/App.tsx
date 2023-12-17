import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./contexts/Authorization";
import HomePage from "./pages/Startpage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrePage";
import GroupsPage from "./pages/GroupsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import UserDetailPage from "./pages/UserDetailPage";
import AdminUsersPage from "./pages/AdminUsersPage";
import AdminGroupsPage from "./pages/AdminGroupsPage";
import MembershipRequestsPage from "./pages/MembershipRequestsPage";
import MemberGroupsPage from "./pages/MemberGroupsPage";
import GroupPostsPage from "./pages/GroupPostsPage";
import InterestsPage from "./pages/InterestsPage";

/*
  Autoři": Tomáš Najman-xnajma03, Karel Srna-xsrnak00
  Projekt do předmětu ITU 2023
  
  Tomáš Najman: Startpage, RegistrePage, LoginPage, UserDetailPage, InterestsPage, AdminUsersPage, Authorization, App.tsx, ProtectedRoute
  Karel Srna: AdminGroupsPage, GroupPostsPage, GroupsPage, MemberGroupsPage, MembershipRequestsPage

  Ke všem souborům složící jako stránky patří i stylování a obsažené komponenty v nich
*/

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
            path="/interests"
            element={
              <ProtectedRoute>
                <InterestsPage />
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
