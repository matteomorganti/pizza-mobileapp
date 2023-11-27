import { GlobalStyle } from "../globalStyles";
import Login from "../components/Auth/Login";
import { Container } from "@chakra-ui/react";

function Reservation() {
  return (
    <div>
      <GlobalStyle />
      <Container h={"100vh"} maxW="none">
        <Login />
      </Container>
    </div>
  );
}
export default Reservation;
