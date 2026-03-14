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
import OmniSphereChatbot from "./components/OmniSphereChatbot";
import { PhoneQuiz } from "./components/PhoneQuiz";
import { ScrollToTop } from "./components/ScrollToTop";
import { LanguageProvider } from "./context/LanguageContext";
import { AboutPage } from "./pages/AboutPage";
import { AdminPage } from "./pages/AdminPage";
import { ArticlePage } from "./pages/ArticlePage";
import { CategoryPage } from "./pages/CategoryPage";
import { ContactUsPage } from "./pages/ContactUsPage";
import { DisclaimerPage } from "./pages/DisclaimerPage";
import { HireUsPage } from "./pages/HireUsPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { TermsPage } from "./pages/TermsPage";
import { WishlistPage } from "./pages/WishlistPage";

// Fix: If no hash is present (e.g. opening draft link directly), default to #/
if (!window.location.hash || window.location.hash === "#") {
  window.location.hash = "#/";
}

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
        <OmniSphereChatbot />
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

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactUsPage,
});

const disclaimerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/disclaimer",
  component: DisclaimerPage,
});

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/terms",
  component: TermsPage,
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
  contactRoute,
  disclaimerRoute,
  termsRoute,
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
