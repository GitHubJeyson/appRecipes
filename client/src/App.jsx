import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from './components/footer.jsx'
import { AuthProvider } from "./services/users.jsx";
import { ProtectedRoute } from "./protectedRoutes";

import HomePage from "./pages/HomePage.jsx";
import RegisterPage from "./pages/Auth/RegisterPage.jsx";
import LoginPage from "./pages/Auth/LoginPage.jsx";

import { RecipeProvider } from "./services/recipes.jsx";
import { CommentProvider } from "./services/comment.jsx";
import { ContentProvider } from './services/content.jsx';
import { CategoryProvider } from './services/category.jsx'
import { CategoryManager } from './components/admin/CategoryManager.jsx';
import { ContentManager } from './components/admin/ContentManager.jsx';

import { Sidebar } from './components/admin/Sidebar.jsx';
import { UserManager } from './components/admin/UserManager.jsx'
import { RecipeFormPage } from "./pages/RecipeFormPage.jsx";
import { RecipesPage } from "./pages/RecipesPage.jsx";
import { MyFavoritesRecipes } from "./pages/MyFavoritesPage.jsx";
import { UnauthorizedMessage } from './pages/Auth/unauthPage.jsx'


function App() {
  return (
    <AuthProvider>
      <RecipeProvider>
        <CommentProvider>
          <ContentProvider>
            <CategoryProvider>
              <BrowserRouter>
                <Navbar />
                <Sidebar />
                <main className="flex flex-col items-center min-w-[300px] mx-6 px-6 md:px-10 py-4 bg-zinc-900 rounded-xl shadow-lg">
                  <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
              
                    <Route element={<ProtectedRoute/>}>
                      <Route path="/users-manager" element={<UserManager/>}/>
                      <Route path="/category-manager" element={<CategoryManager/>}/>
                      <Route path="/content-manager" element={<ContentManager/>}/>
                  
                      <Route path="/recipes" element={<RecipesPage/>}/>
                      <Route path="/add-recipe" element={<RecipeFormPage/>}/>
                      <Route path="/recipes/:id" element={<RecipeFormPage/>}/>
                      <Route path="/favorites" element={<MyFavoritesRecipes/>}/>
                      <Route path="/unauth" element={<UnauthorizedMessage/>}/>
                    </Route>
                  </Routes>
                </main>
                <Footer/>
              </BrowserRouter>
            </CategoryProvider>
          </ContentProvider>
        </CommentProvider>
      </RecipeProvider>
    </AuthProvider>
  );
}

export default App;
