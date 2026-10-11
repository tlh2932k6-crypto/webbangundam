-- =========================================================================
-- MECHA CORE - DATABASE SCRIPT FOR MICROSOFT SQL SERVER 2022
-- Vũ Trụ Mô Hình Gundam & Gunpla Store Việt Nam
-- =========================================================================

USE master;
GO

-- 1. TẠO CƠ SỞ DỮ LIỆU
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'MechaCoreDB')
BEGIN
    CREATE DATABASE [MechaCoreDB] COLLATE SQL_Latin1_General_CP1_CI_AS;
    PRINT N'>> Đã tạo mới cơ sở dữ liệu MechaCoreDB thành công.';
END
ELSE
BEGIN
    PRINT N'>> Cơ sở dữ liệu MechaCoreDB đã tồn tại. Đang cập nhật dữ liệu...';
END
GO

USE [MechaCoreDB];
GO

-- 2. XÓA BẢNG CŨ NẾU ĐÃ TỒN TẠI (THEO THỨ TỰ RÀNG BUỘC KHÓA NGOẠI)
IF OBJECT_ID('dbo.OrderItems', 'U') IS NOT NULL DROP TABLE dbo.OrderItems;
IF OBJECT_ID('dbo.Orders', 'U') IS NOT NULL DROP TABLE dbo.Orders;
IF OBJECT_ID('dbo.ProductAccessories', 'U') IS NOT NULL DROP TABLE dbo.ProductAccessories;
IF OBJECT_ID('dbo.ProductGallery', 'U') IS NOT NULL DROP TABLE dbo.ProductGallery;
IF OBJECT_ID('dbo.Products', 'U') IS NOT NULL DROP TABLE dbo.Products;
IF OBJECT_ID('dbo.Grades', 'U') IS NOT NULL DROP TABLE dbo.Grades;
IF OBJECT_ID('dbo.Coupons', 'U') IS NOT NULL DROP TABLE dbo.Coupons;
IF OBJECT_ID('dbo.AcademyGuides', 'U') IS NOT NULL DROP TABLE dbo.AcademyGuides;
IF OBJECT_ID('dbo.CustomerReviews', 'U') IS NOT NULL DROP TABLE dbo.CustomerReviews;
IF OBJECT_ID('dbo.Users', 'U') IS NOT NULL DROP TABLE dbo.Users;
GO

-- 3. TẠO CÁC BẢNG QUAN HỆ

-- 3.1. Bảng Phân hạng Cấp độ Gunpla (Grades)
CREATE TABLE dbo.Grades (
    GradeId NVARCHAR(20) PRIMARY KEY, -- 'PG', 'MG', 'RG', 'HG', 'SD', 'Metal Build', 'Tools'
    GradeName NVARCHAR(100) NOT NULL,
    ScaleRatio NVARCHAR(50) NOT NULL,
    HeightRange NVARCHAR(50) NOT NULL,
    RunnersRange NVARCHAR(50) NOT NULL,
    Difficulty NVARCHAR(100) NOT NULL,
    PriceRange NVARCHAR(100) NOT NULL,
    AccentColor NVARCHAR(20) NOT NULL,
    Description NVARCHAR(MAX) NULL,
    RecommendedFor NVARCHAR(255) NULL
);
GO

-- 3.2. Bảng Danh mục Sản phẩm Mô hình & Phụ kiện (Products)
CREATE TABLE dbo.Products (
    ProductId NVARCHAR(50) PRIMARY KEY,
    Name NVARCHAR(255) NOT NULL,
    SKU NVARCHAR(50) NOT NULL UNIQUE,
    GradeId NVARCHAR(20) NOT NULL FOREIGN KEY REFERENCES dbo.Grades(GradeId),
    Scale NVARCHAR(50) NOT NULL,
    Series NVARCHAR(100) NOT NULL,
    Price DECIMAL(18, 0) NOT NULL,
    OriginalPrice DECIMAL(18, 0) NULL,
    Rating DECIMAL(3, 2) NOT NULL DEFAULT 5.0,
    ReviewsCount INT NOT NULL DEFAULT 0,
    Stock INT NOT NULL DEFAULT 0,
    Status NVARCHAR(20) NOT NULL DEFAULT 'normal', -- 'hot', 'new', 'sale', 'preorder'
    Image NVARCHAR(500) NOT NULL,
    Height NVARCHAR(50) NOT NULL,
    Runners INT NOT NULL DEFAULT 0,
    Difficulty INT NOT NULL DEFAULT 3,
    LedSupport BIT NOT NULL DEFAULT 0,
    InnerFrame NVARCHAR(500) NULL,
    Description NVARCHAR(MAX) NULL,
    Featured BIT NOT NULL DEFAULT 0,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE()
);
GO

CREATE INDEX IX_Products_GradeId ON dbo.Products(GradeId);
CREATE INDEX IX_Products_Series ON dbo.Products(Series);
CREATE INDEX IX_Products_Price ON dbo.Products(Price);
GO

-- 3.3. Bảng Bộ sưu tập Ảnh sản phẩm (ProductGallery)
CREATE TABLE dbo.ProductGallery (
    GalleryId INT IDENTITY(1,1) PRIMARY KEY,
    ProductId NVARCHAR(50) NOT NULL FOREIGN KEY REFERENCES dbo.Products(ProductId) ON DELETE CASCADE,
    ImageUrl NVARCHAR(500) NOT NULL,
    DisplayOrder INT NOT NULL DEFAULT 0
);
GO

CREATE INDEX IX_ProductGallery_ProductId ON dbo.ProductGallery(ProductId);
GO

-- 3.4. Bảng Trang bị / Phụ kiện đính kèm Kit (ProductAccessories)
CREATE TABLE dbo.ProductAccessories (
    AccessoryId INT IDENTITY(1,1) PRIMARY KEY,
    ProductId NVARCHAR(50) NOT NULL FOREIGN KEY REFERENCES dbo.Products(ProductId) ON DELETE CASCADE,
    AccessoryName NVARCHAR(255) NOT NULL
);
GO

CREATE INDEX IX_ProductAccessories_ProductId ON dbo.ProductAccessories(ProductId);
GO

-- 3.5. Bảng Mã giảm giá (Coupons)
CREATE TABLE dbo.Coupons (
    Code NVARCHAR(50) PRIMARY KEY,
    DiscountPercent DECIMAL(5, 2) NOT NULL DEFAULT 0,
    DiscountAmount DECIMAL(18, 0) NOT NULL DEFAULT 0,
    MaxDiscount DECIMAL(18, 0) NULL,
    MinOrder DECIMAL(18, 0) NOT NULL DEFAULT 0,
    FreeShipping BIT NOT NULL DEFAULT 0,
    Description NVARCHAR(255) NULL,
    IsActive BIT NOT NULL DEFAULT 1
);
GO

