import { Box } from "@mantine/core";
import EditModeBar from "./components/common/edit-mode-bar";
import Navbar from "./components/common/header";

import Packages from "./sections/packages";
import Team from "./sections/team";
import Newsletter from "./sections/newsletter";
import Footer from "./components/common/footer";
import { useSiteData } from "./context/site-data-context";
import Hero from "./sections/hero";

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
