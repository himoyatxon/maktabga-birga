// ================= MAKTABGA BIRGA — ASOSIY ILOVA KODI =================

// Audio Synthesizer (Web Audio API - toza tovush effektlari)
const audioFX = {
  ctx: null,
  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  },
  playTone(freq, type = 'sine', duration = 0.15) {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch(e) {}
  },
  success() {},
  wrong() {},
  jump() {},
  mascotChirp() {}
};

// ================= OVOZ TIZIMI: FAQAT LUG'ATDA OVOZ CHIQADI =================
// Quyonchaning barcha ovozlari to'liq o'chirildi. Umuman gapirmaydi va ovozi chiqmaydi.
function stopMascotVoice() {
  if ('speechSynthesis' in window) {
    try { window.speechSynthesis.cancel(); } catch(e) {}
  }
}

function speakMascot(text, audioKey) {
  // Foydalanuvchi talabiga ko'ra quyoncha ovozi butunlay o'chirildi
  return;
}

function speakTugMascot() { return; }
function speakCurrentTugQuestion() { return; }
function speakJumanjiMascot() { return; }
function speakCurrentJumanjiQuestion() { return; }

// State Management
const state = {
  theme: localStorage.getItem('theme') || 'light',
  currentView: 'tasks',
  currentDay: 'dushanba',
  currentLang: 'en',
  dictionaryMode: 'cards',
  activeGame: 'tug',
  
  // Ota-ona ma'lumotlari
  parent: {
    name: 'Nilufar Rahimova',
    phone: '+998 90 123 45 67',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=80'
  },

  // Farzandlar: Asosiy 1-sinf (Bilolbek) va 2-sinf (Madinaxon)
  activeChildId: 1,
  children: [
    {
      id: 1,
      name: 'Bilolbek',
      fullName: 'Bilolbek Rahimova',
      grade: '1-A sinf',
      gradeKey: '1-sinf',
      avatar: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=120&auto=format&fit=crop&q=80',
      points: 380,
      stars: 38,
      archive: [
        { grade: '1-sinf', points: 380, status: 'Hozirda o\'qimoqda' }
      ]
    },
    {
      id: 2,
      name: 'Madinaxon',
      fullName: 'Madinaxon Rahimova',
      grade: '2-B sinf',
      gradeKey: '2-sinf',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
      points: 520,
      stars: 52,
      archive: [
        { grade: '1-sinf', points: 1350, status: 'A\'lo bilan yakunlagan' },
        { grade: '2-sinf', points: 520, status: 'Hozirda o\'qimoqda' }
      ]
    }
  ],

  teachers: {
    '1-sinf': {
      fullName: 'Malika Qodirova',
      shortName: 'Malika opa',
      avatar: 'https://images.unsplash.com/photo-1580894732488-cbfe69a19491?w=120&auto=format&fit=crop&q=80',
      note: '1-sinfda bolaning harflar va sonlarga qiziqishi eng muhim omildir. Har kuni birgalikda o\'qish ajoyib odat shakllantiradi.'
    },
    '2-sinf': {
      fullName: 'Ziyoda Rahimova',
      shortName: 'Ziyoda opa',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
      note: 'Har kuni vazifalarni ota-ona bilan birga bajargan o\'quvchiga qo\'shimcha rag\'batlantiruvchi yulduzcha va sinf reytingida yuqori o\'rin beriladi.'
    }
  },

  // SINF DARSLIKLARI VAZIFALARI
  curriculums: {
    '1-sinf': {
      dushanba: [
        {
          id: 'task-1-1',
          subject: 'Alifbe & Ona tili',
          title: 'A va O tovushlari va harflari',
          badge: 'Ota-ona bilan o\'qish',
          points: 30,
          completed: false,
          desc: 'Darslikdagi rasmlarga qarab, A va O tovushidan boshlanadigan so\'zlarni toping va ovoz chiqarib ayting.',
          interactiveType: 'quiz',
          quiz: {
            question: 'Qaysi meva nomi "A" harfidan boshlanadi?',
            options: ['Anor', 'Nok', 'Gilos', 'Behi'],
            correct: 0
          }
        },
        {
          id: 'task-1-2',
          subject: 'Matematika',
          title: '1 dan 10 gacha sanash mashqi',
          badge: 'Sanash o\'yini',
          points: 35,
          completed: false,
          desc: 'Uy ichidagi o\'yinchoqlar yoki qalamlarni birgalikda sanab chiqing.',
          interactiveType: 'quiz',
          quiz: {
            question: 'Bilolbekda 3 ta rangli qalam bor edi, onasi yana 2 ta qalam berdi. Jami nechta bo\'ldi?',
            options: ['4 ta', '5 ta', '6 ta', '3 ta'],
            correct: 1
          }
        },
        {
          id: 'task-1-3',
          subject: 'Tabiiy fanlar',
          title: 'Mening kun tartibim va gigiyena',
          badge: 'Odob va tartib',
          points: 25,
          completed: false,
          desc: 'Ertalabki badantarbiya, tish yuvish va maktab sumkasini yig\'ish haqida 2 daqiqa suhbatlashing.',
          interactiveType: 'check'
        }
      ],
      seshanba: [
        {
          id: 'task-1-4',
          subject: 'Alifbe & O\'qish',
          title: 'Bo\'g\'inlab o\'qish: MA - BA - TA',
          badge: 'Ovozli mashq',
          points: 30,
          completed: false,
          desc: 'Oddiy bo\'g\'inlarni birgalikda qo\'shib so\'z hosil qilish: O-NA, NO-N, BO-LA.',
          interactiveType: 'check'
        },
        {
          id: 'task-1-5',
          subject: 'Matematika',
          title: 'Katta va kichik: taqqoslash',
          badge: 'Mantiqiy topshiriq',
          points: 35,
          completed: false,
          desc: 'Narsalarning sonini solishtiring va ko\'p-kam tushunchasini mustahkamlang.',
          interactiveType: 'quiz',
          quiz: {
            question: '5 ta olma 3 ta olmadan ko\'pmi yoki kammi?',
            options: ['Ko\'p', 'Kam', 'Teng'],
            correct: 0
          }
        }
      ],
      chorshanba: [
        {
          id: 'task-1-6',
          subject: 'Ona tili',
          title: 'Nuqta belgisi va gap tuzish',
          badge: 'Yozuv mashqi',
          points: 30,
          completed: false,
          desc: 'Har bir gap oxiriga nuqta qo\'yilishini eslatib, rasm asosida bitta gap tuzing.',
          interactiveType: 'check'
        }
      ],
      payshanba: [
        {
          id: 'task-1-7',
          subject: 'Matematika',
          title: 'Qo\'shish amali (+ belgisi)',
          badge: 'Amaliy hisoblash',
          points: 35,
          completed: false,
          desc: 'Qo\'shish amalini mevalar yoki barmoqlarda bajarish: 4 + 1 = 5.',
          interactiveType: 'quiz',
          quiz: {
            question: '4 + 1 nechaga teng?',
            options: ['4', '5', '6'],
            correct: 1
          }
        }
      ],
      juma: [
        {
          id: 'task-1-8',
          subject: 'Hafta xulosasi',
          title: '1-sinf bilimdonlari viktorinasi',
          badge: 'Haftalik yakun',
          points: 40,
          completed: false,
          desc: 'Hafta davomida o\'tilgan harflarni takrorlash va ota-onaga ifodali o\'qib berish.',
          interactiveType: 'check'
        }
      ]
    },
    '2-sinf': {
      dushanba: [
        {
          id: 'task-2-1',
          subject: 'Alifbo & Ona tili',
          title: 'Unli va undosh tovushlar',
          badge: 'Ota-ona bilan birga',
          points: 30,
          completed: false,
          desc: 'Kitobdagi 3 ta so\'zdan unli tovushlarni ajratib ovoz chiqarib ayting.',
          interactiveType: 'quiz',
          quiz: {
            question: 'Qaysi so\'zdagi barcha unlilar to\'g\'ri ko\'rsatilgan: "MAKTAB"?',
            options: ['A, A', 'M, K, T, B', 'O, U'],
            correct: 0
          }
        },
        {
          id: 'task-2-2',
          subject: 'Matematika',
          title: '20 ichida qo\'shish va ayirish',
          badge: 'O\'yin bilan hisoblash',
          points: 40,
          completed: false,
          desc: 'O\'nlikdan o\'tib qo\'shish va ayirish: 9 + 6 = 15.',
          interactiveType: 'quiz',
          quiz: {
            question: 'Madinaxonda 9 ta olma bor edi, onasi yana 6 ta olma berdi. Jami nechta bo\'ldi?',
            options: ['14 ta', '15 ta', '16 ta'],
            correct: 1
          }
        }
      ],
      seshanba: [
        {
          id: 'task-2-3',
          subject: 'Matematika',
          title: 'Geometrik shakllarni aniqlash',
          badge: 'Mantiqiy topshiriq',
          points: 35,
          completed: false,
          desc: 'Uchburchak, kvadrat va to\'rtburchak shakllarini toping.',
          interactiveType: 'quiz',
          quiz: {
            question: 'Uchta tomoni va uchta burchagi bor shakl qaysi?',
            options: ['Kvadrat', 'Doira', 'Uchburchak'],
            correct: 2
          }
        }
      ],
      chorshanba: [
        {
          id: 'task-2-4',
          subject: 'Ona tili',
          title: 'Harakat bildirgan so\'zlar (Fe\'llar)',
          badge: 'Qiziqarli o\'yin',
          points: 30,
          completed: false,
          desc: 'Harakat bildirgan so\'zlarni topish mashqi.',
          interactiveType: 'check'
        }
      ],
      payshanba: [
        {
          id: 'task-2-5',
          subject: 'Matematika',
          title: 'Taqqoslash: Katta va kichik (> , < , =)',
          badge: 'Misollar',
          points: 40,
          completed: false,
          desc: '18 ... 15 qaysi belgi qo\'yiladi?',
          interactiveType: 'quiz',
          quiz: {
            question: '18 ... 15 qaysi belgi qo\'yiladi?',
            options: ['<', '>', '='],
            correct: 1
          }
        }
      ],
      juma: [
        {
          id: 'task-2-6',
          subject: 'Hafta xulosasi',
          title: '2-sinf hafta xulosasi va odob saboqlari',
          badge: 'Yakun',
          points: 50,
          completed: false,
          desc: 'Haftalik takrorlash va oilaviy suhbat.',
          interactiveType: 'check'
        }
      ]
    }
  },

  classLeaderboards: {
    '1-sinf': [
      { rank: 1, name: 'Samirbek K.', parent: 'Shahnoza opa', points: 410, stars: 41, isCurrentUser: false, avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=120&auto=format&fit=crop&q=80' },
      { rank: 2, name: 'Bilolbek (Siz)', parent: 'Nilufar Rahimova', points: 380, stars: 38, isCurrentUser: true, avatar: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=120&auto=format&fit=crop&q=80' },
      { rank: 3, name: 'Ominaxon N.', parent: 'Saida opa', points: 360, stars: 36, isCurrentUser: false, avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80' },
      { rank: 4, name: 'Jasur S.', parent: 'Farhod aka', points: 330, stars: 33, isCurrentUser: false, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80' }
    ],
    '2-sinf': [
      { rank: 1, name: 'Zarina B.', parent: 'Shahnoza opa', points: 560, stars: 56, isCurrentUser: false, avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80' },
      { rank: 2, name: 'Madinaxon (Siz)', parent: 'Nilufar Rahimova', points: 520, stars: 52, isCurrentUser: true, avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80' },
      { rank: 3, name: 'Temur O.', parent: 'Bahodir aka', points: 470, stars: 47, isCurrentUser: false, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80' }
    ]
  },

  // ================= ARQON TORTISH: BOLA VS OTA-ONA (10 TA TO'LIQ SAVOL) =================
  tugGame: {
    ropePosition: 50, // 50% = o'rtada. Chapga (<50%) = Bola tomonga, O'ngga (>50%) = Ona tomonga
    currentRound: 1,
    maxRounds: 10, // Aynan 10 ta to'liq savol!
    scoreChild: 0,
    scoreParent: 0,
    mascotMessage: "Salom! Men Zukko Quyonchaman 🐰. Bu o'yinda Bilolbek va Onasi bellashadi! Bola to'g'ri topsa arqon bola tomoniga tortiladi, xato qilsa ona tomoniga! Qani, 10 ta savolli bahsni boshladik!",
    questions: {
      '1-sinf': [
        { q: '1. Alifbe: "A" harfi qanday tovush hisoblanadi?', a: ['Unli tovush', 'Undosh tovush', 'Harf emas'], correct: 0 },
        { q: '2. Matematika: 3 + 2 nechaga teng?', a: ['4', '5', '6'], correct: 1 },
        { q: '3. Tabiat: Qaysi faslda daraxt barglari sarg\'ayadi va to\'kiladi?', a: ['Bahor', 'Yoz', 'Kuz'], correct: 2 },
        { q: '4. Alifbe: "NON" so\'zida jami nechta harf bor?', a: ['2 ta', '3 ta', '4 ta'], correct: 1 },
        { q: '5. Matematika: 6 dan 2 ni ayirsak necha qoladi?', a: ['4', '3', '5'], correct: 0 },
        { q: '6. Odob-axloq: Kattalarni ko\'rganda nima deb salom beramiz?', a: ['Assalomu alaykum', 'Hayr', 'Salom do\'stim'], correct: 0 },
        { q: '7. Mantiq: Qaysi hayvon sichqon ovlaydi va "miyov" deydi?', a: ['Mushuk', 'Quyon', 'Sigir'], correct: 0 },
        { q: '8. Alifbe: "OLMA" so\'zining birinchi harfi qaysi?', a: ['O harfi', 'L harfi', 'M harfi'], correct: 0 },
        { q: '9. Matematika: 4 + 4 yig\'indisi nechaga teng?', a: ['7', '8', '9'], correct: 1 },
        { q: '10. Tabiat: Bir haftada nechta kun bor?', a: ['5 ta', '7 ta', '10 ta'], correct: 1 }
      ],
      '2-sinf': [
        { q: '1. Ona tili: "B" tovushi qanday tovush?', a: ['Undosh tovush', 'Unli tovush', 'Hech biri'], correct: 0 },
        { q: '2. Matematika: 7 + 8 necha bo\'ladi?', a: ['14', '15', '16'], correct: 1 },
        { q: '3. Tabiat: Bir yilda nechta fasl bor?', a: ['3 ta', '4 ta', '5 ta'], correct: 1 },
        { q: '4. Matematika: 2 × 5 ko\'paytmasi necha?', a: ['8', '10', '12'], correct: 1 },
        { q: '5. Ona tili: "Yugurdi" so\'zi nimani bildiradi?', a: ['Harakat (Fe\'l)', 'Shaxs', 'Rang'], correct: 0 },
        { q: '6. Geometriya: 3 ta tomoni va 3 ta burchagi bor shakl?', a: ['Kvadrat', 'Uchburchak', 'Doira'], correct: 1 },
        { q: '7. Matematika: 18 - 9 ayirmasi nechaga teng?', a: ['8', '9', '10'], correct: 1 },
        { q: '8. Ona tili: Qaysi so\'z bosh harf bilan yoziladi?', a: ['Toshkent', 'kitob', 'qalam'], correct: 0 },
        { q: '9. Tabiat: Qaysi hayvon qishda uyquga ketadi?', a: ['Ayiq', 'Bo\'ri', 'Quyon'], correct: 0 },
        { q: '10. Matematika: Eng katta bir xonali son qaysi?', a: ['8', '9', '10'], correct: 1 }
      ]
    }
  },

  // ================= JUMANJI: 14 TA CHALKASH O'RMON YO'LI KATAKLARI =================
  jumanjiGame: {
    playerPos: 0,
    maxPos: 13, // 0..13 jami 14 ta katak
    isRolling: false,
    mascotMessage: "Jumanji sirli o'rmoniga xush kelibsiz! 🐰 Zarni tashlang va yo'ldagi savolga to'g'ri javob bering. To'g'ri topsangiz o'rmon yo'lida oldinga yurasiz, xato qilsangiz 1 katak orqaga qaytasiz!",
    tiles: [
      { id: 0, name: "Start Darvozasi", icon: "🏁", type: "start", desc: "Sarguzasht boshlanishi" },
      { id: 1, name: "Qalin Bambukzor", icon: "🎋", type: "quiz", desc: "1-sinf Alifbe savoli" },
      { id: 2, name: "To'tiqushlar Daraxti", icon: "🦜", type: "quiz", desc: "Bo'g'inlar savoli" },
      { id: 3, name: "Sehrli Daryo Oqimi", icon: "🌊", type: "quiz", desc: "Matematika sanash" },
      { id: 4, name: "Qadimiy Tosh Haykal", icon: "🗿", type: "quiz", desc: "Tabiat sirlari" },
      { id: 5, name: "Liana Chakalakzori", icon: "🌿", type: "quiz", desc: "Mantiqiy topishmoq" },
      { id: 6, name: "Maymunlar Soqmog'i", icon: "🐒", type: "quiz", desc: "Tezkor hisoblash" },
      { id: 7, name: "Zaharli Gulzor", icon: "🌺", type: "quiz", desc: "Odob-axloq savoli" },
      { id: 8, name: "Sirli Sharshara", icon: "🏞️", type: "quiz", desc: "Tovushlar farqi" },
      { id: 9, name: "Yiqilgan Gigant Daraxt", icon: "🪵", type: "quiz", desc: "Matematika amali" },
      { id: 10, name: "Ko'rshapalaklar G'ori", icon: "🦇", type: "quiz", desc: "Zukkolik savoli" },
      { id: 11, name: "Yo'lbars Izlari", icon: "🐅", type: "quiz", desc: "Diqqat sinovi" },
      { id: 12, name: "Sehrli Qal'a Pillapoyasi", icon: "🏰", type: "quiz", desc: "Yakuniy dovon" },
      { id: 13, name: "Jumanji Xazinasi", icon: "💎", type: "finish", desc: "G'alaba marrasi!" }
    ],
    questions: {
      '1-sinf': [
        { q: '🎋 Bambukzor: "MAKTAB" so\'zining birinchi harfi qaysi?', a: ['M harfi', 'A harfi', 'K harfi'], correct: 0 },
        { q: '🦜 To\'tiqushlar: Qaysi so\'z "O" harfidan boshlanadi?', a: ['Olma', 'Kitob', 'Daftar'], correct: 0 },
        { q: '🌊 Daryo oqimi: 4 ta baliq suzib yurgan edi, 2 tasi sho\'ng\'idi. Nechta qoldi?', a: ['1 ta', '2 ta', '3 ta'], correct: 1 },
        { q: '🗿 Tosh haykal: Quyosh qaysi rangda bo\'ladi?', a: ['Qizil', 'Sariq', 'Yashil'], correct: 1 },
        { q: '🌿 Liana qopqoni: 2 + 3 nechaga teng?', a: ['4', '5', '6'], correct: 1 },
        { q: '🐒 Maymunlar: Bir qo\'lda nechta barmoq bor?', a: ['4 ta', '5 ta', '6 ta'], correct: 1 },
        { q: '🌺 Gulzor: Kattalarga qanday muomala qilinadi?', a: ['Hurmat bilan', 'Javob bermay', 'Qichqirib'], correct: 0 },
        { q: '🏞️ Sharshara: "BOLA" so\'zida nechta bo\'g\'in bor?', a: ['1 ta (Bo-la)', '2 ta (Bo-la)', '3 ta'], correct: 1 },
        { q: '🪵 Gigant daraxt: 5 dan 1 ni ayirsak necha bo\'ladi?', a: ['4', '3', '5'], correct: 0 },
        { q: '🦇 G\'or yo\'li: Tunda osmonda nima ko\'rinadi?', a: ['Quyosh', 'Oy va yulduzlar', 'Kamalak'], correct: 1 },
        { q: '🐅 Yo\'lbars maydoni: 1 dan keyin qaysi son keladi?', a: ['2 soni', '3 soni', '0 soni'], correct: 0 },
        { q: '🏰 Qal\'a darvozasi: "A" harfidan keyin alifboda qaysi harf keladi?', a: ['B harfi', 'D harfi', 'O harfi'], correct: 0 },
        { q: '💎 Xazina kaliti: 1-sinf o\'quvchisi qanday bo\'lishi kerak?', a: ['A\'lochi va odobli', 'Dangasa', 'Uyquchi'], correct: 0 }
      ],
      '2-sinf': [
        { q: '🎋 Bambukzor: "Kitob" so\'zida nechta unli tovush bor?', a: ['1 ta', '2 ta', '3 ta'], correct: 1 },
        { q: '🦜 To\'tiqushlar: 14 - 6 ayirmasi necha bo\'ladi?', a: ['7', '8', '9'], correct: 1 },
        { q: '🌊 Daryo: 2 × 4 ko\'paytmasi nechaga teng?', a: ['6', '8', '10'], correct: 1 },
        { q: '🗿 Haykal: To\'rtta tomoni teng bo\'lgan shakl?', a: ['Kvadrat', 'Doira', 'Uchburchak'], correct: 0 },
        { q: '🌿 Liana: "Yugurdi" so\'zi qaysi so\'roqqa javob bo\'ladi?', a: ['Nima qildi?', 'Kim?', 'Qanday?'], correct: 0 },
        { q: '🐒 Maymunlar: 15 + 5 necha bo\'ladi?', a: ['18', '20', '22'], correct: 1 },
        { q: '🌺 Gulzor: Bir metrda necha santimetr bor?', a: ['10 sm', '100 sm', '50 sm'], correct: 1 },
        { q: '🏞️ Sharshara: Qaysi hayvon qishda uyquga ketadi?', a: ['Ayiq', 'Bo\'ri', 'Quyon'], correct: 0 },
        { q: '🪵 Daraxt: 3 × 3 ko\'paytmasi necha?', a: ['6', '9', '12'], correct: 1 },
        { q: '🦇 G\'or: "Toshkent" qanday harf bilan yoziladi?', a: ['Bosh harf bilan', 'Kichik harf bilan'], correct: 0 },
        { q: '🐅 Yo\'lbars: 20 ichidagi eng katta juft son qaysi?', a: ['18', '20', '19'], correct: 1 },
        { q: '🏰 Qal\'a: 1 haftada nechta kun bor?', a: ['5 kun', '7 kun', '10 kun'], correct: 1 },
        { q: '💎 Xazina kaliti: Ota-onani hurmat qilish nima?', a: ['Burch va odob', 'Ixtiyoriy ish'], correct: 0 }
      ]
    }
  },

  // LUG'ATLAR
  vocabularies: {
    en: [
      { word: 'School', translation: 'Maktab', transcription: '[skuːl]', emoji: '🏫' },
      { word: 'Book', translation: 'Kitob', transcription: '[bʊk]', emoji: '📚' },
      { word: 'Family', translation: 'Oila', transcription: '[ˈfæm.əl.i]', emoji: '👨‍👩‍👧‍👦' },
      { word: 'Mother', translation: 'Ona', transcription: '[ˈmʌð.ər]', emoji: '👩' },
      { word: 'Father', translation: 'Ota', transcription: '[ˈfɑː.ðər]', emoji: '👨' },
      { word: 'Pencil', translation: 'Qalam', transcription: '[ˈpen.səl]', emoji: '✏️' },
      { word: 'Friend', translation: 'Do\'st', transcription: '[frend]', emoji: '🤝' },
      { word: 'Sun', translation: 'Quyosh', transcription: '[sʌn]', emoji: '☀️' },
      { word: 'Apple', translation: 'Olma', transcription: '[ˈæp.əl]', emoji: '🍎' },
      { word: 'Cat', translation: 'Mushuk', transcription: '[kæt]', emoji: '🐱' },
      { word: 'Dog', translation: 'Kuchuk', transcription: '[dɒɡ]', emoji: '🐶' },
      { word: 'Teacher', translation: 'O\'qituvchi', transcription: '[ˈtiː.tʃər]', emoji: '👩‍🏫' },
      { word: 'Desk', translation: 'Parta', transcription: '[desk]', emoji: '🪑' },
      { word: 'Water', translation: 'Suv', transcription: '[ˈwɔː.tər]', emoji: '💧' },
      { word: 'Star', translation: 'Yulduz', transcription: '[stɑːr]', emoji: '⭐' }
    ],
    ru: [
      { word: 'Школа', translation: 'Maktab', transcription: '[shko-la]', emoji: '🏫' },
      { word: 'Книга', translation: 'Kitob', transcription: '[kni-ga]', emoji: '📚' },
      { word: 'Семья', translation: 'Oila', transcription: '[sem-ya]', emoji: '👨‍👩‍👧‍👦' },
      { word: 'Мама', translation: 'Ona', transcription: '[ma-ma]', emoji: '👩' },
      { word: 'Папа', translation: 'Ota', transcription: '[pa-pa]', emoji: '👨' },
      { word: 'Карандаш', translation: 'Qalam', transcription: '[ka-ran-dash]', emoji: '✏️' },
      { word: 'Друг', translation: 'Do\'st', transcription: '[droog]', emoji: '🤝' },
      { word: 'Солнце', translation: 'Quyosh', transcription: '[sont-se]', emoji: '☀️' },
      { word: 'Яблоко', translation: 'Olma', transcription: '[yab-la-ka]', emoji: '🍎' },
      { word: 'Кошка', translation: 'Mushuk', transcription: '[kosh-ka]', emoji: '🐱' },
      { word: 'Собака', translation: 'Kuchuk', transcription: '[sa-ba-ka]', emoji: '🐶' },
      { word: 'Учитель', translation: 'O\'qituvchi', transcription: '[u-chi-tel]', emoji: '👩‍🏫' },
      { word: 'Парта', translation: 'Parta', transcription: '[par-ta]', emoji: '🪑' },
      { word: 'Вода', translation: 'Suv', transcription: '[va-da]', emoji: '💧' },
      { word: 'Звезда', translation: 'Yulduz', transcription: '[zvez-da]', emoji: '⭐' }
    ],
    fr: [
      { word: 'École', translation: 'Maktab', transcription: '[e-kol]', emoji: '🏫' },
      { word: 'Livre', translation: 'Kitob', transcription: '[leevr]', emoji: '📚' },
      { word: 'Famille', translation: 'Oila', transcription: '[fa-mee-y]', emoji: '👨‍👩‍👧‍👦' },
      { word: 'Maman', translation: 'Ona', transcription: '[ma-man]', emoji: '👩' },
      { word: 'Papa', translation: 'Ota', transcription: '[pa-pa]', emoji: '👨' },
      { word: 'Crayon', translation: 'Qalam', transcription: '[kre-yon]', emoji: '✏️' },
      { word: 'Ami', translation: 'Do\'st', transcription: '[a-mee]', emoji: '🤝' },
      { word: 'Soleil', translation: 'Quyosh', transcription: '[so-ley]', emoji: '☀️' },
      { word: 'Pomme', translation: 'Olma', transcription: '[pom]', emoji: '🍎' },
      { word: 'Chat', translation: 'Mushuk', transcription: '[sha]', emoji: '🐱' },
      { word: 'Chien', translation: 'Kuchuk', transcription: '[shyen]', emoji: '🐶' },
      { word: 'Professeur', translation: 'O\'qituvchi', transcription: '[pro-fe-ser]', emoji: '👩‍🏫' },
      { word: 'Table', translation: 'Parta / Stol', transcription: '[tabl]', emoji: '🪑' },
      { word: 'Eau', translation: 'Suv', transcription: '[o]', emoji: '💧' },
      { word: 'Étoile', translation: 'Yulduz', transcription: '[e-twal]', emoji: '⭐' }
    ]
  },

  vocabQuiz: {
    currentIndex: 0,
    score: 0
  },

  books: [
    {
      id: 1,
      title: '1-Sinf o\'quvchisining psixologiyasi',
      author: 'Nilufar Rahimova tavsiyasi',
      category: 'parents',
      pages: '95 bet',
      cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=240&auto=format&fit=crop&q=80',
      progress: 70,
      desc: 'Maktabga ilk qadam qo\'ygan bolaga qanday yordam berish va uni ruhlantirish.'
    },
    {
      id: 2,
      title: 'Farzand tarbiyasida 7 oltin qoida',
      author: 'Adele Faber',
      category: 'parents',
      pages: '120 bet',
      cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=240&auto=format&fit=crop&q=80',
      progress: 45,
      desc: 'Ota-onalar uchun ijobiy muloqot va bolani tushunish usullari.'
    },
    {
      id: 3,
      title: 'Sehrli Alifbo va Aqlli quyoncha',
      author: '1-sinf ertaklari',
      category: 'children',
      pages: '28 bet',
      cover: 'https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?w=240&auto=format&fit=crop&q=80',
      progress: 100,
      desc: 'Harflarni o\'rganuvchi bolajonlar uchun rasmli qiziqarli ertak.'
    },
    {
      id: 4,
      title: 'Kichkintoy donishmand sarguzashtlari',
      author: 'Bolalar hikoyalari',
      category: 'children',
      pages: '36 bet',
      cover: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=240&auto=format&fit=crop&q=80',
      progress: 30,
      desc: 'Sanash va tabiatni sevishga o\'rgatuvchi ibratli hikoya.'
    }
  ]
};

// ================= DOM ELEMENT REFERENCES =================
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIcon = document.getElementById('themeIcon');
const openDrawerBtn = document.getElementById('openDrawerBtn');
const closeDrawerBtn = document.getElementById('closeDrawerBtn');
const drawerOverlay = document.getElementById('drawerOverlay');
const sideDrawer = document.getElementById('sideDrawer');

// ================= INITIALIZATION =================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  updateActiveChildDisplay();
  renderDrawerChildren();
  renderDictionaryView();
  renderBooks('all');

  initTugOfWarGame();

  lucide.createIcons();
});

// ================= THEME CONTROLLER =================
function initTheme() {
  if (state.theme === 'dark') {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
    themeIcon.setAttribute('data-lucide', 'sun');
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    themeIcon.setAttribute('data-lucide', 'moon');
  }
  lucide.createIcons();
}

function toggleTheme() {
  if (document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    state.theme = 'light';
    themeIcon.setAttribute('data-lucide', 'moon');
  } else {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
    state.theme = 'dark';
    themeIcon.setAttribute('data-lucide', 'sun');
  }
  localStorage.setItem('theme', state.theme);
  lucide.createIcons();
  showToast(state.theme === 'dark' ? 'Tungi rejim yoqildi 🌙' : 'Kunduzgi pushti rejim yoqildi 🌸');
}

themeToggleBtn.addEventListener('click', toggleTheme);

// ================= TELEGRAM DRAWER CONTROLLER =================
function openDrawer() {
  sideDrawer.classList.add('open');
  drawerOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  sideDrawer.classList.remove('open');
  drawerOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

openDrawerBtn.addEventListener('click', openDrawer);
closeDrawerBtn.addEventListener('click', closeDrawer);
drawerOverlay.addEventListener('click', closeDrawer);

// ================= VIEW SWITCHER =================
function switchView(viewName) {
  state.currentView = viewName;
  document.querySelectorAll('.view-content').forEach(view => {
    view.classList.add('hidden');
    view.classList.remove('active');
  });

  const activeView = document.getElementById(`view-${viewName}`);
  if (activeView) {
    activeView.classList.remove('hidden');
    activeView.classList.add('active');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
  lucide.createIcons();
}

// ================= CHILD & GRADE DYNAMICS =================
function getActiveChild() {
  return state.children.find(c => c.id === state.activeChildId) || state.children[0];
}

function getGradeKey(grade) {
  if (grade.includes('1')) return '1-sinf';
  if (grade.includes('2')) return '2-sinf';
  return '1-sinf';
}

function updateActiveChildDisplay() {
  const child = getActiveChild();
  const gradeKey = getGradeKey(child.grade);
  const teacher = state.teachers[gradeKey] || state.teachers['1-sinf'];

  document.getElementById('activeChildShortName').textContent = `${child.name} (${child.grade})`;
  const badgeEl = document.getElementById('childGradeBadge');
  if (badgeEl) badgeEl.textContent = child.grade;

  document.getElementById('childWelcomeText').textContent = `${child.name} bilan bugungi vazifalar`;
  document.getElementById('currentPointsDisplay').textContent = child.points;
  document.getElementById('topBarPoints').textContent = child.points;

  const noteHeading = document.getElementById('teacherNoteHeading');
  if (noteHeading) noteHeading.textContent = `O'qituvchi eslatmasi (${teacher.shortName}):`;

  const chatSub = document.getElementById('teacherChatSubtitle');
  if (chatSub) chatSub.textContent = `${child.grade} rahbari: ${teacher.fullName}`;

  const ratingTitle = document.getElementById('ratingClassTitle');
  if (ratingTitle) ratingTitle.textContent = `${child.grade} Reytingi`;

  const classList = state.classLeaderboards[gradeKey] || [];
  const userEntry = classList.find(u => u.isCurrentUser);
  if (userEntry) {
    userEntry.name = `${child.name} (Siz)`;
    userEntry.avatar = child.avatar;
    userEntry.points = child.points;
  }

  renderTasks();
  renderRating();
  
  if (state.activeGame === 'tug') {
    initTugOfWarGame();
  } else {
    initJumanjiGame();
  }

  lucide.createIcons();
}

function renderDrawerChildren() {
  const container = document.getElementById('drawerChildList');
  container.innerHTML = state.children.map(child => {
    const isActive = child.id === state.activeChildId;
    return `
      <div onclick="selectChild(${child.id})" class="cursor-pointer p-2 rounded-xl flex items-center justify-between transition-all ${
        isActive 
          ? 'bg-white text-rose-600 font-extrabold shadow-sm' 
          : 'bg-white/10 hover:bg-white/20 text-white font-medium'
      }">
        <div class="flex items-center gap-2">
          <img src="${child.avatar}" class="w-7 h-7 rounded-lg object-cover ring-1 ${isActive ? 'ring-rose-400' : 'ring-white/40'}">
          <span class="text-xs">${child.name}</span>
          <span class="text-[10px] px-1.5 py-0.2 rounded-md ${isActive ? 'bg-rose-100 text-rose-700' : 'bg-white/20 text-white'}">${child.grade}</span>
        </div>
        <div class="flex items-center gap-1 text-[11px]">
          <span>${child.points}</span>
          <span>⭐️</span>
          ${isActive ? '<i data-lucide="check" class="w-3.5 h-3.5 ml-1 text-rose-600"></i>' : ''}
        </div>
      </div>
    `;
  }).join('');
  lucide.createIcons();
}

function selectChild(childId) {
  state.activeChildId = childId;
  updateActiveChildDisplay();
  renderDrawerChildren();
  closeDrawer();
  const child = getActiveChild();
  showToast(`${child.name} profiliga o'tildi (${child.grade})! 🌸`);
  if (state.currentView === 'games') {
    if (state.activeGame === 'tug') initTugOfWarGame();
    else initJumanjiGame();
  }
}

function openAddChildModal() {
  closeDrawer();
  document.getElementById('addChildModal').classList.remove('hidden');
  document.getElementById('addChildModal').classList.add('flex');
  lucide.createIcons();
}

function closeAddChildModal() {
  document.getElementById('addChildModal').classList.add('hidden');
  document.getElementById('addChildModal').classList.remove('flex');
}

function saveNewChild(e) {
  e.preventDefault();
  const name = document.getElementById('newChildName').value.trim();
  const grade = document.getElementById('newChildGrade').value;
  if (!name) return;

  const newId = Date.now();
  const newChild = {
    id: newId,
    name: name,
    fullName: `${name} Rahimova`,
    grade: grade,
    avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=120&auto=format&fit=crop&q=80',
    points: 100,
    stars: 10,
    archive: [{ grade: grade, points: 100, status: 'Boshlandi' }]
  };

  state.children.push(newChild);
  closeAddChildModal();
  selectChild(newId);
  showToast(`Yangi farzand "${name}" (${grade}) qo'shildi! 🎉`);
}

// ================= 5-DAY TASKS LOGIC =================
function selectDay(dayKey) {
  state.currentDay = dayKey;
  document.querySelectorAll('.day-tab').forEach(tab => {
    if (tab.dataset.day === dayKey) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });
  renderTasks();
}

function renderTasks() {
  const container = document.getElementById('tasksList');
  const child = getActiveChild();
  const gradeKey = getGradeKey(child.grade);
  const classCurriculum = state.curriculums[gradeKey] || state.curriculums['1-sinf'];
  const dayTasks = classCurriculum[state.currentDay] || [];

  if (dayTasks.length === 0) {
    container.innerHTML = `
      <div class="p-6 text-center text-gray-400 bg-white dark:bg-pastel-darkcard rounded-2xl">
        ${child.grade} uchun bu kunga vazifalar kiritilmagan.
      </div>
    `;
    return;
  }

  container.innerHTML = dayTasks.map(task => `
    <div class="task-card p-4 rounded-3xl bg-white dark:bg-pastel-darkcard border ${
      task.completed 
        ? 'border-emerald-300 dark:border-emerald-800/80 bg-emerald-50/20 dark:bg-emerald-950/20' 
        : 'border-brand-100 dark:border-pastel-darkborder hover:border-brand-300'
    } transition-all shadow-xs">
      
      <div class="flex items-start justify-between gap-2">
        <div class="flex-1">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-[11px] font-black uppercase text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 px-2 py-0.5 rounded-md">
              ${task.subject}
            </span>
            <span class="text-[10px] font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-pastel-darkborder px-1.5 py-0.5 rounded-md">
              ${task.badge}
            </span>
          </div>

          <h3 class="font-extrabold text-sm text-gray-900 dark:text-white leading-snug">
            ${task.title}
          </h3>

          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
            ${task.desc}
          </p>
        </div>

        <div class="text-right">
          <span class="inline-flex items-center gap-1 text-xs font-black text-amber-500 bg-amber-50 dark:bg-amber-950/50 px-2 py-1 rounded-xl border border-amber-200 dark:border-amber-900">
            <span>+${task.points}</span>
            <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400"></i>
          </span>
        </div>
      </div>

      <div class="mt-3 pt-3 border-t border-brand-50 dark:border-pastel-darkborder flex items-center justify-between">
        <span class="text-[11px] text-gray-400 font-semibold flex items-center gap-1">
          <i data-lucide="users" class="w-3.5 h-3.5 text-brand-400"></i>
          <span>Ota-ona + ${child.name}</span>
        </span>

        ${task.completed ? `
          <button class="px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-1.5 cursor-default">
            <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-500"></i>
            <span>Bajarildi</span>
          </button>
        ` : `
          <button onclick="openTaskInteractive('${task.id}')" class="px-3.5 py-1.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-black shadow-xs hover:scale-102 transition-all flex items-center gap-1.5">
            <i data-lucide="play" class="w-3.5 h-3.5 fill-current"></i>
            <span>Bajarish & Ball olish</span>
          </button>
        `}
      </div>
    </div>
  `).join('');

  lucide.createIcons();
}

function openTaskInteractive(taskId) {
  const child = getActiveChild();
  const gradeKey = getGradeKey(child.grade);
  const classCurriculum = state.curriculums[gradeKey] || state.curriculums['1-sinf'];
  const dayTasks = classCurriculum[state.currentDay] || [];
  const task = dayTasks.find(t => t.id === taskId);
  if (!task) return;

  const modal = document.getElementById('taskModal');
  const container = document.getElementById('taskModalContent');

  if (task.interactiveType === 'quiz' || task.interactiveType === 'math') {
    container.innerHTML = `
      <div class="text-center">
        <span class="px-2.5 py-1 rounded-full text-xs font-black bg-brand-100 dark:bg-brand-900/60 text-brand-600 dark:text-brand-300 uppercase">${task.subject}</span>
        <h3 class="text-base font-black text-gray-900 dark:text-white mt-2 mb-1">${task.title}</h3>
        <p class="text-xs text-gray-500 dark:text-gray-400 mb-4">Ota-ona va ${child.name} birgalikda to'g'ri javobni toping!</p>

        <div class="p-4 rounded-2xl bg-brand-50/60 dark:bg-pastel-darkborder/50 border border-brand-100 dark:border-pastel-darkborder text-sm font-extrabold text-gray-800 dark:text-white mb-4">
          ${task.quiz.question}
        </div>

        <div class="space-y-2 text-left">
          ${task.quiz.options.map((opt, idx) => `
            <button onclick="checkTaskAnswer('${task.id}', ${idx})" class="w-full p-3 rounded-2xl border border-brand-200 dark:border-pastel-darkborder hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-brand-950/40 text-xs font-bold text-gray-800 dark:text-gray-200 flex items-center justify-between transition-all">
              <span>${opt}</span>
              <i data-lucide="chevron-right" class="w-4 h-4 text-gray-400"></i>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  } else {
    container.innerHTML = `
      <div class="text-center">
        <div class="w-12 h-12 rounded-2xl bg-brand-100 dark:bg-brand-900/60 text-brand-600 dark:text-brand-300 flex items-center justify-center mx-auto mb-2">
          <i data-lucide="check-circle" class="w-6 h-6"></i>
        </div>
        <span class="px-2.5 py-1 rounded-full text-xs font-black bg-brand-100 dark:bg-brand-900/60 text-brand-600 dark:text-brand-300 uppercase">${task.subject}</span>
        <h3 class="text-base font-black text-gray-900 dark:text-white mt-2 mb-1">${task.title}</h3>
        <p class="text-xs text-gray-600 dark:text-gray-300 my-3 leading-relaxed">${task.desc}</p>
        
        <div class="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300 mb-4 font-bold">
          Topshiriq bajarilgach, quyidagi tugmani bosing va +${task.points} ball oling!
        </div>

        <button onclick="completeTask('${task.id}')" class="w-full py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-black text-xs shadow-md transition-all">
          ${child.name} bilan bajardik (+${task.points} Ball)
        </button>
      </div>
    `;
  }

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  lucide.createIcons();
}

function checkTaskAnswer(taskId, selectedIdx) {
  const child = getActiveChild();
  const gradeKey = getGradeKey(child.grade);
  const classCurriculum = state.curriculums[gradeKey] || state.curriculums['1-sinf'];
  const dayTasks = classCurriculum[state.currentDay] || [];
  const task = dayTasks.find(t => t.id === taskId);
  if (!task) return;

  if (selectedIdx === task.quiz.correct) {
    audioFX.success();
    completeTask(taskId);
  } else {
    audioFX.wrong();
    showToast('Noto\'g\'ri javob. Qayta urinib ko\'ring! 🤔', 'error');
  }
}

function completeTask(taskId) {
  const child = getActiveChild();
  const gradeKey = getGradeKey(child.grade);
  const classCurriculum = state.curriculums[gradeKey] || state.curriculums['1-sinf'];
  const dayTasks = classCurriculum[state.currentDay] || [];
  const task = dayTasks.find(t => t.id === taskId);
  if (!task || task.completed) return;

  task.completed = true;
  child.points += task.points;

  closeTaskModal();
  updateActiveChildDisplay();

  triggerConfetti();
  showToast(`Ajoyib! "${task.title}" bajarildi. +${task.points} ball qo'shildi! 🌟`);
}

function closeTaskModal() {
  document.getElementById('taskModal').classList.add('hidden');
  document.getElementById('taskModal').classList.remove('flex');
}

// ================= GAME 1: ARQON TORTISH — BOLA VS OTA-ONA (10 TA TO'LIQ SAVOL) =================
function speakTugMascot() {
  speakMascot(state.tugGame.mascotMessage, 'welcome_tug');
}

function speakCurrentTugQuestion() {
  const child = getActiveChild();
  const gradeKey = getGradeKey(child.grade);
  const gradeNum = child.id === 2 ? '2' : '1';
  const questionsList = (state.tugGame.questions[gradeKey]) || state.tugGame.questions['1-sinf'];
  const qIdx = state.tugGame.currentRound - 1;
  const q = questionsList[qIdx] || questionsList[0];
  const currentAudioKey = `tug_${gradeNum}_${state.tugGame.currentRound}`;
  speakMascot(`Savol: ${q.q}`, currentAudioKey);
}

function initTugOfWarGame() {
  state.activeGame = 'tug';
  state.tugGame.ropePosition = 50;
  state.tugGame.scoreChild = 0;
  state.tugGame.scoreParent = 0;
  state.tugGame.currentRound = 1;
  const child = getActiveChild();
  state.tugGame.mascotMessage = `Salom! Men Zukko Quyonchaman 🐰. Bu o'yinda ${child.name} va Onasi bellashadi! Bola to'g'ri topsa arqon bola tomoniga tortiladi, xato bo'lsa ona tomoniga! Qani, 10 ta savolli bellashuvni boshladik!`;

  const tabTug = document.getElementById('gameTab-tug');
  const tabJum = document.getElementById('gameTab-jumanji');
  if (tabTug && tabJum) {
    tabTug.classList.add('ring-2', 'ring-amber-300', 'opacity-100');
    tabTug.classList.remove('opacity-80');
    tabJum.classList.remove('ring-2', 'ring-emerald-300');
    tabJum.classList.add('opacity-80');
  }

  renderTugOfWar();
  speakMascot(state.tugGame.mascotMessage, 'welcome_tug');
}

function renderTugOfWar() {
  const container = document.getElementById('gameArena');
  const child = getActiveChild();
  const gradeKey = getGradeKey(child.grade);
  const questionsList = (state.tugGame.questions[gradeKey]) || state.tugGame.questions['1-sinf'];
  const qIdx = state.tugGame.currentRound - 1;
  const q = questionsList[qIdx] || questionsList[0];
  const pos = state.tugGame.ropePosition; // 50% markaz

  container.innerHTML = `
    <div class="space-y-4">
      
      <!-- Mascot Guide Banner (Faqat yo'riqnoma, ovoz o'chirilgan) -->
      <div class="flex items-start gap-3 p-3.5 rounded-3xl bg-amber-50/90 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-800 shadow-xs relative">
        <div class="text-4xl mascot-avatar flex-shrink-0 select-none">🐰</div>
        <div class="flex-1">
          <span class="block text-xs font-black text-amber-900 dark:text-amber-200 mb-1">Zukko Quyoncha 🐰:</span>
          <p class="text-xs text-amber-900 dark:text-amber-200 leading-snug">
            "${state.tugGame.mascotMessage}"
          </p>
        </div>
      </div>

      <!-- Teams Header: Bola (Chapda) vs Ota-ona (O'ngda) -->
      <div class="flex items-center justify-between p-2 rounded-2xl bg-brand-50/80 dark:bg-pastel-darkcard border border-brand-100 dark:border-pastel-darkborder">
        <!-- Bola jamoasi -->
        <div class="flex items-center gap-2">
          <span class="text-2xl">👦</span>
          <div>
            <span class="block text-xs font-black text-brand-600 dark:text-brand-400">${child.name} (Bola)</span>
            <span class="text-[10px] text-gray-400 font-bold">To'pladi: ${state.tugGame.scoreChild} ball</span>
          </div>
        </div>

        <!-- Savol raqami (10 ta savol) -->
        <div class="text-center px-2 py-1 rounded-xl bg-white dark:bg-pastel-darkborder shadow-2xs border border-brand-200">
          <span class="block text-[9px] font-bold text-gray-400 uppercase">Savol</span>
          <span class="text-xs font-black text-brand-600">${state.tugGame.currentRound} / 10</span>
        </div>

        <!-- Ota-ona jamoasi -->
        <div class="flex items-center gap-2 text-right">
          <div>
            <span class="block text-xs font-black text-rose-600 dark:text-rose-400">Nilufar (Ona)</span>
            <span class="text-[10px] text-gray-400 font-bold">To'pladi: ${state.tugGame.scoreParent} ball</span>
          </div>
          <span class="text-2xl">👩</span>
        </div>
      </div>

      <!-- Live Interactive Rope Arena -->
      <div class="p-4 bg-gradient-to-b from-brand-50 to-white dark:from-pastel-darkcard dark:to-pastel-darkbg rounded-3xl border-2 border-brand-200 dark:border-pastel-darkborder shadow-inner text-center">
        
        <div class="flex justify-between items-center text-4xl px-3 mb-2 select-none">
          <div class="flex items-center gap-1.5 ${pos < 50 ? 'pull-left' : ''}">
            <span>👦</span>
            <span class="text-xs font-black text-brand-600">Tort!</span>
          </div>
          
          <div class="text-[11px] font-black px-3 py-1 rounded-full ${pos < 50 ? 'bg-brand-500 text-white' : pos > 50 ? 'bg-rose-500 text-white' : 'bg-gray-200 text-gray-700'}">
            ${pos < 50 ? `🏆 ${child.name} tomonga tortildi!` : pos > 50 ? '🏆 Ona tomonga tortildi!' : '⚖️ Kuchlar teng!'}
          </div>

          <div class="flex items-center gap-1.5 ${pos > 50 ? 'pull-right' : ''}">
            <span class="text-xs font-black text-rose-600">Tort!</span>
            <span>👩</span>
          </div>
        </div>

        <!-- The Rope Bar with Ribbon (pos: 0% is child victory, 100% is parent victory) -->
        <div class="tug-rope-container relative w-full flex items-center my-3">
          <div class="absolute inset-x-0 h-3 bg-amber-800/40 rounded-full"></div>
          <div class="absolute left-1/2 top-0 bottom-0 w-1 bg-red-400 z-10"></div>
          
          <div class="tug-marker absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-brand-500 ring-4 ring-white dark:ring-pastel-darkcard shadow-lg flex items-center justify-center text-white text-base font-black z-20" style="left: ${pos}%">
            🎀
          </div>
        </div>

        <div class="text-[11px] font-bold text-gray-500 dark:text-gray-400 flex items-center justify-between px-2">
          <span>← ${child.name} (Bola marrasi)</span>
          <span class="text-brand-500 font-extrabold">Savol #${state.tugGame.currentRound}</span>
          <span>Ona marrasi →</span>
        </div>
      </div>

      <!-- 10-Question Card -->
      <div class="p-4 rounded-3xl bg-white dark:bg-pastel-darkcard border-2 border-brand-200 dark:border-pastel-darkborder shadow-sm text-center">
        <div class="flex items-center justify-between mb-2">
          <span class="text-[10px] uppercase font-black text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 px-2.5 py-0.5 rounded-md">
            ${child.grade} darslik topshirig'i
          </span>
          <button onclick="speakCurrentTugQuestion()" class="px-2.5 py-1 rounded-full bg-brand-500 hover:bg-brand-600 text-white text-[10px] font-black flex items-center gap-1 shadow-xs transition-transform active:scale-95">
            <span>🔊 Savolni eshitish</span>
          </button>
        </div>

        <h4 class="text-sm font-black text-gray-900 dark:text-white my-3 leading-snug">
          ${q.q}
        </h4>

        <div class="grid grid-cols-1 gap-2.5">
          ${q.a.map((option, idx) => `
            <button onclick="handleTugAnswer(${idx})" class="w-full py-2.5 px-3.5 rounded-2xl border-2 border-brand-100 dark:border-pastel-darkborder bg-brand-50/40 dark:bg-pastel-darkborder/40 hover:bg-brand-500 hover:text-white text-xs font-bold text-gray-800 dark:text-gray-200 flex items-center justify-between transition-all group">
              <span>${option}</span>
              <i data-lucide="arrow-right" class="w-4 h-4 text-gray-400 group-hover:text-white"></i>
            </button>
          `).join('')}
        </div>
      </div>

    </div>
  `;
  lucide.createIcons();
}

function handleTugAnswer(selectedIdx) {
  const child = getActiveChild();
  const gradeKey = getGradeKey(child.grade);
  const gradeNum = child.id === 2 ? '2' : '1';
  const questionsList = (state.tugGame.questions[gradeKey]) || state.tugGame.questions['1-sinf'];
  const qIdx = state.tugGame.currentRound - 1;
  const q = questionsList[qIdx] || questionsList[0];

  let audioKeyToPlay = '';
  if (selectedIdx === q.correct) {
    audioFX.success();
    // BOLA TO'G'RI TOPDI -> Arqon bola tomonga tortiladi (chapga: kamayadi -6%)
    state.tugGame.ropePosition = Math.max(15, state.tugGame.ropePosition - 6);
    state.tugGame.scoreChild += 10;
    state.tugGame.mascotMessage = `Barakalla, ${child.name}! To'g'ri javob! Arqon ${child.name} tomoniga tortildi! 🎉`;
    audioKeyToPlay = `correct_child_${gradeNum}`;
    showToast(`To'g'ri javob! Arqon ${child.name} tomonga tortildi! 👏`);
  } else {
    audioFX.wrong();
    // NOTO'G'RI JAVOB -> Arqon ona tomonga tortiladi (o'ngga: oshadi +6%)
    state.tugGame.ropePosition = Math.min(85, state.tugGame.ropePosition + 6);
    state.tugGame.scoreParent += 10;
    state.tugGame.mascotMessage = `Bu safar xato bo'ldi! Arqon Onasi tomoniga tortildi! Keyingi savolda diqqat qiling! 💪`;
    audioKeyToPlay = 'wrong_child';
    showToast(`Xato javob! Arqon Ona tomonga tortildi! ⚠️`, 'error');
  }

  // Check 10 full questions completed
  if (state.tugGame.currentRound >= state.tugGame.maxRounds) {
    child.points += state.tugGame.scoreChild;
    updateActiveChildDisplay();
    triggerConfetti();

    const winnerText = state.tugGame.scoreChild >= state.tugGame.scoreParent 
      ? `G'ALABA! ${child.name} arqonni ko'proq tortib oldi!` 
      : `ONA VA BOLA DO'STLIGI! Ajoyib bellashuv bo'ldi!`;

    speakMascot(winnerText, `win_tug_${gradeNum}`);

    document.getElementById('gameArena').innerHTML = `
      <div class="text-center py-6 space-y-3">
        <div class="text-5xl animate-bounce">🏆</div>
        <h3 class="text-lg font-black text-brand-600">${winnerText}</h3>
        <p class="text-xs text-gray-600 dark:text-gray-300">10 ta darslik savoli muvaffaqiyatli yakunlandi!</p>
        
        <div class="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 text-xs font-bold space-y-1">
          <div>👦 ${child.name}: <b>${state.tugGame.scoreChild} ball</b></div>
          <div>👩 Ona (Nilufar): <b>${state.tugGame.scoreParent} ball</b></div>
          <div class="text-amber-700 font-black pt-1">⭐️ Jami hisobga +${state.tugGame.scoreChild} ball qo'shildi!</div>
        </div>

        <div>
          <button onclick="initTugOfWarGame()" class="mt-3 px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-black text-xs shadow-md">
            Yana 10 ta savolli o'yin o'ynash 🔄
          </button>
        </div>
      </div>
    `;
    return;
  }

  speakMascot(state.tugGame.mascotMessage, audioKeyToPlay);
  state.tugGame.currentRound++;
  renderTugOfWar();
}

// ================= GAME 2: JUMANJI — 14 TA CHALKASH KATAK & OVOZLI QUYONCHA =================
function speakJumanjiMascot() {
  speakMascot(state.jumanjiGame.mascotMessage, 'welcome_jumanji');
}

function speakCurrentJumanjiQuestion() {
  const child = getActiveChild();
  const gradeKey = getGradeKey(child.grade);
  const gradeNum = child.id === 2 ? '2' : '1';
  const questionsList = (state.jumanjiGame.questions[gradeKey]) || state.jumanjiGame.questions['1-sinf'];
  const pos = state.jumanjiGame.playerPos;
  const qIdx = pos % questionsList.length;
  const q = questionsList[qIdx];
  const currentAudioKey = `jum_${gradeNum}_${pos}`;
  speakMascot(`Savol: ${q.q}`, currentAudioKey);
}

function initJumanjiGame() {
  state.activeGame = 'jumanji';
  state.jumanjiGame.playerPos = 0;
  state.jumanjiGame.isRolling = false;
  state.jumanjiGame.mascotMessage = "Jumanji sirli o'rmoniga xush kelibsiz! 🐰 14 ta toshli o'rmon yo'lidan o'tishingiz kerak. Zarni tashlang va savolga to'g'ri javob bering. Xato qilsangiz 1 qadam orqaga qaytasiz!";

  const tabTug = document.getElementById('gameTab-tug');
  const tabJum = document.getElementById('gameTab-jumanji');
  if (tabTug && tabJum) {
    tabJum.classList.add('ring-2', 'ring-emerald-300', 'opacity-100');
    tabJum.classList.remove('opacity-80');
    tabTug.classList.remove('ring-2', 'ring-amber-300');
    tabTug.classList.add('opacity-80');
  }

  renderJumanji();
  speakMascot(state.jumanjiGame.mascotMessage, 'welcome_jumanji');
}

function renderJumanji() {
  const container = document.getElementById('gameArena');
  const child = getActiveChild();
  const pos = state.jumanjiGame.playerPos;
  const tiles = state.jumanjiGame.tiles;

  container.innerHTML = `
    <div class="space-y-4">
      
      <!-- Mascot Speech Banner with Direct Speaker Button -->
      <div class="flex items-start gap-3 p-3.5 rounded-3xl bg-emerald-50/90 dark:bg-emerald-950/40 border-2 border-emerald-300 dark:border-emerald-800 shadow-xs relative">
        <div class="text-4xl mascot-avatar flex-shrink-0 cursor-pointer" onclick="speakJumanjiMascot()" title="Quyonchani gapirtirish">🐰</div>
        <div class="flex-1">
          <div class="flex items-center justify-between mb-1">
            <span class="text-xs font-black text-emerald-900 dark:text-emerald-200">Zukko Quyoncha 🐰:</span>
            <button onclick="speakJumanjiMascot()" class="px-2.5 py-1 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-black flex items-center gap-1 shadow-xs transition-transform active:scale-95">
              <span>🔊 Ovozni eshitish</span>
            </button>
          </div>
          <p class="text-xs text-emerald-900 dark:text-emerald-200 leading-snug">
            "${state.jumanjiGame.mascotMessage}"
          </p>
        </div>
      </div>

      <!-- Winding Serpentine Jungle Path (14 Adventure Tiles) -->
      <div class="p-4 bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100/60 dark:from-pastel-darkcard dark:to-pastel-darkbg rounded-3xl border-2 border-emerald-300 dark:border-emerald-800 shadow-md">
        
        <div class="flex items-center justify-between text-xs font-black text-emerald-800 dark:text-emerald-300 mb-3 px-1">
          <span class="flex items-center gap-1">
            <span>🌿 Chalkash O'rmon Yo'li</span>
            <span class="text-[10px] bg-emerald-200 dark:bg-emerald-900 px-2 py-0.5 rounded-md font-bold">${pos + 1} / 14-katak</span>
          </span>
          <span class="text-amber-600 font-extrabold">Marra: +70 Ball 💎</span>
        </div>

        <!-- Serpentine 4-Row Winding Board Layout -->
        <div class="space-y-2.5">
          
          <!-- Row 1 (Tiles 0..3: Chapdan O'ngga →) -->
          <div class="grid grid-cols-4 gap-2">
            ${renderTile(0)}
            ${renderTile(1)}
            ${renderTile(2)}
            ${renderTile(3)}
          </div>
          
          <!-- Downward Arrow 1 -->
          <div class="flex justify-end pr-8 text-emerald-500 font-black text-base leading-none">
            ↓
          </div>

          <!-- Row 2 (Tiles 4..7: O'ngdan Chapga ←) -->
          <div class="grid grid-cols-4 gap-2">
            ${renderTile(7)}
            ${renderTile(6)}
            ${renderTile(5)}
            ${renderTile(4)}
          </div>

          <!-- Downward Arrow 2 -->
          <div class="flex justify-start pl-8 text-emerald-500 font-black text-base leading-none">
            ↓
          </div>

          <!-- Row 3 (Tiles 8..11: Chapdan O'ngga →) -->
          <div class="grid grid-cols-4 gap-2">
            ${renderTile(8)}
            ${renderTile(9)}
            ${renderTile(10)}
            ${renderTile(11)}
          </div>

          <!-- Downward Arrow 3 -->
          <div class="flex justify-end pr-8 text-emerald-500 font-black text-base leading-none">
            ↓
          </div>

          <!-- Row 4 (Tiles 12..13: O'ngdan Chapga ←) -->
          <div class="grid grid-cols-4 gap-2">
            <div class="col-span-2"></div>
            ${renderTile(13)}
            ${renderTile(12)}
          </div>

        </div>

      </div>

      <!-- Action Arena: Roll Dice or Step Question -->
      <div id="jumanjiActionCard" class="p-4 rounded-3xl bg-white dark:bg-pastel-darkcard border-2 border-emerald-200 dark:border-pastel-darkborder shadow-sm text-center">
        <div id="diceVisual" class="w-16 h-16 rounded-3xl bg-emerald-500 text-white text-3xl font-black flex items-center justify-center mx-auto shadow-md mb-3 cursor-pointer select-none hover:scale-105 transition-transform" onclick="rollJumanjiForQuestion()">
          🎲
        </div>
        <h4 class="text-xs font-black text-gray-900 dark:text-white mb-1">Sehrli Zarni tashlang!</h4>
        <p class="text-[11px] text-gray-500 dark:text-gray-400 mb-3">Zar tashlangach, keyingi katakka o'tish uchun savol beriladi.</p>
        <button onclick="rollJumanjiForQuestion()" class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md transition-all">
          Zarni Tashlash & Savolni Olish 🎲
        </button>
      </div>

    </div>
  `;
  lucide.createIcons();

  function renderTile(idx) {
    const tile = tiles[idx];
    const isCurrent = idx === pos;
    const isPassed = idx < pos;

    return `
      <div class="jungle-tile p-1.5 rounded-2xl flex flex-col items-center justify-between text-center min-h-[64px] relative border-2 ${
        isCurrent 
          ? 'current-tile bg-emerald-500 border-emerald-300 text-white shadow-md tile-jump ring-2 ring-emerald-300' 
          : isPassed 
          ? 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300' 
          : 'bg-white dark:bg-pastel-darkcard border-gray-200 dark:border-pastel-darkborder text-gray-400'
      }">
        <span class="text-[9px] font-black">${idx === 0 ? 'START' : idx === 13 ? 'MARRA' : idx + 1}</span>
        <span class="text-lg my-0.5">${tile.icon}</span>
        <span class="text-[8px] font-extrabold truncate w-full">${tile.name.split(' ')[0]}</span>
        ${isCurrent ? '<div class="absolute -top-3 w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center text-xs shadow-xs">🏃</div>' : ''}
      </div>
    `;
  }
}

function rollJumanjiForQuestion() {
  if (state.jumanjiGame.isRolling) return;
  state.jumanjiGame.isRolling = true;

  audioFX.jump();
  const dice = document.getElementById('diceVisual');
  if (dice) dice.classList.add('rolling');

  setTimeout(() => {
    state.jumanjiGame.isRolling = false;
    showJumanjiStepQuestion();
  }, 600);
}

function showJumanjiStepQuestion() {
  const child = getActiveChild();
  const gradeKey = getGradeKey(child.grade);
  const gradeNum = child.id === 2 ? '2' : '1';
  const questionsList = (state.jumanjiGame.questions[gradeKey]) || state.jumanjiGame.questions['1-sinf'];
  const pos = state.jumanjiGame.playerPos;
  const qIdx = pos % questionsList.length;
  const q = questionsList[qIdx];
  const nextTile = state.jumanjiGame.tiles[pos + 1] || state.jumanjiGame.tiles[13];
  const currentAudioKey = `jum_${gradeNum}_${pos}`;

  const actionCard = document.getElementById('jumanjiActionCard');
  if (!actionCard) return;

  actionCard.innerHTML = `
    <div class="text-center space-y-3">
      <div class="flex items-center justify-between">
        <span class="text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md">
          Keyingi katak: ${nextTile.name} (${nextTile.icon})
        </span>
        <button onclick="speakCurrentJumanjiQuestion()" class="px-2.5 py-1 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-black flex items-center gap-1 shadow-xs transition-transform active:scale-95">
          <span>🔊 Savolni eshitish</span>
        </button>
      </div>

      <h4 class="text-sm font-black text-gray-900 dark:text-white my-2 leading-snug">
        ${q.q}
      </h4>

      <p class="text-[10px] text-rose-500 font-bold">⚠️ Diqqat: Noto'g'ri javob bersangiz, 1 katak orqaga qaytasiz!</p>

      <div class="grid grid-cols-1 gap-2 text-left pt-1">
        ${q.a.map((option, idx) => `
          <button onclick="handleJumanjiAnswer(${idx})" class="w-full p-2.5 rounded-2xl border-2 border-emerald-200 dark:border-pastel-darkborder hover:bg-emerald-500 hover:text-white text-xs font-bold text-gray-800 dark:text-gray-200 flex items-center justify-between transition-all">
            <span>${option}</span>
            <i data-lucide="chevron-right" class="w-4 h-4"></i>
          </button>
        `).join('')}
      </div>
    </div>
  `;
  lucide.createIcons();

  // Quyoncha savolni aytadi!
  speakMascot(`Savol: ${q.q}`, currentAudioKey);
}

function handleJumanjiAnswer(selectedIdx) {
  const child = getActiveChild();
  const gradeKey = getGradeKey(child.grade);
  const gradeNum = child.id === 2 ? '2' : '1';
  const questionsList = (state.jumanjiGame.questions[gradeKey]) || state.jumanjiGame.questions['1-sinf'];
  const pos = state.jumanjiGame.playerPos;
  const qIdx = pos % questionsList.length;
  const q = questionsList[qIdx];

  if (selectedIdx === q.correct) {
    audioFX.success();
    state.jumanjiGame.playerPos = Math.min(13, state.jumanjiGame.playerPos + 1);
    state.jumanjiGame.mascotMessage = `Barakalla, ${child.name}! To'g'ri javob berdingiz va keyingi katakka oldinga sakradik! 🌟`;
    showToast('To\'g\'ri javob! Oldinga qadam tashlandi! 👏');

    // Reach finish (Tile 13)
    if (state.jumanjiGame.playerPos >= 13) {
      child.points += 70;
      updateActiveChildDisplay();
      triggerConfetti();

      const winMsg = `Ura! Jumanji xazinasi ochildi! ${child.name} va ota-onasi g'olib bo'ldi!`;
      speakMascot(winMsg, `win_jum_${gradeNum}`);

      document.getElementById('gameArena').innerHTML = `
        <div class="text-center py-6 space-y-3">
          <div class="text-5xl animate-bounce">💎</div>
          <h3 class="text-lg font-black text-emerald-600">JUMANJI XAZINASI OCHILDI!</h3>
          <p class="text-xs text-gray-600 dark:text-gray-300">${child.name} va ota-onasi barcha 14 ta o'rmon kataklaridan o'tib marraga yetdi!</p>
          <div class="inline-block p-3 rounded-2xl bg-emerald-100 text-emerald-900 text-xs font-black">
            ⭐️ Jami to'plandi: +70 Ball xazina sovrini!
          </div>
          <div>
            <button onclick="initJumanjiGame()" class="mt-3 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-black text-xs shadow-md">
              Yangi sarguzasht (Qayta o'ynash) 🔄
            </button>
          </div>
        </div>
      `;
      return;
    }

    speakMascot(state.jumanjiGame.mascotMessage, `correct_jum_${gradeNum}`);
  } else {
    audioFX.wrong();
    // NOTO'G'RI: 1 KATAK ORQAGA QAYTADI!
    state.jumanjiGame.playerPos = Math.max(0, state.jumanjiGame.playerPos - 1);
    state.jumanjiGame.mascotMessage = `Afsus, noto'g'ri javob! Qoidaga binoan 1 katak orqaga qaytdik. Yana bir bor diqqat bilan o'ylab ko'ring! 💪`;
    showToast('Noto\'g\'ri javob! 1 katak orqaga qaytildi! ⚠️', 'error');
    speakMascot(state.jumanjiGame.mascotMessage, 'wrong_jum');
  }

  renderJumanji();
}

// ================= LUG'ATIMIZ =================
function setDictionaryMode(mode) {
  state.dictionaryMode = mode;
  const tabCards = document.getElementById('dictModeTab-cards');
  const tabQuiz = document.getElementById('dictModeTab-quiz');

  if (mode === 'cards') {
    tabCards.classList.add('bg-indigo-600', 'text-white');
    tabCards.classList.remove('text-gray-600', 'dark:text-gray-300');
    tabQuiz.classList.remove('bg-indigo-600', 'text-white');
    tabQuiz.classList.add('text-gray-600', 'dark:text-gray-300');
  } else {
    tabQuiz.classList.add('bg-indigo-600', 'text-white');
    tabQuiz.classList.remove('text-gray-600', 'dark:text-gray-300');
    tabCards.classList.remove('bg-indigo-600', 'text-white');
    tabCards.classList.add('text-gray-600', 'dark:text-gray-300');
  }

  renderDictionaryView();
}

function setVocabLanguage(lang) {
  state.currentLang = lang;
  document.querySelectorAll('.lang-tab').forEach(tab => {
    tab.classList.remove('active', 'border-indigo-500', 'bg-indigo-50', 'text-indigo-700', 'dark:bg-indigo-950/40', 'dark:text-indigo-300');
    tab.classList.add('border-gray-200', 'bg-white', 'text-gray-600');
  });

  const activeTab = document.getElementById(`langTab-${lang}`);
  if (activeTab) {
    activeTab.classList.add('active', 'border-indigo-500', 'bg-indigo-50', 'text-indigo-700', 'dark:bg-indigo-950/40', 'dark:text-indigo-300');
    activeTab.classList.remove('border-gray-200', 'bg-white', 'text-gray-600');
  }

  renderDictionaryView();
}

function renderDictionaryView() {
  const container = document.getElementById('vocabContentArea');
  if (!container) return;

  if (state.dictionaryMode === 'cards') {
    renderFlashcards(container);
  } else {
    renderVocabQuiz(container);
  }
}

function renderFlashcards(container) {
  const words = state.vocabularies[state.currentLang] || [];
  const activeWord = words[0];

  container.innerHTML = `
    <!-- Active Main Flashcard -->
    <div class="bg-gradient-to-br from-indigo-50 via-rose-50 to-pink-50 dark:from-indigo-950/30 dark:via-pink-950/20 dark:to-pastel-darkcard rounded-3xl p-6 border-2 border-indigo-200 dark:border-indigo-900/60 text-center relative shadow-sm">
      <span class="text-4xl block mb-2">${activeWord.emoji}</span>
      <h3 class="text-2xl font-black text-gray-900 dark:text-white">${activeWord.word}</h3>
      <p class="text-xs text-indigo-600 dark:text-indigo-400 font-mono mt-0.5">${activeWord.transcription}</p>
      
      <div class="mt-3 py-1.5 px-3 rounded-xl bg-white/80 dark:bg-pastel-darkcard/80 inline-block font-bold text-sm text-gray-800 dark:text-white shadow-xs">
        O'zbekcha: <span class="text-brand-600">${activeWord.translation}</span>
      </div>

      <div class="mt-4 flex items-center justify-center gap-2">
        <button onclick="speakWord('${activeWord.word}', '${state.currentLang}')" class="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md">
          <i data-lucide="volume-2" class="w-4 h-4"></i>
          <span>Talaffuzni eshitish</span>
        </button>
        <button onclick="markWordLearned('${activeWord.word}')" class="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md">
          <i data-lucide="check" class="w-4 h-4"></i>
          <span>O'rgandik (+10 ball)</span>
        </button>
      </div>
    </div>

    <!-- Words List (15 words) -->
    <div class="space-y-2">
      <div class="flex items-center justify-between">
        <h3 class="text-xs font-black uppercase tracking-wider text-gray-400">Jami so'zlar: ${words.length} ta</h3>
        <span class="text-[11px] font-bold text-indigo-500">Kategoriya: Maktab & Oila</span>
      </div>
      
      <div class="space-y-2 max-h-[360px] overflow-y-auto pr-1">
        ${words.map(item => `
          <div class="p-3 rounded-2xl bg-white dark:bg-pastel-darkcard border border-brand-100 dark:border-pastel-darkborder flex items-center justify-between hover:border-indigo-300 transition-all">
            <div class="flex items-center gap-3">
              <span class="text-2xl">${item.emoji}</span>
              <div>
                <div class="flex items-center gap-2">
                  <span class="font-bold text-xs text-gray-900 dark:text-white">${item.word}</span>
                  <span class="text-[10px] text-gray-400 font-mono">${item.transcription}</span>
                </div>
                <span class="text-xs text-gray-500">${item.translation}</span>
              </div>
            </div>

            <button onclick="speakWord('${item.word}', '${state.currentLang}')" class="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 transition-colors">
              <i data-lucide="volume-2" class="w-4 h-4"></i>
            </button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  lucide.createIcons();
}

function renderVocabQuiz(container) {
  const words = state.vocabularies[state.currentLang] || [];
  const qIdx = state.vocabQuiz.currentIndex % words.length;
  const currentWord = words[qIdx];

  const otherWords = words.filter((_, i) => i !== qIdx);
  const shuffledWrong = otherWords.sort(() => 0.5 - Math.random()).slice(0, 3);
  const options = [...shuffledWrong, currentWord].sort(() => 0.5 - Math.random());

  container.innerHTML = `
    <div class="p-5 rounded-3xl bg-gradient-to-br from-indigo-50 via-white to-pink-50 dark:from-pastel-darkcard dark:to-pastel-darkbg border-2 border-indigo-300 dark:border-indigo-800 shadow-md text-center">
      
      <div class="flex items-center justify-between mb-3 text-xs font-bold text-gray-500">
        <span class="px-2 py-0.5 rounded-lg bg-indigo-100 text-indigo-700 font-black">Lug'at Testi #${state.vocabQuiz.currentIndex + 1}</span>
        <span class="text-amber-500 font-black">Ball: +${state.vocabQuiz.score} ⭐️</span>
      </div>

      <div class="text-4xl mb-1">${currentWord.emoji}</div>
      <h3 class="text-xl font-black text-gray-900 dark:text-white">${currentWord.word}</h3>
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-4">Ushbu so'zning o'zbekcha to'g'ri tarjimasini toping:</p>

      <div class="grid grid-cols-2 gap-2.5 text-left mb-4">
        ${options.map(opt => `
          <button onclick="handleVocabQuizAnswer('${opt.word}', '${currentWord.word}')" class="p-3 rounded-2xl border-2 border-gray-100 dark:border-pastel-darkborder bg-white dark:bg-pastel-darkcard hover:border-indigo-500 text-xs font-bold text-gray-800 dark:text-gray-200 transition-all flex items-center justify-between">
            <span>${opt.translation}</span>
            <span>${opt.emoji}</span>
          </button>
        `).join('')}
      </div>

      <button onclick="speakWord('${currentWord.word}', '${state.currentLang}')" class="px-3.5 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold text-xs inline-flex items-center gap-1">
        <i data-lucide="volume-2" class="w-4 h-4"></i>
        <span>Ovozli eshitish</span>
      </button>
    </div>
  `;
  lucide.createIcons();
}

function handleVocabQuizAnswer(chosenWord, correctWord) {
  if (chosenWord === correctWord) {
    audioFX.success();
    state.vocabQuiz.score += 15;
    const child = getActiveChild();
    child.points += 15;
    updateActiveChildDisplay();
    triggerConfetti();
    showToast('To\'g\'ri! Lug\'at boyligingiz oshdi! +15 ball 🌟');
  } else {
    audioFX.wrong();
    showToast(`Noto'g'ri javob. To'g'ri tarjima: "${correctWord}" edi.`, 'error');
  }

  state.vocabQuiz.currentIndex++;
  renderDictionaryView();
}

function speakWord(word, langCode) {
  if (!('speechSynthesis' in window)) return;
  const utterance = new SpeechSynthesisUtterance(word);
  if (langCode === 'en') utterance.lang = 'en-US';
  if (langCode === 'ru') utterance.lang = 'ru-RU';
  if (langCode === 'fr') utterance.lang = 'fr-FR';
  window.speechSynthesis.speak(utterance);
}

function markWordLearned(word) {
  const child = getActiveChild();
  child.points += 10;
  updateActiveChildDisplay();
  triggerConfetti();
  showToast(`Ajoyib! "${word}" so'zini o'rgandingiz. +10 ball! 🌟`);
}

// ================= JAVONIM =================
function filterLibrary(category, btnElement) {
  document.querySelectorAll('.lib-tab').forEach(t => {
    t.classList.remove('bg-brand-500', 'text-white');
    t.classList.add('bg-white', 'dark:bg-pastel-darkcard', 'text-gray-600', 'dark:text-gray-300');
  });
  if (btnElement) {
    btnElement.classList.add('bg-brand-500', 'text-white');
    btnElement.classList.remove('bg-white', 'dark:bg-pastel-darkcard', 'text-gray-600', 'dark:text-gray-300');
  }
  renderBooks(category);
}

function renderBooks(category) {
  const grid = document.getElementById('booksGrid');
  const filtered = category === 'all' 
    ? state.books 
    : state.books.filter(b => b.category === category);

  grid.innerHTML = filtered.map(book => `
    <div class="bg-white dark:bg-pastel-darkcard rounded-3xl p-3 border border-brand-100 dark:border-pastel-darkborder shadow-xs flex flex-col justify-between">
      <div>
        <div class="relative h-28 rounded-2xl overflow-hidden mb-2">
          <img src="${book.cover}" alt="${book.title}" class="w-full h-full object-cover">
          <span class="absolute top-1.5 right-1.5 text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${
            book.category === 'parents' ? 'bg-rose-500 text-white' : 'bg-amber-500 text-white'
          }">
            ${book.category === 'parents' ? 'Ota-ona' : 'Bola'}
          </span>
        </div>
        <h4 class="font-bold text-xs text-gray-900 dark:text-white line-clamp-2 leading-tight">${book.title}</h4>
        <p class="text-[10px] text-gray-400 mt-0.5">${book.author}</p>
      </div>

      <div class="mt-3 pt-2 border-t border-brand-50 dark:border-pastel-darkborder">
        <div class="flex items-center justify-between text-[10px] text-gray-500 mb-1">
          <span>O'qildi: ${book.progress}%</span>
          <span>${book.pages}</span>
        </div>
        <div class="w-full h-1.5 bg-gray-100 dark:bg-pastel-darkborder rounded-full overflow-hidden">
          <div class="h-full bg-brand-500 rounded-full" style="width: ${book.progress}%"></div>
        </div>
        <button onclick="readBook('${book.title}')" class="mt-2 w-full py-1.5 rounded-xl bg-brand-50 dark:bg-brand-950/60 hover:bg-brand-500 hover:text-white text-brand-600 dark:text-brand-300 font-bold text-[11px] transition-colors">
          Mutolaa qilish
        </button>
      </div>
    </div>
  `).join('');
  lucide.createIcons();
}

function readBook(title) {
  showToast(`"${title}" mutolaa qilinmoqda... 📖`);
}

// ================= SINF REYTINGI RENDERING =================
function renderRating() {
  const child = getActiveChild();
  const gradeKey = getGradeKey(child.grade);
  const classList = state.classLeaderboards[gradeKey] || state.classLeaderboards['1-sinf'];

  const sorted = [...classList].sort((a, b) => b.points - a.points);
  
  const podiumContainer = document.getElementById('podiumContainer');
  if (podiumContainer && sorted.length >= 3) {
    const first = sorted[0];
    const second = sorted[1];
    const third = sorted[2];

    podiumContainer.innerHTML = `
      <div class="flex items-end justify-center gap-2 max-w-xs mx-auto">
        <!-- 2-o'rin -->
        <div class="flex-1 flex flex-col items-center">
          <span class="text-[10px] font-black text-gray-500 dark:text-gray-400 mb-1">2-O'RIN</span>
          <div class="relative">
            <img src="${second.avatar}" class="w-14 h-14 rounded-2xl object-cover ring-2 ${second.isCurrentUser ? 'ring-brand-500' : 'ring-slate-300 dark:ring-slate-600'} shadow-md">
            <span class="absolute -top-2 -right-1 bg-slate-300 text-slate-800 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-xs">2</span>
          </div>
          <span class="text-xs font-black mt-1.5 ${second.isCurrentUser ? 'text-brand-600 dark:text-brand-400' : 'text-gray-800 dark:text-white'} truncate max-w-[85px] text-center">${second.name}</span>
          <span class="text-[11px] font-bold text-gray-500">${second.points} ball</span>
          <div class="w-full h-16 bg-slate-200 dark:bg-slate-800 rounded-t-xl mt-2 flex items-center justify-center font-black text-slate-500">🥈</div>
        </div>

        <!-- 1-o'rin -->
        <div class="flex-1 flex flex-col items-center -mt-4">
          <span class="text-xs font-black text-amber-500 mb-1 flex items-center gap-0.5">
            <i data-lucide="crown" class="w-3.5 h-3.5 fill-amber-400"></i>
            <span>1-O'RIN</span>
          </span>
          <div class="relative">
            <img src="${first.avatar}" class="w-16 h-16 rounded-2xl object-cover ring-4 ring-amber-400 shadow-lg">
            <span class="absolute -top-2 -right-1 bg-amber-400 text-amber-950 text-xs font-black w-5 h-5 rounded-full flex items-center justify-center shadow-xs">1</span>
          </div>
          <span class="text-xs font-black mt-1.5 ${first.isCurrentUser ? 'text-brand-600 dark:text-brand-400' : 'text-gray-800 dark:text-white'} truncate max-w-[95px] text-center">${first.name}</span>
          <span class="text-[11px] font-bold text-amber-600">${first.points} ball</span>
          <div class="w-full h-22 bg-amber-300 dark:bg-amber-700/60 rounded-t-xl mt-2 flex items-center justify-center font-black text-amber-900 dark:text-amber-100">🥇</div>
        </div>

        <!-- 3-o'rin -->
        <div class="flex-1 flex flex-col items-center">
          <span class="text-[10px] font-black text-amber-700 dark:text-amber-500 mb-1">3-O'RIN</span>
          <div class="relative">
            <img src="${third.avatar}" class="w-13 h-13 rounded-2xl object-cover ring-2 ${third.isCurrentUser ? 'ring-brand-500' : 'ring-amber-600'} shadow-md">
            <span class="absolute -top-2 -right-1 bg-amber-700 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-xs">3</span>
          </div>
          <span class="text-xs font-black mt-1.5 ${third.isCurrentUser ? 'text-brand-600 dark:text-brand-400' : 'text-gray-800 dark:text-white'} truncate max-w-[85px] text-center">${third.name}</span>
          <span class="text-[11px] font-bold text-gray-500">${third.points} ball</span>
          <div class="w-full h-12 bg-amber-200/70 dark:bg-amber-900/40 rounded-t-xl mt-2 flex items-center justify-center font-black text-amber-800">🥉</div>
        </div>
      </div>
    `;
  }

  const listContainer = document.getElementById('fullRankingList');
  if (listContainer) {
    listContainer.innerHTML = sorted.map((user, idx) => {
      const rank = idx + 1;
      return `
        <div class="p-3 rounded-2xl flex items-center justify-between transition-all ${
          user.isCurrentUser 
            ? 'bg-brand-50 dark:bg-brand-950/60 border-2 border-brand-400 shadow-xs' 
            : 'bg-white dark:bg-pastel-darkcard border border-gray-100 dark:border-pastel-darkborder'
        }">
          <div class="flex items-center gap-3">
            <span class="w-6 text-center font-black text-xs ${
              rank === 1 ? 'text-amber-500' : rank === 2 ? 'text-slate-400' : rank === 3 ? 'text-amber-700' : 'text-gray-400'
            }">
              #${rank}
            </span>
            <img src="${user.avatar}" class="w-9 h-9 rounded-xl object-cover ring-1 ring-brand-200">
            <div>
              <div class="flex items-center gap-1.5">
                <h4 class="font-bold text-xs text-gray-900 dark:text-white">${user.name}</h4>
                ${user.isCurrentUser ? '<span class="text-[9px] bg-brand-500 text-white px-1.5 rounded-md font-bold">Faol</span>' : ''}
              </div>
              <p class="text-[10px] text-gray-400">Ota-ona: ${user.parent}</p>
            </div>
          </div>

          <div class="text-right">
            <span class="text-xs font-black text-brand-600 dark:text-brand-400">${user.points}</span>
            <span class="text-[10px] text-gray-400 block">ball</span>
          </div>
        </div>
      `;
    }).join('');
  }

  lucide.createIcons();
}

// ================= MODAL & TELEGRAM BOT =================
function openTgModal() {
  document.getElementById('tgModal').classList.remove('hidden');
  document.getElementById('tgModal').classList.add('flex');
  lucide.createIcons();
}

function closeTgModal() {
  document.getElementById('tgModal').classList.add('hidden');
  document.getElementById('tgModal').classList.remove('flex');
}

function simulateTelegramPush() {
  const child = getActiveChild();
  const gradeKey = getGradeKey(child.grade);
  const teacher = state.teachers[gradeKey] || state.teachers['1-sinf'];

  closeTgModal();
  setTimeout(() => {
    showToast(`Telegram Bot: "${teacher.shortName} ${child.grade} uchun yangi darslik vazifalarini kiritdi! ${child.name} bilan birga ishlang." 📲`, 'info');
  }, 1000);
}

function showCertModal(title) {
  const child = getActiveChild();
  document.getElementById('certTitle').textContent = title;
  document.getElementById('certStudentName').textContent = child.fullName;
  document.getElementById('certModal').classList.remove('hidden');
  document.getElementById('certModal').classList.add('flex');
  lucide.createIcons();
}

function closeCertModal() {
  document.getElementById('certModal').classList.add('hidden');
  document.getElementById('certModal').classList.remove('flex');
}

// ================= CHAT =================
function sendChatMessage(e) {
  e.preventDefault();
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;

  const child = getActiveChild();
  const gradeKey = getGradeKey(child.grade);
  const teacher = state.teachers[gradeKey] || state.teachers['1-sinf'];
  const chatContainer = document.getElementById('chatMessages');
  
  const userMsg = document.createElement('div');
  userMsg.className = 'flex items-start justify-end gap-2';
  userMsg.innerHTML = `
    <div class="bg-brand-500 text-white p-2.5 rounded-2xl rounded-tr-none max-w-[80%]">
      ${text}
    </div>
  `;
  chatContainer.appendChild(userMsg);
  input.value = '';
  chatContainer.scrollTop = chatContainer.scrollHeight;

  setTimeout(() => {
    const reply = document.createElement('div');
    reply.className = 'flex items-start gap-2';
    reply.innerHTML = `
      <img src="${teacher.avatar}" class="w-7 h-7 rounded-full object-cover">
      <div class="bg-gray-100 dark:bg-pastel-darkborder p-2.5 rounded-2xl rounded-tl-none max-w-[80%] text-gray-800 dark:text-gray-200">
        <span class="block font-black text-[10px] text-brand-600">${teacher.shortName}</span>
        Assalomu alaykum! ${child.name}ning ${child.grade} darslik topshiriqlarini faol bajarayotganini ko'rib xursandman. Ballar hisoblandi!
      </div>
    `;
    chatContainer.appendChild(reply);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, 1200);
}

// ================= NOTIFICATION TOAST & CONFETTI =================
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  
  toast.className = `toast-enter p-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold pointer-events-auto border ${
    type === 'error' 
      ? 'bg-red-500 text-white border-red-600' 
      : type === 'info'
      ? 'bg-sky-500 text-white border-sky-600'
      : 'bg-white dark:bg-pastel-darkcard text-gray-900 dark:text-white border-brand-200 dark:border-pastel-darkborder ring-1 ring-brand-100'
  }`;

  toast.innerHTML = `
    <i data-lucide="${type === 'error' ? 'alert-circle' : type === 'info' ? 'send' : 'sparkles'}" class="w-4 h-4 ${type === 'error' || type === 'info' ? 'text-white' : 'text-brand-500'}"></i>
    <span class="flex-1">${message}</span>
  `;

  container.appendChild(toast);
  lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function triggerConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fb7185', '#fbcfe8', '#f59e0b', '#10b981']
    });
  }
}
