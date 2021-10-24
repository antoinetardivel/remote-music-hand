import WaveLettersAppear from "../../components/WaveLettersAppear/WaveLettersAppear.component";
import "./home.css";
interface Ihome {}
const Home: React.FC<Ihome> = () => {
  return (
    <div className="homeContainer">
      <span></span>
      <button className="homeButton">
        <WaveLettersAppear text={"Start experience"} />
      </button>
      <p className="credits">
        Bootstrapped by{" "}
        <a
          rel="noreferrer"
          href="https://antoinetardivel.com"
          target="_blank"
          className="creditsLink"
        >
          Antoine Tardivel
        </a>
      </p>
    </div>
  );
};
export default Home;