-- 3.6. Bảng Tài khoản Người dùng & Đăng nhập (Users)
CREATE TABLE dbo.Users (
    UserId INT IDENTITY(1,1) PRIMARY KEY,
    Username NVARCHAR(50) NOT NULL UNIQUE,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    Password NVARCHAR(255) NOT NULL,
    FullName NVARCHAR(100) NOT NULL,
    Phone NVARCHAR(20) NULL,
    Address NVARCHAR(255) NULL,
    Role NVARCHAR(20) NOT NULL DEFAULT 'user', -- 'user', 'admin'
    Avatar NVARCHAR(500) NOT NULL DEFAULT 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE()
);
GO

-- 3.7. Bảng Đơn đặt hàng (Orders)
CREATE TABLE dbo.Orders (
    OrderId NVARCHAR(50) PRIMARY KEY,
    UserId INT NULL FOREIGN KEY REFERENCES dbo.Users(UserId) ON DELETE SET NULL,
    CustomerName NVARCHAR(100) NOT NULL,
    Phone NVARCHAR(20) NOT NULL,
    Address NVARCHAR(500) NOT NULL,
    Subtotal DECIMAL(18, 0) NOT NULL,
    Discount DECIMAL(18, 0) NOT NULL DEFAULT 0,
    ShippingFee DECIMAL(18, 0) NOT NULL DEFAULT 0,
    TotalAmount DECIMAL(18, 0) NOT NULL,
    PaymentMethod NVARCHAR(50) NOT NULL DEFAULT 'qr_bank',
    OrderStatus NVARCHAR(100) NOT NULL DEFAULT N'Đang đóng gói & chuẩn bị vận chuyển',
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE()
);
GO

-- 3.7. Bảng Chi tiết Đơn đặt hàng (OrderItems)
CREATE TABLE dbo.OrderItems (
    OrderItemId INT IDENTITY(1,1) PRIMARY KEY,
    OrderId NVARCHAR(50) NOT NULL FOREIGN KEY REFERENCES dbo.Orders(OrderId) ON DELETE CASCADE,
    ProductId NVARCHAR(50) NULL FOREIGN KEY REFERENCES dbo.Products(ProductId) ON DELETE SET NULL,
    ProductName NVARCHAR(255) NOT NULL,
    Price DECIMAL(18, 0) NOT NULL,
    Quantity INT NOT NULL DEFAULT 1,
    Subtotal DECIMAL(18, 0) NOT NULL
);
GO

CREATE INDEX IX_OrderItems_OrderId ON dbo.OrderItems(OrderId);
GO

-- 3.8. Bảng Hướng dẫn Gunpla Academy
CREATE TABLE dbo.AcademyGuides (
    GuideId INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(255) NOT NULL,
    Icon NVARCHAR(20) NOT NULL,
    Summary NVARCHAR(500) NOT NULL,
    Content NVARCHAR(MAX) NOT NULL,
    DisplayOrder INT NOT NULL DEFAULT 0
);
GO

-- 3.9. Bảng Đánh giá của Khách hàng (CustomerReviews)
CREATE TABLE dbo.CustomerReviews (
    ReviewId INT IDENTITY(1,1) PRIMARY KEY,
    CustomerName NVARCHAR(100) NOT NULL,
    AvatarUrl NVARCHAR(500) NOT NULL,
    Rating INT NOT NULL DEFAULT 5,
    PurchasedKit NVARCHAR(255) NOT NULL,
    Comment NVARCHAR(MAX) NOT NULL,
    ReviewDate NVARCHAR(50) NOT NULL
);
GO

-- =========================================================================
-- 4. NẠP DỮ LIỆU BAN ĐẦU (SEED DATA)
-- =========================================================================

-- 4.1. Nạp bảng Grades
INSERT INTO dbo.Grades (GradeId, GradeName, ScaleRatio, HeightRange, RunnersRange, Difficulty, PriceRange, AccentColor, Description, RecommendedFor) VALUES
('SD', N'SD (Super Deformed)', N'Non-Scale', N'8 - 10 cm', N'3 - 6 vỉ', N'★☆☆☆☆ (Rất dễ - 30 phút)', N'120.000đ - 300.000đ', '#ff007f', N'Thiết kế chibi đầu to thân nhỏ đáng yêu, nhiều màu sắc, cực kỳ thích hợp cho người mới bắt đầu hoặc trang trí bàn làm việc.', N'Người mới bắt đầu, trẻ em, quà tặng bàn làm việc'),
('HG', N'HG (High Grade)', N'1/144', N'13 cm', N'6 - 12 vỉ', N'★★☆☆☆ (Dễ - 1-2 giờ)', N'300.000đ - 800.000đ', '#00f0ff', N'Dòng sản phẩm phổ biến nhất thế giới! Đa dạng mẫu mã nhất từ mọi series anime, giá thành hợp lý, lắp ráp nhanh chóng.', N'Mọi cấp độ builder, người thích sưu tập số lượng lớn'),
('RG', N'RG (Real Grade)', N'1/144', N'13 - 15 cm', N'10 - 16 vỉ', N'★★★★☆ (Khá khó - 4-6 giờ)', N'700.000đ - 1.400.000đ', '#ffaa00', N'Chi tiết của MG thu nhỏ trong lòng bàn tay 1/144! Khung xương cơ khí cực kỳ tinh xảo, phân tách màu sắc giáp đỉnh cao.', N'Người chơi đã có kinh nghiệm, yêu thích chi tiết cơ khí sắc sảo'),
('MG', N'MG (Master Grade)', N'1/100', N'18 - 23 cm', N'15 - 25 vỉ', N'★★★★☆ (Nâng cao - 6-10 giờ)', N'1.100.000đ - 2.500.000đ', '#00ff88', N'Tỷ lệ vàng 1/100 với khung xương hoàn chỉnh (Inner Frame), piston xi lanh chuyển động thực và cơ chế mở buồng lái phi công.', N'Builder đam mê độ chi tiết cao, thích trưng bày kích thước ấn tượng'),
('PG', N'PG (Perfect Grade)', N'1/60', N'30 - 35 cm', N'35 - 50 vỉ', N'★★★★★ (Bậc thầy - 15-30 giờ)', N'4.500.000đ - 8.000.000đ', '#b026ff', N'Đỉnh cao chế tác Gunpla của Bandai! Tích hợp đèn LED, kim loại đúc, hàng nghìn chi tiết mở hatch khoang bảo trì.', N'Nhà sưu tập chuyên nghiệp, tâm điểm của mọi tủ kính trưng bày'),
('Metal Build', N'Metal Build', N'1/100 (Die-cast)', N'19 - 22 cm', N'0 vỉ (Đúc sẵn)', N'Hoàn thiện cao cấp', N'6.000.000đ - 12.000.000đ', '#ffdd00', N'Dòng figure thành phẩm cao cấp nhất từ Bandai Tamashii Nations. Khung xương kim loại Die-cast nặng tay, sơn kim loại phủ tĩnh điện.', N'Nhà sưu tập cao cấp yêu thích mô hình kim loại đúc sẵn nguyên khối'),
('Tools', N'Dụng Cụ & Phụ Kiện', N'Phụ kiện', N'Đa kích thước', N'Dụng cụ', N'Dễ sử dụng', N'50.000đ - 1.500.000đ', '#00f0ff', N'Kìm cắt chuyên dụng, bút kẻ lằn, dao gọt bavia và phụ kiện hỗ trợ builder ráp Gunpla chuẩn xác.', N'Mọi Builder từ mới bắt đầu đến chuyên nghiệp');
GO

