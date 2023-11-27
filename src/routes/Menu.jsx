import NavBar from "../components/Navbar/NavBarSection";
import { GlobalStyle } from "../globalStyles";
import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Flex,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [menuData, setMenuData] = useState({
    pizza: { antipasti: null, pizze: null },
    carne: { antipasti: null, primi: null, secondi: null },
    pesce: { antipasti: null, primi: null, secondi: null },
    dessert: null,
    bevande: null,
  });

  const [cart, setCart] = useState([]); // Stato del carrello

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const pizzaAntipastiResponse = await fetch(
          "http://localhost:3000/menu/category/6560f78f94a663104ec2ac73/type/antipasti"
        );
        const pizzaPizzeResponse = await fetch(
          "http://localhost:3000/menu/category/6560f78f94a663104ec2ac73/type/secondi"
        );
        const carneAntipastiResponse = await fetch(
          "http://localhost:3000/menu/category/6560f78294a663104ec2ac6d/type/antipasti"
        );
        const carnePrimiResponse = await fetch(
          "http://localhost:3000/menu/category/6560f78294a663104ec2ac6d/type/primi"
        );
        const carneSecondiResponse = await fetch(
          "http://localhost:3000/menu/category/6560f78294a663104ec2ac6d/type/secondi"
        );
        const pesceAntipastiResponse = await fetch(
          "http://localhost:3000/menu/category/6560f78a94a663104ec2ac70/type/antipasti"
        );
        const pescePrimiResponse = await fetch(
          "http://localhost:3000/menu/category/6560f78a94a663104ec2ac70/type/primi"
        );
        const pesceSecondiResponse = await fetch(
          "http://localhost:3000/menu/category/6560f78a94a663104ec2ac70/type/secondi"
        );
        const dessertResponse = await fetch(
          "http://localhost:3000/menu/category/6560f79c94a663104ec2ac76/type/dessert"
        );
        const bevandeResponse = await fetch(
          "http://localhost:3000/menu/category/6560f7a394a663104ec2ac79/type/bevande"
        );

        const pizzaAntipastiData = await pizzaAntipastiResponse.json();
        const pizzaPizzeData = await pizzaPizzeResponse.json();
        const carneAntipastiData = await carneAntipastiResponse.json();
        const carnePrimiData = await carnePrimiResponse.json();
        const carneSecondiData = await carneSecondiResponse.json();
        const pesceAntipastiData = await pesceAntipastiResponse.json();
        const pescePrimiData = await pescePrimiResponse.json();
        const pesceSecondiData = await pesceSecondiResponse.json();
        const dessertData = await dessertResponse.json();
        const bevandeData = await bevandeResponse.json();

        setMenuData({
          pizza: { antipasti: pizzaAntipastiData, pizze: pizzaPizzeData },
          carne: {
            antipasti: carneAntipastiData,
            primi: carnePrimiData,
            secondi: carneSecondiData,
          },
          pesce: {
            antipasti: pesceAntipastiData,
            primi: pescePrimiData,
            secondi: pesceSecondiData,
          },
          dessert: dessertData,
          bevande: bevandeData,
        });
      } catch (error) {
        console.error("Errore durante il recupero dei dati del menu:", error);
      }
    };

    fetchMenuData();
  }, []);

  const handleAddToCart = async (productId, name, price) => {
    try {
      const response = await fetch(
        `http://localhost:3000/cart/add/${productId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            name: name,
            price: price,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Errore durante l'aggiunta al carrello");
      }

      // Aggiorna lo stato del carrello dopo l'aggiunta del prodotto
      setCart([...cart, productId]);
      toast({
        title: "Prodotto aggiunto al carrello",
        status: "success",
        isClosable: true,
      });
      console.log(`Prodotto con ID ${productId} aggiunto al carrello.`);
    } catch (error) {
      console.error("Errore durante l'aggiunta al carrello:", error.message);
    }
  };

  function handleCart() {
    navigate("/cart");
  }

  return (
    <div>
      <GlobalStyle />
      <NavBar />
      <Box p={4} h={"100vh"} overflowY="auto" transition="height 0.3s ease-out">
        <Heading mb={4} textAlign="center">
          I nostri Menù
        </Heading>

        <VStack align="stretch" spacing={4}>
          {Object.entries(menuData).map(([category, sections]) => (
            <Accordion key={category} allowToggle>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      {category.charAt(0).toUpperCase() + category.slice(1)}{" "}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel>
                  {sections ? (
                    <>
                      {Object.entries(sections).map(([section, data]) => (
                        <React.Fragment key={section}>
                          <Text fontSize="lg" fontWeight="bold">
                            {section.charAt(0).toUpperCase() + section.slice(1)}{" "}
                          </Text>
                          {data ? (
                            data.map((item) => (
                              <Box key={item._id} mb={4}>
                                <Flex
                                  justifyContent="space-between"
                                  alignItems="flex-start"
                                >
                                  <Box textAlign="left">
                                    <Text fontWeight="bold">{item.name}</Text>
                                    {item.ingredients && (
                                      <Text>
                                        Ingredienti:{" "}
                                        {item.ingredients.join(", ")}
                                      </Text>
                                    )}
                                  </Box>
                                  <Text fontWeight="bold">
                                    Prezzo: {item.price}€
                                  </Text>
                                  <Button
                                    bg={"#D41212"}
                                    color={"white"}
                                    _hover={{
                                      bg: "#323232",
                                    }}
                                    onClick={() => handleAddToCart(item._id)}
                                  >
                                    Acquista
                                  </Button>
                                </Flex>
                              </Box>
                            ))
                          ) : (
                            <Text>Caricamento in corso...</Text>
                          )}
                        </React.Fragment>
                      ))}
                    </>
                  ) : (
                    <Text>Caricamento in corso...</Text>
                  )}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          ))}
        </VStack>
        <Button
          m={5}
          bg={"#D41212"}
          color={"white"}
          _hover={{
            bg: "#323232",
          }}
          onClick={handleCart}
        >
          Vai al carrello
        </Button>
      </Box>
    </div>
  );
};

export default Menu;
