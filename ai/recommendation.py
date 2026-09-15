"""
LET ME DRIVE - AI Driver Recommendation Engine
================================================
An explainable, deterministic weighted recommendation engine that matches
professional drivers to car owner requirements.

Weights:
- Location match: 30%
- Experience match: 20%
- Driver rating: 15%
- Immediate availability: 15%
- License compatibility: 10%
- Job format preference: 10%
"""

import math
import json
import sys

def calculate_distance_km(lat1, lon1, lat2, lon2):
    """Haversine distance in kilometers"""
    if None in (lat1, lon1, lat2, lon2):
        return None
    r = 6371.0
    phi1, phi2 = math.radians(lat1), math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlambda = math.radians(lon2 - lon1)
    a = math.sin(dphi / 2)**2 + math.cos(phi1) * math.cos(phi2) * math.sin(dlambda / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return round(r * c, 1)

def evaluate_driver_match(driver, requirement):
    """
    Computes explainable match score (0-100%) and breakdown
    """
    breakdown = {
        "location": 0,
        "experience": 0,
        "rating": 0,
        "availability": 0,
        "license": 0,
        "job_preference": 0
    }
    reasons = []

    # 1. Location match (Max 30)
    d_lat = driver.get("latitude")
    d_lon = driver.get("longitude")
    r_lat = requirement.get("latitude")
    r_lon = requirement.get("longitude")
    dist = calculate_distance_km(r_lat, r_lon, d_lat, d_lon)

    req_city = (requirement.get("city") or "").strip().lower()
    drv_city = (driver.get("city") or "").strip().lower()
    is_same_city = req_city and drv_city and req_city == drv_city

    if dist is not None:
        if is_same_city:
            reasons.append(f"Same city ({driver.get('city')})")
        if dist <= 10:
            breakdown["location"] = 30
            reasons.append(f"Nearby location (approx {dist} km away)")
        elif dist <= 25:
            breakdown["location"] = 28 if is_same_city else 25
            reasons.append(f"Nearby proximity (~{dist} km)")
        elif dist <= 50:
            breakdown["location"] = 24 if is_same_city else 18
            reasons.append(f"Metro area distance: ~{dist} km")
        else:
            breakdown["location"] = 20 if is_same_city else 10
            reasons.append(f"Extended area: ~{dist} km")
    else:
        req_area = (requirement.get("area") or "").strip().lower()
        drv_area = (driver.get("area") or "").strip().lower()

        if req_city and drv_city and req_city == drv_city:
            if req_area and drv_area and req_area == drv_area:
                breakdown["location"] = 30
                reasons.append(f"Same city & neighbourhood ({driver.get('city')}, {driver.get('area')}) (+30%)")
            else:
                breakdown["location"] = 25
                reasons.append(f"Same city ({driver.get('city')}) (+25%)")
        else:
            breakdown["location"] = 8
            reasons.append(f"Operating in {driver.get('city', 'another district')} (+8%)")

    # 2. Experience match (Max 20)
    exp = float(driver.get("experience", 0))
    req_exp = float(requirement.get("required_experience", 1))

    if exp >= req_exp + 5:
        breakdown["experience"] = 20
        reasons.append(f"Veteran driver ({int(exp)} yrs exceeds {int(req_exp)} yrs required) (+20%)")
    elif exp >= req_exp:
        breakdown["experience"] = 18
        reasons.append(f"Sufficient experience ({int(exp)} yrs meets requirement) (+18%)")
    elif exp > 0:
        score = round((exp / max(req_exp, 1)) * 14)
        breakdown["experience"] = score
        reasons.append(f"Has {int(exp)} years driving experience (+{score}%)")
    else:
        breakdown["experience"] = 5
        reasons.append("Beginner professional driver (+5%)")

    # 3. Rating match (Max 15)
    rating = float(driver.get("rating", 4.0))
    rating_score = round(min((rating / 5.0) * 15.0, 15.0), 1)
    breakdown["rating"] = rating_score
    if rating >= 4.5:
        reasons.append(f"Top-tier rating ({rating:.1f}/5 stars) (+{rating_score}%)")
    else:
        reasons.append(f"Satisfactory rating ({rating:.1f}/5 stars) (+{rating_score}%)")

    # 4. Availability (Max 15)
    avail = driver.get("availability", "Available")
    if avail == "Available":
        breakdown["availability"] = 15
        reasons.append("Immediately available for deployment (+15%)")
    elif avail == "Busy":
        breakdown["availability"] = 5
        reasons.append("Currently occupied with ongoing bookings (+5%)")
    else:
        breakdown["availability"] = 0
        reasons.append("Driver on leave (0%)")

    # 5. License compatibility (Max 10)
    ranks = {"AUTOMATIC ONLY": 1, "LMV": 2, "COMMERCIAL": 3, "HMV": 4, "ALL": 5}
    d_lic = driver.get("license_type", "LMV").upper()
    r_lic = requirement.get("required_license_type", "LMV").upper()
    if d_lic == "ALL" or ranks.get(d_lic, 2) >= ranks.get(r_lic, 2):
        breakdown["license"] = 10
        reasons.append(f"License type ({driver.get('license_type')}) fully compatible (+10%)")
    else:
        breakdown["license"] = 5
        reasons.append(f"Holds {driver.get('license_type')} license (+5%)")

    # 6. Job preference (Max 10)
    prefs = [p.lower() for p in driver.get("preferred_job_types", [])]
    job_t = requirement.get("job_type", "Temporary").lower()
    if job_t in prefs:
        breakdown["job_preference"] = 10
        reasons.append(f"Driver specifically prefers '{requirement.get('job_type')}' format (+10%)")
    elif len(prefs) >= 3:
        breakdown["job_preference"] = 8
        reasons.append("Driver is versatile across formats (+8%)")
    else:
        breakdown["job_preference"] = 4
        reasons.append("General job preference (+4%)")

    total_score = min(100, round(sum(breakdown.values())))

    return {
        "driver_name": driver.get("name"),
        "match_percentage": total_score,
        "score_breakdown": breakdown,
        "reasons": reasons
    }

def rank_drivers(drivers, requirement):
    results = [evaluate_driver_match(d, requirement) for d in drivers]
    results.sort(key=lambda x: x["match_percentage"], reverse=True)
    return results

if __name__ == "__main__":
    sample_req = {
        "city": "Pune",
        "area": "Kothrud",
        "required_experience": 4,
        "required_license_type": "LMV",
        "job_type": "Outstation"
    }

    sample_drivers = [
        {
            "name": "Ramesh Pawar",
            "city": "Pune",
            "area": "Kothrud",
            "experience": 8,
            "rating": 4.9,
            "availability": "Available",
            "license_type": "LMV",
            "preferred_job_types": ["Outstation", "One Day"]
        },
        {
            "name": "Suresh Kumar",
            "city": "Pune",
            "area": "Baner",
            "experience": 5,
            "rating": 4.7,
            "availability": "Available",
            "license_type": "Commercial",
            "preferred_job_types": ["Temporary", "One Day"]
        },
        {
            "name": "Sachin Shinde",
            "city": "Mumbai",
            "area": "Andheri",
            "experience": 12,
            "rating": 4.95,
            "availability": "Available",
            "license_type": "HMV",
            "preferred_job_types": ["Outstation", "Round Trip"]
        }
    ]

    print("--- LET ME DRIVE AI RECOMMENDATION ENGINE DEMO ---")
    print(f"Target Requirement: {json.dumps(sample_req, indent=2)}\n")
    ranked = rank_drivers(sample_drivers, sample_req)
    for idx, r in enumerate(ranked, 1):
        print(f"{idx}. {r['driver_name']} -> {r['match_percentage']}% Match")
        for reason in r['reasons']:
            print(f"   - {reason}")
        print()
