import Car from '../models/cars.js';

// Create a new car
export const createCar = async (req, res) => {
  const { name, price, modelYear, photo } = req.body;

  try {
    const car = new Car({
      user: req.user.id, // Assuming req.user.id is set by the auth middleware
      name,
      price,
      modelYear,
      photo,
    });

    await car.save();
    res.json(car);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Get all cars
export const getCars = async (req, res) => {
  try {
    const cars = await Car.find().populate('user', ['username', 'email']);
    res.json(cars);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Get cars listed by the logged-in user
export const getUserCars = async (req, res) => {
  try {
    const cars = await Car.find({ user: req.user.id }).populate('user', ['username', 'email']);
    res.json(cars);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Get cars not listed by the logged-in user
export const getCarsNotListedByUser = async (req, res) => {
  try {
    const cars = await Car.find({ user: { $ne: req.user.id } }).populate('user', ['username', 'email']);
    res.json(cars);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Edit a car
export const updateCar = async (req, res) => {
  const { name, price, modelYear, photo } = req.body;
  const carId = req.params.id;

  try {
    let car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({ msg: 'Car not found' });
    }

    // Check if user is authorized to edit this car
    if (car.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Update car fields
    car.name = name;
    car.price = price;
    car.modelYear = modelYear;
    car.photo = photo;

    await car.save();
    res.json(car);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Delete a car

export const deleteCar = async (req, res) => {
  const carId = req.params.id;

  try {
    let car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({ msg: 'Car not found' });
    }

    // Check if user is authorized to delete this car
    if (car.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

  
    await Car.deleteOne({ _id: carId });

    res.json({ msg: 'Car removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
