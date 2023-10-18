export const info = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API eCommerce",
            version: "1.0.0",
            description: "API backend de eCommerce genérico, con Node JS y Express."
        },
        servers: [
            {
                url: "http://localhost:8080"
            }
        ]
    },
    apis: ["./src/docs/*.yml"]
}

