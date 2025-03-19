// playwright pipeline darom:
// npm init playwright@latest
 // typesc
 // tests
 // true
 // true
 // tests aplanke sukurti nauja faila, kuriame testus perrasysiu playwrightui
 // i playwright.yml irasoma:    
 //  - name: Start tic tac toe game
 // run: npm run dev &

// norint paleisti terminale rasom: npm run dev
// antram terminale: npm run cypress:run

// Playwright: 
import { test, expect } from '@playwright/test';

test.describe('Tic Tac Toe testing', () => {
    test.beforeEach(async ({page}) => {
      await page.goto('http://127.0.0.1:5173')
    });
  
    test('Should board be empty and X first player', async ({page}) => {
      await expect(page.getByTestId('status')).toContainText('Next player: X');
      const squares = await page.locator('.square').all();
      for(const square of squares) {
        await expect(square).toBeEmpty();
      }
      });
  
      test('Should players move alternately', async ({page})=> {
       
        await page.getByTestId('square-0').click();
        await expect(page.getByTestId('square-0')).toContainText('X');
        await expect(page.getByTestId('status')).toContainText('Next player: O')
 
        await page.getByTestId('square-5').click();
        await expect(page.getByTestId('square-5')).toContainText('O');
        await expect(page.getByTestId('status')).toContainText('Next player: X')
    });
     
  test('Should declare winner', async ({ page }) => {
    await page.getByTestId('square-0').click(); // X
    await page.getByTestId('square-1').click(); // O
    await page.getByTestId('square-3').click(); // X
    await page.getByTestId('square-4').click(); // O
    await page.getByTestId('square-6').click(); // X

    await expect(page.getByTestId('status')).toHaveText('Winner: X');
  });

test('should game reset', async ({page})=> {
        await page.getByTestId('square-0').click(); //X
        await page.getByTestId('square-1').click(); //0
        await page.getByTestId('square-3').click(); //x
        await page.getByTestId('square-4').click(); //0
        await page.getByTestId('square-6').click(); // x
       
        await expect(page.getByTestId('status')).toContainText('Winner: X')
 
        await page.getByTestId("reset-button").click();
 
        await expect(page.getByTestId('status')).toContainText('Next player: X');
        const squares = await page.locator('.square').all();
        expect(squares).toHaveLength(9);
        for(const square of squares) {
            await expect(square).toBeEmpty();
        }
    })
  });

  