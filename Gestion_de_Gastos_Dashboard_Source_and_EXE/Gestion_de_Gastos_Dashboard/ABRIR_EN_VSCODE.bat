@echo off
where code >nul 2>nul
if errorlevel 1 (
  echo No se encontro el comando "code". Abre Visual Studio Code y selecciona Archivo ^> Abrir carpeta...
  pause
  exit /b 1
)
start "" code "%~dp0"
