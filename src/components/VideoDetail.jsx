import {
  Box,
  Flex,
  Image,
  Text,
  useColorMode,
  useColorModeValue,
  AspectRatio,
} from "@chakra-ui/react";
import React from "react";
import { fetchUser } from "../utils/fetchUser";
import moment from "moment";
import { Link } from "react-router-dom";

const VideoDetail = ({ data }) => {
  const { colorMode } = useColorMode();
  const bg = useColorModeValue("blackAlpha.700", "gray.900");
  const textColor = useColorModeValue("gray.100", "gray.100");
  const [userInfo] = fetchUser();

  return (
    <Link to={`/videoDetail/${data.id}`} style={{ width: "100%" }}>
      <Flex
        direction="column"
        width="100%"
        maxW="320px"
        rounded="md"
        overflow="hidden"
        shadow="md"
        _hover={{ shadow: "lg" }}
        bg={colorMode === "light" ? "gray.100" : "gray.700"}
        transition="all 0.2s ease-in-out"
      >
        {/* ✅ Fixed 16:9 video box */}
        <AspectRatio ratio={16 / 9} width="100%" height="%">
          <Box>
            <video
              src={data.videoUrl}
              muted
              preload="metadata"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover", // key: crop inside box
                display: "block",
              }}
              onMouseOver={(e) => {
                e.target.muted = true;
                e.target.play().catch(() => {});
              }}
              onMouseOut={(e) => {
                e.target.pause();
              }}
            />
          </Box>
        </AspectRatio>

        {/* Video title and uploader info */}
        <Flex p={3} direction="column" gap={2}>
          <Flex justify="space-between" align="center">
            <Text fontSize="md" fontWeight="semibold" isTruncated color={textColor}>
              {data.title}
            </Text>
            <Image
              src={userInfo?.photoURL}
              boxSize="36px"
              rounded="full"
              border="2px solid"
              borderColor={colorMode === "light" ? "gray.100" : "gray.700"}
            />
          </Flex>
          <Text fontSize="xs" color="gray.400" ml="auto">
            {moment(new Date(parseInt(data.id)).toISOString()).fromNow()}
          </Text>
        </Flex>
      </Flex>
    </Link>
  );
};

export default VideoDetail;
