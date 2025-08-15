## 🔨 What does this PR do?

This PR resolves ESLint and TypeScript errors that were causing the Vercel build to fail.  
It includes the following fixes:

- ✅ Removed unused imports (icons, variables)
- ✅ Replaced `any` types with safer alternatives (`unknown`, `Record<string, unknown>`)
- ✅ Escaped unescaped entities in JSX (`"` → `&quot;`)
- ✅ Fixed missing dependencies in `useEffect` hooks

---

## 📁 Modified Files

- `src/app/page.tsx`
- `src/app/test-theme/page.tsx`
- `src/app/tools/mbti/page.tsx`
- `src/app/tools/teto-egen/page.tsx`
- `src/components/Header.tsx`
- `src/components/IntlProvider.tsx`
- `src/components/ThemeToggle.tsx`
- `src/lib/seo.ts`

---

## 🧪 How to test

1. Run `npm run lint` – should pass without errors
2. Run `npm run build` – should compile successfully
3. Navigate to affected pages and verify UI still works as expected

---

## 📎 Notes

- If additional unused imports appear in future commits, consider enabling `noUnusedLocals` in `tsconfig.json`
- For stricter type safety, consider replacing `unknown` with specific interfaces where possible

---

## ✅ Checklist

- [x] ESLint errors resolved
- [x] Build passes on Vercel
- [x] No breaking changes introduced
