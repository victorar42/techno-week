const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../src/app");

const JWT_SECRET = "dev-secret-change-in-production";

// Helper: generate a valid JWT token
function generateToken(overrides = {}) {
  const payload = {
    sub: "user-001",
    role: "customer",
    accounts: [
      "550e8400-e29b-41d4-a716-446655440000",
      "660e8400-e29b-41d4-a716-446655440001",
    ],
    ...overrides,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

describe("Health Check", () => {
  test("GET /health returns ok", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("ok");
  });
});

describe("Authentication", () => {
  test("returns 401 without token", async () => {
    const res = await request(app).get(
      "/api/v1/accounts/550e8400-e29b-41d4-a716-446655440000/balance"
    );
    expect(res.statusCode).toBe(401);
    expect(res.body.code).toBe("AUTH_001");
  });

  test("returns 401 with invalid token", async () => {
    const res = await request(app)
      .get("/api/v1/accounts/550e8400-e29b-41d4-a716-446655440000/balance")
      .set("Authorization", "Bearer invalid-token");
    expect(res.statusCode).toBe(401);
  });

  test("returns 401 with expired token", async () => {
    const token = jwt.sign(
      { sub: "user-001", accounts: [] },
      JWT_SECRET,
      { expiresIn: "-1h" }
    );
    const res = await request(app)
      .get("/api/v1/accounts/550e8400-e29b-41d4-a716-446655440000/balance")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(401);
    expect(res.body.code).toBe("AUTH_002");
  });
});

describe("GET /api/v1/accounts/:id/balance", () => {
  const token = generateToken();

  test("returns balance for authorized account", async () => {
    const res = await request(app)
      .get("/api/v1/accounts/550e8400-e29b-41d4-a716-446655440000/balance")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("available_balance");
    expect(res.body).toHaveProperty("currency");
    expect(res.body).toHaveProperty("as_of");
  });

  test("returns 403 for unauthorized account", async () => {
    const res = await request(app)
      .get("/api/v1/accounts/99999999-9999-9999-9999-999999999999/balance")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
  });

  test("returns 403 for invalid/unauthorized UUID", async () => {
    const res = await request(app)
      .get("/api/v1/accounts/not-a-uuid/balance")
      .set("Authorization", `Bearer ${token}`);
    // authorize middleware rejects before format validation
    expect(res.statusCode).toBe(403);
  });
});

describe("POST /api/v1/transfers", () => {
  const token = generateToken();

  test("creates a transfer successfully", async () => {
    const res = await request(app)
      .post("/api/v1/transfers")
      .set("Authorization", `Bearer ${token}`)
      .send({
        source_account_id: "550e8400-e29b-41d4-a716-446655440000",
        destination_account_id: "660e8400-e29b-41d4-a716-446655440001",
        amount: 10000,
        currency: "CRC",
        description: "Test transfer",
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("transfer_id");
    expect(res.body.status).toBe("completed");
  });

  test("rejects transfer with missing fields", async () => {
    const res = await request(app)
      .post("/api/v1/transfers")
      .set("Authorization", `Bearer ${token}`)
      .send({ amount: 100 });
    expect(res.statusCode).toBe(400);
  });

  test("rejects transfer exceeding limit", async () => {
    const res = await request(app)
      .post("/api/v1/transfers")
      .set("Authorization", `Bearer ${token}`)
      .send({
        source_account_id: "550e8400-e29b-41d4-a716-446655440000",
        destination_account_id: "660e8400-e29b-41d4-a716-446655440001",
        amount: 999999999,
        currency: "CRC",
        description: "Over limit",
      });
    expect(res.statusCode).toBe(400);
  });

  test("rejects same source and destination", async () => {
    const res = await request(app)
      .post("/api/v1/transfers")
      .set("Authorization", `Bearer ${token}`)
      .send({
        source_account_id: "550e8400-e29b-41d4-a716-446655440000",
        destination_account_id: "550e8400-e29b-41d4-a716-446655440000",
        amount: 100,
        currency: "CRC",
        description: "Self transfer",
      });
    expect(res.statusCode).toBe(400);
  });
});

describe("GET /api/v1/accounts/:id/transactions", () => {
  const token = generateToken();

  test("returns transactions with pagination", async () => {
    const res = await request(app)
      .get("/api/v1/accounts/550e8400-e29b-41d4-a716-446655440000/transactions")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("transactions");
    expect(res.body).toHaveProperty("pagination");
    expect(Array.isArray(res.body.transactions)).toBe(true);
  });

  test("respects per_page parameter", async () => {
    const res = await request(app)
      .get("/api/v1/accounts/550e8400-e29b-41d4-a716-446655440000/transactions?per_page=1")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.transactions.length).toBeLessThanOrEqual(1);
  });
});
