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
    reproduction_details: {
      type: "natural",
      date: "2026-06-01",
    },
    events: [
      {
        id: "evt-101",
        animal_id: "1",
        animal_name: "Princesa",
        event_type: "pregnancy_check",
        mark_type: "natural_range",
        title: "Pregnancy Check",
        description: "Initial ultrasound check",
        min_date: "2026-06-15",
        max_date: "2026-06-18",
        completed: false,
        created_at: "2026-06-01T00:00:00.000Z",
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
    reproduction_details: {
      type: "transfer",
      date: "2026-06-01",
      embryon_days: 7,
    },
    events: [
      {
        id: "evt-102",
        animal_id: "2",
        animal_name: "Babieca",
        event_type: "pregnancy_check",
        mark_type: "transfer_range",
        title: "Receptor Check",
        description: "Ultrasound verification for embryo recipient",
        min_date: "2026-06-14",
        max_date: "2026-06-16",
        completed: false,
        created_at: "2026-06-01T00:00:00.000Z",
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
    reproduction_details: {
      type: "insemination",
      date: "2026-06-01",
    },
    events: [
      {
        id: "evt-103",
        animal_id: "3",
        animal_name: "Malvina",
        event_type: "embryo_flush",
        mark_type: "donant_transfer_range",
        title: "Embryo Flush",
        description: "Scheduled flush for donor donkey",
        min_date: "2026-06-08",
        max_date: "2026-06-09",
        completed: false,
        created_at: "2026-06-01T00:00:00.000Z",
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
