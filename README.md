# Warinchamrab QIC Ecosystem

เว็บศูนย์รวมระบบคุณภาพของโรงพยาบาลวารินชำราบ สร้างด้วย React, Vite และ Tailwind CSS

## การรันในเครื่อง

```powershell
npm install
npm run dev
```

## การ build

```powershell
npm run build
```

## การ deploy ขึ้น GitHub Pages

โปรเจกต์นี้มี workflow ที่ `.github/workflows/deploy.yml` แล้ว

หลัง push เข้า branch `main` ให้เปิด GitHub Pages:

1. เข้า repository `warinchamrab-qic-ecosystem`
2. ไปที่ `Settings`
3. ไปที่ `Pages`
4. เลือก Source เป็น `GitHub Actions`

เว็บจะถูกเผยแพร่ที่:

`https://sathapornmanee.github.io/warinchamrab-qic-ecosystem/`
