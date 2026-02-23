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
      <Navbar />
      <Hero />
      <Packages />
      <Team />
      <Newsletter />
      <Footer />
    </Box>
  );
}
