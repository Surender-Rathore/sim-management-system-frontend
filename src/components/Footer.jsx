import { Container } from "reactstrap";
import { BRAND } from "../config/brand";

const Footer = () => {
  return (
    <footer className="brand-footer">
      <Container>
        <p className="text-center mb-0">
          &copy; {BRAND.year} {BRAND.name}. All Rights Reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;