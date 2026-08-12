import { IVetDetails, IRanchDetails } from "@/types/auth-types";
import { IAnimal } from "@/types/mock-types";

const ANIMALS: IAnimal[] = [
  {
    id: "1",
    name: "Princesa",
    age: 5,
    type: "horse",
    sex: "Female",
    breed: "Colombian Criollo Horse (CCC)",
    condition: "Not Pregnant",
    microchipId: "chip123",
    isRecipient: true,
    isDonor: false,
    image: require("../../assets/default-horse.jpg"),
    last_oestrus: "2025-12-31",
    fertility_ranges: [
      {
        id: "101",
        subject: "Princesa",
        min_date: "2026-06-01",
        max_date: "2026-06-06",
        creation_date: "2026-06-01",
      },
    ],
  },
  {
    id: "2",
    name: "Babieca",
    age: 7,
    type: "horse",
    sex: "Female",
    breed: "American Quarter Horse",
    condition: "Not Pregnant",
    microchipId: "chip234",
    isRecipient: true,
    isDonor: false,
    image: require("../../assets/default-horse.jpg"),
    last_oestrus: "2025-12-31",
    fertility_ranges: [
      {
        id: "101",
        subject: "Babieca",
        min_date: "2026-06-01",
        max_date: "2026-06-06",
        creation_date: "2026-06-01",
      },
    ],
  },
  {
    id: "3",
    name: "Malvina",
    age: 4,
    type: "donkey",
    sex: "Female",
    breed: "Chilean Criollo",
    condition: "Not Pregnant",
    microchipId: "chip887",
    isRecipient: false,
    isDonor: true,
    image: require("../../assets/default-horse.jpg"),
    last_oestrus: "2025-12-31",
    fertility_ranges: [
      {
        id: "101",
        subject: "Malvina",
        min_date: "2026-06-01",
        max_date: "2026-06-06",
        creation_date: "2026-06-01",
      },
    ],
  },
];

const ADMIN_MOCK_VET_DETAILS: IVetDetails = {
  id: "admin-vet-mock-id",
  profile_id: "",
  license_number: "VET-ADMIN-DEBUG-000",
  specialty: "General & Debugging",
  created_at: new Date().toISOString(),
};

const ADMIN_MOCK_RANCH_DETAILS: IRanchDetails = {
  id: "admin-ranch-mock-id",
  profile_id: "",
  ranch_name: "Rancho de Pruebas (Admin)",
  location: "Entorno de Desarrollo",
  capacity: 9999,
  created_at: new Date().toISOString(),
};

export { ANIMALS, ADMIN_MOCK_RANCH_DETAILS, ADMIN_MOCK_VET_DETAILS };
