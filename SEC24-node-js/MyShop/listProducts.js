var faker = require("faker");

console.log("==============================================");
console.log("Welcome to " + faker.company.companyName() + "!")
// console.log(faker.company.bs());
console.log(faker.company.catchPhrase());
console.log("\nBrowse our selection!");
console.log("==============================================");

for (var i = 0; i < 10; i++) {
  var item = faker.commerce.productName();
  var price = faker.commerce.price();

  // var final = faker.fake("{{commerce.productAdjective}} {{commerce.productMaterial}} {{commerce.product}} - ${{commerce.price}}");
  // console.log(final);
  console.log(item + " - $" + price);
}
