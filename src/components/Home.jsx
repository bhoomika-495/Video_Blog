import { Flex, Box, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { Category, Create, Feed, NavBar, Profile, Search, VideoPin } from ".";
import { categories } from "../data";

const Home = ({ user }) => {
  const sidebarBg = useColorModeValue("gray.100", "gray.800");
  const sidebarShadow = useColorModeValue("md", "dark-lg");
  const mainBg = useColorModeValue("white", "gray.900");

  return (
    <>
      <NavBar user={user} />
      <Flex width="100vw" minHeight="calc(100vh - 72px)" bg={mainBg}>
        {/* Sidebar */}
        <Box
          as="aside"
          width="80px"
          minW="80px"
          maxW="80px"
          bg={sidebarBg}
          boxShadow={sidebarShadow}
          py={6}
          px={0}
          mr={{ base: 1, md: 4 }}
          display={{ base: "none", md: "flex" }}
          flexDirection="column"
          alignItems="center"
          borderRightWidth={1}
        >
          {categories &&
            categories.map((data) => <Category key={data.id} data={data} />)}
        </Box>
        {/* Main Content */}
        <Flex
          flex={1}
          justifyContent="flex-start"
          alignItems="flex-start"
          minH="80vh"
        >
          <Routes>
            <Route path="/" element={<Feed />} />
            {/* <Route path="/category/:categoryId" element={<Feed />} /> */}
            <Route path="/create" element={<Create />} />
            <Route path="/videoDetail/:videoId" element={<VideoPin />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile/:userId" element={<Profile />} />
          </Routes>
        </Flex>
      </Flex>
    </>
  );
};

export default Home;
