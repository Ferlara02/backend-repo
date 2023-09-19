import { faker } from "@faker-js/faker";
faker.locale = "es";

export const generateProduct = () => {
    return {
        _id: faker.database.mongodbObjectId(),
        nameProd: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        category:  faker.commerce.productAdjective(),
        code: faker.datatype.number(),
        stock: faker.datatype.number({ max: 100 }),
        thumbnails: [faker.image.imageUrl(), faker.image.imageUrl()],
        status: faker.datatype.boolean(),
    };
}