-- 4.2. Nạp bảng Products
INSERT INTO dbo.Products (ProductId, Name, SKU, GradeId, Scale, Series, Price, OriginalPrice, Rating, ReviewsCount, Stock, Status, Image, Height, Runners, Difficulty, LedSupport, InnerFrame, Description, Featured) VALUES
('pgu-rx78', N'PG Unleashed 1/60 RX-78-2 Gundam', N'PGU-7802', 'PG', N'1/60', N'Universal Century', 6250000, 6900000, 5.0, 142, 8, 'hot', 'assets/pg_rx78.jpg', N'30 cm', 45, 5, 1, N'Khung xương 5 lớp Metal Inserted Molding & Etching Decal', N'Đỉnh cao công nghệ Gunpla 40 năm của Bandai. Khung xương cơ khí đa lớp chi tiết chân thực với kim loại etching, giáp mở hatch, đèn LED RGB buồng lái và ngực tinh xảo.', 1),
('pg-strike-freedom', N'PG 1/60 ZGMF-X20A Strike Freedom Gundam', N'PG-20A-SF', 'PG', N'1/60', N'Gundam SEED Destiny', 5800000, 6200000, 4.9, 98, 5, 'sale', 'assets/pg_strike_freedom.jpg', N'32 cm', 42, 5, 1, N'Khung xương mạ vàng Gold Extra Finish siêu phản quang', N'Bộ giáp cánh vàng kim rực rỡ cùng hệ thống Super DRAGOON trứ danh của Kira Yamato. Tỷ lệ 1/60 hoành tráng làm tâm điểm của mọi bộ sưu tập.', 1),
('pg-exia-lighting', N'PG 1/60 GN-001 Gundam Exia Lighting Model', N'PG-001-EXIA', 'PG', N'1/60', N'Gundam 00', 6600000, 7200000, 4.95, 76, 3, 'hot', 'assets/pg_exia.jpg', N'30 cm', 40, 5, 1, N'Hệ thống cáp quang dẫn sáng GN Hạt chuyển màu Xanh -> Đỏ (Trans-Am)', N'Phiên bản Lighting Model với hệ thống LED chuyển đổi trạng thái năng lượng Hạt GN từ xanh lục bí ẩn sang đỏ rực Trans-Am bùng nổ.', 0),
('mgex-strike-freedom', N'MGEX 1/100 Strike Freedom Gundam Extreme Metallic', N'MGEX-SF-100', 'MG', N'1/100', N'Gundam SEED Destiny', 3450000, 3800000, 5.0, 215, 12, 'hot', 'assets/mgex_strike_freedom.jpg', N'19 cm', 28, 4, 0, N'Khung xương 3 lớp phối 3 sắc thái vàng Gold Coating, Copper Gold & Metallic 3D Stickers', N'Siêu phẩm MGEX tái định nghĩa nghệ thuật sơn mạ kim loại Metallic Extreme. 3 sắc thái mạ vàng kết hợp ăn khớp tạo độ sâu thị giác đỉnh cao.', 1),
('mg-barbatos', N'MG 1/100 ASW-G-08 Gundam Barbatos 4th Form', N'MG-BARB-08', 'MG', N'1/100', N'Iron-Blooded Orphans', 1150000, 1300000, 4.9, 180, 20, 'hot', 'assets/mg_barbatos.jpg', N'18 cm', 16, 4, 0, N'Gundam Frame tái hiện đầy đủ xi lanh thủy lực mạ chrome mượt mà', N'Bộ khung Gundam Frame tái hiện chi tiết piston thủy lực chuyển động thật nhịp nhàng. Vũ khí đại chùy hầm hố của Mikazuki Augus.', 1),
('mg-sazabi-verka', N'MG 1/100 MSN-04 Sazabi Ver.Ka', N'MG-SAZABI-VK', 'MG', N'1/100', N'Universal Century', 2150000, 2400000, 5.0, 230, 6, 'sale', 'assets/mg_sazabi.jpg', N'23 cm', 31, 4, 1, N'Khung xương cỡ lớn với cơ chế mở giáp Open Hatch toàn thân', N'Tuyệt phẩm của nhà thiết kế huyền thoại Hajime Katoki. Mobile Suit tối thượng của Char Aznable với cơ cấu mở giáp lộ khung xương cơ khí đồ sộ.', 1),
('mg-nu-gundam-verka', N'MG 1/100 RX-93 Nu Gundam Ver.Ka', N'MG-NUGUN-VK', 'MG', N'1/100', N'Universal Century', 1850000, 2050000, 4.95, 190, 9, 'hot', 'assets/mg_nu_gundam.jpg', N'22 cm', 26, 4, 1, N'Khung Psycho Frame giấu bên trong tỏa sáng qua khe giáp', N'Đối thủ truyền kiếp của Sazabi do chính Amuro Ray điều khiển. Tích hợp cơ chế trượt giáp kích hoạt Psycho Frame tỏa sáng ấn tượng.', 0),
('mg-wing-zero-verka', N'MG 1/100 Wing Gundam Zero EW Ver.Ka', N'MG-WING-EWVK', 'MG', N'1/100', N'Gundam Wing', 1450000, 1650000, 4.9, 165, 15, 'new', 'assets/mg_wing_zero.jpg', N'18 cm', 19, 4, 0, N'Khung xương thế hệ mới cho phép biến hình dạng Neo Bird Mode mượt mà', N'Cánh thiên thần dang rộng tuyệt đẹp trong phim Endless Waltz, thiết kế Ver.Ka bổ sung tính năng cất giữ Twin Buster Rifle bên trong cánh.', 0),
('rg-hinu', N'RG 1/144 Hi-Nu Gundam', N'RG-36-HINU', 'RG', N'1/144', N'Universal Century', 1180000, 1350000, 5.0, 310, 18, 'hot', 'assets/rg_hinu.jpg', N'14.5 cm', 13, 4, 0, N'Advanced MS Joint kết hợp phân tách giáp đa tầng đỉnh cao thế hệ mới', N'Được mệnh danh là ''RG vĩ đại nhất lịch sử''. Biên độ cử động không tưởng, phân chia màu giáp 3 tông tím - xanh đậm - trắng xuất sắc.', 1),
('rg-god-gundam', N'RG 1/144 God Gundam (Burning Gundam)', N'RG-37-GOD', 'RG', N'1/144', N'Mobile Fighter G Gundam', 950000, 1100000, 4.9, 145, 10, 'hot', 'assets/rg_god.jpg', N'13 cm', 11, 3, 0, N'Cấu trúc khớp võ thuật linh hoạt gấp uốn như cơ thể người thật', N'Vua võ thuật Mobile Fighter! Khớp chân xoạc 180 độ, gập ngực, bẻ cổ chân linh hoạt mô phỏng mọi thế võ võ hiệp kinh điển của Domon Kasshu.', 0),
('rg-epyon', N'RG 1/144 Gundam Epyon', N'RG-38-EPYON', 'RG', N'1/144', N'Gundam Wing', 1050000, 1200000, 4.85, 88, 14, 'new', 'assets/rg_epyon.jpg', N'13.5 cm', 12, 4, 0, N'Hệ thống khớp trục đùi uốn lượn và biến hình song long phi hành', N'Kỵ sĩ rồng bóng đêm Epyon của Zechs Merquise. Cây roi nhiệt Heat Rod uốn lượn đa khớp cực kỳ sống động và thanh Beam Sword khổng lồ.', 0),
('hg-calibarn', N'HG 1/144 Gundam Calibarn', N'HG-WFM-26', 'HG', N'1/144', N'Witch from Mercury', 520000, 590000, 4.95, 420, 25, 'hot', 'assets/hg_calibarn.jpg', N'13 cm', 8, 2, 0, N'Công nghệ ép khuôn In-Mold Molding đổi màu lấp lánh cầu vồng Permet Score 8+', N'Mô hình tâm điểm của kết thúc ''Phù Thủy Sao Thủy''. Cây súng chổi Variable Rod Rifle độc nhất vô nhị cùng hiệu ứng Permet cầu vồng rực rỡ.', 1),
('hg-aerial-rebuild', N'HG 1/144 Gundam Aerial Rebuild', N'HG-WFM-18', 'HG', N'1/144', N'Witch from Mercury', 450000, 500000, 4.8, 290, 30, 'hot', 'assets/hg_aerial.jpg', N'13 cm', 7, 2, 0, N'Khung khớp không dùng polycap thế hệ mới C-clip chắc chắn', N'Dạng nâng cấp chiến đấu không gian của Suletta Mercury với dàn động cơ phản lực sau lưng và khẩu Beam Cannon hủy diệt tầm xa.', 0),
('hg-moon-gundam', N'HGUC 1/144 AMS-123X-X Moon Gundam', N'HG-UC-215', 'HG', N'1/144', N'Universal Century', 720000, 800000, 4.9, 110, 7, 'new', 'assets/hg_moon.jpg', N'14 cm', 10, 3, 0, N'Chi tiết khuôn đúc khắc rãnh sâu tiệm cận chất lượng RG', N'HG đỉnh cao không cần dùng decal dán màu nào! Cụm Psycho Plate hình bán nguyệt đỏ rực rỡ có thể triển khai tự do linh hoạt.', 0),
('sd-wukong-impulse', N'SD Gundam World Heroes Wukong Impulse Gundam', N'SD-WH-01', 'SD', N'Non-scale', N'SD Gundam World Heroes', 180000, 220000, 4.75, 95, 40, 'hot', 'assets/sd_wukong.jpg', N'8.5 cm', 4, 1, 0, N'Khung SD thế hệ mới', N'Mô hình SD lấy cảm hứng từ Tôn Ngộ Không với 3 dạng biến hình: Khỉ con tinh nghịch, Cương Hầu và Tề Thiên Đại Thánh dũng mãnh.', 0),
('sdcs-rx78-2', N'SDCS RX-78-2 Gundam (Cross Silhouette Frame Set)', N'SDCS-01-RX78', 'SD', N'Non-scale', N'Universal Century', 280000, 320000, 4.85, 130, 22, 'hot', 'assets/sdcs_rx78.jpg', N'9.5 cm', 5, 1, 0, N'Bao gồm cả 2 khung: Khung SD lùn cute & Khung CS chân dài cao ráo', N'Dòng Cross Silhouette cho phép hoán đổi chiều cao từ dáng lùn chibi sang dáng tỷ lệ chuẩn cử động khớp gối và khuỷu tay linh hoạt.', 0),
('mb-astray-red', N'Metal Build Gundam Astray Red Frame Kai (Alternative Edition)', N'MB-ASTRAY-RED', 'Metal Build', N'1/100 (Die-cast)', N'Gundam SEED Astray', 8900000, 9800000, 5.0, 64, 2, 'hot', 'assets/mb_astray_red.jpg', N'19 cm', 0, 0, 0, N'Khung hợp kim Diecast đúc nguyên khối mạ điện phân đỏ bóng loáng', N'Tuyệt tác hoàn thiện đúc kim loại nặng tay của Bandai Tamashii Nations. Đẳng cấp sưu tập tối thượng với kiếm Katana mạ sáng soi gương.', 1),
('tool-godhand-spn120', N'Kìm cắt Gundam cao cấp GodHand Ultimate Nipper SPN-120', N'TOOL-GH-120', 'Tools', N'Phụ kiện', N'Dụng cụ lắp ráp', 1050000, 1200000, 5.0, 380, 15, 'hot', 'assets/tool_godhand.jpg', N'12 cm', 0, 1, 0, N'Lưỡi thép siêu mỏng Single Blade công nghệ Nhật Bản', N'Ông vua của các loại kìm cắt Gunpla! Lưỡi cắt 1 bên siêu mỏng bén ngọt như dao cạo, cắt ngọt lịm không để lại vệt trắng (ghẻ/stress mark) trên nhựa.', 0),
('tool-marker-gm01', N'Bút Kẻ Lằn Chìm Gundam Marker Pour Type GM01 Black', N'TOOL-GM01-BK', 'Tools', N'Phụ kiện', N'Dụng cụ lắp ráp', 65000, 75000, 4.8, 520, 100, 'hot', 'assets/tool_marker.jpg', N'14 cm', 0, 1, 0, N'Mực dầu gốc alcohol mao dẫn tự động chảy dọc rãnh', N'Chỉ cần chấm nhẹ đầu bút vào rãnh nhựa, mực sẽ tự động chảy dọc theo đường lằn chỉ trong 1 giây. Dễ dàng xóa mực thừa bằng cồn hoặc gôm tẩy.', 0),
('tool-action-base-5', N'Giá Đỡ Mô Hình Bandai Action Base 5 Black (Cho 1/144 & SD)', N'ACC-BASE5-BK', 'Tools', N'1/144 & SD', N'Phụ kiện', 150000, 175000, 4.9, 280, 50, 'sale', 'assets/tool_action_base.jpg', N'15 cm (tùy chỉnh)', 2, 1, 0, N'Khớp bánh cóc xoay đa góc độ không sợ trượt rơi', N'Giá đỡ chính hãng Bandai Action Base 5 giúp Gundam của bạn bay lượn, xoay góc chém kiếm hoặc bắn súng trên không cực kỳ vững chãi.', 0),
('tool-topcoat-matte', N'Chai Xịt Phủ Bảo Vệ Mr.Hobby Topcoat Super Clear Matt (Mờ B514)', N'TOOL-TOPCOAT-MATTE', 'Tools', N'Phụ kiện', N'Dụng cụ lắp ráp', 145000, 165000, 4.95, 310, 35, 'hot', 'assets/tool_topcoat.png', N'100ml', 0, 2, 0, N'Sơn bóng/mờ gốc nước (Water-based) không làm chảy nhựa và decal', N'Bí quyết giúp mô hình Gundam trông xịn xò như tượng đúc! Khử sạch độ bóng nhựa rẻ tiền, tạo bề mặt nhám mịn quân sự và khóa chặt decal không bị bong tróc.', 0),
('mnp-baiqi', N'MNP-XH01 Bạch Khởi (Hổ Phách Viêm Hoàng Bai Qi)', N'MNP-XH01-BQ', 'Metal Build', N'1/72', N'Tinh Giáp Hồn Tướng', 950000, 1100000, 5.0, 185, 12, 'hot', 'assets/mnp_baiqi.jpg', N'22 cm', 28, 4, 1, N'Khung kim loại Die-cast Alloy đúc sẵn phối giáp vàng hổ phách & đỏ hỏa diệm', N'Tuyệt tác Thiên Bạo Tinh Bạch Khởi bản Hổ Phách Viêm Hoàng. Nổi bật với đôi cánh hỏa diệm bùng cháy, vũ khí thương tam xoa băng lam tương phản và dàn 6 phi kiếm uy lực vô song.', 1),
('mnp-caoren', N'MNP-XH02 Tào Nhân (Bạch Dạ Kiêu Phượng Hoàng Cao Ren)', N'MNP-XH02-CR', 'Metal Build', N'1/72', N'Tinh Giáp Hồn Tướng', 1150000, 1300000, 4.9, 142, 9, 'hot', 'assets/mnp_caoren.jpg', N'24 cm', 32, 4, 1, N'Khung hợp kim Die-cast Alloy đúc sẵn phối giáp trắng tuyết & viền vàng hoàng kim', N'Phiên bản Bạch Dạ Kiêu Phượng Hoàng tuyệt mỹ của Tào Nhân. Điểm nhấn là đôi cánh lông vũ pha lê chuyển màu xanh lam - tím băng tuyết lộng lẫy cùng vũ khí cự kiếm hoàng kim sắc sảo.', 1),
('mnp-aobing', N'MNQ-XH03 Ngao Bính (Hàn Đàm Long Vương Ao Bing)', N'MNQ-XH03-AB', 'Metal Build', N'1/72', N'Tinh Giáp Hồn Tướng', 1050000, 1250000, 5.0, 320, 15, 'hot', 'assets/mnp_aobing.jpg', N'23 cm', 36, 4, 1, N'Khung kim loại Die-cast cứng cáp, chịu lực tải Rồng Xanh uốn lượn', N'Tuyệt phẩm bán chạy nhất lịch sử Motor Nuclear! Đi kèm thần long Thanh Long uốn lượn với hàng chục khớp nối, kết hợp giáp xanh lam ánh kim lộng lẫy và hiệu ứng thị giác ngoạn mục.', 1),
('mnp-nezha', N'MNP-XH04 Na Tra (Ma Đồng Tam Thái Tử Nezha)', N'MNP-XH04-NZ', 'Metal Build', N'1/72', N'Tinh Giáp Hồn Tướng', 1200000, 1400000, 4.95, 260, 10, 'hot', 'assets/mnp_nezha.jpg', N'23 cm', 35, 4, 1, N'Khung hợp kim Die-cast Alloy 6 tay cơ khí Lục Tí Thần Thông chịu lực cao', N'Hiện thân mecha thần thoại của Tam Thái Tử Na Tra với cơ chế Lục Tí Thần Thông 6 cánh tay chiến đấu. Tích hợp đầy đủ thần binh Hỏa Tiêm Thương, Hỗn Thiên Lăng, Phong Hỏa Luân và đế hoa sen pha lê lộng lẫy.', 0),
('mnp-zhaoyun', N'MNP-XH05 Triệu Vân & Ngọc Lan Bạch Long Câu', N'MNP-XH05-ZY', 'Metal Build', N'1/72', N'Tinh Giáp Hồn Tướng', 1650000, 1950000, 5.0, 295, 8, 'hot', 'assets/mnp_zhaoyun.jpg', N'24 cm', 42, 5, 1, N'Khung kim loại Die-cast hoàn chỉnh cho cả Triệu Vân và Chiến Mã Bạch Long', N'Siêu phẩm Thường Thắng Tướng Quân Triệu Tử Long đứng oai phong cùng tuấn mã thần thoại Ngọc Lan Bạch Long Câu. Trang bị vũ khí trường thương mũi pha lê băng lam và kiếm Thanh Cương trứ danh.', 1),
('mnp-lubu', N'MNP-XH06 Lữ Bố & Xích Thố (Xích Diễm Hỏa Long Câu)', N'MNP-XH06-LB', 'Metal Build', N'1/72', N'Tinh Giáp Hồn Tướng', 1850000, 2200000, 5.0, 310, 6, 'hot', 'assets/mnp_lubu.jpg', N'26 cm', 46, 5, 1, N'Khung hợp kim hạng nặng Super Heavy Alloy Inner Frame', N'Chiến thần vô song Lữ Bố Phụng Tiên cưỡi chiến mã cơ giới Xích Diễm Hỏa Long Câu (Xích Thố) dũng mãnh. Trang bị áo choàng dạ chiến cao cấp cùng khung xương kim loại Die-cast siêu trường uy lực áp đảo.', 1),
('mnp-ganjiang', N'MNP-XH07 Can Tương & Mạc Tà (Kiếm Sư Tinh Giáp Gan Jiang)', N'MNP-XH07-GJ', 'Metal Build', N'1/72', N'Tinh Giáp Hồn Tướng', 980000, 1150000, 4.85, 110, 14, 'new', 'assets/mnp_ganjiang.jpg', N'21 cm', 26, 3, 0, N'Khung kim loại Die-cast Alloy linh hoạt tối ưu hóa biên độ kiếm thuật', N'Tuyệt phẩm kiếm sư Can Tương trong vũ trụ Tinh Giáp Hồn Tướng. Nổi bật với đôi cánh cơ khí đỏ rực có thể tách rời thành dàn phi kiếm tầm xa và song kiếm huyền thoại Can Tương - Mạc Tà.', 0),
('mnp-weiyuanshi', N'MNP-XH08 Uy Viễn Thức (Cấm Vệ Quân Wei Yuan Shi)', N'MNP-XH08-WYS', 'Metal Build', N'1/72', N'Tinh Giáp Hồn Tướng', 750000, 890000, 4.8, 165, 20, 'hot', 'assets/mnp_weiyuanshi.jpg', N'20 cm', 24, 3, 0, N'Khung kim loại Alloy đúc sẵn bền bỉ, dễ lắp ráp', N'Mẫu cơ giáp Cấm Vệ Quân của hoàng gia với phối màu trắng vàng trang nhã, vũ khí đa dạng và độ bền khung kim loại vượt trội trong tầm giá.', 0),
('mnq-wukong', N'MNQ-XH08 Tôn Ngộ Không (Tề Thiên Đại Thánh Wukong)', N'MNQ-XH08-WK', 'Metal Build', N'1/72', N'Tinh Giáp Hồn Tướng', 2450000, 2800000, 5.0, 450, 5, 'hot', 'assets/mnp_wukong.jpg', N'28 cm', 0, 0, 1, N'Mô hình hoàn thiện đúc kim loại Die-cast nguyên khối nặng tay', N'Bản hoàn thiện cao cấp Metal Build của Mỹ Hầu Vương Tôn Ngộ Không. Sơn phủ kim loại đa sắc rực rỡ, gậy như ý có thể kéo dài thu ngắn uy lực vô biên.', 1),
('mnp-moliqing', N'MNP-XH14 Ma Lễ Thanh (Trì Quốc Thiên Vương Mo Liqing)', N'MNP-XH14-MLQ', 'Metal Build', N'1/72', N'Tinh Giáp Hồn Tướng', 1350000, 1550000, 4.9, 135, 11, 'new', 'assets/mnp_moliqing.jpg', N'25 cm', 38, 5, 1, N'Khung xương kim loại siêu trường chịu lực cho thần kiếm khổng lồ', N'Vị tướng khổng lồ trong Tứ Đại Thiên Vương. Sở hữu thanh kiếm Thanh Vân Kiếm ma khí cuồng bạo xé toạc không gian, chi tiết giáp nhiều tầng cực kỳ công phu.', 0);
GO

