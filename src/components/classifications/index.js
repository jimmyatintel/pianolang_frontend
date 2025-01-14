import SubBanner1 from "../../images/subbanner1.jpg";
import SubBanner2 from "../../images/subbanner2.jpg";
import SubBanner3 from "../../images/subbanner3.jpg";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./style.css"

function Types() {
  const images = [SubBanner1, SubBanner2, SubBanner3];

  return (
    <section className="watchesTypes">
      <Container className="p-5">
        <div className="d-flex justify-content-around">
          <Link to="/">
            <img src={images[0]} className="img-fluid" alt="" />
          </Link>
          <Link to="/">
            <img src={images[1]} className="img-fluid" alt="" />
          </Link>
          <Link to="/">
            <img src={images[2]} className="img-fluid" alt="" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default Types;
