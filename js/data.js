/**
 * MECHA CORE - GUNPLA STORE DATASET
 * Chứa danh mục các dòng mô hình Gundam và phụ kiện với thông số chi tiết
 */

const GUNDAM_PRODUCTS = [
  // --- PERFECT GRADE (1/60) ---
  {
    id: "pgu-rx78",
    name: "PG Unleashed 1/60 RX-78-2 Gundam",
    sku: "PGU-7802",
    grade: "PG",
    scale: "1/60",
    series: "Universal Century",
    price: 6250000,
    originalPrice: 6900000,
    rating: 5.0,
    reviewsCount: 142,
    stock: 8,
    status: "hot", // hot, new, sale, preorder
    image: "assets/pg_rx78.jpg",
    gallery: [
      "assets/pg_rx78.jpg",
      "assets/pg_strike_freedom.jpg",
      "assets/pg_exia.jpg"
    ],
    height: "30 cm",
    runners: 45,
    difficulty: 5,
    ledSupport: true,
    innerFrame: "Khung xương 5 lớp Metal Inserted Molding & Etching Decal",
    accessories: [
      "2x Beam Saber",
      "1x Beam Rifle",
      "1x Shield khiên chắn nam châm",
      "1x Core Fighter biến hình",
      "Bộ LED RGB đa sắc đổi màu",
      "Metallic 3D Etching Decal Sheet"
    ],
    description: "Đỉnh cao công nghệ Gunpla 40 năm của Bandai. Khung xương cơ khí đa lớp chi tiết chân thực với kim loại etching, giáp mở hatch, đèn LED RGB buồng lái và ngực tinh xảo.",
    featured: true
  },
  {
    id: "pg-strike-freedom",
    name: "PG 1/60 ZGMF-X20A Strike Freedom Gundam",
    sku: "PG-20A-SF",
    grade: "PG",
    scale: "1/60",
    series: "Gundam SEED Destiny",
    price: 5800000,
    originalPrice: 6200000,
    rating: 4.9,
    reviewsCount: 98,
    stock: 5,
    status: "sale",
    image: "assets/pg_strike_freedom.jpg",
    gallery: [
      "assets/pg_strike_freedom.jpg",
      "assets/mgex_strike_freedom.jpg"
    ],
    height: "32 cm",
    runners: 42,
    difficulty: 5,
    ledSupport: true,
    innerFrame: "Khung xương mạ vàng Gold Extra Finish siêu phản quang",
    accessories: [
      "8x Super DRAGOON System Wings",
      "2x High-energy Beam Rifle kết hợp",
      "2x Beam Saber",
      "1x Beam Shield hiệu ứng hào quang",
      "Display Stand chuyên dụng góc nghiêng"
    ],
    description: "Bộ giáp cánh vàng kim rực rỡ cùng hệ thống Super DRAGOON trứ danh của Kira Yamato. Tỷ lệ 1/60 hoành tráng làm tâm điểm của mọi bộ sưu tập.",
    featured: true
  },
  {
    id: "pg-exia-lighting",
    name: "PG 1/60 GN-001 Gundam Exia Lighting Model",
    sku: "PG-001-EXIA",
    grade: "PG",
    scale: "1/60",
    series: "Gundam 00",
    price: 6600000,
    originalPrice: 7200000,
    rating: 4.95,
    reviewsCount: 76,
    stock: 3,
    status: "hot",
    image: "assets/pg_exia.jpg",
    gallery: [
      "assets/pg_exia.jpg"
    ],
    height: "30 cm",
    runners: 40,
    difficulty: 5,
    ledSupport: true,
    innerFrame: "Hệ thống cáp quang dẫn sáng GN Hạt chuyển màu Xanh -> Đỏ (Trans-Am)",
    accessories: [
      "1x GN Sword / GN Rifle",
      "1x GN Long Blade & 1x GN Short Blade",
      "2x GN Beam Saber & 2x GN Beam Dagger",
      "1x GN Shield",
      "Khối GN Drive xoay cơ học tích hợp LED"
    ],
    description: "Phiên bản Lighting Model với hệ thống LED chuyển đổi trạng thái năng lượng Hạt GN từ xanh lục bí ẩn sang đỏ rực Trans-Am bùng nổ.",
    featured: false
  },

  // --- MASTER GRADE (1/100) & MGEX ---
  {
    id: "mgex-strike-freedom",
    name: "MGEX 1/100 Strike Freedom Gundam Extreme Metallic",
    sku: "MGEX-SF-100",
    grade: "MG",
    scale: "1/100",
    series: "Gundam SEED Destiny",
    price: 3450000,
    originalPrice: 3800000,
    rating: 5.0,
    reviewsCount: 215,
    stock: 12,
    status: "hot",
    image: "assets/mgex_strike_freedom.jpg",
    gallery: [
      "assets/mgex_strike_freedom.jpg",
      "assets/pg_strike_freedom.jpg"
    ],
    height: "19 cm",
    runners: 28,
    difficulty: 4,
    ledSupport: false,
    innerFrame: "Khung xương 3 lớp phối 3 sắc thái vàng Gold Coating, Copper Gold & Metallic 3D Stickers",
    accessories: [
      "8x Super DRAGOON Wings",
      "2x Beam Rifle liên kết",
      "2x Beam Saber",
      "2x Beam Shield hiệu ứng PET Film 3D",
      "Đế dựng chuyên dụng kèm giá đỡ cánh bung mở"
    ],
    description: "Siêu phẩm MGEX tái định nghĩa nghệ thuật sơn mạ kim loại Metallic Extreme. 3 sắc thái mạ vàng kết hợp ăn khớp tạo độ sâu thị giác đỉnh cao.",
    featured: true
  },
  {
    id: "mg-barbatos",
    name: "MG 1/100 ASW-G-08 Gundam Barbatos 4th Form",
    sku: "MG-BARB-08",
    grade: "MG",
    scale: "1/100",
    series: "Iron-Blooded Orphans",
    price: 1150000,
    originalPrice: 1300000,
    rating: 4.9,
    reviewsCount: 180,
    stock: 20,
    status: "hot",
    image: "assets/mg_barbatos.jpg",
    gallery: [
      "assets/mg_barbatos.jpg"
    ],
    height: "18 cm",
    runners: 16,
    difficulty: 4,
    ledSupport: false,
    innerFrame: "Gundam Frame tái hiện đầy đủ xi lanh thủy lực mạ chrome mượt mà",
    accessories: [
      "1x Đại chùy Mace khổng lồ kèm đinh phóng",
      "1x Kiếm katana Tachiy",
      "1x Pháo nòng dài 300mm Smoothbore Gun có thể gấp gọn"
    ],
    description: "Bộ khung Gundam Frame tái hiện chi tiết piston thủy lực chuyển động thật nhịp nhàng. Vũ khí đại chùy hầm hố của Mikazuki Augus.",
    featured: true
  },
  {
    id: "mg-sazabi-verka",
    name: "MG 1/100 MSN-04 Sazabi Ver.Ka",
    sku: "MG-SAZABI-VK",
    grade: "MG",
    scale: "1/100",
    series: "Universal Century",
    price: 2150000,
    originalPrice: 2400000,
    rating: 5.0,
    reviewsCount: 230,
    stock: 6,
    status: "sale",
    image: "assets/mg_sazabi.jpg",
    gallery: [
      "assets/mg_sazabi.jpg"
    ],
    height: "23 cm",
    runners: 31,
    difficulty: 4,
    ledSupport: true,
    innerFrame: "Khung xương cỡ lớn với cơ chế mở giáp Open Hatch toàn thân",
    accessories: [
      "6x Funnels với hiệu ứng triển khai",
      "1x Beam Shot Rifle",
      "1x Beam Tomahawk cỡ đại với hiệu ứng lưỡi rìu xanh lục",
      "1x High-energy Mega Beam Rifle (Long Barrel)",
      "1x Khiên chắn Sazabi khổng lồ kèm Decal nước Katoki"
    ],
    description: "Tuyệt phẩm của nhà thiết kế huyền thoại Hajime Katoki. Mobile Suit tối thượng của Char Aznable với cơ cấu mở giáp lộ khung xương cơ khí đồ sộ.",
    featured: true
  },
  {
    id: "mg-nu-gundam-verka",
    name: "MG 1/100 RX-93 Nu Gundam Ver.Ka",
    sku: "MG-NUGUN-VK",
    grade: "MG",
    scale: "1/100",
    series: "Universal Century",
    price: 1850000,
    originalPrice: 2050000,
    rating: 4.95,
    reviewsCount: 190,
    stock: 9,
    status: "hot",
    image: "assets/mg_nu_gundam.jpg",
    gallery: [
      "assets/mg_nu_gundam.jpg",
      "assets/mg_sazabi.jpg"
    ],
    height: "22 cm",
    runners: 26,
    difficulty: 4,
    ledSupport: true,
    innerFrame: "Khung Psycho Frame giấu bên trong tỏa sáng qua khe giáp",
    accessories: [
      "6x Fin Funnels liên kết linh hoạt",
      "1x Beam Rifle",
      "1x Hyper Bazooka",
      "1x Custom Shield",
      "Đế trưng bày hình biểu tượng Amuro Ray"
    ],
    description: "Đối thủ truyền kiếp của Sazabi do chính Amuro Ray điều khiển. Tích hợp cơ chế trượt giáp kích hoạt Psycho Frame tỏa sáng ấn tượng.",
    featured: false
  },
  {
    id: "mg-wing-zero-verka",
    name: "MG 1/100 Wing Gundam Zero EW Ver.Ka",
    sku: "MG-WING-EWVK",
    grade: "MG",
    scale: "1/100",
    series: "Gundam Wing",
    price: 1450000,
    originalPrice: 1650000,
    rating: 4.9,
    reviewsCount: 165,
    stock: 15,
    status: "new",
    image: "assets/mg_wing_zero.jpg",
    gallery: [
      "assets/mg_wing_zero.jpg"
    ],
    height: "18 cm",
    runners: 19,
    difficulty: 4,
    ledSupport: false,
    innerFrame: "Khung xương thế hệ mới cho phép biến hình dạng Neo Bird Mode mượt mà",
    accessories: [
      "Twin Buster Rifle (tách rời hoặc ghép đôi)",
      "2x Beam Saber giấu trong cánh",
      "Bộ 4 cánh thiên thần lông vũ khớp đa hướng",
      "Khiên chắn biến hình Neo Bird",
      "Action Base chuyên dụng tạo dáng bay"
    ],
    description: "Cánh thiên thần dang rộng tuyệt đẹp trong phim Endless Waltz, thiết kế Ver.Ka bổ sung tính năng cất giữ Twin Buster Rifle bên trong cánh.",
    featured: false
  },

  // --- REAL GRADE (1/144) ---
  {
    id: "rg-hinu",
    name: "RG 1/144 Hi-Nu Gundam",
    sku: "RG-36-HINU",
    grade: "RG",
    scale: "1/144",
    series: "Universal Century",
    price: 1180000,
    originalPrice: 1350000,
    rating: 5.0,
    reviewsCount: 310,
    stock: 18,
    status: "hot",
    image: "assets/rg_hinu.jpg",
    gallery: [
      "assets/rg_hinu.jpg",
      "assets/mg_nu_gundam.jpg"
    ],
    height: "14.5 cm",
    runners: 13,
    difficulty: 4,
    ledSupport: false,
    innerFrame: "Advanced MS Joint kết hợp phân tách giáp đa tầng đỉnh cao thế hệ mới",
    accessories: [
      "6x Fin Funnels dạng cánh",
      "1x Beam Rifle",
      "1x Hyper Mega Shield",
      "1x New Hyper Bazooka",
      "Khối đẩy bình xăng phụ Propellant Tanks"
    ],
    description: "Được mệnh danh là 'RG vĩ đại nhất lịch sử'. Biên độ cử động không tưởng, phân chia màu giáp 3 tông tím - xanh đậm - trắng xuất sắc.",
    featured: true
  },
  {
    id: "rg-god-gundam",
    name: "RG 1/144 God Gundam (Burning Gundam)",
    sku: "RG-37-GOD",
    grade: "RG",
    scale: "1/144",
    series: "Mobile Fighter G Gundam",
    price: 950000,
    originalPrice: 1100000,
    rating: 4.9,
    reviewsCount: 145,
    stock: 10,
    status: "hot",
    image: "assets/rg_god.jpg",
    gallery: [
      "assets/rg_god.jpg"
    ],
    height: "13 cm",
    runners: 11,
    difficulty: 3,
    ledSupport: false,
    innerFrame: "Cấu trúc khớp võ thuật linh hoạt gấp uốn như cơ thể người thật",
    accessories: [
      "2x God Finger hiệu ứng lửa cam trong suốt",
      "Bộ 3 vòng hào quang năng lượng Nichirin năng lượng 3 tầng PET",
      "2x Beam Sword",
      "Bộ bàn tay võ thuật biểu cảm đa dạng"
    ],
    description: "Vua võ thuật Mobile Fighter! Khớp chân xoạc 180 độ, gập ngực, bẻ cổ chân linh hoạt mô phỏng mọi thế võ võ hiệp kinh điển của Domon Kasshu.",
    featured: false
  },
  {
    id: "rg-epyon",
    name: "RG 1/144 Gundam Epyon",
    sku: "RG-38-EPYON",
    grade: "RG",
    scale: "1/144",
    series: "Gundam Wing",
    price: 1050000,
    originalPrice: 1200000,
    rating: 4.85,
    reviewsCount: 88,
    stock: 14,
    status: "new",
    image: "assets/rg_epyon.jpg",
    gallery: [
      "assets/rg_epyon.jpg",
      "assets/mg_wing_zero.jpg"
    ],
    height: "13.5 cm",
    runners: 12,
    difficulty: 4,
    ledSupport: false,
    innerFrame: "Hệ thống khớp trục đùi uốn lượn và biến hình song long phi hành",
    accessories: [
      "1x Beam Sword cực đại nối cáp năng lượng đỏ",
      "1x Heat Rod roi nhiệt kim loại cử động từng đốt",
      "Đôi cánh dơi có thể mở bung các nan giáp",
      "Khối khiên Epyon Shield"
    ],
    description: "Kỵ sĩ rồng bóng đêm Epyon của Zechs Merquise. Cây roi nhiệt Heat Rod uốn lượn đa khớp cực kỳ sống động và thanh Beam Sword khổng lồ.",
    featured: false
  },

  // --- HIGH GRADE (1/144) ---
  {
    id: "hg-calibarn",
    name: "HG 1/144 Gundam Calibarn",
    sku: "HG-WFM-26",
    grade: "HG",
    scale: "1/144",
    series: "Witch from Mercury",
    price: 520000,
    originalPrice: 590000,
    rating: 4.95,
    reviewsCount: 420,
    stock: 25,
    status: "hot",
    image: "assets/hg_calibarn.jpg",
    gallery: [
      "assets/hg_calibarn.jpg",
      "assets/hg_aerial.jpg"
    ],
    height: "13 cm",
    runners: 8,
    difficulty: 2,
    ledSupport: false,
    innerFrame: "Công nghệ ép khuôn In-Mold Molding đổi màu lấp lánh cầu vồng Permet Score 8+",
    accessories: [
      "1x Variable Rod Rifle hình chổi phù thủy với 4 động cơ đẩy phía sau",
      "2x Beam Saber",
      "11x GUND-Bits hợp thành khiên Escutcheon hoặc gắn lên thân",
      "Đế trưng bày mini kèm theo"
    ],
    description: "Mô hình tâm điểm của kết thúc 'Phù Thủy Sao Thủy'. Cây súng chổi Variable Rod Rifle độc nhất vô nhị cùng hiệu ứng Permet cầu vồng rực rỡ.",
    featured: true
  },
  {
    id: "hg-aerial-rebuild",
    name: "HG 1/144 Gundam Aerial Rebuild",
    sku: "HG-WFM-18",
    grade: "HG",
    scale: "1/144",
    series: "Witch from Mercury",
    price: 450000,
    originalPrice: 500000,
    rating: 4.8,
    reviewsCount: 290,
    stock: 30,
    status: "hot",
    image: "assets/hg_aerial.jpg",
    gallery: [
      "assets/hg_aerial.jpg",
      "assets/hg_calibarn.jpg"
    ],
    height: "13 cm",
    runners: 7,
    difficulty: 2,
    ledSupport: false,
    innerFrame: "Khung khớp không dùng polycap thế hệ mới C-clip chắc chắn",
    accessories: [
      "1x Beam Rifle nâng cấp nòng dài",
      "2x Beam Saber tia xanh lam",
      "11x GUND-Bit gắn thành khiên hoặc giáp Bit On Form",
      "2x Beam Blade hiệu ứng lưỡi kiếm dài gắn nòng súng"
    ],
    description: "Dạng nâng cấp chiến đấu không gian của Suletta Mercury với dàn động cơ phản lực sau lưng và khẩu Beam Cannon hủy diệt tầm xa.",
    featured: false
  },
  {
    id: "hg-moon-gundam",
    name: "HGUC 1/144 AMS-123X-X Moon Gundam",
    sku: "HG-UC-215",
    grade: "HG",
    scale: "1/144",
    series: "Universal Century",
    price: 720000,
    originalPrice: 800000,
    rating: 4.9,
    reviewsCount: 110,
    stock: 7,
    status: "new",
    image: "assets/hg_moon.jpg",
    gallery: [
      "assets/hg_moon.jpg"
    ],
    height: "14 cm",
    runners: 10,
    difficulty: 3,
    ledSupport: false,
    innerFrame: "Chi tiết khuôn đúc khắc rãnh sâu tiệm cận chất lượng RG",
    accessories: [
      "8x Psycho Plate sau lưng biến hóa thành hình trăng khuyết hoặc khiên",
      "1x Beam Tomahawk / Beam Rifle",
      "2x Butterfly Edge dao găm lưỡi beam",
      "Đế dựng chuyên dụng cho Psycho Plate"
    ],
    description: "HG đỉnh cao không cần dùng decal dán màu nào! Cụm Psycho Plate hình bán nguyệt đỏ rực rỡ có thể triển khai tự do linh hoạt.",
    featured: false
  },

  // --- SUPER DEFORMED (SD) ---
  {
    id: "sd-wukong-impulse",
    name: "SD Gundam World Heroes Wukong Impulse Gundam",
    sku: "SD-WH-01",
    grade: "SD",
    scale: "Non-scale",
    series: "SD Gundam World Heroes",
    price: 180000,
    originalPrice: 220000,
    rating: 4.75,
    reviewsCount: 95,
    stock: 40,
    status: "hot",
    image: "assets/sd_wukong.jpg",
    gallery: [
      "assets/sd_wukong.jpg"
    ],
    height: "8.5 cm",
    runners: 4,
    difficulty: 1,
    ledSupport: false,
    innerFrame: "Khung SD thế hệ mới",
    accessories: [
      "1x Gậy Như Ý Ruyi Jingu Bang hiệu ứng lửa đỏ trong suốt",
      "Mặt nạ hóa hình Tề Thiên Đại Thánh Go-ko Form",
      "Bộ giáp chân hóa hình vượn thần"
    ],
    description: "Mô hình SD lấy cảm hứng từ Tôn Ngộ Không với 3 dạng biến hình: Khỉ con tinh nghịch, Cương Hầu và Tề Thiên Đại Thánh dũng mãnh.",
    featured: false
  },
  {
    id: "sdcs-rx78-2",
    name: "SDCS RX-78-2 Gundam (Cross Silhouette Frame Set)",
    sku: "SDCS-01-RX78",
    grade: "SD",
    scale: "Non-scale",
    series: "Universal Century",
    price: 280000,
    originalPrice: 320000,
    rating: 4.85,
    reviewsCount: 130,
    stock: 22,
    status: "hot",
    image: "assets/sdcs_rx78.jpg",
    gallery: [
      "assets/sdcs_rx78.jpg",
      "assets/pg_rx78.jpg"
    ],
    height: "9.5 cm",
    runners: 5,
    difficulty: 1,
    ledSupport: false,
    innerFrame: "Bao gồm cả 2 khung: Khung SD lùn cute & Khung CS chân dài cao ráo",
    accessories: [
      "1x Beam Rifle",
      "1x Beam Saber",
      "1x Shield khiên đỏ vàng",
      "2x Khung xương SD và CS tùy biến chiều cao"
    ],
    description: "Dòng Cross Silhouette cho phép hoán đổi chiều cao từ dáng lùn chibi sang dáng tỷ lệ chuẩn cử động khớp gối và khuỷu tay linh hoạt.",
    featured: false
  },

  // --- METAL BUILD & COLLECTOR ---
  {
    id: "mb-astray-red",
    name: "Metal Build Gundam Astray Red Frame Kai (Alternative Edition)",
    sku: "MB-ASTRAY-RED",
    grade: "Metal Build",
    scale: "1/100 (Die-cast)",
    series: "Gundam SEED Astray",
    price: 8900000,
    originalPrice: 9800000,
    rating: 5.0,
    reviewsCount: 64,
    stock: 2,
    status: "hot",
    image: "assets/mb_astray_red.jpg",
    gallery: [
      "assets/mb_astray_red.jpg"
    ],
    height: "19 cm",
    runners: 0, // Mô hình hoàn thiện đúc kim loại Diecast
    difficulty: 0,
    ledSupport: false,
    innerFrame: "Khung hợp kim Diecast đúc nguyên khối mạ điện phân đỏ bóng loáng",
    accessories: [
      "1x Thanh kiếm katana Gerbera Straight lưỡi thép mạ chrome tinh xảo",
      "1x Thanh kiếm Tiger Pierce kèm bao kiếm thếp vàng",
      "Bộ trang bị đa năng Tactical Arms IIL (cung tên, đại đao, cánh bay)",
      "Đế trưng bày kim loại cao cấp dập chìm logo Astray"
    ],
    description: "Tuyệt tác hoàn thiện đúc kim loại nặng tay của Bandai Tamashii Nations. Đẳng cấp sưu tập tối thượng với kiếm Katō mạ sáng soi gương.",
    featured: true
  },

  // --- DỤNG CỤ & PHỤ KIỆN BUILDER ---
  {
    id: "tool-godhand-spn120",
    name: "Kìm cắt Gundam cao cấp GodHand Ultimate Nipper SPN-120",
    sku: "TOOL-GH-120",
    grade: "Tools",
    scale: "Phụ kiện",
    series: "Dụng cụ lắp ráp",
    price: 1050000,
    originalPrice: 1200000,
    rating: 5.0,
    reviewsCount: 380,
    stock: 15,
    status: "hot",
    image: "assets/tool_godhand.jpg",
    gallery: [
      "assets/tool_godhand.jpg"
    ],
    height: "12 cm",
    runners: 0,
    difficulty: 1,
    ledSupport: false,
    innerFrame: "Lưỡi thép siêu mỏng Single Blade công nghệ Nhật Bản",
    accessories: [
      "1x Bao da bò bảo vệ đầu lưỡi kìm",
      "1x Hộp đựng bảo quản kèm dầu chống gỉ sét",
      "Giấy chứng nhận chính hãng GodHand Japan"
    ],
    description: "Ông vua của các loại kìm cắt Gunpla! Lưỡi cắt 1 bên siêu mỏng bén ngọt như dao cạo, cắt ngọt lịm không để lại vệt trắng (ghẻ/stress mark) trên nhựa.",
    featured: false
  },
  {
    id: "tool-marker-gm01",
    name: "Bút Kẻ Lằn Chìm Gundam Marker Pour Type GM01 Black",
    sku: "TOOL-GM01-BK",
    grade: "Tools",
    scale: "Phụ kiện",
    series: "Dụng cụ lắp ráp",
    price: 65000,
    originalPrice: 75000,
    rating: 4.8,
    reviewsCount: 520,
    stock: 100,
    status: "hot",
    image: "assets/tool_marker.jpg",
    gallery: [
      "assets/tool_marker.jpg"
    ],
    height: "14 cm",
    runners: 0,
    difficulty: 1,
    ledSupport: false,
    innerFrame: "Mực dầu gốc alcohol mao dẫn tự động chảy dọc rãnh",
    accessories: [
      "1x Bút kẻ lằn ngòi nhấn tự động"
    ],
    description: "Chỉ cần chấm nhẹ đầu bút vào rãnh nhựa, mực sẽ tự động chảy dọc theo đường lằn chỉ trong 1 giây. Dễ dàng xóa mực thừa bằng cồn hoặc gôm tẩy.",
    featured: false
  },
  {
    id: "tool-action-base-5",
    name: "Giá Đỡ Mô Hình Bandai Action Base 5 Black (Cho 1/144 & SD)",
    sku: "ACC-BASE5-BK",
    grade: "Tools",
    scale: "1/144 & SD",
    series: "Phụ kiện",
    price: 150000,
    originalPrice: 175000,
    rating: 4.9,
    reviewsCount: 280,
    stock: 50,
    status: "sale",
    image: "assets/tool_action_base.jpg",
    gallery: [
      "assets/tool_action_base.jpg"
    ],
    height: "15 cm (tùy chỉnh)",
    runners: 2,
    difficulty: 1,
    ledSupport: false,
    innerFrame: "Khớp bánh cóc xoay đa góc độ không sợ trượt rơi",
    accessories: [
      "Đế lục giác modular có thể ghép nối nhiều đế lại",
      "Bộ adapter kẹp lưng và chốt đáy cho mọi dòng HG/RG/SD"
    ],
    description: "Giá đỡ chính hãng Bandai Action Base 5 giúp Gundam của bạn bay lượn, xoay góc chém kiếm hoặc bắn súng trên không cực kỳ vững chãi.",
    featured: false
  },
  {
    id: "tool-topcoat-matte",
    name: "Chai Xịt Phủ Bảo Vệ Mr.Hobby Topcoat Super Clear Matt (Mờ B514)",
    sku: "TOOL-TOPCOAT-MATTE",
    grade: "Tools",
    scale: "Phụ kiện",
    series: "Dụng cụ lắp ráp",
    price: 145000,
    originalPrice: 165000,
    rating: 4.95,
    reviewsCount: 310,
    stock: 35,
    status: "hot",
    image: "assets/tool_topcoat.png",
    gallery: [
      "assets/tool_topcoat.png"
    ],
    height: "100ml",
    runners: 0,
    difficulty: 2,
    ledSupport: false,
    innerFrame: "Sơn bóng/mờ gốc nước (Water-based) không làm chảy nhựa và decal",
    accessories: [
      "1x Chai xịt áp suất 100ml vòi phun sương nano đều mịn"
    ],
    description: "Bí quyết giúp mô hình Gundam trông xịn xò như tượng đúc! Khử sạch độ bóng nhựa rẻ tiền, tạo bề mặt nhám mịn quân sự và khóa chặt decal không bị bong tróc.",
    featured: false
  },

  // --- TINH GIÁP HỒN TƯỚNG (MOTOR NUCLEAR) ---
  {
    id: "mnp-baiqi",
    name: "MNP-XH01 Bạch Khởi (Hổ Phách Viêm Hoàng Bai Qi)",
    sku: "MNP-XH01-BQ",
    grade: "Metal Build",
    scale: "1/72",
    series: "Tinh Giáp Hồn Tướng",
    price: 950000,
    originalPrice: 1100000,
    rating: 5.0,
    reviewsCount: 185,
    stock: 12,
    status: "hot",
    image: "assets/mnp_baiqi.jpg",
    gallery: ["assets/mnp_baiqi.jpg", "assets/mnp_baiqi_2.jpg"],
    height: "22 cm",
    runners: 28,
    difficulty: 4,
    ledSupport: true,
    innerFrame: "Khung kim loại Die-cast Alloy đúc sẵn phối giáp vàng hổ phách & đỏ hỏa diệm",
    accessories: [
      "1x Tam Xoa Kích thần thương ba mũi Băng Tinh Lam",
      "1x Đôi cánh lông vũ Hỏa Diễm bung xòe rực lửa",
      "6x Phi kiếm hoàng kim bay lượn độc lập",
      "2x Kiếm ngắn hộ thân sau hông",
      "1x Giá đỡ Base chuyên dụng dập nổi kim loại"
    ],
    description: "Tuyệt tác Thiên Bạo Tinh Bạch Khởi bản Hổ Phách Viêm Hoàng. Nổi bật với đôi cánh hỏa diệm bùng cháy, vũ khí thương tam xoa băng lam tương phản và dàn 6 phi kiếm uy lực vô song.",
    featured: true
  },
  {
    id: "mnp-caoren",
    name: "MNP-XH02 Tào Nhân (Bạch Dạ Kiêu Phượng Hoàng Cao Ren)",
    sku: "MNP-XH02-CR",
    grade: "Metal Build",
    scale: "1/72",
    series: "Tinh Giáp Hồn Tướng",
    price: 1150000,
    originalPrice: 1300000,
    rating: 4.9,
    reviewsCount: 142,
    stock: 9,
    status: "hot",
    image: "assets/mnp_caoren.jpg",
    gallery: ["assets/mnp_caoren.jpg"],
    height: "24 cm",
    runners: 32,
    difficulty: 4,
    ledSupport: true,
    innerFrame: "Khung hợp kim Die-cast Alloy đúc sẵn phối giáp trắng tuyết & viền vàng hoàng kim",
    accessories: [
      "1x Cánh Phượng Hoàng hiệu ứng lông vũ pha lê xanh tím chuyển màu",
      "1x Cự Kiếm Hoàng Kim chuôi lam bảo ngọc",
      "1x Khiên chắn linh điểu nạm ngọc hồng lam",
      "1x Roi đuôi phụng hoàng kim giáp đa khớp nối",
      "Đế trưng bày chuyên dụng dập nổi logo Dạ Kiêu"
    ],
    description: "Phiên bản Bạch Dạ Kiêu Phượng Hoàng tuyệt mỹ của Tào Nhân. Điểm nhấn là đôi cánh lông vũ pha lê chuyển màu xanh lam - tím băng tuyết lộng lẫy cùng vũ khí cự kiếm hoàng kim sắc sảo.",
    featured: true
  },
  {
    id: "mnp-aobing",
    name: "MNQ-XH03 Ngao Bính (Hàn Đàm Long Vương Ao Bing)",
    sku: "MNQ-XH03-AB",
    grade: "Metal Build",
    scale: "1/72",
    series: "Tinh Giáp Hồn Tướng",
    price: 1050000,
    originalPrice: 1250000,
    rating: 5.0,
    reviewsCount: 320,
    stock: 15,
    status: "hot",
    image: "assets/mnp_aobing.jpg",
    gallery: ["assets/mnp_aobing.jpg"],
    height: "23 cm",
    runners: 36,
    difficulty: 4,
    ledSupport: true,
    innerFrame: "Khung kim loại Die-cast cứng cáp, chịu lực tải Rồng Xanh uốn lượn",
    accessories: [
      "1x Thần Long Đông Hải uốn lượn dài gần 1m",
      "2x Băng Phách Trường Thương ngọc bích",
      "Bộ trụ đỡ sa bàn trong suốt đa khớp",
      "Bộ hiệu ứng Băng Long trong suốt",
      "Đế trưng bày sa bàn Long Vương bát giác"
    ],
    description: "Tuyệt phẩm bán chạy nhất lịch sử Motor Nuclear! Đi kèm thần long Thanh Long uốn lượn với hàng chục khớp nối, kết hợp giáp xanh lam ánh kim lộng lẫy và hiệu ứng thị giác ngoạn mục.",
    featured: true
  },
  {
    id: "mnp-nezha",
    name: "MNP-XH04 Na Tra (Ma Đồng Tam Thái Tử Nezha)",
    sku: "MNP-XH04-NZ",
    grade: "Metal Build",
    scale: "1/72",
    series: "Tinh Giáp Hồn Tướng",
    price: 1200000,
    originalPrice: 1400000,
    rating: 4.95,
    reviewsCount: 260,
    stock: 10,
    status: "hot",
    image: "assets/mnp_nezha.jpg",
    gallery: ["assets/mnp_nezha.jpg", "assets/mnp_nezha_2.jpg"],
    height: "23 cm",
    runners: 35,
    difficulty: 4,
    ledSupport: true,
    innerFrame: "Khung hợp kim Die-cast Alloy 6 tay cơ khí Lục Tí Thần Thông chịu lực cao",
    accessories: [
      "1x Hỏa Tiêm Thương đại trường thương bọc hiệu ứng ngọn lửa",
      "2x Song kiếm Âm Dương (Bạch Kiếm & Hắc Kiếm)",
      "1x Vòng hào quang Càn Khôn hỏa diệm sau lưng",
      "2x Dải lụa Hỗn Thiên Lăng dạng xích cơ giới hoàng kim",
      "Đôi Phong Hỏa Luân lửa xoáy dưới chân",
      "Đế trưng bày hoa sen pha lê ngọc lam (Cyan Crystal Lotus Base)"
    ],
    description: "Hiện thân mecha thần thoại của Tam Thái Tử Na Tra với cơ chế Lục Tí Thần Thông 6 cánh tay chiến đấu. Tích hợp đầy đủ thần binh Hỏa Tiêm Thương, Hỗn Thiên Lăng, Phong Hỏa Luân và đế hoa sen pha lê lộng lẫy.",
    featured: false
  },
  {
    id: "mnp-zhaoyun",
    name: "MNP-XH05 Triệu Vân & Ngọc Lan Bạch Long Câu",
    sku: "MNP-XH05-ZY",
    grade: "Metal Build",
    scale: "1/72",
    series: "Tinh Giáp Hồn Tướng",
    price: 1650000,
    originalPrice: 1950000,
    rating: 5.0,
    reviewsCount: 295,
    stock: 8,
    status: "hot",
    image: "assets/mnp_zhaoyun.jpg",
    gallery: ["assets/mnp_zhaoyun.jpg"],
    height: "24 cm",
    runners: 42,
    difficulty: 5,
    ledSupport: true,
    innerFrame: "Khung kim loại Die-cast hoàn chỉnh cho cả Triệu Vân và Chiến Mã Bạch Long",
    accessories: [
      "1x Chiến Mã Cơ Giới Ngọc Lan Bạch Long Câu (Bờm & Đuôi Pha Lê Băng Lam)",
      "1x Long Đảm Lượng Ngân Thương mũi pha lê xanh siêu dài",
      "1x Thanh kiếm Thanh Cương thếp vàng kim bảo vỏ",
      "Bộ hiệu ứng cánh giáp pha lê băng tuyết trong suốt",
      "Bộ yên cương giáp ngựa mecha và đế trưng bày tạo dáng"
    ],
    description: "Siêu phẩm Thường Thắng Tướng Quân Triệu Tử Long đứng oai phong cùng tuấn mã thần thoại Ngọc Lan Bạch Long Câu. Trang bị vũ khí trường thương mũi pha lê băng lam và kiếm Thanh Cương trứ danh.",
    featured: true
  },
  {
    id: "mnp-lubu",
    name: "MNP-XH06 Lữ Bố & Xích Thố (Xích Diễm Hỏa Long Câu)",
    sku: "MNP-XH06-LB",
    grade: "Metal Build",
    scale: "1/72",
    series: "Tinh Giáp Hồn Tướng",
    price: 1850000,
    originalPrice: 2200000,
    rating: 5.0,
    reviewsCount: 310,
    stock: 6,
    status: "hot",
    image: "assets/mnp_lubu.jpg",
    gallery: ["assets/mnp_lubu.jpg"],
    height: "26 cm",
    runners: 46,
    difficulty: 5,
    ledSupport: true,
    innerFrame: "Khung hợp kim hạng nặng Super Heavy Alloy Inner Frame",
    accessories: [
      "1x Chiến Mã Cơ Giáp Xích Diễm Hỏa Long Câu (Xích Thố)",
      "1x Phương Thiên Họa Kích cơ khí sắc bén",
      "1x Áo choàng vải đen thêu rồng kim tuyến",
      "Lông trĩ đỏ ma thần Chi Vưu dài 35cm",
      "Đế trưng bày tạo dáng chiến mã lồng vó chuyên dụng"
    ],
    description: "Chiến thần vô song Lữ Bố Phụng Tiên cưỡi chiến mã cơ giới Xích Diễm Hỏa Long Câu (Xích Thố) dũng mãnh. Trang bị áo choàng dạ chiến cao cấp cùng khung xương kim loại Die-cast siêu trường uy lực áp đảo.",
    featured: true
  },
  {
    id: "mnp-ganjiang",
    name: "MNP-XH07 Can Tương & Mạc Tà (Kiếm Sư Tinh Giáp Gan Jiang)",
    sku: "MNP-XH07-GJ",
    grade: "Metal Build",
    scale: "1/72",
    series: "Tinh Giáp Hồn Tướng",
    price: 980000,
    originalPrice: 1150000,
    rating: 4.85,
    reviewsCount: 110,
    stock: 14,
    status: "new",
    image: "assets/mnp_ganjiang.jpg",
    gallery: ["assets/mnp_ganjiang.jpg", "assets/mnp_ganjiang_2.jpg"],
    height: "21 cm",
    runners: 26,
    difficulty: 3,
    ledSupport: false,
    innerFrame: "Khung kim loại Die-cast Alloy linh hoạt tối ưu hóa biên độ kiếm thuật",
    accessories: [
      "1x Cánh cơ khí Xích Diễm Vũ (Crimson Wing Blades) có thể tách thành dàn phi kiếm",
      "1x Thần kiếm Can Tương chuôi rồng khắc ấn",
      "1x Thần kiếm Mạc Tà cự đao",
      "2x Đoản kiếm hộ thân sau lưng",
      "Đế trưng bày hành động đa khớp chuyên dụng"
    ],
    description: "Tuyệt phẩm kiếm sư Can Tương trong vũ trụ Tinh Giáp Hồn Tướng. Nổi bật với đôi cánh cơ khí đỏ rực có thể tách rời thành dàn phi kiếm tầm xa và song kiếm huyền thoại Can Tương - Mạc Tà.",
    featured: false
  },
  {
    id: "mnp-weiyuanshi",
    name: "MNP-XH08 Uy Viễn Thức (Cấm Vệ Quân Wei Yuan Shi)",
    sku: "MNP-XH08-WYS",
    grade: "Metal Build",
    scale: "1/72",
    series: "Tinh Giáp Hồn Tướng",
    price: 750000,
    originalPrice: 890000,
    rating: 4.8,
    reviewsCount: 165,
    stock: 20,
    status: "hot",
    image: "assets/mnp_weiyuanshi.jpg",
    gallery: ["assets/mnp_weiyuanshi.jpg"],
    height: "20 cm",
    runners: 24,
    difficulty: 3,
    ledSupport: false,
    innerFrame: "Khung kim loại Alloy đúc sẵn bền bỉ, dễ lắp ráp",
    accessories: [
      "Khiên phòng ngự đầu sư tử mạ vàng",
      "Đại đao chém sắt",
      "Chùy Kim Qua hoàng gia",
      "Nhiều mặt nạ thay thế"
    ],
    description: "Mẫu cơ giáp Cấm Vệ Quân của hoàng gia với phối màu trắng vàng trang nhã, vũ khí đa dạng và độ bền khung kim loại vượt trội trong tầm giá.",
    featured: false
  },
  {
    id: "mnq-wukong",
    name: "MNQ-XH08 Tôn Ngộ Không (Tề Thiên Đại Thánh Wukong)",
    sku: "MNQ-XH08-WK",
    grade: "Metal Build",
    scale: "1/72",
    series: "Tinh Giáp Hồn Tướng",
    price: 2450000,
    originalPrice: 2800000,
    rating: 5.0,
    reviewsCount: 450,
    stock: 5,
    status: "hot",
    image: "assets/mnp_wukong.jpg",
    gallery: [
      "assets/mnp_wukong.jpg",
      "assets/mnp_wukong_2.jpg",
      "assets/mnp_wukong_3.jpg"
    ],
    height: "28 cm",
    runners: 0,
    difficulty: 0,
    ledSupport: true,
    innerFrame: "Mô hình hoàn thiện đúc kim loại Die-cast nguyên khối nặng tay",
    accessories: [
      "Định Hải Thần Châm Như Ý Kim Cô Bổng mạ vàng thật",
      "Hiệu ứng Cân Đẩu Vân mecha",
      "Bộ giáp Tỏa Tử Hoàng Kim Giáp",
      "Mũ Phụng Dực Tử Kim Quán"
    ],
    description: "Bản hoàn thiện cao cấp Metal Build của Mỹ Hầu Vương Tôn Ngộ Không. Sơn phủ kim loại đa sắc rực rỡ, gậy như ý có thể kéo dài thu ngắn uy lực vô biên.",
    featured: true
  },
  {
    id: "mnp-moliqing",
    name: "MNP-XH14 Ma Lễ Thanh (Trì Quốc Thiên Vương Mo Liqing)",
    sku: "MNP-XH14-MLQ",
    grade: "Metal Build",
    scale: "1/72",
    series: "Tinh Giáp Hồn Tướng",
    price: 1350000,
    originalPrice: 1550000,
    rating: 4.9,
    reviewsCount: 135,
    stock: 11,
    status: "new",
    image: "assets/mnp_moliqing.jpg",
    gallery: ["assets/mnp_moliqing.jpg"],
    height: "25 cm",
    runners: 38,
    difficulty: 5,
    ledSupport: true,
    innerFrame: "Khung xương kim loại siêu trường chịu lực cho thần kiếm khổng lồ",
    accessories: [
      "Thanh Vân Bảo Kiếm dài hơn 30cm",
      "Bộ giáp vai đầu ma thần uy nghiêm",
      "Pháo phản lực hạng nặng",
      "Đế trưng bày chiến trường Thiên Vương"
    ],
    description: "Vị tướng khổng lồ trong Tứ Đại Thiên Vương. Sở hữu thanh kiếm Thanh Vân Kiếm ma khí cuồng bạo xé toạc không gian, chi tiết giáp nhiều tầng cực kỳ công phu.",
    featured: false
  }
];

