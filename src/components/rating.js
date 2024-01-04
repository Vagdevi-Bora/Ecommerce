import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function Rating(props) {
  const s = props.stars;
  return (<>
    {Array.from(Array(5), (e, i) => {
      return <span key={i} > <FontAwesomeIcon className={(s > i) ? "yellowIcon" : 'simpleIcon'} icon={faStar} />
      </span>
    })}
  </>);
}