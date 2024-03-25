import { useState } from "react";
import {
  Flex,
  Stack,
  Box,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Text,
  Heading,
  Spacer,
  Divider,
} from "@chakra-ui/react";

import ImageUploader from "@/components/image-uploader/image-uploader";
import ImagePreview from "@/components/image-preview/image-preview";
import ImageTransform from "@/components/image-transform/image-transform";
import ImageExport from "@/components/image-export.tsx/image-export";
import { pipeline } from '@/components/transforms/pipeline';

export default function Home() {
  const [images, setImages] = useState([]);
  const [transforms, setTransforms] = useState([]);
  const [tabIndex, setTabIndex] = useState(0)

  const handleTabsChange = (index) => {
    setTabIndex(index)
  }

  const handlePreviewChange = (index) => {
    index = index % images.length
    setPreviewIndex(index)
  }

  const generateOutputImages = () => {
    return pipeline(images, transforms)
  }

  return (
  <div>

  <Flex
    flexDirection="column"
    width="100wh"
    minHeight="100vh"
    backgroundColor="gray.100"
    justifyContent="center"
    alignItems="center"
    overflowY="auto"
  >

  <Flex
      flexDirection={{ base: "column", md: "row" }}
      width="100vw"
      backgroundColor="gray.100"
      justifyContent="center"
      alignItems={{ base: "center", md: "center" }}
      pt={{ base: 4, md: 0 }}
  >
    
      <Box 
          width={{ base: "90%", md: "40vw" }}
          height={{ base: "75vh", md: "75vh" }}
          backgroundColor="white"
          p="1rem"
          boxShadow="md"
          mb={{ base: 4, md: 0 }}
      >
        <Tabs 
          variant='soft-rounded' 
          colorScheme='orange' 
          isFitted
          index={tabIndex} 
          onChange={handleTabsChange}
          >
          <TabList>
            <Tab userSelect={"none"}>Upload</Tab>
            <Tab userSelect={"none"}>Transform</Tab>
            <Tab userSelect={"none"}>Export</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <ImageUploader images={images} setImages={setImages} />
            </TabPanel>
            <TabPanel>
              <ImageTransform images={images} transforms={transforms} setTransforms={setTransforms}/>
            </TabPanel>
            <TabPanel>
              <ImageExport generateOutputImages={generateOutputImages} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>  

      {tabIndex == 1 && (
        <Box 
          width={{ base: "90%", md: "20vw" }}
          height={{ base: "75vh", md: "75vh" }}
          backgroundColor="white"
          p="1rem"
          boxShadow="md"
          display="flex"
          flexDirection="column" 
          alignItems="center"
        >
          <ImagePreview images={images} transforms={transforms}/>
          
        </Box>
      )}

    </Flex>



  </Flex>


  </div>
  )
}