// ==========================================================================
// LET ME DRIVE - Comprehensive Pan-India Cities & Coordinates Dataset
// 100% Free - Local Dataset for Fast, Zero-Cost Autocomplete & Geocoding
// Covers 450+ Indian Cities across all 28 States & 8 Union Territories
// ==========================================================================

const INDIAN_CITIES = [
  // ========================================================================
  // 1. MAHARASHTRA (Metros, District Headquarters, Talukas & Industrial Hubs)
  // ========================================================================
  { city: "Amravati", state: "Maharashtra", lat: 20.9374, lng: 77.7796, aliases: ["Amrawati", "Badnera"] },
  { city: "Akola", state: "Maharashtra", lat: 20.7002, lng: 77.0082, aliases: ["Murtizapur"] },
  { city: "Mehkar", state: "Maharashtra", lat: 20.1542, lng: 76.5708, aliases: ["Mehker"] },
  { city: "Buldhana", state: "Maharashtra", lat: 20.5312, lng: 76.1848, aliases: ["Buldana"] },
  { city: "Khamgaon", state: "Maharashtra", lat: 20.6866, lng: 76.5647 },
  { city: "Malkapur", state: "Maharashtra", lat: 20.8845, lng: 76.2023 },
  { city: "Shegaon", state: "Maharashtra", lat: 20.7937, lng: 76.6958, aliases: ["Anand Sagar"] },
  { city: "Jalgaon Jamod", state: "Maharashtra", lat: 21.0503, lng: 76.5333 },
  { city: "Deulgaon Raja", state: "Maharashtra", lat: 20.0167, lng: 76.0333 },
  { city: "Chikhli", state: "Maharashtra", lat: 20.3500, lng: 76.2500 },
  { city: "Washim", state: "Maharashtra", lat: 20.1110, lng: 77.1340, aliases: ["Risod", "Karanja Lad"] },
  { city: "Yavatmal", state: "Maharashtra", lat: 20.3888, lng: 78.1204, aliases: ["Pusad", "Umarkhed"] },
  { city: "Wardha", state: "Maharashtra", lat: 20.7453, lng: 78.6022, aliases: ["Sevagram", "Hinganghat"] },
  { city: "Nagpur", state: "Maharashtra", lat: 21.1458, lng: 79.0882, aliases: ["Orange City", "Kamptee"] },
  { city: "Bhandara", state: "Maharashtra", lat: 21.1714, lng: 79.6540, aliases: ["Tumsar"] },
  { city: "Gondia", state: "Maharashtra", lat: 21.4554, lng: 80.1960, aliases: ["Gondiya", "Tirora"] },
  { city: "Chandrapur", state: "Maharashtra", lat: 19.9615, lng: 79.2961, aliases: ["Chanda", "Ballarpur"] },
  { city: "Gadchiroli", state: "Maharashtra", lat: 20.1804, lng: 80.0035, aliases: ["Armori", "Aheri"] },
  { city: "Pune", state: "Maharashtra", lat: 18.5204, lng: 73.8567, aliases: ["Poona", "Kothrud", "Hinjewadi", "Viman Nagar", "Baner", "Hadapsar", "Wakdewadi", "Shivajinagar"] },
  { city: "Pimpri-Chinchwad", state: "Maharashtra", lat: 18.6298, lng: 73.7997, aliases: ["PCMC", "Chinchwad", "Pimpri", "Nigdi", "Bhosari", "Akurdi"] },
  { city: "Mumbai", state: "Maharashtra", lat: 19.0760, lng: 72.8777, aliases: ["Bombay", "Andheri", "Bandra", "Borivali", "Dadar", "Colaba", "Powai", "Juhu"] },
  { city: "Navi Mumbai", state: "Maharashtra", lat: 19.0330, lng: 73.0297, aliases: ["Vashi", "Nerul", "Belapur", "Kharghar", "Airoli", "Panvel"] },
  { city: "Thane", state: "Maharashtra", lat: 19.2183, lng: 72.9781, aliases: ["Ghodbunder", "Majiwada"] },
  { city: "Kalyan-Dombivli", state: "Maharashtra", lat: 19.2403, lng: 73.1305, aliases: ["Kalyan", "Dombivli", "Dombivali"] },
  { city: "Vasai-Virar", state: "Maharashtra", lat: 19.3919, lng: 72.8397, aliases: ["Vasai", "Virar", "Nallasopara"] },
  { city: "Mira-Bhayandar", state: "Maharashtra", lat: 19.2812, lng: 72.8561, aliases: ["Mira Road", "Bhayandar"] },
  { city: "Panvel", state: "Maharashtra", lat: 18.9894, lng: 73.1175, aliases: ["New Panvel"] },
  { city: "Nashik", state: "Maharashtra", lat: 19.9975, lng: 73.7898, aliases: ["Nasik", "Panchavati", "Deolali"] },
  { city: "Malegaon", state: "Maharashtra", lat: 20.5517, lng: 74.5298 },
  { city: "Jalgaon", state: "Maharashtra", lat: 21.0077, lng: 75.5626 },
  { city: "Bhusawal", state: "Maharashtra", lat: 21.0455, lng: 75.7873, aliases: ["Bhusaval"] },
  { city: "Dhule", state: "Maharashtra", lat: 20.9042, lng: 74.7749 },
  { city: "Nandurbar", state: "Maharashtra", lat: 21.3683, lng: 74.2403, aliases: ["Shahada"] },
  { city: "Chhatrapati Sambhajinagar", state: "Maharashtra", lat: 19.8762, lng: 75.3433, aliases: ["Aurangabad", "Sambhajinagar", "Chhatrapati Sambhaji Nagar", "Chikalthana"] },
  { city: "Jalna", state: "Maharashtra", lat: 19.8410, lng: 75.8864, aliases: ["Partur"] },
  { city: "Beed", state: "Maharashtra", lat: 18.9891, lng: 75.7601, aliases: ["Bid", "Parli Vaijnath", "Ambejogai"] },
  { city: "Parbhani", state: "Maharashtra", lat: 19.2608, lng: 76.7748, aliases: ["Gangakhed"] },
  { city: "Hingoli", state: "Maharashtra", lat: 19.7180, lng: 77.1478, aliases: ["Basmath", "Aundha Nagnath"] },
  { city: "Nanded", state: "Maharashtra", lat: 19.1383, lng: 77.3210, aliases: ["Nanded Waghala", "Degloor"] },
  { city: "Latur", state: "Maharashtra", lat: 18.4088, lng: 76.5604, aliases: ["Udgir", "Ausa"] },
  { city: "Dharashiv", state: "Maharashtra", lat: 18.1861, lng: 76.0419, aliases: ["Osmanabad", "Tuljapur"] },
  { city: "Solapur", state: "Maharashtra", lat: 17.6599, lng: 75.9064, aliases: ["Sholapur", "Pandharpur", "Barshi"] },
  { city: "Kolhapur", state: "Maharashtra", lat: 16.7050, lng: 74.2433, aliases: ["Mahalakshmi", "Gandhinagar"] },
  { city: "Ichalkaranji", state: "Maharashtra", lat: 16.6924, lng: 74.4578, aliases: ["Manchester of Maharashtra"] },
  { city: "Sangli", state: "Maharashtra", lat: 16.8524, lng: 74.5815, aliases: ["Sangli Miraj", "Miraj", "Islampur"] },
  { city: "Satara", state: "Maharashtra", lat: 17.6805, lng: 73.9997, aliases: ["Wai", "Phaltan"] },
  { city: "Karad", state: "Maharashtra", lat: 17.2890, lng: 74.1818 },
  { city: "Ratnagiri", state: "Maharashtra", lat: 16.9902, lng: 73.3120, aliases: ["Guhagar"] },
  { city: "Chiplun", state: "Maharashtra", lat: 17.5323, lng: 73.5173 },
  { city: "Sindhudurg", state: "Maharashtra", lat: 16.1130, lng: 73.6990, aliases: ["Kudal", "Oras", "Malvan", "Kankavli"] },
  { city: "Sawantwadi", state: "Maharashtra", lat: 15.9056, lng: 73.8188 },
  { city: "Palghar", state: "Maharashtra", lat: 19.6967, lng: 72.7699, aliases: ["Boisar", "Dahanu", "Jawhar"] },
  { city: "Alibaug", state: "Maharashtra", lat: 18.6414, lng: 72.8722, aliases: ["Alibag", "Raigad", "Roha"] },
  { city: "Lonavala", state: "Maharashtra", lat: 18.7557, lng: 73.4091, aliases: ["Khandala"] },
  { city: "Mahabaleshwar", state: "Maharashtra", lat: 17.9237, lng: 73.6586, aliases: ["Panchgani"] },
  { city: "Shirdi", state: "Maharashtra", lat: 19.7667, lng: 74.4762 },
  { city: "Ahilyanagar", state: "Maharashtra", lat: 19.0952, lng: 74.7480, aliases: ["Ahmednagar", "Ahmed Nagar", "Sangamner", "Kopargaon"] },
  { city: "Baramati", state: "Maharashtra", lat: 18.1517, lng: 74.5772 },

  // ========================================================================
  // 2. DELHI & NATIONAL CAPITAL REGION (NCR)
  // ========================================================================
  { city: "Delhi", state: "Delhi", lat: 28.6139, lng: 77.2090, aliases: ["New Delhi", "Delhi NCR", "Connaught Place", "Dwarka", "Rohini", "Saket", "Laxmi Nagar", "Karol Bagh"] },
  { city: "Noida", state: "Uttar Pradesh", lat: 28.5355, lng: 77.3910, aliases: ["Gautam Buddha Nagar", "Sector 62", "Sector 18"] },
  { city: "Greater Noida", state: "Uttar Pradesh", lat: 28.4744, lng: 77.5040, aliases: ["Pari Chowk", "Knowledge Park"] },
  { city: "Ghaziabad", state: "Uttar Pradesh", lat: 28.6692, lng: 77.4538, aliases: ["Indirapuram", "Vaishali"] },
  { city: "Gurugram", state: "Haryana", lat: 28.4595, lng: 77.0266, aliases: ["Gurgaon", "Cyber City", "DLF Phase", "Sohna Road"] },
  { city: "Faridabad", state: "Haryana", lat: 28.4089, lng: 77.3178, aliases: ["Ballabhgarh"] },

  // ========================================================================
  // 3. GUJARAT
  // ========================================================================
  { city: "Ahmedabad", state: "Gujarat", lat: 23.0225, lng: 72.5714, aliases: ["Amdavad", "SG Highway", "Maninagar"] },
  { city: "Surat", state: "Gujarat", lat: 21.1702, lng: 72.8311, aliases: ["Diamond City"] },
  { city: "Vadodara", state: "Gujarat", lat: 22.3072, lng: 73.1812, aliases: ["Baroda", "Sayajigunj"] },
  { city: "Rajkot", state: "Gujarat", lat: 22.3039, lng: 70.8022 },
  { city: "Bhavnagar", state: "Gujarat", lat: 21.7645, lng: 72.1519 },
  { city: "Jamnagar", state: "Gujarat", lat: 22.4707, lng: 70.0577 },
  { city: "Junagadh", state: "Gujarat", lat: 21.5222, lng: 70.4579 },
  { city: "Gandhinagar", state: "Gujarat", lat: 23.2156, lng: 72.6369, aliases: ["GIFT City"] },
  { city: "Anand", state: "Gujarat", lat: 22.5645, lng: 72.9289, aliases: ["Milk City", "Vallabh Vidyanagar"] },
  { city: "Navsari", state: "Gujarat", lat: 20.9500, lng: 72.9300 },
  { city: "Morbi", state: "Gujarat", lat: 22.8120, lng: 70.8384 },
  { city: "Nadiad", state: "Gujarat", lat: 22.6916, lng: 72.8634 },
  { city: "Bharuch", state: "Gujarat", lat: 21.7051, lng: 72.9959, aliases: ["Ankleshwar"] },
  { city: "Vapi", state: "Gujarat", lat: 20.3893, lng: 72.9106 },
  { city: "Valsad", state: "Gujarat", lat: 20.5992, lng: 72.9342 },
  { city: "Bhuj", state: "Gujarat", lat: 23.2420, lng: 69.6669, aliases: ["Kutch", "Gandhidham"] },
  { city: "Porbandar", state: "Gujarat", lat: 21.6417, lng: 69.6293 },
  { city: "Mehsana", state: "Gujarat", lat: 23.5880, lng: 72.3693 },
  { city: "Patan", state: "Gujarat", lat: 23.8493, lng: 72.1266 },
  { city: "Palanpur", state: "Gujarat", lat: 24.1724, lng: 72.4346, aliases: ["Banaskantha"] },
  { city: "Godhra", state: "Gujarat", lat: 22.7766, lng: 73.6149, aliases: ["Panchmahal"] },
  { city: "Somnath", state: "Gujarat", lat: 20.8880, lng: 70.4012, aliases: ["Veraval", "Gir Somnath"] },
  { city: "Dwarka", state: "Gujarat", lat: 22.2442, lng: 68.9685 },

  // ========================================================================
  // 4. RAJASTHAN
  // ========================================================================
  { city: "Jaipur", state: "Rajasthan", lat: 26.9124, lng: 75.7873, aliases: ["Pink City", "Mansarovar", "Vaishali Nagar"] },
  { city: "Jodhpur", state: "Rajasthan", lat: 26.2389, lng: 73.0243, aliases: ["Blue City", "Sun City"] },
  { city: "Kota", state: "Rajasthan", lat: 25.2138, lng: 75.8648 },
  { city: "Bikaner", state: "Rajasthan", lat: 28.0229, lng: 73.3119 },
  { city: "Ajmer", state: "Rajasthan", lat: 26.4499, lng: 74.6399, aliases: ["Pushkar", "Kishangarh"] },
  { city: "Udaipur", state: "Rajasthan", lat: 24.5854, lng: 73.7125, aliases: ["City of Lakes"] },
  { city: "Bhilwara", state: "Rajasthan", lat: 25.3407, lng: 74.6313, aliases: ["Textile City"] },
  { city: "Alwar", state: "Rajasthan", lat: 27.5530, lng: 76.6346, aliases: ["Bhiwadi", "Neemrana"] },
  { city: "Bharatpur", state: "Rajasthan", lat: 27.2152, lng: 77.5030 },
  { city: "Sikar", state: "Rajasthan", lat: 27.6094, lng: 75.1398, aliases: ["Fatehpur"] },
  { city: "Pali", state: "Rajasthan", lat: 25.7711, lng: 73.3234 },
  { city: "Sri Ganganagar", state: "Rajasthan", lat: 29.9038, lng: 73.8772 },
  { city: "Jaisalmer", state: "Rajasthan", lat: 26.9157, lng: 70.9083, aliases: ["Golden City"] },
  { city: "Barmer", state: "Rajasthan", lat: 25.7521, lng: 71.3967 },
  { city: "Chittorgarh", state: "Rajasthan", lat: 24.8887, lng: 74.6269, aliases: ["Chittor"] },
  { city: "Jhunjhunu", state: "Rajasthan", lat: 28.1289, lng: 75.3995 },
  { city: "Churu", state: "Rajasthan", lat: 28.2900, lng: 74.9600 },
  { city: "Nagaur", state: "Rajasthan", lat: 27.2000, lng: 73.7400 },
  { city: "Tonk", state: "Rajasthan", lat: 26.1667, lng: 75.7833 },
  { city: "Sawai Madhopur", state: "Rajasthan", lat: 25.9928, lng: 76.3526, aliases: ["Ranthambore"] },
  { city: "Mount Abu", state: "Rajasthan", lat: 24.5925, lng: 72.7156, aliases: ["Sirohi"] },

  // ========================================================================
  // 5. MADHYA PRADESH
  // ========================================================================
  { city: "Indore", state: "Madhya Pradesh", lat: 22.7196, lng: 75.8577, aliases: ["Vijay Nagar", "Palasia"] },
  { city: "Bhopal", state: "Madhya Pradesh", lat: 23.2599, lng: 77.4126, aliases: ["City of Lakes", "MP Nagar"] },
  { city: "Jabalpur", state: "Madhya Pradesh", lat: 23.1815, lng: 79.9864, aliases: ["Bhedaghat"] },
  { city: "Gwalior", state: "Madhya Pradesh", lat: 26.2183, lng: 78.1828 },
  { city: "Ujjain", state: "Madhya Pradesh", lat: 23.1765, lng: 75.7885, aliases: ["Mahakaleshwar"] },
  { city: "Sagar", state: "Madhya Pradesh", lat: 23.8388, lng: 78.7378 },
  { city: "Dewas", state: "Madhya Pradesh", lat: 22.9676, lng: 76.0534 },
  { city: "Satna", state: "Madhya Pradesh", lat: 24.6005, lng: 80.8322, aliases: ["Maihar"] },
  { city: "Ratlam", state: "Madhya Pradesh", lat: 23.3315, lng: 75.0367 },
  { city: "Rewa", state: "Madhya Pradesh", lat: 24.5362, lng: 81.3037 },
  { city: "Singrauli", state: "Madhya Pradesh", lat: 24.1992, lng: 82.6645, aliases: ["Waidhan"] },
  { city: "Burhanpur", state: "Madhya Pradesh", lat: 21.3146, lng: 76.2299 },
  { city: "Khandwa", state: "Madhya Pradesh", lat: 21.8314, lng: 76.3498, aliases: ["Omkareshwar"] },
  { city: "Chhindwara", state: "Madhya Pradesh", lat: 22.0574, lng: 78.9382 },
  { city: "Vidisha", state: "Madhya Pradesh", lat: 23.5251, lng: 77.8081, aliases: ["Sanchi"] },
  { city: "Shivpuri", state: "Madhya Pradesh", lat: 25.4239, lng: 77.6599 },
  { city: "Mandsaur", state: "Madhya Pradesh", lat: 24.0722, lng: 75.0686 },
  { city: "Neemuch", state: "Madhya Pradesh", lat: 24.4716, lng: 74.8706 },
  { city: "Hoshangabad", state: "Madhya Pradesh", lat: 22.7519, lng: 77.7275, aliases: ["Narmadapuram", "Itarsi", "Pachmarhi"] },
  { city: "Sehore", state: "Madhya Pradesh", lat: 23.2030, lng: 77.0844 },

  // ========================================================================
  // 6. UTTAR PRADESH
  // ========================================================================
  { city: "Lucknow", state: "Uttar Pradesh", lat: 26.8467, lng: 80.9462, aliases: ["Gomti Nagar", "Hazratganj", "Alambagh"] },
  { city: "Kanpur", state: "Uttar Pradesh", lat: 26.4499, lng: 80.3319 },
  { city: "Varanasi", state: "Uttar Pradesh", lat: 25.3176, lng: 82.9739, aliases: ["Banaras", "Kashi"] },
  { city: "Agra", state: "Uttar Pradesh", lat: 27.1767, lng: 78.0081, aliases: ["Taj City"] },
  { city: "Prayagraj", state: "Uttar Pradesh", lat: 25.4358, lng: 81.8463, aliases: ["Allahabad", "Civil Lines"] },
  { city: "Meerut", state: "Uttar Pradesh", lat: 28.9845, lng: 77.7064 },
  { city: "Bareilly", state: "Uttar Pradesh", lat: 28.3670, lng: 79.4304 },
  { city: "Aligarh", state: "Uttar Pradesh", lat: 27.8974, lng: 78.0880 },
  { city: "Moradabad", state: "Uttar Pradesh", lat: 28.8386, lng: 78.7733, aliases: ["Brass City"] },
  { city: "Saharanpur", state: "Uttar Pradesh", lat: 29.9671, lng: 77.5510 },
  { city: "Gorakhpur", state: "Uttar Pradesh", lat: 26.7606, lng: 83.3732 },
  { city: "Ayodhya", state: "Uttar Pradesh", lat: 26.7922, lng: 82.1998, aliases: ["Faizabad"] },
  { city: "Jhansi", state: "Uttar Pradesh", lat: 25.4484, lng: 78.5685 },
  { city: "Mathura", state: "Uttar Pradesh", lat: 27.4924, lng: 77.6737, aliases: ["Vrindavan"] },
  { city: "Muzaffarnagar", state: "Uttar Pradesh", lat: 29.4727, lng: 77.7085 },
  { city: "Firozabad", state: "Uttar Pradesh", lat: 27.1591, lng: 78.3957 },
  { city: "Mirzapur", state: "Uttar Pradesh", lat: 25.1337, lng: 82.5644 },
  { city: "Rampur", state: "Uttar Pradesh", lat: 28.8094, lng: 79.0264 },
  { city: "Shahjahanpur", state: "Uttar Pradesh", lat: 27.8805, lng: 79.9122 },
  { city: "Hapur", state: "Uttar Pradesh", lat: 28.7306, lng: 77.7759 },
  { city: "Etawah", state: "Uttar Pradesh", lat: 26.7769, lng: 79.0238 },
  { city: "Sitapur", state: "Uttar Pradesh", lat: 27.5686, lng: 80.6829 },
  { city: "Bulandshahr", state: "Uttar Pradesh", lat: 28.4069, lng: 77.8498 },
  { city: "Gonda", state: "Uttar Pradesh", lat: 27.1332, lng: 81.9619 },
  { city: "Basti", state: "Uttar Pradesh", lat: 26.8000, lng: 82.7667 },
  { city: "Azamgarh", state: "Uttar Pradesh", lat: 26.0689, lng: 83.1839 },
  { city: "Jaunpur", state: "Uttar Pradesh", lat: 25.7464, lng: 82.6837 },

  // ========================================================================
  // 7. KARNATAKA
  // ========================================================================
  { city: "Bengaluru", state: "Karnataka", lat: 12.9716, lng: 77.5946, aliases: ["Bangalore", "Whitefield", "Electronic City", "Koramangala", "Indiranagar", "HSR Layout", "Jayanagar", "Hebbal"] },
  { city: "Mysuru", state: "Karnataka", lat: 12.2958, lng: 76.6394, aliases: ["Mysore", "Chamundi Hill"] },
  { city: "Hubballi-Dharwad", state: "Karnataka", lat: 15.3647, lng: 75.1240, aliases: ["Hubli", "Dharwad"] },
  { city: "Mangaluru", state: "Karnataka", lat: 12.9141, lng: 74.8560, aliases: ["Mangalore", "Surathkal"] },
  { city: "Belagavi", state: "Karnataka", lat: 15.8497, lng: 74.4977, aliases: ["Belgaum"] },
  { city: "Kalaburagi", state: "Karnataka", lat: 17.3297, lng: 76.8343, aliases: ["Gulbarga"] },
  { city: "Davanagere", state: "Karnataka", lat: 14.4644, lng: 75.9218 },
  { city: "Ballari", state: "Karnataka", lat: 15.1394, lng: 76.9214, aliases: ["Bellary"] },
  { city: "Vijayapura", state: "Karnataka", lat: 16.8302, lng: 75.7100, aliases: ["Bijapur"] },
  { city: "Shivamogga", state: "Karnataka", lat: 13.9299, lng: 75.5681, aliases: ["Shimoga", "Bhadravati"] },
  { city: "Tumakuru", state: "Karnataka", lat: 13.3379, lng: 77.1010, aliases: ["Tumkur"] },
  { city: "Raichur", state: "Karnataka", lat: 16.2120, lng: 77.3439 },
  { city: "Bidar", state: "Karnataka", lat: 17.9104, lng: 77.5199 },
  { city: "Hosapete", state: "Karnataka", lat: 15.2764, lng: 76.3910, aliases: ["Hospet", "Hampi"] },
  { city: "Udupi", state: "Karnataka", lat: 13.3409, lng: 74.7421, aliases: ["Manipal"] },
  { city: "Hassan", state: "Karnataka", lat: 13.0072, lng: 76.1030, aliases: ["Belur", "Halebidu"] },
  { city: "Chikkamagaluru", state: "Karnataka", lat: 13.3161, lng: 75.7720, aliases: ["Chikmagalur"] },
  { city: "Madikeri", state: "Karnataka", lat: 12.4244, lng: 75.7382, aliases: ["Coorg"] },
  { city: "Bagalkot", state: "Karnataka", lat: 16.1875, lng: 75.6989, aliases: ["Badami"] },
  { city: "Gadag", state: "Karnataka", lat: 15.4298, lng: 75.6348, aliases: ["Betageri"] },
  { city: "Kolar", state: "Karnataka", lat: 13.1367, lng: 78.1292, aliases: ["KGF"] },
  { city: "Mandya", state: "Karnataka", lat: 12.5218, lng: 76.8951, aliases: ["Sugar City"] },
  { city: "Chitradurga", state: "Karnataka", lat: 14.2251, lng: 76.3980 },
  { city: "Karwar", state: "Karnataka", lat: 14.8136, lng: 74.1298, aliases: ["Uttara Kannada", "Gokarna"] },

  // ========================================================================
  // 8. TELANGANA
  // ========================================================================
  { city: "Hyderabad", state: "Telangana", lat: 17.3850, lng: 78.4867, aliases: ["Secunderabad", "Cyberabad", "Gachibowli", "HITEC City", "Kukatpally", "Madhapur", "Banjara Hills", "Jubilee Hills"] },
  { city: "Warangal", state: "Telangana", lat: 17.9689, lng: 79.5941, aliases: ["Hanamkonda", "Kazipet"] },
  { city: "Nizamabad", state: "Telangana", lat: 18.6725, lng: 78.0941 },
  { city: "Karimnagar", state: "Telangana", lat: 18.4386, lng: 79.1288 },
  { city: "Ramagundam", state: "Telangana", lat: 18.7551, lng: 79.5140 },
  { city: "Khammam", state: "Telangana", lat: 17.2473, lng: 80.1514 },
  { city: "Mahbubnagar", state: "Telangana", lat: 16.7488, lng: 77.9840, aliases: ["Mahabubnagar", "Palamoor"] },
  { city: "Nalgonda", state: "Telangana", lat: 17.0577, lng: 79.2684 },
  { city: "Adilabad", state: "Telangana", lat: 19.6641, lng: 78.5320 },
  { city: "Suryapet", state: "Telangana", lat: 17.1439, lng: 79.6239 },
  { city: "Siddipet", state: "Telangana", lat: 18.1018, lng: 78.8520 },
  { city: "Miryalaguda", state: "Telangana", lat: 16.8727, lng: 79.5630 },
  { city: "Jagtial", state: "Telangana", lat: 18.7950, lng: 78.9120 },
  { city: "Mancherial", state: "Telangana", lat: 18.8679, lng: 79.4639 },

  // ========================================================================
  // 9. ANDHRA PRADESH
  // ========================================================================
  { city: "Visakhapatnam", state: "Andhra Pradesh", lat: 17.6868, lng: 83.2185, aliases: ["Vizag", "Gajuwaka", "Madhurawada"] },
  { city: "Vijayawada", state: "Andhra Pradesh", lat: 16.5062, lng: 80.6480, aliases: ["Bezawada", "Benz Circle"] },
  { city: "Guntur", state: "Andhra Pradesh", lat: 16.3067, lng: 80.4365 },
  { city: "Nellore", state: "Andhra Pradesh", lat: 14.4426, lng: 79.9865 },
  { city: "Kurnool", state: "Andhra Pradesh", lat: 15.8281, lng: 78.0373 },
  { city: "Kakinada", state: "Andhra Pradesh", lat: 16.9891, lng: 82.2475 },
  { city: "Rajamahendravaram", state: "Andhra Pradesh", lat: 17.0005, lng: 81.8040, aliases: ["Rajahmundry"] },
  { city: "Tirupati", state: "Andhra Pradesh", lat: 13.6288, lng: 79.4192, aliases: ["Tirumala"] },
  { city: "Kadapa", state: "Andhra Pradesh", lat: 14.4673, lng: 78.8242, aliases: ["Cuddapah"] },
  { city: "Anantapur", state: "Andhra Pradesh", lat: 14.6819, lng: 77.6006 },
  { city: "Vizianagaram", state: "Andhra Pradesh", lat: 18.1067, lng: 83.3956 },
  { city: "Eluru", state: "Andhra Pradesh", lat: 16.7107, lng: 81.0952 },
  { city: "Ongole", state: "Andhra Pradesh", lat: 15.5057, lng: 80.0499 },
  { city: "Machilipatnam", state: "Andhra Pradesh", lat: 16.1875, lng: 81.1389 },
  { city: "Chittoor", state: "Andhra Pradesh", lat: 13.2172, lng: 79.1003 },
  { city: "Srikakulam", state: "Andhra Pradesh", lat: 18.2969, lng: 83.8966 },
  { city: "Bhimavaram", state: "Andhra Pradesh", lat: 16.5449, lng: 81.5212 },
  { city: "Amaravati", state: "Andhra Pradesh", lat: 16.5735, lng: 80.3575, aliases: ["Capital Amaravati"] },

  // ========================================================================
  // 10. TAMIL NADU
  // ========================================================================
  { city: "Chennai", state: "Tamil Nadu", lat: 13.0827, lng: 80.2707, aliases: ["Madras", "OMR", "T. Nagar", "Anna Nagar", "Velachery", "Adyar", "Tambaram"] },
  { city: "Coimbatore", state: "Tamil Nadu", lat: 11.0168, lng: 76.9558, aliases: ["Kovai", "Gandhipuram", "RS Puram"] },
  { city: "Madurai", state: "Tamil Nadu", lat: 9.9252, lng: 78.1198, aliases: ["Temple City"] },
  { city: "Tiruchirappalli", state: "Tamil Nadu", lat: 10.7905, lng: 78.7047, aliases: ["Trichy"] },
  { city: "Salem", state: "Tamil Nadu", lat: 11.6643, lng: 78.1460 },
  { city: "Tiruppur", state: "Tamil Nadu", lat: 11.1085, lng: 77.3411, aliases: ["Tirupur", "Knitwear City"] },
  { city: "Erode", state: "Tamil Nadu", lat: 11.3410, lng: 77.7172 },
  { city: "Tirunelveli", state: "Tamil Nadu", lat: 8.7139, lng: 77.7567, aliases: ["Nellai"] },
  { city: "Vellore", state: "Tamil Nadu", lat: 12.9165, lng: 79.1325 },
  { city: "Thoothukudi", state: "Tamil Nadu", lat: 8.7642, lng: 78.1348, aliases: ["Tuticorin"] },
  { city: "Thanjavur", state: "Tamil Nadu", lat: 10.7870, lng: 79.1378, aliases: ["Tanjore"] },
  { city: "Dindigul", state: "Tamil Nadu", lat: 10.3673, lng: 77.9803 },
  { city: "Hosur", state: "Tamil Nadu", lat: 12.7409, lng: 77.8253 },
  { city: "Nagercoil", state: "Tamil Nadu", lat: 8.1833, lng: 77.4119, aliases: ["Kanyakumari"] },
  { city: "Kanchipuram", state: "Tamil Nadu", lat: 12.8342, lng: 79.7036, aliases: ["Conjeevaram", "Silk City"] },
  { city: "Udhagamandalam", state: "Tamil Nadu", lat: 11.4102, lng: 76.6950, aliases: ["Ooty", "Nilgiris", "Coonoor"] },
  { city: "Cuddalore", state: "Tamil Nadu", lat: 11.7480, lng: 79.7714 },
  { city: "Kumbakonam", state: "Tamil Nadu", lat: 10.9602, lng: 79.3845 },
  { city: "Karur", state: "Tamil Nadu", lat: 10.9601, lng: 78.0766 },
  { city: "Rameshwaram", state: "Tamil Nadu", lat: 9.2876, lng: 79.3129, aliases: ["Ramanathapuram"] },

  // ========================================================================
  // 11. KERALA
  // ========================================================================
  { city: "Thiruvananthapuram", state: "Kerala", lat: 8.5241, lng: 76.9366, aliases: ["Trivandrum", "Technopark", "Kovalam"] },
  { city: "Kochi", state: "Kerala", lat: 9.9312, lng: 76.2673, aliases: ["Cochin", "Ernakulam", "Kakkanad", "Edappally"] },
  { city: "Kozhikode", state: "Kerala", lat: 11.2588, lng: 75.7804, aliases: ["Calicut"] },
  { city: "Kollam", state: "Kerala", lat: 8.8932, lng: 76.6141, aliases: ["Quilon"] },
  { city: "Thrissur", state: "Kerala", lat: 10.5276, lng: 76.2144, aliases: ["Trichur"] },
  { city: "Kannur", state: "Kerala", lat: 11.8745, lng: 75.3704, aliases: ["Cannanore"] },
  { city: "Alappuzha", state: "Kerala", lat: 9.4981, lng: 76.3388, aliases: ["Alleppey", "Backwaters"] },
  { city: "Kottayam", state: "Kerala", lat: 9.5916, lng: 76.5222 },
  { city: "Palakkad", state: "Kerala", lat: 10.7867, lng: 76.6548, aliases: ["Palghat"] },
  { city: "Malappuram", state: "Kerala", lat: 11.0510, lng: 76.0711 },
  { city: "Munnar", state: "Kerala", lat: 10.0889, lng: 77.0595, aliases: ["Idukki"] },
  { city: "Wayanad", state: "Kerala", lat: 11.6854, lng: 76.1320, aliases: ["Kalpetta", "Sulthan Bathery"] },
  { city: "Kasaragod", state: "Kerala", lat: 12.4996, lng: 74.9869 },
  { city: "Pathanamthitta", state: "Kerala", lat: 9.2648, lng: 76.7870, aliases: ["Sabarimala"] },

  // ========================================================================
  // 12. WEST BENGAL
  // ========================================================================
  { city: "Kolkata", state: "West Bengal", lat: 22.5726, lng: 88.3639, aliases: ["Calcutta", "Salt Lake", "New Town", "Park Street", "Howrah Bridge", "Dum Dum"] },
  { city: "Howrah", state: "West Bengal", lat: 22.5958, lng: 88.2636, aliases: ["Shibpur"] },
  { city: "Asansol", state: "West Bengal", lat: 23.6739, lng: 86.9524 },
  { city: "Siliguri", state: "West Bengal", lat: 26.7271, lng: 88.3953, aliases: ["North Bengal"] },
  { city: "Durgapur", state: "West Bengal", lat: 23.5204, lng: 87.3119, aliases: ["Steel City"] },
  { city: "Bardhaman", state: "West Bengal", lat: 23.2324, lng: 87.8615, aliases: ["Burdwan"] },
  { city: "Malda", state: "West Bengal", lat: 25.0108, lng: 88.1411, aliases: ["English Bazar"] },
  { city: "Kharagpur", state: "West Bengal", lat: 22.3460, lng: 87.2320, aliases: ["Midnapore"] },
  { city: "Haldia", state: "West Bengal", lat: 22.0667, lng: 88.0698 },
  { city: "Darjeeling", state: "West Bengal", lat: 27.0410, lng: 88.2663, aliases: ["Queen of Hills"] },
  { city: "Kalimpong", state: "West Bengal", lat: 27.0594, lng: 88.4695 },
  { city: "Jalpaiguri", state: "West Bengal", lat: 26.5414, lng: 88.7196 },
  { city: "Alipurduar", state: "West Bengal", lat: 26.4919, lng: 89.5272 },
  { city: "Cooch Behar", state: "West Bengal", lat: 26.3239, lng: 89.4511 },
  { city: "Baharampur", state: "West Bengal", lat: 24.0988, lng: 88.2678, aliases: ["Murshidabad"] },
  { city: "Krishnanagar", state: "West Bengal", lat: 23.4013, lng: 88.5019, aliases: ["Nadia"] },
  { city: "Purulia", state: "West Bengal", lat: 23.3321, lng: 86.3652 },
  { city: "Bankura", state: "West Bengal", lat: 23.2319, lng: 87.0784 },

  // ========================================================================
  // 13. BIHAR
  // ========================================================================
  { city: "Patna", state: "Bihar", lat: 25.5941, lng: 85.1376, aliases: ["Pataliputra", "Kankarbagh", "Boring Road", "Danapur"] },
  { city: "Gaya", state: "Bihar", lat: 24.7914, lng: 85.0002, aliases: ["Bodh Gaya"] },
  { city: "Bhagalpur", state: "Bihar", lat: 25.2425, lng: 86.9842, aliases: ["Silk City"] },
  { city: "Muzaffarpur", state: "Bihar", lat: 26.1209, lng: 85.3647 },
  { city: "Purnia", state: "Bihar", lat: 25.7771, lng: 87.4753, aliases: ["Purnea"] },
  { city: "Darbhanga", state: "Bihar", lat: 26.1542, lng: 85.8918 },
  { city: "Bihar Sharif", state: "Bihar", lat: 25.1982, lng: 85.5149, aliases: ["Nalanda", "Rajgir"] },
  { city: "Arrah", state: "Bihar", lat: 25.5560, lng: 84.6603, aliases: ["Ara", "Bhojpur"] },
  { city: "Begusarai", state: "Bihar", lat: 25.4182, lng: 86.1272 },
  { city: "Katihar", state: "Bihar", lat: 25.5458, lng: 87.5684 },
  { city: "Munger", state: "Bihar", lat: 25.3757, lng: 86.4744 },
  { city: "Chhapra", state: "Bihar", lat: 25.7848, lng: 84.7274, aliases: ["Saran"] },
  { city: "Sasaram", state: "Bihar", lat: 24.9500, lng: 84.0300, aliases: ["Rohtas", "Dehri"] },
  { city: "Samastipur", state: "Bihar", lat: 25.8628, lng: 85.7811 },
  { city: "Bettiah", state: "Bihar", lat: 26.8021, lng: 84.5029, aliases: ["West Champaran"] },
  { city: "Motihari", state: "Bihar", lat: 26.6469, lng: 84.9089, aliases: ["East Champaran"] },
  { city: "Siwan", state: "Bihar", lat: 26.2200, lng: 84.3600 },
  { city: "Saharsa", state: "Bihar", lat: 25.8835, lng: 86.6006 },
  { city: "Madhubani", state: "Bihar", lat: 26.3544, lng: 86.0719 },

  // ========================================================================
  // 14. JHARKHAND
  // ========================================================================
  { city: "Ranchi", state: "Jharkhand", lat: 23.3441, lng: 85.3096, aliases: ["Harmu", "Morabadi", "Doranda"] },
  { city: "Jamshedpur", state: "Jharkhand", lat: 22.8046, lng: 86.2029, aliases: ["Tatanagar", "Steel City", "Bistupur", "Sakchi"] },
  { city: "Dhanbad", state: "Jharkhand", lat: 23.7957, lng: 86.4304, aliases: ["Coal Capital"] },
  { city: "Bokaro Steel City", state: "Jharkhand", lat: 23.6693, lng: 86.1511, aliases: ["Bokaro"] },
  { city: "Deoghar", state: "Jharkhand", lat: 24.4826, lng: 86.7000, aliases: ["Baidyanath Dham"] },
  { city: "Hazaribagh", state: "Jharkhand", lat: 23.9937, lng: 85.3637 },
  { city: "Giridih", state: "Jharkhand", lat: 24.1904, lng: 86.3025 },
  { city: "Ramgarh", state: "Jharkhand", lat: 23.6300, lng: 85.5200 },
  { city: "Dumka", state: "Jharkhand", lat: 24.2689, lng: 87.2486 },
  { city: "Chaibasa", state: "Jharkhand", lat: 22.5539, lng: 85.8081, aliases: ["West Singhbhum"] },
  { city: "Medininagar", state: "Jharkhand", lat: 24.0400, lng: 84.0700, aliases: ["Daltonganj", "Palamu"] },

  // ========================================================================
  // 15. ODISHA
  // ========================================================================
  { city: "Bhubaneswar", state: "Odisha", lat: 20.2961, lng: 85.8245, aliases: ["Bhubaneshwar", "Patia", "Saheed Nagar", "Khandagiri"] },
  { city: "Cuttack", state: "Odisha", lat: 20.4625, lng: 85.8828, aliases: ["Silver City"] },
  { city: "Rourkela", state: "Odisha", lat: 22.2604, lng: 84.8536, aliases: ["Steel City", "Panposh"] },
  { city: "Berhampur", state: "Odisha", lat: 19.3150, lng: 84.7941, aliases: ["Brahmapur", "Ganjam"] },
  { city: "Sambalpur", state: "Odisha", lat: 21.4669, lng: 83.9812, aliases: ["Hirakud"] },
  { city: "Puri", state: "Odisha", lat: 19.8135, lng: 85.8312, aliases: ["Jagannath Puri"] },
  { city: "Balasore", state: "Odisha", lat: 21.4934, lng: 86.9135, aliases: ["Baleshwar"] },
  { city: "Jharsuguda", state: "Odisha", lat: 21.8554, lng: 84.0062 },
  { city: "Baripada", state: "Odisha", lat: 21.9333, lng: 86.7333, aliases: ["Mayurbhanj"] },
  { city: "Bhadrak", state: "Odisha", lat: 21.0544, lng: 86.4956 },
  { city: "Angul", state: "Odisha", lat: 20.8400, lng: 85.1000, aliases: ["Talcher"] },
  { city: "Balangir", state: "Odisha", lat: 20.7100, lng: 83.4900, aliases: ["Bolangir"] },
  { city: "Koraput", state: "Odisha", lat: 18.8100, lng: 82.7100, aliases: ["Jeypore"] },

  // ========================================================================
  // 16. CHHATTISGARH
  // ========================================================================
  { city: "Raipur", state: "Chhattisgarh", lat: 21.2514, lng: 81.6296, aliases: ["Nava Raipur", "Atal Nagar"] },
  { city: "Bhilai", state: "Chhattisgarh", lat: 21.1938, lng: 81.3509, aliases: ["Durg", "Bhilai Nagar"] },
  { city: "Bilaspur", state: "Chhattisgarh", lat: 22.0797, lng: 82.1409 },
  { city: "Korba", state: "Chhattisgarh", lat: 22.3595, lng: 82.7501, aliases: ["Power City"] },
  { city: "Rajnandgaon", state: "Chhattisgarh", lat: 21.0974, lng: 81.0330 },
  { city: "Jagdalpur", state: "Chhattisgarh", lat: 19.0743, lng: 82.0089, aliases: ["Bastar"] },
  { city: "Raigarh", state: "Chhattisgarh", lat: 21.8974, lng: 83.3950 },
  { city: "Ambikapur", state: "Chhattisgarh", lat: 23.1186, lng: 83.1979, aliases: ["Surguja"] },
  { city: "Dhamtari", state: "Chhattisgarh", lat: 20.7071, lng: 81.5498 },
  { city: "Mahasamund", state: "Chhattisgarh", lat: 21.1090, lng: 82.0960 },

  // ========================================================================
  // 17. PUNJAB
  // ========================================================================
  { city: "Ludhiana", state: "Punjab", lat: 30.9010, lng: 75.8573 },
  { city: "Amritsar", state: "Punjab", lat: 31.6340, lng: 74.8723, aliases: ["Golden Temple City"] },
  { city: "Jalandhar", state: "Punjab", lat: 31.3260, lng: 75.5762 },
  { city: "Patiala", state: "Punjab", lat: 30.3398, lng: 76.3869 },
  { city: "Bathinda", state: "Punjab", lat: 30.2110, lng: 74.9455, aliases: ["Bhatinda"] },
  { city: "Mohali", state: "Punjab", lat: 30.7046, lng: 76.7179, aliases: ["SAS Nagar"] },
  { city: "Hoshiarpur", state: "Punjab", lat: 31.5273, lng: 75.9142 },
  { city: "Pathankot", state: "Punjab", lat: 32.2689, lng: 75.6499 },
  { city: "Moga", state: "Punjab", lat: 30.8165, lng: 75.1717 },
  { city: "Phagwara", state: "Punjab", lat: 31.2240, lng: 75.7708 },
  { city: "Firozpur", state: "Punjab", lat: 30.9237, lng: 74.6133, aliases: ["Ferozepur"] },
  { city: "Kapurthala", state: "Punjab", lat: 31.3800, lng: 75.3800 },
  { city: "Khanna", state: "Punjab", lat: 30.7000, lng: 76.2200 },
  { city: "Barnala", state: "Punjab", lat: 30.3800, lng: 75.5500 },
  { city: "Muktsar", state: "Punjab", lat: 30.4800, lng: 74.5200, aliases: ["Sri Muktsar Sahib"] },

  // ========================================================================
  // 18. HARYANA
  // ========================================================================
  { city: "Panipat", state: "Haryana", lat: 29.3909, lng: 76.9635, aliases: ["Textile City"] },
  { city: "Ambala", state: "Haryana", lat: 30.3782, lng: 76.7767, aliases: ["Ambala Cantt"] },
  { city: "Yamunanagar", state: "Haryana", lat: 30.1290, lng: 77.2674, aliases: ["Jagadhri"] },
  { city: "Rohtak", state: "Haryana", lat: 28.8955, lng: 76.6066 },
  { city: "Hisar", state: "Haryana", lat: 29.1492, lng: 75.7217, aliases: ["Hissar"] },
  { city: "Karnal", state: "Haryana", lat: 29.6857, lng: 76.9905 },
  { city: "Sonipat", state: "Haryana", lat: 28.9931, lng: 77.0151, aliases: ["Sonepat", "Kundli"] },
  { city: "Panchkula", state: "Haryana", lat: 30.6942, lng: 76.8606 },
  { city: "Bhiwani", state: "Haryana", lat: 28.7932, lng: 76.1390 },
  { city: "Sirsa", state: "Haryana", lat: 29.5349, lng: 75.0298 },
  { city: "Rewari", state: "Haryana", lat: 28.1920, lng: 76.6191, aliases: ["Bawal", "Dharuhera"] },
  { city: "Jind", state: "Haryana", lat: 29.3167, lng: 76.3167 },
  { city: "Kaithal", state: "Haryana", lat: 29.8000, lng: 76.4000 },
  { city: "Kurukshetra", state: "Haryana", lat: 29.9695, lng: 76.8783, aliases: ["Thanesar"] },
  { city: "Bahadurgarh", state: "Haryana", lat: 28.6924, lng: 76.9240 },
  { city: "Palwal", state: "Haryana", lat: 28.1487, lng: 77.3260 },

  // ========================================================================
  // 19. HIMACHAL PRADESH
  // ========================================================================
  { city: "Shimla", state: "Himachal Pradesh", lat: 31.1048, lng: 77.1734, aliases: ["Simla", "Mall Road", "Kufri"] },
  { city: "Dharamshala", state: "Himachal Pradesh", lat: 32.2190, lng: 76.3234, aliases: ["Dharamsala", "McLeod Ganj", "Kangra"] },
  { city: "Manali", state: "Himachal Pradesh", lat: 32.2432, lng: 77.1892, aliases: ["Solang Valley"] },
  { city: "Kullu", state: "Himachal Pradesh", lat: 31.9579, lng: 77.1095 },
  { city: "Solan", state: "Himachal Pradesh", lat: 30.9045, lng: 77.0967, aliases: ["Kasauli"] },
  { city: "Mandi", state: "Himachal Pradesh", lat: 31.7087, lng: 76.9320 },
  { city: "Baddi", state: "Himachal Pradesh", lat: 30.9578, lng: 76.7914, aliases: ["Barotiwala", "Nalagarh"] },
  { city: "Nahan", state: "Himachal Pradesh", lat: 30.5599, lng: 77.2955, aliases: ["Sirmaur"] },
  { city: "Hamirpur", state: "Himachal Pradesh", lat: 31.6862, lng: 76.5213 },
  { city: "Una", state: "Himachal Pradesh", lat: 31.4685, lng: 76.2708 },
  { city: "Bilaspur HP", state: "Himachal Pradesh", lat: 31.3325, lng: 76.7583, aliases: ["Bilaspur Himachal"] },
  { city: "Chamba", state: "Himachal Pradesh", lat: 32.5530, lng: 76.1258, aliases: ["Dalhousie"] },

  // ========================================================================
  // 20. UTTARAKHAND
  // ========================================================================
  { city: "Dehradun", state: "Uttarakhand", lat: 30.3165, lng: 78.0322, aliases: ["Rajpur Road", "Doon"] },
  { city: "Haridwar", state: "Uttarakhand", lat: 29.9457, lng: 78.1642, aliases: ["Hardwar", "Har Ki Pauri"] },
  { city: "Rishikesh", state: "Uttarakhand", lat: 30.0869, lng: 78.2676, aliases: ["Yoga Capital", "Tapovan"] },
  { city: "Roorkee", state: "Uttarakhand", lat: 29.8543, lng: 77.8880 },
  { city: "Haldwani", state: "Uttarakhand", lat: 29.2183, lng: 79.5130, aliases: ["Kathgodam"] },
  { city: "Rudrapur", state: "Uttarakhand", lat: 28.9798, lng: 79.4004, aliases: ["Udham Singh Nagar", "Pantnagar"] },
  { city: "Kashipur", state: "Uttarakhand", lat: 29.2104, lng: 78.9619 },
  { city: "Nainital", state: "Uttarakhand", lat: 29.3919, lng: 79.4542, aliases: ["Lake City"] },
  { city: "Mussoorie", state: "Uttarakhand", lat: 30.4598, lng: 78.0644, aliases: ["Queen of Hills"] },
  { city: "Almora", state: "Uttarakhand", lat: 29.5971, lng: 79.6591, aliases: ["Ranikhet"] },
  { city: "Pithoragarh", state: "Uttarakhand", lat: 29.5829, lng: 80.2182 },
  { city: "Kotdwar", state: "Uttarakhand", lat: 29.7464, lng: 78.5286, aliases: ["Pauri Garhwal"] },

  // ========================================================================
  // 21. GOA
  // ========================================================================
  { city: "Panaji", state: "Goa", lat: 15.4909, lng: 73.8278, aliases: ["Panjim", "North Goa", "Miramar"] },
  { city: "Margao", state: "Goa", lat: 15.2832, lng: 73.9862, aliases: ["Madgaon", "South Goa"] },
  { city: "Vasco da Gama", state: "Goa", lat: 15.3982, lng: 73.8113, aliases: ["Vasco", "Mormugao"] },
  { city: "Mapusa", state: "Goa", lat: 15.5937, lng: 73.8142 },
  { city: "Ponda", state: "Goa", lat: 15.4026, lng: 74.0087 },
  { city: "Calangute", state: "Goa", lat: 15.5439, lng: 73.7553, aliases: ["Baga", "Candolim", "Anjuna"] },
  { city: "Bicholim", state: "Goa", lat: 15.5890, lng: 73.9530 },

  // ========================================================================
  // 22. ASSAM
  // ========================================================================
  { city: "Guwahati", state: "Assam", lat: 26.1445, lng: 91.7362, aliases: ["Dispur", "Gauhati", "GS Road", "Paltan Bazaar"] },
  { city: "Silchar", state: "Assam", lat: 24.8333, lng: 92.7789, aliases: ["Cachar"] },
  { city: "Dibrugarh", state: "Assam", lat: 27.4728, lng: 94.9120, aliases: ["Tea City"] },
  { city: "Jorhat", state: "Assam", lat: 26.7509, lng: 94.2037 },
  { city: "Nagaon", state: "Assam", lat: 26.3468, lng: 92.6840 },
  { city: "Tinsukia", state: "Assam", lat: 27.4922, lng: 95.3468 },
  { city: "Tezpur", state: "Assam", lat: 26.6528, lng: 92.7926, aliases: ["Sonitpur"] },
  { city: "Bongaigaon", state: "Assam", lat: 26.5024, lng: 90.5529 },
  { city: "Karimganj", state: "Assam", lat: 24.8667, lng: 92.3500 },
  { city: "Sivasagar", state: "Assam", lat: 26.9826, lng: 94.6425, aliases: ["Sibsagar"] },
  { city: "Dhubri", state: "Assam", lat: 26.0207, lng: 89.9742 },
  { city: "North Lakhimpur", state: "Assam", lat: 27.2359, lng: 94.1037 },

  // ========================================================================
  // 23. MEGHALAYA
  // ========================================================================
  { city: "Shillong", state: "Meghalaya", lat: 25.5788, lng: 91.8933, aliases: ["Police Bazar", "East Khasi Hills"] },
  { city: "Tura", state: "Meghalaya", lat: 25.5144, lng: 90.2201, aliases: ["West Garo Hills"] },
  { city: "Cherrapunji", state: "Meghalaya", lat: 25.2702, lng: 91.7323, aliases: ["Sohra"] },
  { city: "Jowai", state: "Meghalaya", lat: 25.4456, lng: 92.2038, aliases: ["West Jaintia Hills"] },
  { city: "Nongpoh", state: "Meghalaya", lat: 25.9037, lng: 91.8803, aliases: ["Ri Bhoi"] },

  // ========================================================================
  // 24. TRIPURA
  // ========================================================================
  { city: "Agartala", state: "Tripura", lat: 23.8315, lng: 91.2868, aliases: ["West Tripura"] },
  { city: "Dharmanagar", state: "Tripura", lat: 24.3752, lng: 92.1648, aliases: ["North Tripura"] },
  { city: "Udaipur", state: "Tripura", lat: 23.5330, lng: 91.4870, aliases: ["Gomati", "Matabari"] },
  { city: "Kailashahar", state: "Tripura", lat: 24.3297, lng: 92.0076, aliases: ["Unakoti"] },
  { city: "Belonia", state: "Tripura", lat: 23.2500, lng: 91.4500, aliases: ["South Tripura"] },

  // ========================================================================
  // 25. MANIPUR
  // ========================================================================
  { city: "Imphal", state: "Manipur", lat: 24.8170, lng: 93.9368, aliases: ["Imphal West", "Imphal East"] },
  { city: "Churachandpur", state: "Manipur", lat: 24.3330, lng: 93.6740, aliases: ["Lamka"] },
  { city: "Thoubal", state: "Manipur", lat: 24.6380, lng: 94.0150 },
  { city: "Bishnupur", state: "Manipur", lat: 24.6300, lng: 93.7600 },
  { city: "Kakching", state: "Manipur", lat: 24.4890, lng: 93.9820 },
  { city: "Ukhrul", state: "Manipur", lat: 25.1100, lng: 94.3600 },

  // ========================================================================
  // 26. MIZORAM
  // ========================================================================
  { city: "Aizawl", state: "Mizoram", lat: 23.7271, lng: 92.7176 },
  { city: "Lunglei", state: "Mizoram", lat: 22.8906, lng: 92.7380 },
  { city: "Champhai", state: "Mizoram", lat: 23.4750, lng: 93.3280 },
  { city: "Serchhip", state: "Mizoram", lat: 23.3417, lng: 92.8500 },
  { city: "Kolasib", state: "Mizoram", lat: 24.2250, lng: 92.6780 },

  // ========================================================================
  // 27. NAGALAND
  // ========================================================================
  { city: "Kohima", state: "Nagaland", lat: 25.6751, lng: 94.1086 },
  { city: "Dimapur", state: "Nagaland", lat: 25.9094, lng: 93.7266, aliases: ["Chümoukedima"] },
  { city: "Mokokchung", state: "Nagaland", lat: 26.3260, lng: 94.5210 },
  { city: "Tuensang", state: "Nagaland", lat: 26.2800, lng: 94.8300 },
  { city: "Wokha", state: "Nagaland", lat: 26.1000, lng: 94.2600 },
  { city: "Mon", state: "Nagaland", lat: 26.7400, lng: 95.0600 },

  // ========================================================================
  // 28. ARUNACHAL PRADESH
  // ========================================================================
  { city: "Itanagar", state: "Arunachal Pradesh", lat: 27.0844, lng: 93.6053, aliases: ["Papum Pare"] },
  { city: "Naharlagun", state: "Arunachal Pradesh", lat: 27.1040, lng: 93.6937 },
  { city: "Tawang", state: "Arunachal Pradesh", lat: 27.5861, lng: 91.8594 },
  { city: "Pasighat", state: "Arunachal Pradesh", lat: 28.0667, lng: 95.3333, aliases: ["East Siang"] },
  { city: "Ziro", state: "Arunachal Pradesh", lat: 27.5947, lng: 93.8340, aliases: ["Lower Subansiri"] },
  { city: "Bomdila", state: "Arunachal Pradesh", lat: 27.2645, lng: 92.4159, aliases: ["West Kameng"] },

  // ========================================================================
  // 29. SIKKIM
  // ========================================================================
  { city: "Gangtok", state: "Sikkim", lat: 27.3389, lng: 88.6065, aliases: ["East Sikkim"] },
  { city: "Namchi", state: "Sikkim", lat: 27.1667, lng: 88.3500, aliases: ["South Sikkim"] },
  { city: "Gyalshing", state: "Sikkim", lat: 27.2833, lng: 88.2500, aliases: ["West Sikkim", "Pelling"] },
  { city: "Mangan", state: "Sikkim", lat: 27.5167, lng: 88.5333, aliases: ["North Sikkim"] },

  // ========================================================================
  // 30. JAMMU & KASHMIR
  // ========================================================================
  { city: "Srinagar", state: "Jammu and Kashmir", lat: 34.0837, lng: 74.7973, aliases: ["Lal Chowk", "Dal Lake"] },
  { city: "Jammu", state: "Jammu and Kashmir", lat: 32.7266, lng: 74.8570, aliases: ["Gandhi Nagar", "Bahu Fort"] },
  { city: "Anantnag", state: "Jammu and Kashmir", lat: 33.7311, lng: 75.1522, aliases: ["Islamabad"] },
  { city: "Baramulla", state: "Jammu and Kashmir", lat: 34.1980, lng: 74.3636 },
  { city: "Udhampur", state: "Jammu and Kashmir", lat: 32.9254, lng: 75.1416 },
  { city: "Kathua", state: "Jammu and Kashmir", lat: 32.3716, lng: 75.5190 },
  { city: "Sopore", state: "Jammu and Kashmir", lat: 34.3000, lng: 74.4700 },
  { city: "Pulwama", state: "Jammu and Kashmir", lat: 33.8700, lng: 74.9000 },
  { city: "Kupwara", state: "Jammu and Kashmir", lat: 34.5300, lng: 74.2500 },
  { city: "Poonch", state: "Jammu and Kashmir", lat: 33.7700, lng: 74.1000 },
  { city: "Rajouri", state: "Jammu and Kashmir", lat: 33.3800, lng: 74.3000 },
  { city: "Katra", state: "Jammu and Kashmir", lat: 32.9922, lng: 74.9318, aliases: ["Vaishno Devi"] },

  // ========================================================================
  // 31. LADAKH
  // ========================================================================
  { city: "Leh", state: "Ladakh", lat: 34.1526, lng: 77.5771, aliases: ["Ladakh Capital"] },
  { city: "Kargil", state: "Ladakh", lat: 34.5539, lng: 76.1349 },
  { city: "Diskit", state: "Ladakh", lat: 34.5714, lng: 77.5619, aliases: ["Nubra Valley"] },

  // ========================================================================
  // 32. CHANDIGARH
  // ========================================================================
  { city: "Chandigarh", state: "Chandigarh", lat: 30.7333, lng: 76.7794, aliases: ["City Beautiful", "Sector 17", "Sector 35"] },

  // ========================================================================
  // 33. PUDUCHERRY
  // ========================================================================
  { city: "Puducherry", state: "Puducherry", lat: 11.9416, lng: 79.8083, aliases: ["Pondicherry", "Auroville", "White Town"] },
  { city: "Karaikal", state: "Puducherry", lat: 10.9254, lng: 79.8380 },
  { city: "Mahe", state: "Puducherry", lat: 11.7004, lng: 75.5340 },
  { city: "Yanam", state: "Puducherry", lat: 16.7333, lng: 82.2167 },

  // ========================================================================
  // 34. ANDAMAN & NICOBAR ISLANDS
  // ========================================================================
  { city: "Port Blair", state: "Andaman and Nicobar Islands", lat: 11.6234, lng: 92.7265, aliases: ["Havelock", "Neil Island"] },

  // ========================================================================
  // 35. DADRA AND NAGAR HAVELI AND DAMAN AND DIU
  // ========================================================================
  { city: "Daman", state: "Dadra and Nagar Haveli and Daman and Diu", lat: 20.3974, lng: 72.8328, aliases: ["Nani Daman", "Moti Daman"] },
  { city: "Silvassa", state: "Dadra and Nagar Haveli and Daman and Diu", lat: 20.2763, lng: 73.0083, aliases: ["Dadra"] },
  { city: "Diu", state: "Dadra and Nagar Haveli and Daman and Diu", lat: 20.7144, lng: 70.9874 },

  // ========================================================================
  // 36. LAKSHADWEEP
  // ========================================================================
  { city: "Kavaratti", state: "Lakshadweep", lat: 10.5669, lng: 72.6420, aliases: ["Agatti", "Andrott"] },

  // Additional cities for broader Indian city coverage
  { city: "Osmanabad", state: "Maharashtra", lat: 18.18, lng: 76.04 },
  { city: "Barshi", state: "Maharashtra", lat: 18.23, lng: 75.69 },
  { city: "Pandharpur", state: "Maharashtra", lat: 17.68, lng: 75.33 },
  { city: "Davangere", state: "Karnataka", lat: 14.46, lng: 75.92 },
  { city: "Rajahmundry", state: "Andhra Pradesh", lat: 16.99, lng: 81.78 },
  { city: "Dharwad", state: "Karnataka", lat: 15.46, lng: 75.01 },
  { city: "Durg", state: "Chhattisgarh", lat: 21.19, lng: 81.28 },
  { city: "Bokaro", state: "Jharkhand", lat: 23.67, lng: 86.15 }
];

/**
 * Finds the closest city in INDIAN_CITIES dataset to given latitude & longitude using Haversine
 */
function findNearestCity(lat, lng) {
  if (lat === null || lat === undefined || lng === null || lng === undefined) return null;
  const numLat = Number(lat);
  const numLng = Number(lng);
  if (isNaN(numLat) || isNaN(numLng)) return null;

  let nearest = null;
  let minDistance = Infinity;

  for (const c of INDIAN_CITIES) {
    const dLat = ((c.lat - numLat) * Math.PI) / 180;
    const dLon = ((c.lng - numLng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((numLat * Math.PI) / 180) *
        Math.cos((c.lat * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const d = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 6371; // km

    if (d < minDistance) {
      minDistance = d;
      nearest = { ...c, distanceKm: Math.round(d * 10) / 10 };
    }
  }

  return nearest;
}

// Export for Node.js test environment if required
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { INDIAN_CITIES, findNearestCity };
}
