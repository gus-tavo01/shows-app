import ShowsService from '../../services/shows-service';
import ShowsApi from '../../api/shows-api';

jest.mock('../../api/shows-api');

let showsService;
let mockShowsApi;

beforeAll(() => {
  mockShowsApi = new ShowsApi();
  showsService = new ShowsService();
  showsService.showsApi = mockShowsApi;
});

describe('shows-service getMostPopular', () => {
  // clear mock function after each test execution
  afterEach(() => {
    mockShowsApi.getPopular.mockReset();
  });

  test('When api returns data, expect a successful service response', async () => {
    // Arrange
    const page = 1;

    const popularShows = [
      {
        id: 8000,
        name: 'WandaVision',
        overView: 'New Disney serie',
        poster_path: '/dasdasdasd.jpg',
        vote_average: 8.5
      },
      {
        id: 6000,
        name: 'Cobra kai',
        overView: 'Karate old serie',
        poster_path: '/sdasdasd.jpg',
        vote_average: 9.5
      }
    ];

    // mock function
    const mockGetPopular = {
      page,
      results: popularShows
    };
     mockShowsApi.getPopular = jest.fn(async () => mockGetPopular);

    const expectedResult = {
      payload: {
        results: popularShows,
        page,
      },
      isSuccess: true,
      errorMessage: null
    }

    // Act
    const result = await showsService.getMostPopular(page);

    // Assert
    expect(result).toMatchObject(expectedResult);
  });

  test('When api response has errors, expect an unsuccessful service response', async () => {
    // Arrange
    const page = 10;
    const expectedErrMessage = 'Unsuccessful response';

    // mock function
    const mockGetPopular = async () => {
      const error = {
        errorMessage: expectedErrMessage
      };
      throw error;
    };
     mockShowsApi.getPopular = jest.fn(mockGetPopular);

    const expectedResult = {
      payload: null,
      isSuccess: false,
      errorMessage: expectedErrMessage
    }

    // Act
    const result = await showsService.getMostPopular(page);

    // Assert
    expect(result).toMatchObject(expectedResult);
  });
});

describe('shows-service getTopRated', () => {
  test('When api returns valid data, expect a successful service response', async () => {
    // Arrange
    const page = 1;

    const ratedShows = [
      {
        id: 6000,
        name: 'Cobra kai',
        overView: 'Karate old serie',
        poster_path: '/sdasdasd.jpg',
        vote_average: 9.5
      },
      {
        id: 8000,
        name: 'Bridgeton',
        overView: 'Boring serie',
        poster_path: '/dasdasdasd.jpg',
        vote_average: 5.5
      },
    ];

    // mock function
    const mockGetTopRated = {
      page,
      results: ratedShows
    };
     mockShowsApi.getTopRated = jest.fn(async () => mockGetTopRated);

    const expectedResult = {
      payload: {
        results: ratedShows,
        page,
      },
      isSuccess: true,
      errorMessage: null
    }

    // Act
    const result = await showsService.getTopRated(page);

    // Assert
    expect(result).toMatchObject(expectedResult);
  });

  test('When theres an api error, expect a service response with errors', async () => {
    // Arrange
    const page = 10;
    const expectedErrMessage = 'Unsuccessful response';

    // mock function
    const mockGetTopRated = async () => {
      const error = {
        errorMessage: expectedErrMessage
      };
      throw error;
    };
     mockShowsApi.getTopRated = jest.fn(mockGetTopRated);

    const expectedResult = {
      payload: null,
      isSuccess: false,
      errorMessage: expectedErrMessage
    }

    // Act
    const result = await showsService.getTopRated(page);

    // Assert
    expect(result).toMatchObject(expectedResult);
  });
});

describe('shows-service getTrending', () => {
  test('When api returns valid data, expect a successful service response', async () => {
    // Arrange
    const page = 1;

    const ratedShows = [
      {
        id: 6000,
        name: 'Cobra kai',
        overView: 'Karate old serie',
        poster_path: '/sdasdasd.jpg',
        vote_average: 9.5
      },
      {
        id: 8000,
        name: 'Bridgeton',
        overView: 'Boring serie',
        poster_path: '/dasdasdasd.jpg',
        vote_average: 5.5
      },
    ];

    // mock function
    const mockGetPopular = {
      page,
      results: ratedShows
    };
     mockShowsApi.getTrending = jest.fn(async () => mockGetPopular);

    const expectedResult = {
      payload: {
        results: ratedShows,
        page,
      },
      isSuccess: true,
      errorMessage: null
    }

    // Act
    const result = await showsService.getTrending(page);

    // Assert
    expect(result).toMatchObject(expectedResult);
  });

  test('When api returns errors, expect a service response with errors', async () => {
    // Arrange
    const page = 10;
    const expectedErrMessage = 'Unsuccessful response';

    // mock function
    const mockGetTrending = async () => {
      const error = {
        errorMessage: expectedErrMessage
      };
      throw error;
    };
     mockShowsApi.getTrending = jest.fn(mockGetTrending);

    const expectedResult = {
      payload: null,
      isSuccess: false,
      errorMessage: expectedErrMessage
    }

    // Act
    const result = await showsService.getTrending(page);

    // Assert
    expect(result).toMatchObject(expectedResult);
  });
});

// TODO: add unit test for getDetails method
