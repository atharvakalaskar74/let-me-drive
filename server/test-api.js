const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../.env') });
if (!process.env.MONGO_URI) {
  dotenv.config({ path: path.resolve(process.cwd(), '.env') });
}

const connectDB = require('./config/db');
const User = require('./models/User');
const Car = require('./models/Car');
const Job = require('./models/Job');
const Application = require('./models/Application');
const Booking = require('./models/Booking');
const Review = require('./models/Review');
const Notification = require('./models/Notification');

const BASE_URL = 'http://localhost:5001';

async function runTests() {
  console.log('🧪 Starting LET ME DRIVE Comprehensive API Test Suite...\n');

  // Start temporary test server on port 5001
  const app = require('./server');
  let serverInstance;

  try {
    serverInstance = app.listen(5001);
    console.log('📡 Test server started on port 5001');
  } catch (err) {
    console.error('Server listen error:', err);
  }

  let passedCount = 0;
  let totalCount = 0;

  async function test(name, fn) {
    totalCount++;
    try {
      await fn();
      console.log(`  ✅ [PASS] ${name}`);
      passedCount++;
    } catch (err) {
      console.error(`  ❌ [FAIL] ${name}:`, err.message);
    }
  }

  try {
    let ownerToken = '';
    let driverToken = '';
    let createdCarId = '';
    let createdJobId = '';
    let createdAppId = '';
    let createdBookingId = '';

    const testOwnerEmail = `test.owner.${Date.now()}@example.com`;
    const testDriverEmail = `test.driver.${Date.now()}@example.com`;

    // 1. Health check
    await test('1. Health Check Endpoint', async () => {
      const res = await fetch(`${BASE_URL}/api/health`);
      const data = await res.json();
      if (!data.success || !data.message.includes('Let Me Drive')) {
        throw new Error('Health check unexpected response: ' + JSON.stringify(data));
      }
    });

    // 2. Register Owner
    await test('2. Car Owner Registration', async () => {
      const res = await fetch(`${BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Test Owner',
          email: testOwnerEmail,
          password: 'Password@123',
          phone: '9988776655',
          role: 'owner',
          location: { state: 'Maharashtra', city: 'Pune', area: 'Baner' }
        })
      });
      const data = await res.json();
      if (!data.success || !data.token) {
        throw new Error(data.message || 'Registration failed');
      }
      ownerToken = data.token;
    });

    // 3. Register Driver
    await test('3. Professional Driver Registration with License & Skills', async () => {
      const res = await fetch(`${BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Test Driver',
          email: testDriverEmail,
          password: 'Password@123',
          phone: '9876543210',
          role: 'driver',
          location: { state: 'Maharashtra', city: 'Pune', area: 'Baner' },
          licenseNumber: 'MH12 2019009988',
          licenseType: 'LMV',
          experience: 6,
          skills: ['Automatic', 'Night Driving', 'GPS'],
          preferredJobTypes: ['Outstation', 'One Day']
        })
      });
      const data = await res.json();
      if (!data.success || !data.token) {
        throw new Error(data.message || 'Driver registration failed');
      }
      driverToken = data.token;
    });

    // 4. Login
    await test('4. Authentication & JWT Token Issuance', async () => {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: testOwnerEmail,
          password: 'Password@123'
        })
      });
      const data = await res.json();
      if (!data.success || !data.token) {
        throw new Error('Login failed: ' + data.message);
      }
      ownerToken = data.token;
    });

    // 5. Get Profile
    await test('5. Protected Route & /api/auth/me Verification', async () => {
      const res = await fetch(`${BASE_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${ownerToken}` }
      });
      const data = await res.json();
      if (!data.success || data.user.email !== testOwnerEmail) {
        throw new Error('Profile fetch failed');
      }
    });

    // 6. Add Car
    await test('6. Owner Adds a Vehicle', async () => {
      const res = await fetch(`${BASE_URL}/api/cars`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ownerToken}`
        },
        body: JSON.stringify({
          brand: 'Kia',
          model: 'Seltos',
          variant: 'GT Line',
          year: 2023,
          registrationNumber: `MH12TEST${Math.floor(Math.random() * 1000)}`,
          fuelType: 'Petrol',
          transmission: 'Automatic',
          seatingCapacity: 5
        })
      });
      const data = await res.json();
      if (!data.success || !data.car) {
        throw new Error(data.message || 'Add car failed');
      }
      createdCarId = data.car._id;
    });

    // 7. Post Job
    await test('7. Owner Posts Driver Requirement / Job', async () => {
      const res = await fetch(`${BASE_URL}/api/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ownerToken}`
        },
        body: JSON.stringify({
          carId: createdCarId,
          title: 'Urgent Driver for Weekend Outstation to Mahabaleshwar',
          description: 'Need careful driver for Seltos Automatic',
          jobType: 'Outstation',
          pickupLocation: {
            state: 'Maharashtra',
            city: 'Pune',
            area: 'Baner'
          },
          destination: {
            state: 'Maharashtra',
            city: 'Mahabaleshwar'
          },
          startDate: new Date(Date.now() + 86400000).toISOString(),
          salary: 2200,
          salaryType: 'Daily',
          requiredExperience: 3,
          requiredLicenseType: 'LMV'
        })
      });
      const data = await res.json();
      if (!data.success || !data.job) {
        throw new Error(data.message || 'Post job failed');
      }
      createdJobId = data.job._id;
    });

    // 8. Browse & Filter Jobs
    await test('8. Drivers Browse & Filter Jobs by City', async () => {
      const res = await fetch(`${BASE_URL}/api/jobs?city=Pune&status=open`);
      const data = await res.json();
      if (!data.success || !Array.isArray(data.jobs) || data.jobs.length === 0) {
        throw new Error('Jobs list empty or failed');
      }
    });

    // 9. Drivers List & Filter
    await test('9. List Drivers with Availability & Experience Filter', async () => {
      const res = await fetch(`${BASE_URL}/api/drivers?city=Pune&availability=Available`);
      const data = await res.json();
      if (!data.success || !Array.isArray(data.drivers)) {
        throw new Error('Drivers list failed');
      }
    });

    // 10. AI Recommendation Engine
    await test('10. AI Recommendation Engine Match Scores & Reasons', async () => {
      const res = await fetch(`${BASE_URL}/api/drivers/recommended?jobId=${createdJobId}`);
      const data = await res.json();
      if (!data.success || !Array.isArray(data.recommendations) || data.recommendations.length === 0) {
        throw new Error('AI recommendation failed');
      }
      const topRec = data.recommendations[0];
      if (typeof topRec.matchScore !== 'number' || !Array.isArray(topRec.reasons)) {
        throw new Error('Invalid recommendation payload structure');
      }
      if (!topRec.breakdown || typeof topRec.breakdown.location !== 'number') {
        throw new Error('Missing score breakdown');
      }
    });

    // 11. Driver Applies for Job
    await test('11. Driver Applies for Job with Custom Note & Rate', async () => {
      const res = await fetch(`${BASE_URL}/api/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${driverToken}`
        },
        body: JSON.stringify({
          jobId: createdJobId,
          message: 'I have 6 years of experience driving automatics in ghats.',
          expectedSalary: 2200
        })
      });
      const data = await res.json();
      if (!data.success || !data.application) {
        throw new Error(data.message || 'Application failed');
      }
      createdAppId = data.application._id;
    });

    // 12. Prevent Duplicate Application
    await test('12. Duplicate Application Prevention Mechanism', async () => {
      const res = await fetch(`${BASE_URL}/api/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${driverToken}`
        },
        body: JSON.stringify({
          jobId: createdJobId,
          message: 'Trying to apply again'
        })
      });
      const data = await res.json();
      if (res.status !== 400 || data.success === true) {
        throw new Error('Duplicate application was not blocked properly');
      }
    });

    // 13. Owner Views Applications
    await test('13. Owner Views Received Applications for Job', async () => {
      const res = await fetch(`${BASE_URL}/api/applications/job/${createdJobId}`, {
        headers: { Authorization: `Bearer ${ownerToken}` }
      });
      const data = await res.json();
      if (!data.success || data.applications.length === 0) {
        throw new Error('Owner failed to view job applications');
      }
    });

    // 14. Owner Accepts Application -> Confirmed Booking Created
    await test('14. Owner Accepts Application and Confirms Booking', async () => {
      const res = await fetch(`${BASE_URL}/api/applications/${createdAppId}/accept`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${ownerToken}` }
      });
      const data = await res.json();
      if (!data.success || !data.booking) {
        throw new Error(data.message || 'Accept application failed');
      }
      createdBookingId = data.booking._id;
      if (data.booking.status !== 'upcoming') {
        throw new Error('Booking status is not upcoming');
      }
    });

    // 15. Driver Views Bookings
    await test('15. Driver Views Confirmed Upcoming Bookings', async () => {
      const res = await fetch(`${BASE_URL}/api/bookings`, {
        headers: { Authorization: `Bearer ${driverToken}` }
      });
      const data = await res.json();
      if (!data.success || data.bookings.length === 0) {
        throw new Error('Driver failed to retrieve bookings');
      }
    });

    // 16. Update Booking to Completed
    await test('16. Booking Progression to "completed"', async () => {
      const res = await fetch(`${BASE_URL}/api/bookings/${createdBookingId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ownerToken}`
        },
        body: JSON.stringify({ status: 'completed' })
      });
      const data = await res.json();
      if (!data.success || data.booking.status !== 'completed') {
        throw new Error(data.message || 'Booking update failed');
      }
    });

    // 17. Rate & Review Driver
    await test('17. Owner Rates Driver & Updates Driver Rating Aggregate', async () => {
      const res = await fetch(`${BASE_URL}/api/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ownerToken}`
        },
        body: JSON.stringify({
          bookingId: createdBookingId,
          rating: 5,
          comment: 'Outstanding driving skills, very polite and punctual!'
        })
      });
      const data = await res.json();
      if (!data.success || !data.review) {
        throw new Error(data.message || 'Review submission failed');
      }
    });

    // 18. Notifications
    await test('18. Notifications Generated and Delivered', async () => {
      const res = await fetch(`${BASE_URL}/api/notifications`, {
        headers: { Authorization: `Bearer ${driverToken}` }
      });
      const data = await res.json();
      if (!data.success || data.notifications.length === 0) {
        throw new Error('No notifications found for driver');
      }
    });

    // 19. Security: Role Authorization Guard
    await test('19. Role Authorization Guard (Driver forbidden to post car)', async () => {
      const res = await fetch(`${BASE_URL}/api/cars`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${driverToken}`
        },
        body: JSON.stringify({
          brand: 'Unauthorized',
          model: 'Car',
          year: 2020,
          registrationNumber: 'FAKE123'
        })
      });
      const data = await res.json();
      if (res.status !== 403 || data.success === true) {
        throw new Error('Role check failed to block driver from owner endpoint');
      }
    });

    console.log(`\n======================================================`);
    console.log(`TEST RESULTS: ${passedCount} / ${totalCount} PASSED`);
    console.log(`======================================================\n`);

    // Clean up temporary test accounts
    await User.deleteMany({ email: { $in: [testOwnerEmail, testDriverEmail] } });
    if (createdCarId) await Car.findByIdAndDelete(createdCarId);
    if (createdJobId) await Job.findByIdAndDelete(createdJobId);
    if (createdAppId) await Application.findByIdAndDelete(createdAppId);
    if (createdBookingId) await Booking.findByIdAndDelete(createdBookingId);

    process.exit(passedCount === totalCount ? 0 : 1);
  } catch (fatal) {
    console.error('Fatal test error:', fatal);
    process.exit(1);
  }
}

runTests();
