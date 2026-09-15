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

const seedData = async () => {
  try {
    await connectDB();
    console.log('🌱 Clearing existing collections for fresh development seed...');

    await Promise.all([
      User.deleteMany({}),
      Car.deleteMany({}),
      Job.deleteMany({}),
      Application.deleteMany({}),
      Booking.deleteMany({}),
      Review.deleteMany({}),
      Notification.deleteMany({})
    ]);

    console.log('👥 Creating Users (Car Owners & Professional Drivers)...');

    // Default password for all sample accounts
    const password = 'Password@123';

    // 1. Car Owners
    const ownerRahul = await User.create({
      name: 'Rahul Sharma',
      email: 'owner.rahul@example.com',
      password,
      phone: '+91 98230 11223',
      age: 38,
      role: 'owner',
      location: {
        state: 'Maharashtra',
        city: 'Pune',
        area: 'Koregaon Park',
        latitude: 18.5362,
        longitude: 73.8958
      },
      profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      isVerified: true
    });

    const ownerPriya = await User.create({
      name: 'Priya Deshmukh',
      email: 'owner.priya@example.com',
      password,
      phone: '+91 98200 44556',
      age: 34,
      role: 'owner',
      location: {
        state: 'Maharashtra',
        city: 'Mumbai',
        area: 'Bandra West',
        latitude: 19.0596,
        longitude: 72.8295
      },
      profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
      isVerified: true
    });

    const ownerVikram = await User.create({
      name: 'Vikram Patel',
      email: 'owner.vikram@example.com',
      password,
      phone: '+91 98450 77889',
      age: 42,
      role: 'owner',
      location: {
        state: 'Karnataka',
        city: 'Bengaluru',
        area: 'Koramangala',
        latitude: 12.9352,
        longitude: 77.6245
      },
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      isVerified: true
    });

    // 2. Professional Drivers
    const driverRamesh = await User.create({
      name: 'Ramesh Pawar',
      email: 'driver.ramesh@example.com',
      password,
      phone: '+91 98901 12345',
      age: 35,
      role: 'driver',
      location: {
        state: 'Maharashtra',
        city: 'Pune',
        area: 'Kothrud',
        latitude: 18.5074,
        longitude: 73.8077
      },
      profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      licenseNumber: 'MH12 2015004321',
      licenseType: 'LMV',
      experience: 8,
      skills: ['Luxury Cars', 'Automatic Transmission', 'Night Driving', 'GPS Navigation'],
      availability: 'Available',
      preferredJobTypes: ['Outstation', 'One Day', 'Temporary', 'Round Trip'],
      expectedSalary: 1800,
      salaryType: 'Daily',
      rating: 4.9,
      totalReviews: 14,
      isVerified: true
    });

    const driverSuresh = await User.create({
      name: 'Suresh Kumar',
      email: 'driver.suresh@example.com',
      password,
      phone: '+91 97654 32109',
      age: 29,
      role: 'driver',
      location: {
        state: 'Maharashtra',
        city: 'Pune',
        area: 'Baner',
        latitude: 18.5590,
        longitude: 73.7868
      },
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
      licenseNumber: 'MH12 2018008765',
      licenseType: 'Commercial',
      experience: 5,
      skills: ['Manual Cars', 'Highway Driving', 'Hill Driving', 'Punctual'],
      availability: 'Available',
      preferredJobTypes: ['Permanent', 'Temporary', 'One Day'],
      expectedSalary: 1500,
      salaryType: 'Daily',
      rating: 4.7,
      totalReviews: 9,
      isVerified: true
    });

    const driverSachin = await User.create({
      name: 'Sachin Shinde',
      email: 'driver.sachin@example.com',
      password,
      phone: '+91 99876 54321',
      age: 41,
      role: 'driver',
      location: {
        state: 'Maharashtra',
        city: 'Mumbai',
        area: 'Andheri East',
        latitude: 19.1136,
        longitude: 72.8697
      },
      profileImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
      licenseNumber: 'MH02 2012001199',
      licenseType: 'HMV',
      experience: 12,
      skills: ['Luxury Sedans', 'SUVs', 'Outstation', 'English Speaking', 'Night Driving'],
      availability: 'Available',
      preferredJobTypes: ['Outstation', 'Round Trip', 'Temporary'],
      expectedSalary: 2200,
      salaryType: 'Daily',
      rating: 4.95,
      totalReviews: 28,
      isVerified: true
    });

    const driverAmit = await User.create({
      name: 'Amit Verma',
      email: 'driver.amit@example.com',
      password,
      phone: '+91 98112 33445',
      age: 26,
      role: 'driver',
      location: {
        state: 'Maharashtra',
        city: 'Mumbai',
        area: 'Dadar',
        latitude: 19.0178,
        longitude: 72.8478
      },
      profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
      licenseNumber: 'MH01 2021004567',
      licenseType: 'LMV',
      experience: 3,
      skills: ['City Commute', 'Automatic Cars', 'Clean Record'],
      availability: 'Available',
      preferredJobTypes: ['Hourly', 'One Day', 'Temporary'],
      expectedSalary: 400,
      salaryType: 'Hourly',
      rating: 4.4,
      totalReviews: 6,
      isVerified: true
    });

    const driverManju = await User.create({
      name: 'Manjunath Swamy',
      email: 'driver.manju@example.com',
      password,
      phone: '+91 98451 99001',
      age: 37,
      role: 'driver',
      location: {
        state: 'Karnataka',
        city: 'Bengaluru',
        area: 'Indiranagar',
        latitude: 12.9784,
        longitude: 77.6408
      },
      profileImage: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80',
      licenseNumber: 'KA03 2014009876',
      licenseType: 'All',
      experience: 9,
      skills: ['Electric Vehicles', 'Luxury Cars', 'Airport Transfers', 'Traffic Expert'],
      availability: 'Available',
      preferredJobTypes: ['Permanent', 'Temporary', 'One Day', 'Hourly'],
      expectedSalary: 20000,
      salaryType: 'Monthly',
      rating: 4.85,
      totalReviews: 19,
      isVerified: true
    });

    const driverDeepak = await User.create({
      name: 'Deepak Jadhav',
      email: 'driver.deepak@example.com',
      password,
      phone: '+91 98229 88776',
      age: 24,
      role: 'driver',
      location: {
        state: 'Maharashtra',
        city: 'Pune',
        area: 'Hinjewadi',
        latitude: 18.5913,
        longitude: 73.7389
      },
      profileImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
      licenseNumber: 'MH12 2023001234',
      licenseType: 'LMV',
      experience: 2,
      skills: ['City Traffic', 'Manual Cars'],
      availability: 'Busy',
      preferredJobTypes: ['Hourly', 'One Day'],
      expectedSalary: 1200,
      salaryType: 'Daily',
      rating: 4.2,
      totalReviews: 4,
      isVerified: true
    });

    const driverRahulPatil = await User.create({
      name: 'Rahul Patil',
      email: 'driver.rahulpatil@example.com',
      password,
      phone: '+91 98231 99887',
      age: 33,
      role: 'driver',
      location: {
        state: 'Maharashtra',
        city: 'Amravati',
        area: 'Rajapeth',
        latitude: 20.9320,
        longitude: 77.7580
      },
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      licenseNumber: 'MH27 2016009812',
      licenseType: 'LMV',
      experience: 7,
      skills: ['Highway Driving', 'Manual & Automatic', 'Night Driving', 'Punctual'],
      availability: 'Available',
      preferredJobTypes: ['Outstation', 'Temporary', 'One Day', 'Hourly'],
      expectedSalary: 1600,
      salaryType: 'Daily',
      rating: 4.8,
      totalReviews: 16,
      isVerified: true
    });

    console.log('🚗 Creating Cars for Owners...');
    const carCreta = await Car.create({
      ownerId: ownerRahul._id,
      brand: 'Hyundai',
      model: 'Creta',
      variant: 'SX (O)',
      year: 2023,
      registrationNumber: 'MH12AB1001',
      fuelType: 'Diesel',
      transmission: 'Automatic',
      seatingCapacity: 5,
      carImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&auto=format&fit=crop&q=80'
    });

    const carCity = await Car.create({
      ownerId: ownerRahul._id,
      brand: 'Honda',
      model: 'City',
      variant: 'ZX',
      year: 2022,
      registrationNumber: 'MH12CD2002',
      fuelType: 'Petrol',
      transmission: 'Manual',
      seatingCapacity: 5,
      carImage: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400&auto=format&fit=crop&q=80'
    });

    const carInnova = await Car.create({
      ownerId: ownerPriya._id,
      brand: 'Toyota',
      model: 'Innova Hycross',
      variant: 'ZX(O)',
      year: 2024,
      registrationNumber: 'MH02EF3003',
      fuelType: 'Hybrid',
      transmission: 'Automatic',
      seatingCapacity: 7,
      carImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=400&auto=format&fit=crop&q=80'
    });

    const carNexon = await Car.create({
      ownerId: ownerVikram._id,
      brand: 'Tata',
      model: 'Nexon EV',
      variant: 'Empowered Plus',
      year: 2023,
      registrationNumber: 'KA01GH4004',
      fuelType: 'Electric',
      transmission: 'Automatic',
      seatingCapacity: 5,
      carImage: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&auto=format&fit=crop&q=80'
    });

    console.log('📋 Creating Driver Hiring Jobs...');
    const job1 = await Job.create({
      ownerId: ownerRahul._id,
      carId: carCreta._id,
      title: 'Weekend Outstation Driver for Family Trip to Lonavala',
      description: 'Looking for a disciplined, skilled driver to drive our Hyundai Creta Automatic for a 2-day family weekend trip from Pune to Lonavala and back. Must have good hill-driving and highway experience.',
      jobType: 'Outstation',
      pickupLocation: {
        state: 'Maharashtra',
        city: 'Pune',
        area: 'Koregaon Park',
        address: 'Lane 5, Koregaon Park',
        latitude: 18.5362,
        longitude: 73.8958
      },
      destination: {
        state: 'Maharashtra',
        city: 'Lonavala',
        area: 'Bushi Dam Road',
        address: 'Villa 12, Lonavala',
        latitude: 18.7557,
        longitude: 73.4091
      },
      startDate: new Date(Date.now() + 86400000 * 2),
      endDate: new Date(Date.now() + 86400000 * 4),
      workingHours: '8 AM - 8 PM',
      salary: 2000,
      salaryType: 'Daily',
      requiredExperience: 4,
      requiredLicenseType: 'LMV',
      status: 'open'
    });

    const job2 = await Job.create({
      ownerId: ownerRahul._id,
      carId: carCity._id,
      title: 'Monthly Personal Driver for Office Commute (Kothrud to Hinjewadi)',
      description: 'Need a reliable driver to drive Honda City Manual daily Monday to Friday. Morning pickup from Kothrud at 8:30 AM, drop to Hinjewadi Phase 1, and return at 6:30 PM.',
      jobType: 'Temporary',
      pickupLocation: {
        state: 'Maharashtra',
        city: 'Pune',
        area: 'Kothrud',
        address: 'Near Gandhi Bhavan',
        latitude: 18.5074,
        longitude: 73.8077
      },
      destination: {
        state: 'Maharashtra',
        city: 'Pune',
        area: 'Hinjewadi',
        address: 'Phase 1 Tech Park',
        latitude: 18.5913,
        longitude: 73.7389
      },
      startDate: new Date(Date.now() + 86400000 * 3),
      endDate: new Date(Date.now() + 86400000 * 33),
      workingHours: '8:30 AM - 7:30 PM',
      salary: 18000,
      salaryType: 'Monthly',
      requiredExperience: 3,
      requiredLicenseType: 'LMV',
      status: 'open'
    });

    const job3 = await Job.create({
      ownerId: ownerPriya._id,
      carId: carInnova._id,
      title: 'Experienced Chauffeur for Mumbai to Goa Outstation Tour',
      description: 'Seeking a professional chauffeur to drive our Toyota Innova Hycross for an executive tour to Goa. Stay and food allowances provided. Clean driving record essential.',
      jobType: 'Outstation',
      pickupLocation: {
        state: 'Maharashtra',
        city: 'Mumbai',
        area: 'Bandra West',
        address: 'Pali Hill',
        latitude: 19.0596,
        longitude: 72.8295
      },
      destination: {
        state: 'Goa',
        city: 'Panaji',
        area: 'Miramar',
        address: 'Miramar Beach Resort',
        latitude: 15.4800,
        longitude: 73.8090
      },
      startDate: new Date(Date.now() + 86400000 * 5),
      endDate: new Date(Date.now() + 86400000 * 10),
      workingHours: 'Full Day Outstation',
      salary: 2500,
      salaryType: 'Daily',
      requiredExperience: 6,
      requiredLicenseType: 'Commercial',
      status: 'open'
    });

    const job4 = await Job.create({
      ownerId: ownerVikram._id,
      carId: carNexon._id,
      title: 'One Day Driver for Corporate Client Meetings in Bengaluru',
      description: 'Looking for a well-dressed and polite driver to drive our Tata Nexon EV for attending multiple meetings across Bengaluru (Electronic City, Whitefield, MG Road).',
      jobType: 'One Day',
      pickupLocation: {
        state: 'Karnataka',
        city: 'Bengaluru',
        area: 'Koramangala',
        address: '4th Block Koramangala',
        latitude: 12.9352,
        longitude: 77.6245
      },
      destination: {
        state: 'Karnataka',
        city: 'Bengaluru',
        area: 'Whitefield',
        address: 'ITPL Main Gate',
        latitude: 12.9866,
        longitude: 77.7380
      },
      startDate: new Date(Date.now() + 86400000),
      endDate: new Date(Date.now() + 86400000),
      workingHours: '9:00 AM - 7:00 PM',
      salary: 1400,
      salaryType: 'Daily',
      requiredExperience: 2,
      requiredLicenseType: 'LMV',
      status: 'open'
    });

    const job5 = await Job.create({
      ownerId: ownerRahul._id,
      carId: carCity._id,
      title: 'Family Outstation & Local Driver Needed in Amravati',
      description: 'Looking for a verified, experienced driver in Amravati for local visits and trips to Nagpur. Safe driving, clean record, and LMV license required.',
      jobType: 'Outstation',
      pickupLocation: {
        state: 'Maharashtra',
        city: 'Amravati',
        area: 'Rajapeth',
        address: 'Near Rajapeth Bus Stand',
        latitude: 20.9320,
        longitude: 77.7580
      },
      destination: {
        state: 'Maharashtra',
        city: 'Nagpur',
        area: 'Dharampeth',
        address: 'West High Court Road',
        latitude: 21.1458,
        longitude: 79.0882
      },
      startDate: new Date(Date.now() + 86400000 * 2),
      endDate: new Date(Date.now() + 86400000 * 5),
      workingHours: '8:00 AM - 7:00 PM',
      salary: 1600,
      salaryType: 'Daily',
      requiredExperience: 5,
      requiredLicenseType: 'LMV',
      status: 'open'
    });

    console.log('🤝 Creating Completed Sample Booking & Review...');
    // Create an older completed job and booking to showcase reviews and rating calculation
    const completedJob = await Job.create({
      ownerId: ownerRahul._id,
      carId: carCreta._id,
      title: 'Pune to Mahabaleshwar Weekend Drive',
      description: 'Weekend leisure drive through ghat sections.',
      jobType: 'Outstation',
      pickupLocation: {
        state: 'Maharashtra',
        city: 'Pune',
        area: 'Koregaon Park',
        latitude: 18.5362,
        longitude: 73.8958
      },
      destination: {
        state: 'Maharashtra',
        city: 'Mahabaleshwar',
        area: 'Market Road',
        latitude: 17.9237,
        longitude: 73.6586
      },
      startDate: new Date(Date.now() - 86400000 * 7),
      endDate: new Date(Date.now() - 86400000 * 5),
      workingHours: '8 AM - 6 PM',
      salary: 1900,
      salaryType: 'Daily',
      requiredExperience: 5,
      requiredLicenseType: 'LMV',
      status: 'completed'
    });

    const sampleApp = await Application.create({
      jobId: completedJob._id,
      driverId: driverRamesh._id,
      message: 'Experienced in ghat and expressway driving. Ready with Creta automatic.',
      expectedSalary: 1900,
      status: 'accepted',
      appliedAt: new Date(Date.now() - 86400000 * 8)
    });

    const completedBooking = await Booking.create({
      jobId: completedJob._id,
      applicationId: sampleApp._id,
      ownerId: ownerRahul._id,
      driverId: driverRamesh._id,
      carId: carCreta._id,
      startDate: completedJob.startDate,
      endDate: completedJob.endDate,
      pickupLocation: completedJob.pickupLocation,
      destination: completedJob.destination,
      agreedAmount: 3800,
      status: 'completed'
    });

    await Review.create({
      bookingId: completedBooking._id,
      ownerId: ownerRahul._id,
      driverId: driverRamesh._id,
      rating: 5,
      comment: 'Ramesh is an exceptional driver! Punctual, very smooth on the ghat sections, and handled my Creta with immense care. Highly recommended.'
    });

    // Also create one active application for Job 1 from Suresh Kumar
    await Application.create({
      jobId: job1._id,
      driverId: driverSuresh._id,
      message: 'Hello Rahul sir, I frequently drive between Pune and Lonavala. I can comfortably drive automatic and manual cars and I am ready for this weekend.',
      expectedSalary: 2000,
      status: 'pending',
      appliedAt: new Date()
    });

    await Notification.create({
      recipientId: ownerRahul._id,
      type: 'application_received',
      title: 'New Driver Application Received',
      message: 'Suresh Kumar applied for your job: "Weekend Outstation Driver for Family Trip to Lonavala".',
      relatedId: job1._id,
      isRead: false
    });

    console.log('✨ Seed finished successfully!');
    console.log('\n======================================================');
    console.log('DEMO ACCOUNTS READY FOR TESTING & EVALUATION:');
    console.log('------------------------------------------------------');
    console.log('CAR OWNERS:');
    console.log('  1. Email: owner.rahul@example.com  | Password: Password@123 (Pune - Creta, Honda City)');
    console.log('  2. Email: owner.priya@example.com  | Password: Password@123 (Mumbai - Innova)');
    console.log('  3. Email: owner.vikram@example.com | Password: Password@123 (Bengaluru - Nexon EV)');
    console.log('\nPROFESSIONAL DRIVERS:');
    console.log('  1. Email: driver.ramesh@example.com | Password: Password@123 (Pune - 8 yrs exp, 4.9 ★)');
    console.log('  2. Email: driver.suresh@example.com | Password: Password@123 (Pune - 5 yrs exp, 4.7 ★)');
    console.log('  3. Email: driver.sachin@example.com | Password: Password@123 (Mumbai - 12 yrs exp, 4.95 ★)');
    console.log('  4. Email: driver.amit@example.com   | Password: Password@123 (Mumbai - 3 yrs exp, 4.4 ★)');
    console.log('  5. Email: driver.manju@example.com  | Password: Password@123 (Bengaluru - 9 yrs exp, 4.85 ★)');
    console.log('  6. Email: driver.deepak@example.com | Password: Password@123 (Pune - 2 yrs exp, Busy)');
    console.log('======================================================\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedData();
