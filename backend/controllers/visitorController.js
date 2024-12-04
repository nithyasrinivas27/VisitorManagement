const Visitor = require('../models/visitor');
const Employee = require('../models/employee');
const nodemailer = require('nodemailer');

// Send email function
const sendEmail = async (visitor, employee, state) => {
  try {
    // Verify that environment variables are properly set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.FRONTEND_URL) {
      throw new Error('Email configuration is missing in environment variables');
    }

    // Debugging log to check that the environment variables are correct
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    // console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '********' : 'Missing Password'); // Mask the password
    console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
    console.log('Visitor:', visitor);
    console.log('Employee:', employee);
    console.log('State:', state);

    // Create a transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email #1: Define the email options to send to the employee
    const mailOptionsEmployee = {
      from: process.env.EMAIL_USER,
      to: employee.email,
      subject: `Visitor Approval Request: ${visitor.name}`,
      html: `
        <p>You have a new visitor request.</p>
        <p><strong>Visitor Name:</strong> ${visitor.name}</p>
        <p><strong>Visitor Email:</strong> ${visitor.email}</p>
        <p><strong>Purpose:</strong> ${visitor.purpose}</p>
        <p><strong>Requested Time:</strong> ${new Date().toLocaleString()}</p>
        <p>Please click the link below to approve the visitor:</p>
        <a href="${process.env.FRONTEND_URL}/approve/${visitor._id}" style="display: inline-block; padding: 8px 12px; margin: 10px 0; font-size: 16px; color: #fff; background-color: #28a745; text-decoration: none; border-radius: 5px;">Approve Visitor</a>
      `,
    };

    // Send the first email to the employee
    await transporter.sendMail(mailOptionsEmployee);
    console.log('Email sent successfully to:', employee.email);

    // Email #2: Define the email options for each email address in the state
    const visitorMailContent = {
      subject: `Visitor Information: ${visitor.name}`,
      html: `
        <p>Visitor Information:</p>
        <p><strong>Visitor Name:</strong> ${visitor.name}</p>
        <p><strong>Visitor Email:</strong> ${visitor.email}</p>
        <p><strong>Purpose:</strong> ${visitor.purpose}</p>
        <p><strong>Requested Time:</strong> ${new Date().toLocaleString()}</p>
      `,
    };

    // Loop through all emails in state and send the second email to each
    for (let i = 0; i < state.length; i++) {
      const recipient = state[i]; // current email from state
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipient,
        subject: visitorMailContent.subject,
        html: visitorMailContent.html,
      };

      // Send the second email with visitor info
      await transporter.sendMail(mailOptions);
      console.log(`Visitor information email sent successfully to: ${recipient}`);
    }

  } catch (error) {
    console.error('Error sending email:', error.message);
    // Optional: Handle error (e.g., retry, log to monitoring service)
    throw error; // Re-throw if you want to handle it further up the call stack
  }
};



// Add Visitor
exports.addVisitor = async (req, res) => {
    try {
      console.log('Received data:', req.body); // Debug line to check received data
      const { name, address, email, companyName,companyAddress,contactNumber,purpose, proofId, employeeId, photo } = req.body;
  
      if (!employeeId) {
        return res.status(400).json({ message: 'employeeId is required' });
      }
      const employee = await Employee.findById(employeeId);
      if (!employee) return res.status(404).json({ message: 'Employee not found' });
  
      // Ensure that employeeId is properly formatted as an ObjectId
      const visitor = new Visitor({
        name,
        address, 
        email,
        companyName,
        companyAddress,
        contactNumber,
        purpose,
        proofId,
        employeeId,
        photo 
      });
      const state = [
        'nithyasri12012003@gmail.com'

      ];
      await visitor.save();
      await sendEmail(visitor, employee, state);
      res.status(201).json(visitor);
    } catch (error) {
      console.error('Error creating visitor:', error);
      res.status(500).json({ message: error.message });
    }
  };

// Get all Visitors
exports.getVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find().populate('employeeId');
    res.json(visitors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve Visitor
exports.approveVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);
    if (!visitor) return res.status(404).json({ message: 'Visitor not found' });

    visitor.status = 'Approved';
    await visitor.save();

    res.json(visitor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getApprovedVisitors = async (req, res) => {
  try {
    const approvedVisitors = await Visitor.find({ status: 'Approved' }).populate('employeeId');
    res.json(approvedVisitors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// visitorsController.js

exports.getVisitorsByManager = async (req, res) => {
  const { userId } = req.params; // Assuming you are passing the managerId
console.log ("userId",userId)
  try {
    const employee = await Employee.find({ userId});
    const employeeId = employee[0]._id;

    const visitors = await Visitor.find({employeeId});
    res.status(200).json(visitors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching visitors', error: error.message });
  }
};

exports.getApprovedVisitorsByManager = async (req, res) => {
  const { userId } = req.params; // Assuming you are passing the managerId

  try {
    const employee = await Employee.find({ userId});
    const employeeId = employee[0]._id;
    const approvedVisitors = await Visitor.find({employeeId, status: 'Approved' }).populate('employeeId');
    res.json(approvedVisitors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
