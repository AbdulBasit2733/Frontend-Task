import { Box } from "@mantine/core";
import Navbar from "./components/common/header";
import Hero from "./components/hero";
import Packages from "./components/packages";
import Team from "./components/team";
import Newsletter from "./components/newsletter";
import Footer from "./components/common/footer";

export default function App() {
  return (
    <Box>
      {/* Navbar + Hero share the lightPink background */}
      <Box bg="lightPink">
        <Navbar />
        <Hero />
      </Box>

      <Packages />
      <Team />
      <Newsletter />
      <Footer />
    </Box>
  );
}
