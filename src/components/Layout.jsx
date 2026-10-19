import NavBar from "./NavBar";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <NavBar />
      
      <main style={{ flex: 1 }}>
        {children}
      </main>

      <Footer />
    </div>
  );
}

export default Layout;