-- 4.3. Nạp bảng ProductGallery
INSERT INTO dbo.ProductGallery (ProductId, ImageUrl, DisplayOrder) VALUES
('pgu-rx78', 'assets/pg_rx78.jpg', 1),
('pgu-rx78', 'assets/pg_strike_freedom.jpg', 2),
('pgu-rx78', 'assets/pg_exia.jpg', 3),
('pg-strike-freedom', 'assets/pg_strike_freedom.jpg', 1),
('pg-strike-freedom', 'assets/mgex_strike_freedom.jpg', 2),
('pg-exia-lighting', 'assets/pg_exia.jpg', 1),
('mgex-strike-freedom', 'assets/mgex_strike_freedom.jpg', 1),
('mgex-strike-freedom', 'assets/pg_strike_freedom.jpg', 2),
('mg-barbatos', 'assets/mg_barbatos.jpg', 1),
('mg-sazabi-verka', 'assets/mg_sazabi.jpg', 1),
('mg-nu-gundam-verka', 'assets/mg_nu_gundam.jpg', 1),
('mg-wing-zero-verka', 'assets/mg_wing_zero.jpg', 1),
('rg-hinu', 'assets/rg_hinu.jpg', 1),
('rg-god-gundam', 'assets/rg_god.jpg', 1),
('rg-epyon', 'assets/rg_epyon.jpg', 1),
('hg-calibarn', 'assets/hg_calibarn.jpg', 1),
('hg-aerial-rebuild', 'assets/hg_aerial.jpg', 1),
('hg-moon-gundam', 'assets/hg_moon.jpg', 1),
('sd-wukong-impulse', 'assets/sd_wukong.jpg', 1),
('sdcs-rx78-2', 'assets/sdcs_rx78.jpg', 1),
('mb-astray-red', 'assets/mb_astray_red.jpg', 1),
('tool-godhand-spn120', 'assets/tool_godhand.jpg', 1),
('tool-marker-gm01', 'assets/tool_marker.jpg', 1),
('tool-action-base-5', 'assets/tool_action_base.jpg', 1),
('tool-topcoat-matte', 'assets/tool_topcoat.png', 1),
('mnp-baiqi', 'assets/mnp_baiqi.jpg', 1),
('mnp-baiqi', 'assets/mnp_baiqi_2.jpg', 2),
('mnp-caoren', 'assets/mnp_caoren.jpg', 1),
('mnp-aobing', 'assets/mnp_aobing.jpg', 1),
('mnp-nezha', 'assets/mnp_nezha.jpg', 1),
('mnp-nezha', 'assets/mnp_nezha_2.jpg', 2),
('mnp-zhaoyun', 'assets/mnp_zhaoyun.jpg', 1),
('mnp-lubu', 'assets/mnp_lubu.jpg', 1),
('mnp-ganjiang', 'assets/mnp_ganjiang.jpg', 1),
('mnp-ganjiang', 'assets/mnp_ganjiang_2.jpg', 2),
('mnp-weiyuanshi', 'assets/mnp_weiyuanshi.jpg', 1),
('mnq-wukong', 'assets/mnp_wukong.jpg', 1),
('mnq-wukong', 'assets/mnp_wukong_2.jpg', 2),
('mnq-wukong', 'assets/mnp_wukong_3.jpg', 3),
('mnp-moliqing', 'assets/mnp_moliqing.jpg', 1);
GO

