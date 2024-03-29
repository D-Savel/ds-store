import { useState, useEffect } from 'react'
import { products } from '../data/products.js'
import {
  Button,
  Heading,
  Center,
  Box,
  Flex,
  Image,
  Text,
  useMediaQuery,
  useDisclosure
} from '@chakra-ui/react'
import { DetailedProductModal } from './DetailedProductModal.js'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'


export const Carousel = () => {
  const [isCarouselPlaying, setIsCarouselPlaying] = useState(true)
  const [index, setIndex] = useState(0)
  const [isMobile] = useMediaQuery('(max-height: 420px)')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const carouselList = products.filter((product) => product.playInCarousel === true)

  const nextClick = () => {
    index === carouselList.length - 1 ? setIndex(0) : setIndex((current => current + 1))
  }
  const previousClick = () => {
    index === 0 ? setIndex(carouselList.length - 1) : setIndex((current => current - 1))
  }

  useEffect(() => {
    if (isCarouselPlaying) {
      const intervalId = setInterval(() => {
        index === carouselList.length - 1 ? setIndex(0) : setIndex((current => current + 1))
      }, 3000)
      return () => clearInterval(intervalId)
    }
  }, [index, carouselList.length, carouselList, isCarouselPlaying])


  return (
    <Box>
      < Box px='1' textAlign='center' backgroundColor='teal.500' borderWidth='1px' borderBottomWidth='0px' borderTopRadius='md' py='0' >
        <Flex justify='space-between' align='center'>
          <Button colorScheme='white' variant='solid' onClick={previousClick}>
            <ChevronLeftIcon w={4} h={4} />
            Previous
          </Button>
          <Heading px='1' color='white' as='h1' size='sm'>
            {carouselList[index].brand} - {carouselList[index].name}
          </Heading>
          <Button colorScheme='white' variant='solid' onClick={nextClick}>
            Next
            <ChevronRightIcon w={4} h={4} />
          </Button>
        </Flex>
      </Box >
      <Center position='relative' z-index='1' py='2' pb='10' borderWidth='1px' borderBottomRadius='md' overflow='hidden'>
        <Image
          boxSize={isMobile ? '200px' : '300px'}
          objectFit='contain'
          borderRadius='lg'
          src={carouselList[index].imgUrl} alt={carouselList[index].name} />
        <Box position='absolute' z-index='0' right='auto' left='1' bottom='1'>
          {carouselList[index].offerPercent > 0 && (
            <Text fontSize='20' color='red'>
              Special Offer : {carouselList[index].offerPercent}% off
              <ChevronRightIcon w={4} h={4} />
            </Text>
          )}
        </Box>
        <Box position='absolute' z-index='0' right='1' left='auto' bottom='0'>
          <Button
            border='2px'
            borderRadius='sx'
            px='2' ml='2'
            size='md'
            variant='solid'
            colorScheme='teal'
            onClick={() => {
              onOpen()
              setIsCarouselPlaying(false)
            }}
            _hover={{
              background: "white",
              color: "teal.500",
            }}>
            Shop now
          </Button>
          <DetailedProductModal isOpen={isOpen} onClose={onClose} isCarouselPlaying={isCarouselPlaying} setIsCarouselPlaying={setIsCarouselPlaying} idItem={carouselList[index].id} />
        </Box>
      </Center >
    </Box>
  )
}