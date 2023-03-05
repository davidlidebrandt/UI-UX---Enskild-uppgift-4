import {
  describe,
  expect,
  test,
  beforeEach,
  afterEach,
  jest,
} from "@jest/globals";
import { filterScreenings, sortScreenings } from "../src/filterScreenings.js";

const dummyData1 = [
  {
    id: 1,
    attributes: {
      start_time: "2023-01-01T17:00:00.000Z",
      room: "Stora salongen",
      createdAt: "2023-01-31T04:27:02.786Z",
      updatedAt: "2023-01-31T04:27:02.786Z",
    },
  },
  {
    id: 2,
    attributes: {
      start_time: "2023-01-05T17:00:00.000Z",
      room: "Stora salongen",
      createdAt: "2023-01-31T04:27:02.786Z",
      updatedAt: "2023-01-31T04:27:02.786Z",
    },
  },
  {
    id: 3,
    attributes: {
      start_time: "2023-01-23T17:00:00.000Z",
      room: "Stora salongen",
      createdAt: "2023-01-31T04:27:02.786Z",
      updatedAt: "2023-01-31T04:27:02.786Z",
    },
  },
];

const dummyData2 = [
  {
    id: 1,
    attributes: {
      start_time: "2023-01-01T17:00:00.000Z",
      room: "Stora salongen",
      createdAt: "2023-01-31T04:27:02.786Z",
      updatedAt: "2023-01-31T04:27:02.786Z",
    },
  },
  {
    id: 2,
    attributes: {
      start_time: "2023-01-05T17:00:00.000Z",
      room: "Stora salongen",
      createdAt: "2023-01-31T04:27:02.786Z",
      updatedAt: "2023-01-31T04:27:02.786Z",
    },
  },
  {
    id: 3,
    attributes: {
      start_time: "2023-01-05T17:00:00.000Z",
      room: "Stora salongen",
      createdAt: "2023-01-31T04:27:02.786Z",
      updatedAt: "2023-01-31T04:27:02.786Z",
    },
  },
  {
    id: 4,
    attributes: {
      start_time: "2023-01-06T17:00:00.000Z",
      room: "Stora salongen",
      createdAt: "2023-01-31T04:27:02.786Z",
      updatedAt: "2023-01-31T04:27:02.786Z",
    },
  },
  {
    id: 5,
    attributes: {
      start_time: "2023-01-06T17:00:00.000Z",
      room: "Stora salongen",
      createdAt: "2023-01-31T04:27:02.786Z",
      updatedAt: "2023-01-31T04:27:02.786Z",
    },
  },
  {
    id: 6,
    attributes: {
      start_time: "2023-01-06T17:00:00.000Z",
      room: "Stora salongen",
      createdAt: "2023-01-31T04:27:02.786Z",
      updatedAt: "2023-01-31T04:27:02.786Z",
    },
  },
  {
    id: 7,
    attributes: {
      start_time: "2023-01-06T17:00:00.000Z",
      room: "Stora salongen",
      createdAt: "2023-01-31T04:27:02.786Z",
      updatedAt: "2023-01-31T04:27:02.786Z",
    },
  },
  {
    id: 8,
    attributes: {
      start_time: "2023-01-06T17:00:00.000Z",
      room: "Stora salongen",
      createdAt: "2023-01-31T04:27:02.786Z",
      updatedAt: "2023-01-31T04:27:02.786Z",
    },
  },
  {
    id: 9,
    attributes: {
      start_time: "2023-01-06T17:00:00.000Z",
      room: "Stora salongen",
      createdAt: "2023-01-31T04:27:02.786Z",
      updatedAt: "2023-01-31T04:27:02.786Z",
    },
  },
  {
    id: 10,
    attributes: {
      start_time: "2023-01-06T17:00:00.000Z",
      room: "Stora salongen",
      createdAt: "2023-01-31T04:27:02.786Z",
      updatedAt: "2023-01-31T04:27:02.786Z",
    },
  },
  {
    id: 11,
    attributes: {
      start_time: "2023-01-06T17:00:00.000Z",
      room: "Stora salongen",
      createdAt: "2023-01-31T04:27:02.786Z",
      updatedAt: "2023-01-31T04:27:02.786Z",
    },
  },
  {
    id: 12,
    attributes: {
      start_time: "2023-01-07T17:00:00.000Z",
      room: "Stora salongen",
      createdAt: "2023-01-31T04:27:02.786Z",
      updatedAt: "2023-01-31T04:27:02.786Z",
    },
  },
  {
    id: 12,
    attributes: {
      start_time: "2023-01-23T17:00:00.000Z",
      room: "Stora salongen",
      createdAt: "2023-01-31T04:27:02.786Z",
      updatedAt: "2023-01-31T04:27:02.786Z",
    },
  },
];