// Danh sách mã khuyến mãi (Coupons)
const COUPONS = {
  "GUNDAM10": {
    code: "GUNDAM10",
    discountPercent: 10,
    maxDiscount: 500000,
    minOrder: 500000,
    description: "Giảm 10% tối đa 500.000đ cho đơn từ 500k"
  },
  "FREESHIP": {
    code: "FREESHIP",
    freeShipping: true,
    minOrder: 300000,
    description: "Miễn phí vận chuyển toàn quốc cho đơn từ 300k"
  },
  "BUILDER50K": {
    code: "BUILDER50K",
    discountAmount: 50000,
    minOrder: 400000,
    description: "Giảm trực tiếp 50.000đ cho đơn hàng từ 400k"
  },
  "MECHA20": {
    code: "MECHA20",
    discountPercent: 20,
    maxDiscount: 1000000,
    minOrder: 2000000,
    description: "Giảm 20% tối đa 1.000.000đ cho đơn từ 2 triệu (Vip Builder)"
  }
};

// Dữ liệu so sánh cấp độ Gunpla (Grade Comparison)
const GRADE_SCALES = [
  {
    grade: "SD (Super Deformed)",
    scale: "Non-Scale",
    height: "8 - 10 cm",
    runners: "3 - 6 vỉ",
    innerFrame: "Đơn giản / Khung SDCS",
    difficulty: "★☆☆☆☆ (Rất dễ - 30 phút)",
    priceRange: "120.000đ - 300.000đ",
    color: "#ff007f",
    description: "Thiết kế chibi đầu to thân nhỏ đáng yêu, nhiều màu sắc, cực kỳ thích hợp cho người mới bắt đầu hoặc trang trí bàn làm việc.",
    recommendedFor: "Người mới bắt đầu, trẻ em, quà tặng bàn làm việc"
  },
  {
    grade: "HG (High Grade)",
    scale: "1/144",
    height: "13 cm",
    runners: "6 - 12 vỉ",
    innerFrame: "Không có hoặc khung cơ bản",
    difficulty: "★★☆☆☆ (Dễ - 1-2 giờ)",
    priceRange: "300.000đ - 800.000đ",
    color: "#00f0ff",
    description: "Dòng sản phẩm phổ biến nhất thế giới! Đa dạng mẫu mã nhất từ mọi series anime, giá thành hợp lý, lắp ráp nhanh chóng.",
    recommendedFor: "Mọi cấp độ builder, người thích sưu tập số lượng lớn"
  },
  {
    grade: "RG (Real Grade)",
    scale: "1/144",
    height: "13 - 15 cm",
    runners: "10 - 16 vỉ",
    innerFrame: "Advanced MS Joint siêu chi tiết",
    difficulty: "★★★★☆ (Khá khó - 4-6 giờ)",
    priceRange: "700.000đ - 1.400.000đ",
    color: "#ffaa00",
    description: "Chi tiết của MG thu nhỏ trong lòng bàn tay 1/144! Khung xương cơ khí cực kỳ tinh xảo, phân tách màu sắc giáp đỉnh cao.",
    recommendedFor: "Builder yêu thích độ chi tiết sắc sảo và cơ khí hiện đại"
  },
  {
    grade: "MG (Master Grade)",
    scale: "1/100",
    height: "18 - 22 cm",
    runners: "15 - 25 vỉ",
    innerFrame: "Khung xương đầy đủ toàn thân (Full Inner Frame)",
    difficulty: "★★★★☆ (Nâng cao - 6-10 giờ)",
    priceRange: "900.000đ - 3.500.000đ",
    color: "#00ff88",
    description: "Tiêu chuẩn vàng của Gunpla. Kích thước 18cm đầm tay, khung xương kim loại/piston hoạt động chân thực, mở buồng lái và giáp hatch.",
    recommendedFor: "Builder muốn trải nghiệm cảm giác cơ khí chế tác đích thực"
  },
  {
    grade: "PG (Perfect Grade)",
    scale: "1/60",
    height: "30 - 35 cm",
    runners: "35 - 55 vỉ",
    innerFrame: "Khung xương đa lớp (Multi-layer Frame), Đèn LED",
    difficulty: "★★★★★ (Chuyên gia - 15-30 giờ)",
    priceRange: "4.500.000đ - 8.500.000đ",
    color: "#bf00ff",
    description: "Đỉnh cao tuyệt đối của nghệ thuật mô hình Bandai. Khổng lồ 30cm, hệ thống đèn LED phát sáng, hàng nghìn chi tiết kim loại etching.",
    recommendedFor: "Người sưu tập cao cấp, tâm điểm của căn phòng"
  },
  {
    grade: "Metal Build",
    scale: "1/100 Die-cast",
    height: "19 - 22 cm",
    runners: "Mô hình đúc sẵn",
    innerFrame: "Hợp kim kẽm / Die-cast kim loại đúc nguyên khối",
    difficulty: "☆☆☆☆☆ (Mô hình thành phẩm hoàn thiện)",
    priceRange: "6.000.000đ - 15.000.000đ+",
    color: "#ff3366",
    description: "Tượng sưu tập thành phẩm cao cấp với khung xương kim loại nặng trịch, nước sơn phủ cao cấp không tì vết từ Tamashii Nations.",
    recommendedFor: "Nhà sưu tập nghệ thuật mô hình mecha đích thực"
  }
];

