import { Box, Flex } from "@mantine/core";
import Navbar from "./components/common/header";

import Packages from "./sections/packages";
import Team from "./sections/team";
import Newsletter from "./sections/newsletter";
import Footer from "./components/common/footer";
import Hero from "./sections/hero";

export default function App() {
  return (
    <Flex
      direction={"column"}
      align={"flex-start"}
      p={0}
      pos={"relative"}
      bg={"white"}
      style={{
        boxShadow: "0px 0px 150px 50px rgba(0, 0, 0, 0.025)",
      }}
    >
      <Box bg="lightPink">
        <Navbar />
        <Hero />
      </Box>
      <Packages />
      <Team />
      <Newsletter />
      <Footer />
    </Flex>
  );
}
