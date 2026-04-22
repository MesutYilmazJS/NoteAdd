# NoteAdd

NoteAdd, tarayıcı üzerinde çalışan basit ve şık bir not alma uygulamasıdır. Eklenen notlar tarayıcının `localStorage` alanında saklanır; bu sayede sayfa yenilense bile notlar kaybolmaz.

## Özellikler

- Yeni not ekleme
- Not içeriğini anlık güncelleme
- Not kartı rengini değiştirme
- Yazı rengini değiştirme
- Not silme
- Not sayısını gösteren basit durum alanı
- Mobil uyumlu, modern arayüz

## Kullanılan Teknolojiler

- HTML5
- CSS3
- Vanilla JavaScript
- `localStorage`

## Proje Yapısı

```text
NoteAdd/
├── index.html
├── style.css
├── style.js
└── README.md
```

## Nasıl Çalıştırılır?

Herhangi bir kurulum gerekmez.

1. Projeyi bilgisayarına indir veya kopyala.
2. `index.html` dosyasını tarayıcıda aç.
3. `+ Yeni Not` butonuna basarak not oluşturmaya başla.

Alternatif olarak bir canlı sunucu ile de açabilirsin:

```bash
open index.html
```

## Kullanım

- `+ Yeni Not` ile yeni kart oluşturulur.
- Kart içindeki metin alanına yazdıkça not otomatik kaydedilir.
- `Kart` alanındaki renk seçici ile arka plan rengi değiştirilir.
- `Yazı` alanındaki renk seçici ile metin rengi değiştirilir.
- `Sil` butonu ilgili notu kaldırır.

## Veri Saklama

Uygulama notları tarayıcıda `note-app` anahtarı ile `localStorage` içinde tutar. Aynı tarayıcı verileri temizlenirse notlar da silinir.

## Geliştirme Notları

- Projede herhangi bir framework veya paket yöneticisi kullanılmamıştır.
- Tüm davranışlar [style.js](/Users/mesut/Documents/GitHub/NoteAdd/style.js), tasarım ise [style.css](/Users/mesut/Documents/GitHub/NoteAdd/style.css) içinde yer alır.

## Ekran Görünümü

Uygulama; üstte karşılama alanı, altında not panosu ve her kart için renk/yazı/sil araçları içeren sade bir yapı sunar.

## Lisans

Bu proje kişisel kullanım ve geliştirme amaçlı hazırlanmıştır. İstersen bu bölüme daha sonra uygun bir lisans ekleyebilirsin.
