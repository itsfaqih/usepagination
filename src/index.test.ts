import usePagination from './';
import { act, renderHook } from '@testing-library/react-hooks';
import { posts } from './mocks/posts';

const perPage = 6;
const paginatableLength = Math.floor(Math.random() * posts.length + perPage + 1);
const lowShownPageNumber = Math.floor(Math.random() * (Math.ceil(paginatableLength / perPage) - 1) + 1);

const initiateData = (
  length = paginatableLength,
  shownPageNumber = lowShownPageNumber
) => {
  const usedPost = posts.slice(0, length);

  const { result } = renderHook(() => usePagination(usedPost, perPage, shownPageNumber));

  return result;
};

describe('usePagination', () => {
  it('divides the data', () => {
    const result = initiateData();

    expect(result.current.page.data.length).toBeLessThanOrEqual(perPage);

    if (result.current.page.current !== null) {
      const expectedData = posts.slice(
        (result.current.page.current - 1) * perPage,
        result.current.page.current * perPage
      );
      expect(expectedData).toEqual(expect.arrayContaining(result.current.page.data));
    }
  });

  it('can change to next and previous page', () => {
    const result = initiateData();

    if (result.current.page.current !== null) {
      const initialPage = result.current.page.current;

      act(() => result.current.action.next());

      expect(result.current.page.current).toBe(initialPage + 1);
      expect(result.current.page.previous).toBe(initialPage);

      const expectedData = posts.slice(
        (result.current.page.current - 1) * perPage,
        result.current.page.current * perPage
      );

      expect(expectedData).toEqual(expect.arrayContaining(result.current.page.data));

      act(() => result.current.action.previous());

      expect(result.current.page.current).toBe(1);
      expect(result.current.page.previous).toBe(null);
    }
  });

  it('can change to specific page', () => {
    const result = initiateData();
    const random = Math.floor(Math.random() * result.current.page.last + 2);

    act(() => result.current.action.goTo(random));

    expect(result.current.page.current).toBe(random);
    expect(result.current.page.previous).toBe(random - 1);
  });

  it("won't change page on empty data", () => {
    const result = initiateData(0);

    act(() => result.current.action.next());

    expect(result.current.page.current).toBe(null);
    expect(result.current.page.next).toBe(null);
    expect(result.current.page.previous).toBe(null);
  });

  it("won't change page on less data", () => {
    const length = perPage - Math.floor(Math.random() * (perPage - 1));
    const result = initiateData(length);

    act(() => result.current.action.next());

    expect(result.current.page.current).toBe(1);
    expect(result.current.page.next).toBe(null);
    expect(result.current.page.previous).toBe(null);
  });

  it('gives full page numbers when shownPageNumber is higher', () => {
    const bigShownPageNumber = Math.floor(posts.length / perPage) + 1;
    const result = initiateData(paginatableLength, bigShownPageNumber);
    
    expect(result.current.page.numbers.includes('...')).toBe(false);
  });

  it('gives ellipsis page numbers when shownPageNumber is lower', () => {
    const result = initiateData();
    
    expect(result.current.page.numbers.includes('...')).toBe(true);
  });
});
