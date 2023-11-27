import { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
} from '@chakra-ui/react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch('http://localhost:3000/cart', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
  
        });
        if (!response.ok) {
          throw new Error('Errore durante il recupero del carrello');
        }

        const cartData = await response.json();
        setCartItems(cartData);
      } catch (error) {
        console.error('Errore durante il recupero del carrello:', error.message);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <Box p={4} h={'100vh'} overflowY="auto" transition="height 0.3s ease-out">
      <Heading mb={4} textAlign="center">
        Il tuo Carrello
      </Heading>

      {cartItems.length > 0 ? (
        <VStack align="stretch" spacing={4}>
          {cartItems.map((item) => (
            <Box key={item._id} mb={4}>
              <VStack>
                <Text fontWeight="bold">Piatto: {item.name}</Text>
                <Text>Prezzo: {item.price}€</Text>
              </VStack>
            </Box>
          ))}
          <Button
            bg={'#D41212'}
            color={'white'}
            _hover={{
              bg: '#323232',
            }}
          >
            Acquista
          </Button>
        </VStack>
      ) : (
        <Text>Il carrello è vuoto</Text>
      )}
    </Box>
  );
};

export default Cart;
