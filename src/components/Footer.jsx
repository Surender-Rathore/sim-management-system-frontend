import { Container } from "reactstrap";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#2c3e50", color: "#fff", padding: "10px 0", marginTop: "60px" }}>
      <Container>
        <p className="text-center mb-0">
          &copy; {new Date().getFullYear()} SIM Management System. All Rights Reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;