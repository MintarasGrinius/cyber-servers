import ServersTable from "@/pages/servers/ServersTable";
import { useServers } from "@/services/servers/fetchServers"; // Make sure this is the correct path
import { render, screen, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  Mock,
  vi,
} from "vitest";

// Mock the useServers hook
vi.mock("@/services/servers/fetchServers", () => ({
  useServers: vi.fn(),
}));

// Setup MSW server
const mockServerResponse = [
  { name: "Server 1", distance: 1000 },
  { name: "Server 2", distance: 2000 },
];

const serverApi = setupServer(
  http.get("https://playground.tesonet.lt/v1/servers", () => {
    return HttpResponse.json(mockServerResponse, { status: 200 });
  })
);

beforeAll(() => serverApi.listen());
afterEach(() => serverApi.resetHandlers());
afterAll(() => serverApi.close());

describe("ServersPage Integration Tests", () => {
  it("should render loading state", () => {
    (useServers as Mock).mockReturnValue({
      data: [],
      error: null,
      isLoading: true,
    });

    render(<ServersTable />);

    // Check if the loading skeleton is displayed
    expect(screen.getByTestId("servers-table-skeleton")).toBeInTheDocument();
  });

  it("should display an error message when there is an error", () => {
    // Mock the useServers hook to simulate error state
    (useServers as Mock).mockReturnValue({
      data: [],
      error: new Error("Failed to fetch servers"),
      isLoading: false,
    });

    render(<ServersTable />);

    // Check if the error component is displayed
    expect(screen.getByText("Failed to fetch servers")).toBeInTheDocument();
  });

  it("should render the data table with servers when data is fetched successfully", async () => {
    // Mock the useServers hook to simulate successful data fetching
    (useServers as Mock).mockReturnValue({
      data: mockServerResponse,
      error: null,
      isLoading: false,
    });

    render(<ServersTable />);

    // Wait for the data to be rendered
    await waitFor(() => {
      expect(screen.getByText("Server 1")).toBeInTheDocument();
      expect(screen.getByText("Server 2")).toBeInTheDocument();
    });

    // Optionally check the column headers
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Distance")).toBeInTheDocument();
  });
});
