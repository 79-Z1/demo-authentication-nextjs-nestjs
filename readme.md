### Run server backend
```sh
   npm run start:dev
```
### Run server frontend
```sh
   npm run dev
```

### Kiến thức học được
**Backend**
- sử dụng typeorm postresql để kết nối và xử lý với cơ sở dữ liệu 
- Sử dụng passport-jwt strategy để xác thực người dùng bằng jsonweb token
- Sử dụng guard, canactive để "custom" guard để tra về lỗi khi token hết hạn hoặc người dùng chưa đăng nhập...

**Frontend**
- Render giao diện bằng tsx
- Sử dụng axios để xử lý request trước khi gửi xuống server, lấy lại access token khi hết hạn

### Demo
**Register page**
![Alt text](image-1.png)

**Login page**
![Alt text](image.png)

**Home page**
![Alt text](image-2.png)

**Khi nhấn vào nút "Call API"**
![Alt text](image-3.png)

**Lấy lại access token khi hết hạn (1 phút)**
![Alt text](image-4.png)





