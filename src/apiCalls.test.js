import { getPeaks, getPeak, deletePeak } from "./apiCalls";

describe("getPeaks - GET an array of all peaks", () => {
  let mockPeak;
  beforeEach(() => {
    mockPeak = [
      {
        id: 1,
        name: "Mount Elbert",
        elevation: 14433,
        rank: 1,
        range: "Sawatch",
        forest: "San Isabel",
        grizzlyBears: false,
        marmots: true,
        jerryLevel: "high",
        numberOfRoutes: 4,
        routes: {
          northeastRidge: {
            mileage: 9.5,
            gain: 4700,
            difficulty: "class 1",
            exposure: 1,
          },
          eastRidge: {
            mileage: 10,
            gain: 4100,
            difficulty: "class 1",
            exposure: 1,
          },
          southeastRidge: {
            mileage: 11,
            gain: 5300,
            difficulty: "class 2",
            exposure: 1,
          },
          boxCreekCouloir: {
            mileage: 8.5,
            gain: 4150,
            difficulty: "class 2+",
            exposure: 3,
          },
        },
      },
    ];

    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockPeak),
      });
    });
  });

  it("should call fetch with the correct URL", () => {
    getPeaks();
    expect(window.fetch).toHaveBeenCalledWith("https://fourteeners-api.herokuapp.com/api/v1/peaks");
  });

  it("should return an array of peaks", () => {
    expect(getPeaks()).resolves.toEqual(mockPeak);
  });

  it("should show an error when the fetch Promise returns rejected -- ok: false", () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false,
      });
    });

    expect(getPeaks()).rejects.toEqual(Error("Fetching Error"));
  });

  it("should show an error when the fetch Promise returns rejected -- message: 'Fetching Error'", () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        message: "Fetching Error",
      });
    });

    expect(getPeaks()).rejects.toEqual(Error("Fetching Error"));
  });
});

describe("getPeak - GET one matching peak object, by id", () => {
  let mockPeak;
  beforeEach(() => {
    mockPeak = [
      {
        id: 1,
        name: "Mount Elbert",
        elevation: 14433,
        rank: 1,
        range: "Sawatch",
        forest: "San Isabel",
        grizzlyBears: false,
        marmots: true,
        jerryLevel: "high",
        numberOfRoutes: 4,
        routes: {
          northeastRidge: {
            mileage: 9.5,
            gain: 4700,
            difficulty: "class 1",
            exposure: 1,
          },
          eastRidge: {
            mileage: 10,
            gain: 4100,
            difficulty: "class 1",
            exposure: 1,
          },
          southeastRidge: {
            mileage: 11,
            gain: 5300,
            difficulty: "class 2",
            exposure: 1,
          },
          boxCreekCouloir: {
            mileage: 8.5,
            gain: 4150,
            difficulty: "class 2+",
            exposure: 3,
          },
        },
      },
    ];

    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockPeak),
      });
    });
  });

  it("should call fetch with the correct URL", () => {
    getPeak(1);
    expect(window.fetch).toHaveBeenCalledWith(
      "https://fourteeners-api.herokuapp.com/api/v1/peaks/1"
    );
  });

  it("should return one matching peak object", () => {
    expect(getPeak(1)).resolves.toEqual(mockPeak);
    expect(getPeak(1).name).toEqual(mockPeak.name);
  });

  it("should show an error when the fetch Promise returns rejected -- ok: false", () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false,
      });
    });

    expect(getPeak(1)).rejects.toEqual(Error("Fetching Error"));
  });

  it("should show an error when the fetch Promise returns rejected -- message: 'Fetching Error'", () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        message: "Fetching Error",
      });
    });

    expect(getPeaks()).rejects.toEqual(Error("Fetching Error"));
  });
});

describe("deletePeaks", () => {
  let mockPeakId;
  beforeEach(() => {
    mockPeakId = 1;

    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockPeakId),
      });
    });
  });

  it("should call fetch with the correct URL", () => {
    deletePeak(mockPeakId);
    expect(window.fetch).toHaveBeenCalledWith(
      "https://fourteeners-api.herokuapp.com/api/v1/peaks/1",
      {"method": "DELETE"}
    );
  });

  it("should return a status 204 for a mocked successful delete", async () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({status: 204}),
      });
    });
    let response = await deletePeak(1);
    expect(response.status).toEqual(204);
  });

  it("should show an error when the fetch Promise returns rejected -- ok: false", () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false,
      });
    });

    expect(deletePeak()).rejects.toEqual(Error("Fetching Error"));
  });

  it("should show an error when the fetch Promise returns rejected -- message: 'Fetching Error'", () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        message: "Fetching Error",
      });
    });

    expect(deletePeak()).rejects.toEqual(Error("Fetching Error"));
  });
});
