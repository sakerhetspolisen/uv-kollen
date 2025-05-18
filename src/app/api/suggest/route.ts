import { NextRequest } from "next/server";
import { z } from "zod";
import cityIndex from "@/src/assets/city_index"

const MIN_CHARS_TO_SEARCH = 2;
const MAX_RESULTS = 6;
const zQuery = z.string().toLowerCase().trim().min(MIN_CHARS_TO_SEARCH).max(100);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const queryParam = searchParams.get("q");
  const validationRes = await zQuery.safeParseAsync(queryParam);

  if (!validationRes.success) {
    return Response.json([]);
  }

  const query = validationRes.data.toLowerCase().replaceAll(" ", "");
  const shortPrefix = query.substring(0, Math.min(2, query.length));
  const candidates = cityIndex[shortPrefix] || [];
  return Response.json(candidates
      .filter(city => city.path.startsWith(query))
      .slice(0, MAX_RESULTS));
}
