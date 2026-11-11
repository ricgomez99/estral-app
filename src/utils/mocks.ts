import { IVetDetails, IRanchDetails } from "@/types/auth-types";

const ADMIN_MOCK_VET_DETAILS: IVetDetails = {
  id: "admin-vet-mock-id",
  profile_id: "",
  license_number: "VET-ADMIN-DEBUG-000",
  license_status: "verified",
  specialties: ["general_practice"],
  created_at: "2024-01-01T00:00:00.000Z",
};

const ADMIN_MOCK_RANCH_DETAILS: IRanchDetails = {
  id: "admin-ranch-mock-id",
  profile_id: "",
  ranch_name: "Rancho de Pruebas (Admin)",
  location: "Entorno de Desarrollo",
  capacity: 9999,
  created_at: "2024-01-01T00:00:00.000Z",
};

export { ADMIN_MOCK_RANCH_DETAILS, ADMIN_MOCK_VET_DETAILS };
