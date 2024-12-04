const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Employee = require('../models/employee'); // Import the Employee model

// Helper to generate JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Sign-up
exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  console.log("Email received:", email); // Log the email for debugging

  // Validate email format
  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  try {
    // Check if the user with the given email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }


    // Create a new user
    const user = new User({name, email, password, role });
    await user.save();

    if (role === 'Manager') {
      const employee = new Employee({ name, email, userId: user._id  });
      await employee.save();
    }
    
    // Generate token and send response
    const token = generateToken(user);
    res.status(201).json({ token, role: user.role });
  } catch (error) {
    console.error('Error creating user:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

// Optional: Email validation function
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Sign-in
exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token and send response
    const token = generateToken(user);
    res.status(200).json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Error signing in', error: error.message });
  }
};
