# Step 1: Build React App
FROM node:18 AS builder

WORKDIR /app

# 프로젝트 파일 복사
COPY . .

# 패키지 설치 및 빌드
RUN npm install
RUN npm run build && ls -alh /app/dist

# Step 2: Serve with Nginx
FROM nginx:alpine

# 빌드 결과물 복사
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx 설정 덮어쓰기
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]