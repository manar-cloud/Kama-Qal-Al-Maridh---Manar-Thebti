# موقع «كما قال المريض» — Full Stack

## التقنيات
- HTML5
- CSS3
- Vanilla JavaScript
- Node.js + Express

## التشغيل على الكمبيوتر

1. ثبّت Node.js.
2. افتح Terminal داخل مجلد المشروع.
3. نفّذ:
   npm install
4. ثم:
   npm start
5. افتح:
   http://localhost:3000

للتطوير:
npm run dev

## Backend
السيرفر يوفر:
- POST /api/visit — تسجيل زيارة
- POST /api/download — تسجيل تحميل
- GET /api/stats — إحصائيات الزيارات والتحميلات
- POST /api/contact — استقبال رسائل نموذج التواصل

البيانات البسيطة محفوظة في data/stats.json و data/messages.json.

## قبل النشر
- غيّري روابط Instagram وTikTok في public/index.html إلى روابطك الحقيقية.
- إذا أردتِ استقبال الرسائل على بريدك بدل حفظها محليًا، اربطي نموذج التواصل بخدمة بريد أو قاعدة بيانات.
- للـproduction يفضّل استخدام قاعدة بيانات وHTTPS.

الكتاب الحقيقي موجود في:
public/book.pdf
والغلاف مستخرج من الصفحة الأولى:
public/cover.jpg