-- 4.4. Nạp bảng ProductAccessories
INSERT INTO dbo.ProductAccessories (ProductId, AccessoryName) VALUES
('pgu-rx78', N'2x Beam Saber'),
('pgu-rx78', N'1x Beam Rifle'),
('pgu-rx78', N'1x Shield khiên chắn nam châm'),
('pgu-rx78', N'1x Core Fighter biến hình'),
('pgu-rx78', N'Bộ LED RGB đa sắc đổi màu'),
('pgu-rx78', N'Metallic 3D Etching Decal Sheet'),

('pg-strike-freedom', N'8x Super DRAGOON System Wings'),
('pg-strike-freedom', N'2x High-energy Beam Rifle kết hợp'),
('pg-strike-freedom', N'2x Beam Saber'),
('pg-strike-freedom', N'1x Beam Shield hiệu ứng hào quang'),
('pg-strike-freedom', N'Display Stand chuyên dụng góc nghiêng'),

('pg-exia-lighting', N'1x GN Sword / GN Rifle'),
('pg-exia-lighting', N'1x GN Long Blade & 1x GN Short Blade'),
('pg-exia-lighting', N'2x GN Beam Saber & 2x GN Beam Dagger'),
('pg-exia-lighting', N'1x GN Shield'),
('pg-exia-lighting', N'Khối GN Drive xoay cơ học tích hợp LED'),

