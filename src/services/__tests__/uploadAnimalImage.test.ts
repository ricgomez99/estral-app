import { uploadAnimalImage } from "../storage/uploadAnimalImage";
import { supabase } from "@/lib/supabase";

jest.mock("@/lib/supabase", () => ({
  supabase: {
    storage: {
      from: jest.fn().mockReturnThis(),
      upload: jest.fn().mockResolvedValue({ error: null }),
      getPublicUrl: jest.fn().mockReturnValue({
        data: {
          publicUrl:
            "https://test.supabase.co/storage/v1/object/public/animals/avatars/test-user-123/mock-uuid.jpg",
        },
      }),
    },
  },
}));

// Mockear expo-crypto si causa problemas con randomUUID
jest.mock("expo-crypto", () => ({
  randomUUID: () => "mock-uuid-1234",
}));

describe("uploadAnimalImage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should upload a Blob and return a public valid url from supabase", async () => {
    const fakeImageBlob = new Blob(["fake-image-binary-data"], {
      type: "image/jpeg",
    });

    globalThis.fetch = jest.fn().mockResolvedValue({
      blob: async () => fakeImageBlob,
    } as Response);

    const testUserId = "test-user-123";
    const fakeLocalUri = "file:///data/user/0/com.app/cache/test-image.jpg";

    const publicUrl = await uploadAnimalImage(fakeLocalUri, testUserId);

    expect(publicUrl).toBeDefined();
    expect(publicUrl).toContain("https://");
    expect(publicUrl).toContain("/storage/v1/object/public/animals/");
    expect(publicUrl).toContain(`avatars/${testUserId}/`);
    expect(supabase.storage.from).toHaveBeenCalledWith("animals");
  });
});
