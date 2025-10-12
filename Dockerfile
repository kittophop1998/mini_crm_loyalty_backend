# ใช้ Node.js LTS เป็น base image
FROM node:20-alpine

# ตั้ง working directory
WORKDIR /app

# คัดลอก package.json และ lock file
COPY package.json package-lock.json ./

# ติดตั้ง dependencies
RUN npm ci --production

# คัดลอก source code ทั้งหมด
COPY . .

# สร้าง Prisma client
RUN npx prisma generate

# เปิด port แอป
EXPOSE 3000

# คำสั่ง run แอป
CMD ["node", "dist/index.js"]