// Cẩm nang Gunpla Academy cho Builder
const ACADEMY_GUIDES = [
  {
    title: "1. Kỹ Thuật Cắt Part 2 Lần (Two-cut Method)",
    icon: "✂️",
    summary: "Bí quyết cắt mô hình không bao giờ để lại ghẻ trắng (Stress Mark) trên nhựa.",
    content: "Lần 1: Dùng kìm cắt cách chân cổng (gate) khoảng 1-2mm để tách part khỏi vỉ runner mà không truyền lực bẻ cong nhựa. Lần 2: Đưa kìm sát phẳng bề mặt part và bấm nhẹ nhàng dứt khoát. Nhựa sẽ phẳng mịn tự nhiên."
  },
  {
    title: "2. Gọt Bavia & Xử Lý Vết Cắt Nhựa",
    icon: "🔪",
    summary: "Làm phẳng tuyệt đối bề mặt nhựa sau khi bấm kìm.",
    content: "Dùng dao trổ nghệ thuật (Art Knife) đặt góc 30-45 độ, miết nhẹ gọt từng lát mỏng phần nhựa thừa còn sót lại. Không đè mạnh để tránh xước vào thân part."
  },
  {
    title: "3. Nghệ Thuật Kẻ Lằn Chìm (Panel Lining)",
    icon: "🖊️",
    summary: "Thổi hồn và độ sâu cơ khí 3D cho mô hình Gundam.",
    content: "Sử dụng bút kẻ lằn Gundam Marker Pour Type GM01 chấm vào các rãnh giáp. Mực mao dẫn sẽ tự động chảy dọc rãnh. Đợi 10 giây cho khô rồi dùng gôm hoặc tăm bông tẩm chút cồn lau sạch vết lem bên ngoài."
  },
  {
    title: "4. Dán Decal Nước & Decal Kim Loại (Water Slide Decals)",
    icon: "🏷️",
    summary: "Tạo dấu ấn quân sự và ký hiệu cảnh báo Mech chân thực.",
    content: "Cắt decal cần dán, ngâm vào chén nước ấm 10-15 giây. Khi decal trượt nhẹ khỏi giấy nền, dùng nhíp gắp đặt lên mô hình. Thấm khô bằng tăm bông và quét dung dịch Mr. Mark Softer để decal ôm khít đường cong."
  },
  {
    title: "5. Xịt Phủ Topcoat Khóa Màu & Chống Xước",
    icon: "🎨",
    summary: "Khử ánh nhựa bóng đồ chơi, mang lại chất liệu nhám mịn đẳng cấp.",
    content: "Lắc đều chai Topcoat Matte trong 1 phút. Để bình xịt cách mô hình 20-25cm, quét ngang nhẹ nhàng thành từng lớp mỏng trong ngày nắng ráo (tránh ngày mưa ẩm để không bị mờ trắng bề mặt)."
  }
];

// Đánh giá phản hồi khách hàng (Builder Reviews)
const CUSTOMER_REVIEWS = [
  {
    name: "Nguyễn Tuấn Anh (Pro Builder)",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
    rating: 5,
    kit: "PG Unleashed RX-78-2 Gundam",
    comment: "Đóng gói bọc 4 lớp bóng khí siêu dày, hộp không móp dù chỉ 1 góc nhỏ! PGU lắp quá đã, đèn LED buồng lái đỉnh cao!",
    date: "25/08/2026"
  },
  {
    name: "Trần Minh Hoàng",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80",
    rating: 5,
    kit: "RG 1/144 Hi-Nu Gundam",
    comment: "Giao hàng siêu nhanh chỉ 2 tiếng tại nội thành! RG Hi-Nu biên độ khớp và giáp đa tầng đỉnh nhất mình từng ráp.",
    date: "22/08/2026"
  },
  {
    name: "Lê Quốc Bảo",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80",
    rating: 5,
    kit: "Kìm GodHand SPN-120 + HG Calibarn",
    comment: "Kìm GodHand cắt ngọt lịm không để lại một vệt ghẻ nào, Calibarn permmet score 8+ chổi phù thủy cực ngầu!",
    date: "19/08/2026"
  }
];
