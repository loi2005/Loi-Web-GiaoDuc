import "./style.css";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRoutes from "./route";
import { CourseProvider } from "./contexts/CourseContext";
import { FavoriteProvider } from "./contexts/FavoriteContext";
import { Toaster } from "react-hot-toast";
import { ViewedProvider } from "./contexts/ViewedContext";
function App() {
  return (
    <CourseProvider>
      <FavoriteProvider>
        <ViewedProvider>
          <Router>
            <div className="bg-gray-800 flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">
                <div className="max-w-[1216px] mx-auto px-4 py-6">
                  <AppRoutes />
                </div>
              </main>
              <Footer />
            </div>
          </Router>
          <Toaster position="top-center" />
        </ViewedProvider>
      </FavoriteProvider>
    </CourseProvider>
  );
}

export default App;
