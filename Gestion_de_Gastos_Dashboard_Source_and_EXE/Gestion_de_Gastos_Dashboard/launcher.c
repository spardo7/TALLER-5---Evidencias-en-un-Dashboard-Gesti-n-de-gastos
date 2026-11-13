// Lanzador de Windows: abre el dashboard en el navegador predeterminado.
// Este archivo es el código fuente de Gestion_de_Gastos.exe.
// El ejecutable y los archivos del dashboard deben permanecer juntos.

#include <windows.h>
#include <shellapi.h>
#include <string.h>

int WINAPI WinMain(
    HINSTANCE instance,
    HINSTANCE previous_instance,
    LPSTR command_line,
    int show_command
) {
    char ruta[MAX_PATH];
    DWORD longitud = GetModuleFileNameA(NULL, ruta, MAX_PATH);

    // Evita advertencias por los parámetros requeridos por la firma de WinMain.
    (void)instance;
    (void)previous_instance;
    (void)command_line;
    (void)show_command;

    if (longitud == 0 || longitud >= MAX_PATH) {
        MessageBoxA(
            NULL,
            "No se pudo localizar el ejecutable.",
            "Gestión de gastos",
            MB_ICONERROR
        );
        return 1;
    }

    // Reemplaza el nombre del .exe por el nombre del archivo HTML.
    char *separador = strrchr(ruta, '\\');
    if (separador == NULL) {
        MessageBoxA(
            NULL,
            "No se pudo localizar la carpeta del dashboard.",
            "Gestión de gastos",
            MB_ICONERROR
        );
        return 1;
    }
    *(separador + 1) = '\0';

    const char *archivo_dashboard = "index.html";
    if (strlen(ruta) + strlen(archivo_dashboard) >= MAX_PATH) {
        MessageBoxA(
            NULL,
            "La ruta es demasiado larga. Extrae el ZIP en una carpeta con una ruta más corta.",
            "Gestión de gastos",
            MB_ICONERROR
        );
        return 1;
    }
    strcat(ruta, archivo_dashboard);

    // Asegura que se hayan extraído juntos todos los archivos del proyecto.
    DWORD atributos = GetFileAttributesA(ruta);
    if (atributos == INVALID_FILE_ATTRIBUTES) {
        MessageBoxA(
            NULL,
            "No se encontró index.html. Extrae todos los archivos del ZIP en una carpeta y no muevas el EXE por separado.",
            "Gestión de gastos",
            MB_ICONERROR
        );
        return 1;
    }

    // Solicita al sistema operativo que abra el HTML en el navegador elegido.
    HINSTANCE resultado = ShellExecuteA(
        NULL,
        "open",
        ruta,
        NULL,
        NULL,
        SW_SHOWNORMAL
    );
    if ((INT_PTR)resultado <= 32) {
        MessageBoxA(
            NULL,
            "No se pudo abrir el navegador predeterminado. Abre index.html manualmente.",
            "Gestión de gastos",
            MB_ICONERROR
        );
        return 1;
    }

    return 0;
}