('mgex-strike-freedom', N'8x Super DRAGOON Wings'),
('mgex-strike-freedom', N'2x Beam Rifle liên kết'),
('mgex-strike-freedom', N'2x Beam Saber'),
('mgex-strike-freedom', N'2x Beam Shield hiệu ứng PET Film 3D'),
('mgex-strike-freedom', N'Đế dựng chuyên dụng kèm giá đỡ cánh bung mở'),

('mg-barbatos', N'1x Đại chùy Mace khổng lồ kèm đinh phóng'),
('mg-barbatos', N'1x Kiếm katana Tachiy'),
('mg-barbatos', N'1x Pháo nòng dài 300mm Smoothbore Gun có thể gấp gọn'),

('mg-sazabi-verka', N'6x Funnels với hiệu ứng triển khai'),
('mg-sazabi-verka', N'1x Beam Shot Rifle'),
('mg-sazabi-verka', N'1x Beam Tomahawk cỡ đại với hiệu ứng lưỡi rìu xanh lục'),
('mg-sazabi-verka', N'1x High-energy Mega Beam Rifle (Long Barrel)'),
('mg-sazabi-verka', N'1x Khiên chắn Sazabi khổng lồ kèm Decal nước Katoki'),

('mg-nu-gundam-verka', N'6x Fin Funnels liên kết linh hoạt'),
('mg-nu-gundam-verka', N'1x Beam Rifle'),
('mg-nu-gundam-verka', N'1x Hyper Bazooka'),
('mg-nu-gundam-verka', N'1x Custom Shield'),
('mg-nu-gundam-verka', N'Đế trưng bày hình biểu tượng Amuro Ray'),

