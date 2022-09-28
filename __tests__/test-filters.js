/* globals page, beforeAll, afterEach, describe, it, expect, Event */
import './jest-extensions.js';

beforeAll(async () => {
  await page.goto('http://localhost:8080/site/');
});

describe('The schoolNameFilter', () => {
  afterEach(async () => {
    await page.evaluate(() => {
      window.schoolNameFilter.value = '';
      // They could be listening on either `input` or `change`.
      window.schoolNameFilter.dispatchEvent(new Event('input'));
      window.schoolNameFilter.dispatchEvent(new Event('change'));
    });
  });

  it('should be defined', async () => {
    await expect(page).toHaveVariableInGlobalScope('schoolNameFilter');
  });

  it('should start empty', async () => {
    const initialValue = await page.evaluate(() => {
      const initialValue = window.schoolNameFilter.value;
      return initialValue;
    });
    expect(initialValue).toBe('');
  });

  it('should filter the list to around 12 elements when "science" is entered', async () => {
    const filteredLength = await page.evaluate(() => {
      window.schoolNameFilter.value = 'science';
      // They could be listening on either `input` or `change`.
      window.schoolNameFilter.dispatchEvent(new Event('input'));
      window.schoolNameFilter.dispatchEvent(new Event('change'));
      const filteredLength = window.schoolList.childElementCount;
      return filteredLength;
    });
    expect(filteredLength).toBeCloseTo(12, -1);
  });

  it('should filter the list to around 0 elements when "nonsense" is entered', async () => {
    const filteredLength = await page.evaluate(() => {
      window.schoolNameFilter.value = 'nonsense';
      // They could be listening on either `input` or `change`.
      window.schoolNameFilter.dispatchEvent(new Event('input'));
      window.schoolNameFilter.dispatchEvent(new Event('change'));
      const filteredLength = window.schoolList.childElementCount;
      return filteredLength;
    });
    expect(filteredLength).toBe(0);
  });

  it('should return the list to its full length when cleared', async () => {
    const finalLength = await page.evaluate(() => {
      window.schoolNameFilter.value = 'nonsense';
      // They could be listening on either `input` or `change`.
      window.schoolNameFilter.dispatchEvent(new Event('input'));
      window.schoolNameFilter.dispatchEvent(new Event('change'));

      // Clear the filter.
      window.schoolNameFilter.value = '';
      window.schoolNameFilter.dispatchEvent(new Event('input'));
      window.schoolNameFilter.dispatchEvent(new Event('change'));

      const finalLength = window.schoolList.childElementCount;
      return finalLength;
    });
    expect(finalLength).toBeCloseTo(325, -1);
  });

  it('should filter the map to around 12 feature layers when "science" is entered', async () => {
    const filteredLength = await page.evaluate(() => {
      window.schoolNameFilter.value = 'science';
      // They could be listening on either `input` or `change`.
      window.schoolNameFilter.dispatchEvent(new Event('input'));
      window.schoolNameFilter.dispatchEvent(new Event('change'));
      const filteredLength = Object.values(window.schoolMap._layers).filter(l => 'feature' in l).length;
      return filteredLength;
    });
    expect(filteredLength).toBeCloseTo(12, -1);
  });

  it('should filter the map to around 0 feature layers when "nonsense" is entered', async () => {
    const filteredLength = await page.evaluate(() => {
      window.schoolNameFilter.value = 'nonsense';
      // They could be listening on either `input` or `change`.
      window.schoolNameFilter.dispatchEvent(new Event('input'));
      window.schoolNameFilter.dispatchEvent(new Event('change'));
      const filteredLength = Object.values(window.schoolMap._layers).filter(l => 'feature' in l).length;
      return filteredLength;
    });
    expect(filteredLength).toBe(0);
  });

  it('should return the map to its full set of layers when cleared', async () => {
    const finalLength = await page.evaluate(() => {
      window.schoolNameFilter.value = 'nonsense';
      // They could be listening on either `input` or `change`.
      window.schoolNameFilter.dispatchEvent(new Event('input'));
      window.schoolNameFilter.dispatchEvent(new Event('change'));

      // Clear the filter.
      window.schoolNameFilter.value = '';
      window.schoolNameFilter.dispatchEvent(new Event('input'));
      window.schoolNameFilter.dispatchEvent(new Event('change'));

      const finalLength = Object.values(window.schoolMap._layers).filter(l => 'feature' in l).length;
      return finalLength;
    });
    expect(finalLength).toBeCloseTo(325, -1);
  });
});


