import citiesFull from "@/assets/cityData.js";
import citySearchList from "@/assets/cities.js";
import cityPaths from "@/assets/cityPaths";

export default function handler(req, res) {
  if (req.method === "GET") {
    const { q: query } = req.query;
    const matches = [];
    if (query.length < 3) return res.status(200).json({ res: matches });
    for (let i = 0; i < citySearchList.length; i += 1) {
      if (matches.length < 6) {
        if (
          citySearchList[i].startsWith(query.toLowerCase().replaceAll(" ", ""))
        ) {
          matches.push([...citiesFull[i], cityPaths[i]]);
        }
      } else {
        return res.status(200).json(matches.slice(0, 4));
      }
    }
    return res.status(200).json(matches.slice(0, 4));
  }
  return res.status(405);
}