('mg-wing-zero-verka', N'Twin Buster Rifle (tách rời hoặc ghép đôi)'),
('mg-wing-zero-verka', N'2x Beam Saber giấu trong cánh'),
('mg-wing-zero-verka', N'Bộ 4 cánh thiên thần lông vũ khớp đa hướng'),
('mg-wing-zero-verka', N'Khiên chắn biến hình Neo Bird'),
('mg-wing-zero-verka', N'Action Base chuyên dụng tạo dáng bay'),

('rg-hinu', N'6x Fin Funnels dạng cánh'),
('rg-hinu', N'1x Beam Rifle'),
('rg-hinu', N'1x Hyper Mega Shield'),
('rg-hinu', N'1x New Hyper Bazooka'),
('rg-hinu', N'Khối đẩy bình xăng phụ Propellant Tanks'),

('rg-god-gundam', N'2x God Finger hiệu ứng lửa cam trong suốt'),
('rg-god-gundam', N'Bộ 3 vòng hào quang năng lượng Nichirin năng lượng 3 tầng PET'),
('rg-god-gundam', N'2x Beam Sword'),
('rg-god-gundam', N'Bộ bàn tay võ thuật biểu cảm đa dạng'),

('rg-epyon', N'1x Beam Sword cực đại nối cáp năng lượng đỏ'),
('rg-epyon', N'1x Heat Rod roi nhiệt kim loại cử động từng đốt'),
('rg-epyon', N'Đôi cánh dơi có thể mở bung các nan giáp'),
('rg-epyon', N'Khối khiên Epyon Shield'),

('hg-calibarn', N'1x Variable Rod Rifle hình chổi phù thủy'),
('hg-calibarn', N'2x Beam Saber'),
('hg-calibarn', N'11x GUND-Bits hợp thành khiên Escutcheon'),
('hg-calibarn', N'Đế trưng bày mini kèm theo'),

('hg-aerial-rebuild', N'1x Beam Rifle nâng cấp nòng dài'),
('hg-aerial-rebuild', N'2x Beam Saber tia xanh lam'),
('hg-aerial-rebuild', N'11x GUND-Bit gắn thành khiên hoặc giáp Bit On Form'),
('hg-aerial-rebuild', N'2x Beam Blade hiệu ứng lưỡi kiếm dài gắn nòng súng'),

('hg-moon-gundam', N'8x Psycho Plate sau lưng biến hóa thành hình trăng khuyết'),
('hg-moon-gundam', N'1x Beam Tomahawk / Beam Rifle'),
('hg-moon-gundam', N'2x Butterfly Edge dao găm lưỡi beam'),
('hg-moon-gundam', N'Đế dựng chuyên dụng cho Psycho Plate'),

('sd-wukong-impulse', N'1x Gậy Như Ý Ruyi Jingu Bang hiệu ứng lửa đỏ trong suốt'),
('sd-wukong-impulse', N'Mặt nạ hóa hình Tề Thiên Đại Thánh Go-ko Form'),
('sd-wukong-impulse', N'Bộ giáp chân hóa hình vượn thần'),

('sdcs-rx78-2', N'1x Beam Rifle'),
('sdcs-rx78-2', N'1x Beam Saber'),
('sdcs-rx78-2', N'1x Shield khiên đỏ vàng'),
('sdcs-rx78-2', N'2x Khung xương SD và CS tùy biến chiều cao'),

('mb-astray-red', N'1x Thanh kiếm katana Gerbera Straight lưỡi thép mạ chrome'),
('mb-astray-red', N'1x Thanh kiếm Tiger Pierce kèm bao kiếm thếp vàng'),
('mb-astray-red', N'Bộ trang bị đa năng Tactical Arms IIL'),
('mb-astray-red', N'Đế trưng bày kim loại cao cấp dập chìm logo Astray'),

('tool-godhand-spn120', N'1x Bao da bò bảo vệ đầu lưỡi kìm'),
('tool-godhand-spn120', N'1x Hộp đựng bảo quản kèm dầu chống gỉ sét'),
('tool-godhand-spn120', N'Giấy chứng nhận chính hãng GodHand Japan'),

('tool-marker-gm01', N'1x Bút kẻ lằn ngòi nhấn tự động'),

('tool-action-base-5', N'Đế lục giác modular có thể ghép nối nhiều đế lại'),
('tool-action-base-5', N'Bộ adapter kẹp lưng và chốt đáy cho mọi dòng HG/RG/SD'),

('tool-topcoat-matte', N'1x Chai xịt áp suất 100ml vòi phun sương nano'),

('mnp-nezha', N'1x Hỏa Tiêm Thương đại trường thương bọc hiệu ứng ngọn lửa'),
('mnp-nezha', N'2x Song kiếm Âm Dương (Bạch Kiếm & Hắc Kiếm)'),
('mnp-nezha', N'1x Vòng hào quang Càn Khôn hỏa diệm sau lưng'),
('mnp-nezha', N'2x Dải lụa Hỗn Thiên Lăng dạng xích cơ giới hoàng kim'),
('mnp-nezha', N'Đôi Phong Hỏa Luân lửa xoáy dưới chân'),
('mnp-nezha', N'Đế trưng bày hoa sen pha lê ngọc lam (Cyan Crystal Lotus Base)');
GO

-- 4.5. Nạp bảng Coupons
INSERT INTO dbo.Coupons (Code, DiscountPercent, DiscountAmount, MaxDiscount, MinOrder, FreeShipping, Description) VALUES
(N'GUNDAM10', 10.00, 0, 500000, 500000, 0, N'Giảm 10% tối đa 500.000đ cho đơn từ 500k'),
(N'FREESHIP', 0.00, 0, NULL, 300000, 1, N'Miễn phí vận chuyển toàn quốc cho đơn từ 300k'),
(N'BUILDER50K', 0.00, 50000, NULL, 400000, 0, N'Giảm trực tiếp 50.000đ cho đơn hàng từ 400k'),
(N'MECHA20', 20.00, 0, 1000000, 2000000, 0, N'Giảm 20% tối đa 1.000.000đ cho đơn từ 2 triệu (Vip Builder)');
GO

