# Playwright Automation Framework

## Main Folders

- `pages/base`: shared page object behavior.
- `pages/royal-export`: page objects for Royal Export.
- `tests/fixtures`: custom Playwright fixtures.
- `tests/royal-export`: Royal Export application tests.
- `test-data`: reusable test data.
- `utils`: small helper functions.

## Commands

```bash
npm run test
npm run test:royal
npm run test:headed
npm run report
```

Use `BASE_URL` to run against another environment:

```bash
BASE_URL=https://royalexport.in npm run test:royal
```
