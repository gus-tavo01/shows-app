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

  // 'When api response has errors, expect an unsuccessful service response'
});

// describe('shows-service getTopRated', () => {
//   test('When api returns valid data, expect a successful service response', async () => {
//     // Arrange
//     const expectedResult = 'One';

//     // Assert
//     expect('One').toBe(expectedResult);
//   });

// 'When theres an api error, expect a service response with errors'
// });

// describe('shows-service getTrending', () => {
//   test('When api returns valid data, expect a successful service response', async () => {
//     // Arrange
//     const expectedResult = 'One';

//     // Assert
//     expect('One').toBe(expectedResult);
//   });
// 'When api returns errors, expect a service response with errors'
// });