-- 4.6. Nạp bảng AcademyGuides
INSERT INTO dbo.AcademyGuides (Title, Icon, Summary, Content, DisplayOrder) VALUES
(N'1. Kỹ Thuật Cắt Part 2 Lần (Two-cut Method)', N'✂️', N'Bí quyết cắt mô hình không bao giờ để lại ghẻ trắng (Stress Mark) trên nhựa.', N'Lần 1: Dùng kìm cắt cách chân cổng (gate) khoảng 1-2mm để tách part khỏi vỉ runner mà không truyền lực bẻ cong nhựa. Lần 2: Đưa kìm sát phẳng bề mặt part và bấm nhẹ nhàng dứt khoát. Nhựa sẽ phẳng mịn tự nhiên.', 1),
(N'2. Gọt Bavia & Xử Lý Vết Cắt Nhựa', N'🔪', N'Làm phẳng tuyệt đối bề mặt nhựa sau khi bấm kìm.', N'Dùng dao trổ nghệ thuật (Art Knife) đặt góc 30-45 độ, miết nhẹ gọt từng lát mỏng phần nhựa thừa còn sót lại. Không đè mạnh để tránh xước vào thân part.', 2),
(N'3. Nghệ Thuật Kẻ Lằn Chìm (Panel Lining)', N'🖊️', N'Thổi hồn và độ sâu cơ khí 3D cho mô hình Gundam.', N'Sử dụng bút kẻ lằn Gundam Marker Pour Type GM01 chấm vào các rãnh giáp. Mực mao dẫn sẽ tự động chảy dọc rãnh. Đợi 10 giây cho khô rồi dùng gôm hoặc tăm bông tẩm chút cồn lau sạch vết lem bên ngoài.', 3),
(N'4. Dán Decal Nước & Decal Kim Loại (Water Slide Decals)', N'🏷️', N'Tạo dấu ấn quân sự và ký hiệu cảnh báo Mech chân thực.', N'Cắt decal cần dán, ngâm vào chén nước ấm 10-15 giây. Khi decal trượt nhẹ khỏi giấy nền, dùng nhíp gắp đặt lên mô hình. Thấm khô bằng tăm bông và quét dung dịch Mr. Mark Softer để decal ôm khít đường cong.', 4),
(N'5. Xịt Phủ Topcoat Khóa Màu & Chống Xước', N'🎨', N'Khử ánh nhựa bóng đồ chơi, mang lại chất liệu nhám mịn đẳng cấp.', N'Lắc đều chai Topcoat Matte trong 1 phút. Để bình xịt cách mô hình 20-25cm, quét ngang nhẹ nhàng thành từng lớp mỏng trong ngày nắng ráo (tránh ngày mưa ẩm để không bị mờ trắng bề mặt).', 5);
GO

-- 4.7. Nạp bảng CustomerReviews
INSERT INTO dbo.CustomerReviews (CustomerName, AvatarUrl, Rating, PurchasedKit, Comment, ReviewDate) VALUES
(N'Nguyễn Tuấn Anh (Pro Builder)', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80', 5, N'PG Unleashed RX-78-2 Gundam', N'Đóng gói bọc 4 lớp bóng khí siêu dày, hộp không móp dù chỉ 1 góc nhỏ! PGU lắp quá đã, đèn LED buồng lái đỉnh cao!', N'25/08/2026'),
(N'Trần Minh Hoàng', 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80', 5, N'RG 1/144 Hi-Nu Gundam', N'Giao hàng siêu nhanh chỉ 2 tiếng tại nội thành! RG Hi-Nu biên độ khớp và giáp đa tầng đỉnh nhất mình từng ráp.', N'22/08/2026'),
(N'Lê Quốc Bảo', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80', 5, N'Kìm GodHand SPN-120 + HG Calibarn', N'Kìm GodHand cắt ngọt lịm không để lại một vệt ghẻ nào, Calibarn permet score 8+ chổi phù thủy cực ngầu!', N'19/08/2026');
GO

-- 4.8. Nạp dữ liệu Tài khoản Người dùng (Users)
INSERT INTO dbo.Users (Username, Email, Password, FullName, Phone, Address, Role, Avatar) VALUES
('admin', 'admin@mechacore.vn', 'admin123', N'Chỉ Huy Trưởng Mecha Core', '1900-GUNDAM', N'Trụ Sở Mecha Core Việt Nam', 'admin', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'),
('builder01', 'builder@gmail.com', '123456', N'Gundam Builder Việt Nam', '0912345678', N'Hà Nội, Việt Nam', 'user', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80');
GO

-- 4.9. Nạp đơn hàng mẫu sẵn để có thể tra cứu ngay lập tức
INSERT INTO dbo.Orders (OrderId, UserId, CustomerName, Phone, Address, Subtotal, Discount, ShippingFee, TotalAmount, PaymentMethod, OrderStatus, CreatedAt) VALUES
(N'MEC-888999', 2, N'Đặng Hoàng Long', N'0901234567', N'Số 18 Phố Huế, Hoàn Kiếm, Hà Nội', 6250000, 500000, 0, 5750000, N'qr_bank', N'Đang vận chuyển giao hỏa tốc', DATEADD(HOUR, -5, GETDATE()));

INSERT INTO dbo.OrderItems (OrderId, ProductId, ProductName, Price, Quantity, Subtotal) VALUES
(N'MEC-888999', 'pgu-rx78', N'PG Unleashed 1/60 RX-78-2 Gundam', 6250000, 1, 6250000);
GO

-- =========================================================================
-- 5. STORED PROCEDURES (THỦ TỤC LƯU TRỮ CHUYÊN NGHIỆP)
-- =========================================================================

-- 5.1. Thủ tục lấy chi tiết đơn hàng kèm danh sách sản phẩm
IF OBJECT_ID('dbo.sp_GetOrderDetails', 'P') IS NOT NULL DROP PROCEDURE dbo.sp_GetOrderDetails;
GO
CREATE PROCEDURE dbo.sp_GetOrderDetails
    @OrderId NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Lấy thông tin đơn hàng
    SELECT 
        OrderId, CustomerName, Phone, Address, Subtotal, Discount, ShippingFee, TotalAmount, PaymentMethod, OrderStatus, CreatedAt
    FROM dbo.Orders
    WHERE OrderId = @OrderId;

    -- Lấy danh sách sản phẩm trong đơn hàng
    SELECT 
        OrderItemId, OrderId, ProductId, ProductName, Price, Quantity, Subtotal
    FROM dbo.OrderItems
    WHERE OrderId = @OrderId;
END
GO

-- 5.2. View danh mục Catalog tối ưu
IF OBJECT_ID('dbo.vw_Catalog', 'V') IS NOT NULL DROP VIEW dbo.vw_Catalog;
GO
CREATE VIEW dbo.vw_Catalog AS
SELECT 
    p.ProductId,
    p.Name,
    p.SKU,
    p.GradeId,
    g.GradeName,
    p.Scale,
    p.Series,
    p.Price,
    p.OriginalPrice,
    p.Rating,
    p.ReviewsCount,
    p.Stock,
    p.Status,
    p.Image,
    p.Height,
    p.Runners,
    p.Difficulty,
    p.LedSupport,
    p.InnerFrame,
    p.Description,
    p.Featured
FROM dbo.Products p
LEFT JOIN dbo.Grades g ON p.GradeId = g.GradeId;
GO

PRINT N'=========================================================================';
PRINT N'>> HOÀN TẤT TẠO CƠ SỞ DỮ LIỆU MechaCoreDB VÀ NẠP DỮ LIỆU MẪU THÀNH CÔNG!';
PRINT N'=========================================================================';
