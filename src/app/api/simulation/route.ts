import { SimulationDto } from "@/app/dtos/simulation-dto";

export const POST = async (request: Request) => {
  const formData: SimulationDto = await request.json();

  return Response.json({ test: "Test" });
};
