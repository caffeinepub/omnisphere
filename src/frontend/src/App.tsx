import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createHashHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { PhoneQuiz } from "./components/PhoneQuiz";
import { ScrollToTop } from "./components/ScrollToTop";
import { LanguageProvider } from "./context/LanguageContext";
import { AboutPage } from "./pages/AboutPage";
import { AdminPage } from "./pages/AdminPage";
import { ArticlePage } from "./pages/ArticlePage";
import { CategoryPage } from "./pages/CategoryPage";
import { HireUsPage } from "./pages/HireUsPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { WishlistPage } from "./pages/WishlistPage";

// Root Layout
function RootLayout() {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <ScrollToTop />
        <Header />
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
        <Toaster position="bottom-right" />
        <PhoneQuiz />
      </div>
    </LanguageProvider>
  );
}

// Route definitions
const rootRoute = createRootRoute({ component: RootLayout });

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const articleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/article/$slug",
  component: ArticlePage,
});

const categoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/category/$slug",
  component: CategoryPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

const wishlistRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/wishlist",
  component: WishlistPage,
});

const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/privacy-policy",
  component: PrivacyPolicyPage,
});

const hireUsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/hire-us",
  component: HireUsPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: NotFoundPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  articleRoute,
  categoryRoute,
  aboutRoute,
  wishlistRoute,
  privacyRoute,
  hireUsRoute,
  adminRoute,
  notFoundRoute,
]);

const hashHistory = createHashHistory();

const router = createRouter({
  routeTree,
  history: hashHistory,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
