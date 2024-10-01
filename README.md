# Dragon Tower

Dragon Tower, oyuncuların bir ızgarada yumurtaları bulup ejderhalardan kaçınarak ilerlediği heyecan verici bir oyundur. Oyun iki farklı mod sunar: Manual ve Auto.
[Bu Linkten](https://dragon-tower.vercel.app) oyunu test edebilirsiniz. Keyifli oyunlar.


## Oyun Kuralları

- Oyun ızgarası seçilen modlara göre satır ve sütunlardan oluşur.
- Izgaradaki her hücre rastgele dağıtılmış yumurta veya ejderha içerir.
- Oyun iki modda oynanabilir: Manual ve Auto.
  - **Manual Mod:** Oyuncular her satırda bir sütun seçerek yumurtaları bulur. Bulunan her yumurta oyuncunun kazancını artırır. Eğer ejderha bulunursa oyun sona erer ve oyuncu o ana kadar biriktirdiği parayı kazanır.
  - **Auto Mod:** Oyun sütunları otomatik olarak seçerek ilerler.

### Matrix
- Easy Mod : 4x9      | 2 yumurta , 2 ejderha
- Medium Mod : 3x9    | 2 yumurta , 1 ejderha
- Hard Mod : 2x9      | 1 yumurta , 1 ejderha
- Expert Mod : 3x9    | 1 yumurta , 2 ejderha
- Master Mod : 4x9    | 1 yumurta , 3 ejderha

### Çarpanlar

- **Easy Mod:**
  - Her adım çarpanı: 1.31x
  - Maksimum kazanç: 5x
- **Medium Mod:**
  - Her adım çarpanı: 1.47x
  - Maksimum kazanç: 20x
- **Hard Mod:**
  - Her adım çarpanı: 1.96x
  - Maksimum kazanç: 33x
- **Expert Mod:**
  - Her adım çarpanı: 2.94x
  - Maksimum kazanç: 45x
- **Master Mod:**
  - Her adım çarpanı: 3.92x
  - Maksimum kazanç: 99x

Oyuncu, ejderhaya rastlamadan tüm ızgarayı tamamlarsa, seçilen mod için maksimum kazancı elde eder.

## Özellikler

- **Manual Mod:** Oyuncuların stratejik kararlar alarak yumurtaları bulması ve ejderhalardan kaçınması.
- **Auto Mod:** Oyunun oyuncu adına seçimler yaparak ilerlemesi.
- **Responsive Tasarım:** Farklı cihazlarda sorunsuz oyun deneyimi sağlayan responsive tasarım.

## Kullanılan Teknolojiler

- **ReactJS:** Dinamik kullanıcı arayüzünü oluşturmak için.
- **NextUI:** Güzel ve özelleştirilebilir bileşenler oluşturmak için.
- **Tailwind CSS:** Verimli ve responsive stil oluşturmak için.
- **React Hooks:** Oyundaki durumu ve yan etkileri yönetmek için.
