import React, { useEffect, useState } from "react";
import { categoryFeeds, getAllFeeds } from "../utils/fetchData";
import Spinner from "./Spinner";
import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import VideoDetail from "./VideoDetail";
import NotFound from "./NotFound";

const Feed = () => {
  const [feeds, setFeeds] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { categoryId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = categoryId ? categoryFeeds(categoryId) : getAllFeeds();
    fetchData.then((data) => {
      setFeeds(data);
      setIsLoading(false);
    });
  }, [categoryId]);

  if (isLoading)
    return (
      <Flex width="100%" height="60vh" align="center" justify="center">
        <Spinner msg="Loading your feeds" />
      </Flex>
    );

  if (!feeds?.length) return <NotFound />;

  return (
    <Flex width="100%" justify="flex-start" align="flex-start" py={4}>
      <SimpleGrid
        minChildWidth="320px"
        spacing="12px" // 🟢 Tighter spacing like YouTube
        width="100%"
        justifyItems="center"
      >
        {feeds.map((data) => (
          <VideoDetail key={data.id} data={data} />
        ))}
      </SimpleGrid>
    </Flex>
  );
};

export default Feed;
