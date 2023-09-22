#! /usr/bin/env node

console.log(
  'This script populates some test cars, manufacturers, bodystyles and carinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Car = require("./models/car");
const Manufacturer = require("./models/manufacturer");
const BodyStyle = require("./models/bodyStyle");
const CarInstance = require("./models/carInstance");

const cars = [];
const manufacturers = [];
const bodystyles = [];
const carinstances = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createManufacturers();
  await createBodyStyles();
  await createCars();
  await createCarInstances();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function bodystyleCreate(index, type) {
  const bodystyle = new BodyStyle({ type: type });
  await bodystyle.save();
  bodystyles[index] = bodystyle;
  console.log(`Added bodystyle: ${type}`);
}

async function manufacturerCreate(index, name, origin) {
  const manufacturer = new Manufacturer({ name: name, origin: origin });
  await manufacturer.save();

  await manufacturer.save();
  manufacturers[index] = manufacturer;
  console.log(`Added manufacturer: ${name} ${origin}`);
}

async function carInstanceCreate(index, car, production_date, sold_date) {
  const carinstancedetail = {
    car: car,
    production_date: production_date,
  };
  if (sold_date != false) carinstancedetail.sold_date = sold_date;

  const carinstance = new CarInstance(carinstancedetail);
  await carinstance.save();
  carinstances[index] = carinstance;
  console.log(`Added carinstance: ${car}`);
}

async function carCreate(index, name, manufacturer, bodystyle, price) {
  const car = new Car({
    name: name,
    manufacturer: manufacturer,
    body_style: bodystyle,
    price: price,
  });
  await car.save();
  cars[index] = car;
  console.log(`Added car: ${name}`);
}

async function createBodyStyles() {
  console.log("Adding bodystyle");
  await Promise.all([
    bodystyleCreate(0, "Sedan"),
    bodystyleCreate(1, "Coupe"),
    bodystyleCreate(2, "Convertable"),
    bodystyleCreate(3, "Hatchback"),
  ]);
}

async function createManufacturers() {
  console.log("Adding manufacturers");
  await Promise.all([
    manufacturerCreate(0, "Toyota", "Japan"),
    manufacturerCreate(1, "Honda", "Japan"),
    manufacturerCreate(2, "BMW", "Germany"),
    manufacturerCreate(3, "Ferrari", "Italy"),
    manufacturerCreate(4, "Ford", "USA"),
  ]);
}
async function createCars() {
  console.log("Adding authors");
  await Promise.all([
    carCreate(0, "Corolla", manufacturers[0], bodystyles[0], 3500),
    carCreate(1, "MR2", manufacturers[0], bodystyles[2], 2000),
    carCreate(2, "Civic", manufacturers[1], bodystyles[3], 4000),
    carCreate(3, "Roma", manufacturers[3], bodystyles[1], 15000),
    carCreate(4, "M3", manufacturers[2], bodystyles[0], 1000),
    carCreate(5, "Mustang", manufacturers[4], bodystyles[1], 8000),
  ]);
}

async function createCarInstances() {
  console.log("Adding Books");
  await Promise.all([
    carInstanceCreate(0, cars[0], "2001-2-13", "2001-5-3"),
    carInstanceCreate(1, cars[1], "2001-4-22", "2001-6-19"),
    carInstanceCreate(2, cars[2], "2017-5-6", false),
    carInstanceCreate(3, cars[3], "2019-8-24", false),
    carInstanceCreate(4, cars[4], "2018-10-2", "2019-1-22"),
    carInstanceCreate(5, cars[5], "2019-2-13", "2019-3-5"),
    carInstanceCreate(6, cars[0], "2020-7-15", false),
    carInstanceCreate(7, cars[1], "2003-4-28", "2003-5-27"),
    carInstanceCreate(8, cars[2], "2021-3-16", false),
  ]);
}
