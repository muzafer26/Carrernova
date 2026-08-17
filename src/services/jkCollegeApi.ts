/**
 * J&K College Service
 * Connects to external J&K Colleges API with fallback to verified local J&K GDC dataset.
 * Primary Endpoint: https://colleges-api.onrender.com/colleges/Jammu%20and%20Kashmir
 */

export interface College {
  Name: string;
  State: string;
  City: string;
  District?: string;
}

const API_BASE = "https://colleges-api.onrender.com/colleges/Jammu%20and%20Kashmir";

// Verified Fallback Data for Jammu & Kashmir
const FALLBACK_COLLEGES: College[] = [
  { Name: "Government Degree College, Kathua", State: "Jammu and Kashmir", City: "Kathua", District: "Kathua" },
  { Name: "Government Degree College, Akhnoor", State: "Jammu and Kashmir", City: "Jammu", District: "Jammu" },
  { Name: "Government Degree College, Sopore", State: "Jammu and Kashmir", City: "Baramulla", District: "Baramulla" },
  { Name: "Government Degree College, Anantnag", State: "Jammu and Kashmir", City: "Anantnag", District: "Anantnag" },
  { Name: "Government Degree College, Srinagar (SP College)", State: "Jammu and Kashmir", City: "Srinagar", District: "Srinagar" },
  { Name: "Government Degree College, Bemina", State: "Jammu and Kashmir", City: "Srinagar", District: "Srinagar" },
  { Name: "Government Degree College, Udhampur", State: "Jammu and Kashmir", City: "Udhampur", District: "Udhampur" },
  { Name: "Government Degree College, Rajouri", State: "Jammu and Kashmir", City: "Rajouri", District: "Rajouri" },
  { Name: "Government Degree College, Poonch", State: "Jammu and Kashmir", City: "Poonch", District: "Poonch" },
  { Name: "Government Degree College, Pulwama", State: "Jammu and Kashmir", City: "Pulwama", District: "Pulwama" },
  { Name: "Government Degree College, Kupwara", State: "Jammu and Kashmir", City: "Kupwara", District: "Kupwara" },
  { Name: "Government Degree College, Doda", State: "Jammu and Kashmir", City: "Doda", District: "Doda" },
];

const FALLBACK_DISTRICTS = [
  "Anantnag",
  "Bandipora",
  "Baramulla",
  "Budgam",
  "Doda",
  "Ganderbal",
  "Jammu",
  "Kathua",
  "Kishtwar",
  "Kulgam",
  "Kupwara",
  "Poonch",
  "Pulwama",
  "Rajouri",
  "Ramban",
  "Reasi",
  "Samba",
  "Shopian",
  "Srinagar",
  "Udhampur",
];

/**
 * Fetch all colleges in Jammu & Kashmir
 */
export async function getAllColleges(): Promise<College[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(API_BASE, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    if (Array.isArray(data.colleges) && data.colleges.length > 0) {
      return data.colleges;
    }
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
    return FALLBACK_COLLEGES;
  } catch (err) {
    console.warn("J&K College API offline/slow, using verified fallback data:", err);
    return FALLBACK_COLLEGES;
  }
}

/**
 * Fetch all districts in Jammu & Kashmir
 */
export async function getDistricts(): Promise<string[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(`${API_BASE}/districts`, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    if (Array.isArray(data.districts) && data.districts.length > 0) {
      return data.districts;
    }
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
    return FALLBACK_DISTRICTS;
  } catch (err) {
    console.warn("J&K Districts API offline/slow, using verified fallback list:", err);
    return FALLBACK_DISTRICTS;
  }
}

/**
 * Fetch colleges for a specific J&K district
 */
export async function getCollegesByDistrict(district: string): Promise<College[]> {
  try {
    const formattedDistrict = encodeURIComponent(district.trim());
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(`${API_BASE}/${formattedDistrict}`, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    let resultColleges: College[] = [];
    if (Array.isArray(data.colleges)) {
      resultColleges = data.colleges;
    } else if (Array.isArray(data)) {
      resultColleges = data;
    }

    if (resultColleges.length > 0) return resultColleges;

    // Filter fallback data by district
    return FALLBACK_COLLEGES.filter(
      (c) =>
        c.City.toLowerCase() === district.toLowerCase() ||
        (c.District && c.District.toLowerCase() === district.toLowerCase()) ||
        c.Name.toLowerCase().includes(district.toLowerCase())
    );
  } catch (err) {
    console.warn(`J&K District API for ${district} offline/slow, using fallback:`, err);
    return FALLBACK_COLLEGES.filter(
      (c) =>
        c.City.toLowerCase() === district.toLowerCase() ||
        (c.District && c.District.toLowerCase() === district.toLowerCase()) ||
        c.Name.toLowerCase().includes(district.toLowerCase())
    );
  }
}
