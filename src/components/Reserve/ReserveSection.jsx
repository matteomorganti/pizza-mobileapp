import { useState } from "react";
import {
  Box,
  Input,
  Select,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Center,
  Card,
  CardBody,
  useToast,
} from "@chakra-ui/react";

const TableReservation = () => {
  const toast = useToast();
  const [name, setName] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const days = [
    "Lunedì",
    "Mercoledì",
    "Giovedì",
    "Venerdì",
    "Sabato",
    "Domenica",
  ];  
  const times = ["19:00", "20:00", "21:00", "22:00", "23:00"];

  const handleReservation = () => {
    const reservationData = {
      name,
      selectedDay,
      selectedTime,
    };
  
    fetch('http://localhost:3000/reserve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservationData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Errore durante la prenotazione');
        }
        return response.json();
      })
      .then(data => {
        console.log('Prenotazione effettuata:', data.reservation);
        toast({
          title: 'Prenotazione effettuata',
          description: `Grazie ${data.reservation.name}! La tua prenotazione è avvenuta con successo.`,
          status: 'success',
          isClosable: true,
        });
        setName("");
        setSelectedDay("");
        setSelectedTime("");
      })
      .catch(error => {
        console.error('Errore durante la prenotazione:', error.message);
        toast({
          title: 'Errore durante la prenotazione:',
          description: `Non è stato possibile registrare la tua prenotazione.`,
          status: 'error',
          isClosable: true,
        });
      });
  };
  

  return (
    <Center>
      <Card mt="17vh">
        <CardBody>
          <Box>
            <FormControl>
              <FormLabel>Nome</FormLabel>
              <Input
                type="text"
                placeholder="Inserisci il tuo nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Giorno</FormLabel>
              <Select
                placeholder="Seleziona il giorno"
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
              >
                {days.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Ora</FormLabel>
              <Select
                placeholder="Seleziona l'orario"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                {times.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </Select>
              <FormHelperText>Solo dalle 19:00 alle 23:00</FormHelperText>
              <FormHelperText>Martedì chiuso.</FormHelperText>
            </FormControl>

            <Button
              mt={4}
              bg="#D41212"
              color="white"
              _hover={{
                bg: "#323232", 
              }}
              onClick={handleReservation}
            >
              Prenota Tavolo
            </Button>
          </Box>
        </CardBody>
      </Card>
    </Center>
  );
};

export default TableReservation;
