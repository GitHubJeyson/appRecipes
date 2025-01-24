import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { AuthProvider } from "./services/users.jsx";
import { ProtectedRoute } from "./routes";

import HomePage from "./pages/HomePage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import { RecipeFormPage } from "./pages/RecipeFormPage.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import { RecipesPage } from "./pages/RecipesPage.jsx";
import { RecipeProvider } from "./services/recipes.jsx";

function App() {
  return (
    <AuthProvider>
      <RecipeProvider>
        <BrowserRouter>
          <Navbar />
          <main className="flex flex-col items-center mx-16 px-6 md:px-16 py-8 bg-zinc-900 rounded-xl shadow-lg">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              <Route element={<ProtectedRoute />}>
                <Route path="/recipes" element={<RecipesPage />} />
                <Route path="/add-recipe" element={<RecipeFormPage />} />
                <Route path="/recipes/:id" element={<RecipeFormPage />} />
                <Route path="/profile" element={<h1>Profile</h1>} />
              </Route>
            </Routes>
          </main>

        </BrowserRouter>
      </RecipeProvider>
    </AuthProvider>
  );
}

export default App;
