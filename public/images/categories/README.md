# صور الفئات - Category Images

## كيفية إضافة صور الفئات

### 1. تنسيق الصور
- **النوع**: JPG أو PNG
- **الحجم**: 200x200 بكسل (مربع)
- **الجودة**: عالية الوضوح

### 2. تسمية الملفات
يجب تسمية الصور بنفس أسماء معرفات الفئات في ملف `src/data/categories.js`:

```
public/images/categories/
├── history.jpg          # التاريخ
├── geography.jpg        # الجغرافيا
├── science.jpg          # العلوم
├── sports.jpg           # الرياضة
├── movies.jpg           # الأفلام
├── technology.jpg       # التكنولوجيا
├── literature.jpg       # الأدب
├── art.jpg             # الفن
├── music.jpg           # الموسيقى
├── food.jpg            # الطعام
├── animals.jpg         # الحيوانات
├── space.jpg           # الفضاء
├── politics.jpg        # السياسة
├── business.jpg        # الأعمال
├── fashion.jpg         # الأزياء
├── transportation.jpg  # النقل
├── nature.jpg          # الطبيعة
├── religion.jpg        # الدين
├── philosophy.jpg      # الفلسفة
├── medicine.jpg        # الطب
├── architecture.jpg    # العمارة
├── languages.jpg       # اللغات
├── mythology.jpg       # الأساطير
├── psychology.jpg      # علم النفس
├── chemistry.jpg       # الكيمياء
├── physics.jpg         # الفيزياء
├── archaeology.jpg     # علم الآثار
├── photography.jpg     # التصوير
├── dance.jpg           # الرقص
├── comics.jpg          # القصص المصورة
└── gaming.jpg          # الألعاب
```

### 3. أمثلة على الصور المطلوبة

| الفئة | اسم الملف | وصف الصورة |
|-------|-----------|------------|
| التاريخ | `history.jpg` | صورة أثرية أو شخصية تاريخية |
| الجغرافيا | `geography.jpg` | خريطة أو منظر طبيعي |
| العلوم | `science.jpg` | تجربة علمية أو مجهر |
| الرياضة | `sports.jpg` | كرة أو ملعب رياضي |
| الأفلام | `movies.jpg` | سينما أو كاميرا |
| التكنولوجيا | `technology.jpg` | كمبيوتر أو هاتف |
| الأدب | `literature.jpg` | كتاب أو قلم |
| الفن | `art.jpg` | لوحة فنية أو فرشاة |
| الموسيقى | `music.jpg` | آلة موسيقية |
| الطعام | `food.jpg` | طبق شهي |
| الحيوانات | `animals.jpg` | حيوان جميل |
| الفضاء | `space.jpg` | كوكب أو تلسكوب |
| السياسة | `politics.jpg` | مبنى حكومي |
| الأعمال | `business.jpg` | مكتب أو عمل |
| الأزياء | `fashion.jpg` | ملابس أو عارضة |
| النقل | `transportation.jpg` | سيارة أو طائرة |
| الطبيعة | `nature.jpg` | شجرة أو زهرة |
| الدين | `religion.jpg` | مكان عبادة |
| الفلسفة | `philosophy.jpg` | تمثال مفكر |
| الطب | `medicine.jpg` | مستشفى أو طبيب |
| العمارة | `architecture.jpg` | مبنى جميل |
| اللغات | `languages.jpg` | كتاب لغات |
| الأساطير | `mythology.jpg` | تمثال إله |
| علم النفس | `psychology.jpg` | دماغ أو عقل |
| الكيمياء | `chemistry.jpg` | أنابيب اختبار |
| الفيزياء | `physics.jpg` | ذرة أو طاقة |
| علم الآثار | `archaeology.jpg` | آثار قديمة |
| التصوير | `photography.jpg` | كاميرا |
| الرقص | `dance.jpg` | راقصة |
| القصص المصورة | `comics.jpg` | شخصية كرتونية |
| الألعاب | `gaming.jpg` | ألعاب فيديو |

### 4. ملاحظات مهمة
- إذا لم توجد صورة لفئة معينة، سيتم عرض صورة افتراضية رمادية
- تأكد من أن الصور واضحة ومناسبة للعرض
- حجم الملف يجب أن يكون أقل من 500KB لكل صورة 