import { GlobalStyle } from "../globalStyles";
import { Container } from "@chakra-ui/react";
import Cart from "../components/Cart/Cart";
import NavBar from "../components/Navbar/NavBarSection";

function Reservation() {
  return (
    <div>
      <GlobalStyle />
      <NavBar />
      <Container h={"100vh"} maxW="none">
        <Cart />
      </Container>
    </div>
  );
}
export default Reservation;