describe('The schoolGradeFilters', () => {
  afterEach(async () => {
    await page.evaluate(() => {
      for (const filter of window.schoolGradeFilters || []) {
        filter.checked = false;
        filter.dispatchEvent(new Event('change'));
      }
    });
  });

  it('should be defined', async () => {
    await expect(page).toHaveVariableInGlobalScope('schoolGradeFilters');
  });

  it('should start unchecked', async () => {
    const initiallyChecked = await page.evaluate(() => {
      const initiallyChecked = Array.from(window.schoolGradeFilters).some(cb => cb.checked);
      return initiallyChecked;
    });
    expect(initiallyChecked).toBe(false);
  });

  it('should filter the list to around 210 elements when 4th grade is checked', async () => {
    const filteredLength = await page.evaluate(() => {
      const grade4 = Array.from(window.schoolGradeFilters).find(cb => cb.value.includes('4'));
      grade4.checked = true;
      grade4.dispatchEvent(new Event('change'));
      const filteredLength = window.schoolList.childElementCount;
      return filteredLength;
    });
    expect(filteredLength).toBeCloseTo(210, -1);
  });

  it('should filter the list to around 19 elements when 4th and 9th grades are checked', async () => {
    const filteredLength = await page.evaluate(() => {
      const grade4 = Array.from(window.schoolGradeFilters).find(cb => cb.value.includes('4'));
      const grade9 = Array.from(window.schoolGradeFilters).find(cb => cb.value.includes('9'));
      grade4.checked = true;
      grade4.dispatchEvent(new Event('change'));
      grade9.checked = true;
      grade9.dispatchEvent(new Event('change'));
      const filteredLength = window.schoolList.childElementCount;
      return filteredLength;
    });
    expect(filteredLength).toBeCloseTo(19, -1);
  });

  it('should return the list to its full length when unchecked', async () => {
    const finalLength = await page.evaluate(() => {
      const grade4 = Array.from(window.schoolGradeFilters).find(cb => cb.value.includes('4'));
      grade4.checked = true;
      grade4.dispatchEvent(new Event('change'));

      // Clear the filter.
      grade4.checked = false;
      grade4.dispatchEvent(new Event('change'));

      const finalLength = window.schoolList.childElementCount;
      return finalLength;
    });
    expect(finalLength).toBeCloseTo(325, -1);
  });

  it('should filter the map to around 210 features when 4th grade is checked', async () => {
    const filteredLength = await page.evaluate(() => {
      const grade4 = Array.from(window.schoolGradeFilters).find(cb => cb.value.includes('4'));
      grade4.checked = true;
      grade4.dispatchEvent(new Event('change'));
      const filteredLength = Object.values(window.schoolMap._layers).filter(l => 'feature' in l).length;
      return filteredLength;
    });
    expect(filteredLength).toBeCloseTo(210, -1);
  });

  it('should filter the map to around 19 features when 4th and 9th grades are checked', async () => {
    const filteredLength = await page.evaluate(() => {
      const grade4 = Array.from(window.schoolGradeFilters).find(cb => cb.value.includes('4'));
      const grade9 = Array.from(window.schoolGradeFilters).find(cb => cb.value.includes('9'));
      grade4.checked = true;
      grade4.dispatchEvent(new Event('change'));
      grade9.checked = true;
      grade9.dispatchEvent(new Event('change'));
      const filteredLength = Object.values(window.schoolMap._layers).filter(l => 'feature' in l).length;
      return filteredLength;
    });
    expect(filteredLength).toBeCloseTo(19, -1);
  });

  it('should return the map to its full number of features when unchecked', async () => {
    const finalLength = await page.evaluate(() => {
      const grade4 = Array.from(window.schoolGradeFilters).find(cb => cb.value.includes('4'));
      grade4.checked = true;
      grade4.dispatchEvent(new Event('change'));

      // Clear the filter.
      grade4.checked = false;
      grade4.dispatchEvent(new Event('change'));

      const finalLength = Object.values(window.schoolMap._layers).filter(l => 'feature' in l).length;
      return finalLength;
    });
    expect(finalLength).toBeCloseTo(325, -1);
  });
});
