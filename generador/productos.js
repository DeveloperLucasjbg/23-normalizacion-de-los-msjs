const faker = require("faker");
// faker.locale = 'es';

const get = () => ({
  nombre: faker.commerce.product(),
  precio: faker.commerce.price(),
  image: faker.image.image(),
});

module.exports = {
  get,
};
