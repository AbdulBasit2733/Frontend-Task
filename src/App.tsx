import { Box } from "@mantine/core";
import EditModeBar from "./components/ui/edit-mode-bar";
import Navbar from "./components/common/header";
import Hero from "./components/ui/hero";
import Packages from "./components/ui/packages";
import Team from "./components/ui/team";
import Newsletter from "./components/ui/newsletter";
import Footer from "./components/common/footer";
import { useSiteData } from "./context/site-data-context";

export default function App() {
  const { isEditMode } = useSiteData();

  return (
    <Box>
      <EditModeBar />
      <Box pt={isEditMode ? 52 : 0} style={{ transition: "padding 0.3s ease" }}>
        <Box bg="lightPink">
          <Navbar />
          <Hero />
        </Box>
        <Packages />
        <Team />
        <Newsletter />
        <Footer />
      </Box>
    </Box>
  );
}