const dummyData3 = [
  {
    id: 1,
    attributes: {
      start_time: "2023-01-01T17:00:00.000Z",
      room: "Stora salongen",
      createdAt: "2023-01-31T04:27:02.786Z",
      updatedAt: "2023-01-31T04:27:02.786Z",
    },
  },
  {
    id: 2,
    attributes: {
      start_time: "2023-01-05T17:00:00.000Z",
      room: "Stora salongen",
      createdAt: "2023-01-31T04:27:02.786Z",
      updatedAt: "2023-01-31T04:27:02.786Z",
    },
  },
  {
    id: 3,
    attributes: {
      start_time: "2023-01-05T17:00:00.000Z",
      room: "Stora salongen",
      createdAt: "2023-01-31T04:27:02.786Z",
      updatedAt: "2023-01-31T04:27:02.786Z",
    },
  },
  {
    id: 4,
    attributes: {
      start_time: "2023-01-05T17:00:00.000Z",
      room: "Stora salongen",
      createdAt: "2023-01-31T04:27:02.786Z",
      updatedAt: "2023-01-31T04:27:02.786Z",
    },
  },
  {
    id: 5,
    attributes: {
      start_time: "2023-01-05T17:00:00.000Z",
      room: "Stora salongen",
      createdAt: "2023-01-31T04:27:02.786Z",
      updatedAt: "2023-01-31T04:27:02.786Z",
    },
  },
  {
    id: 6,
    attributes: {
      start_time: "2023-01-06T17:00:00.000Z",
      room: "Stora salongen",
      createdAt: "2023-01-31T04:27:02.786Z",
      updatedAt: "2023-01-31T04:27:02.786Z",
    },
  },
  {
    id: 7,
    attributes: {
      start_time: "2023-01-06T17:00:00.000Z",
      room: "Stora salongen",
      createdAt: "2023-01-31T04:27:02.786Z",
      updatedAt: "2023-01-31T04:27:02.786Z",
    },
  },
  {
    id: 8,
    attributes: {
      start_time: "2023-01-06T17:00:00.000Z",
      room: "Stora salongen",
      createdAt: "2023-01-31T04:27:02.786Z",
      updatedAt: "2023-01-31T04:27:02.786Z",
    },
  },
  {
    id: 9,
    attributes: {
      start_time: "2023-01-06T17:00:00.000Z",
      room: "Stora salongen",
      createdAt: "2023-01-31T04:27:02.786Z",
      updatedAt: "2023-01-31T04:27:02.786Z",
    },
  },
  {
    id: 10,
    attributes: {
      start_time: "2023-01-06T17:00:00.000Z",
      room: "Stora salongen",
      createdAt: "2023-01-31T04:27:02.786Z",
      updatedAt: "2023-01-31T04:27:02.786Z",
    },
  },
  {
    id: 11,
    attributes: {
      start_time: "2023-01-06T17:00:00.000Z",
      room: "Stora salongen",
      createdAt: "2023-01-31T04:27:02.786Z",
      updatedAt: "2023-01-31T04:27:02.786Z",
    },
  },
  {
    id: 12,
    attributes: {
      start_time: "2023-01-06T17:00:00.000Z",
      room: "Stora salongen",
      createdAt: "2023-01-31T04:27:02.786Z",
      updatedAt: "2023-01-31T04:27:02.786Z",
    },
  },
  {
    id: 12,
    attributes: {
      start_time: "2023-01-23T17:00:00.000Z",
      room: "Stora salongen",
      createdAt: "2023-01-31T04:27:02.786Z",
      updatedAt: "2023-01-31T04:27:02.786Z",
    },
  },
];

const dummyData4 = [
  {
    id: 2,
    attributes: {
      start_time: "2023-01-05T17:00:00.000Z",
      room: "Stora salongen",
      createdAt: "2023-01-31T04:27:02.786Z",
      updatedAt: "2023-01-31T04:27:02.786Z",
    },
  },
  {
    id: 1,
    attributes: {
      start_time: "2023-01-01T17:00:00.000Z",
      room: "Stora salongen",
      createdAt: "2023-01-31T04:27:02.786Z",
      updatedAt: "2023-01-31T04:27:02.786Z",
    },
  },
  {
    id: 3,
    attributes: {
      start_time: "2023-01-23T17:00:00.000Z",
      room: "Stora salongen",
      createdAt: "2023-01-31T04:27:02.786Z",
      updatedAt: "2023-01-31T04:27:02.786Z",
    },
  },
];

describe("filterScreenings()", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2023-01-01"));
  });

  afterEach(() => {
    jest.setSystemTime(new Date());
  });

  test("Should return all screenings in the next five days", () => {
    const filteredData = filterScreenings(dummyData1);
    expect(filteredData.length).toBe(1);
  });

  test("Should return only ten screenings when the number of screenings in the next five days are more than ten", () => {
    const filteredData = filterScreenings(dummyData2);
    expect(filteredData.length).toBe(10);
  });

  test("Should remove all screenings from the last screenings date if that days number of screenings makes the total number of screenings exceed ten", () => {
    const filteredData = filterScreenings(dummyData3);
    expect(filteredData.length).toBe(4);
  });
});

describe("sortScreenings()", () => {
  test("Should sort randomly ordered screening data by start date", () => {
    const sortedData = sortScreenings(dummyData4);
    expect(sortedData[0].id).toBe(1);
    expect(sortedData[1].id).toBe(2);
    expect(sortedData[2].id).toBe(3);
  });
});
