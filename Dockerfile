# Base image
FROM node:20-alpine

WORKDIR /app

# ติดตั้ง dependencies
COPY package.json package-lock.json ./
RUN npm ci

# คัดลอก source code ทั้งหมด
COPY . .

# สร้าง Prisma Client
RUN npx prisma generate

# Build TypeScript เป็น JavaScript
RUN npm run build

EXPOSE 3000

# Run app พร้อม deploy Prisma migration
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/app/index.js"]
