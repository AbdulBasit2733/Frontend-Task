import { Box} from "@mantine/core";
import Navbar from "./components/common/header";

import Packages from "./sections/packages";
import Team from "./sections/team";
import Newsletter from "./sections/newsletter";
import Footer from "./components/common/footer";
import Hero from "./sections/hero";

export default function App() {
  return (
    <Box
      bg="white"
      w="100%"
      pos="relative"
      style={{
        boxShadow: "0px 0px 150px 50px rgba(0, 0, 0, 0.025)",
      }}
    >
      <Box
        style={{
          flex: "none",
          order: 0,
          flexGrow: 0,
        }}
        bg="lightPink"
        mih={682}
      >
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
