import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        swagger: '2.0', // For Swagger 2.0 specification
        info: {
            title: 'Task Management Documentation',
            version: '1.0.0',
            description: 'This is the API documentation for my task management API.',
        },
        servers: [
            {
                url: "http://localhost:8000",
            },
        ],
        components: {
            schemas: {}, // Add this property
        },
        securityDefinitions: {
            Bearer: {
                type: 'apiKey',
                name: 'Authorization',
                in: 'header',
                description: "Enter your bearer token in the format **Bearer &lt;token&gt;**",
            },
        },
        security: [
            {
                Bearer: []
            }
        ]
    },
    apis: ["./routers/*.js","../routers/*.js","./src/routers/*.js"], // Adjust path as needed
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
