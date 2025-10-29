import swaggerAutogen from "swagger-autogen";
import dotenv from "dotenv";

dotenv.config();

const doc = {
  info: {
    title: "My API",
    description: "API documentation for My API",
  },
  host: `${process.env.HOST}:${process.env.PORT}` || "localhost:3000",
  definitions: {},
};

const outputFile = "./src/swagger-output.json";
const endpointsFiles = ["./src/index.ts"];

swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
  console.log("Swagger documentation generated successfully.");
});
