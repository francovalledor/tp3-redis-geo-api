import { Link } from "react-router-dom";

export const Title: React.FC = () => {
  return (
    <section className="py-5 text-center container align-top">
      <div className="row py-lg-5">
        <div className="col-lg-6 col-md-8 mx-auto">
          <h1 className="fw-light"><Link to={"/"}>The Mandalorian</Link></h1>
          <p className="lead text-muted">
            After the fall of the Galactic Empire, lawlessness has spread
            throughout the galaxy. A lone gunfighter makes his way through the
            outer reaches, earning his keep as a bounty hunter.
          </p>
        </div>
      </div>
    </section>
  );
};
