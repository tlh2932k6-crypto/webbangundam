@echo off
chcp 65001 > nul
echo =========================================================================
echo   MECHA CORE - KHỞI TẠO CƠ SỞ DỮ LIỆU SQL SERVER (MechaCoreDB)
echo =========================================================================
echo.
echo Đang kết nối tới SQL Server: .\SQLEXPRESS ...

sqlcmd -S .\SQLEXPRESS -E -i "%~dp0MechaCoreDB.sql"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo =========================================================================
    echo [THÀNH CÔNG] Cơ sở dữ liệu MechaCoreDB đã được khởi tạo hoàn tất!
    echo Bạn có thể mở SQL Server Management Studio (SSMS) để xem database.
    echo =========================================================================
) else (
    echo.
    echo [LỖI] Có lỗi khi chạy script SQL. Vui lòng kiểm tra lại dịch vụ SQL Server.
)
pause
