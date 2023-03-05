import axios from "axios";

export default async function loadScreenings() {
  let data = await axios.get(
    "https://plankton-app-xhkom.ondigitalocean.app/api/screenings?populate=movie"
  );
  data = data.data.data;
  return data;
}
