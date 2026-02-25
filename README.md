# 📊 Load Testing - Ejercicio QA Performance (k6)

Este proyecto implementa una prueba de carga para el servicio de login utilizando **k6**, incluyendo parametrización mediante archivo CSV, ejecución del escenario y generación de reportes.

---

# 📁 Estructura del Proyecto

LOADTEST-K6/

script.js → Script principal de prueba de carga
users.csv → Datos de usuarios para login
package.json → Scripts de ejecución npm

results/ (se crea automáticamente)

textSummary.txt → Resumen de métricas
resultados.json → Métricas completas
report.html → Dashboard visual
ruta de Dashboard visual -> https://demmt3101.github.io/loadtest-k6/results/report.html

---

# ⚙️ Tecnologías Utilizadas

* k6 v1.6.1
* Node.js v18+
* JavaScript ES6

---

# 📥 Requisitos Previos

## 1️⃣ Instalar k6

Verificar instalación:

k6 version

Instalación oficial:

https://grafana.com/docs/k6/latest/set-up/install-k6/

---

## 2️⃣ Instalar Node.js

Verificar:

node -v
npm -v

Descarga:

https://nodejs.org

---

# 🚀 Instalación

Clonar el repositorio:

git clone <URL_REPOSITORIO>

Entrar al directorio:

cd LOADTEST-K6

---

# 🧪 Escenario de Prueba

El script ejecuta un flujo de autenticación contra:

https://fakestoreapi.com/auth/login

Características del escenario:

* Executor: constant-arrival-rate
* Tasa objetivo: 20 TPS
* Duración: 2 minutos
* Usuarios virtuales dinámicos

Thresholds configurados:

* http_req_failed < 3%
* p95 < 1500 ms
* token_missing < 1%

---

# 📊 Parametrización de Datos

Los usuarios se cargan desde:

users.csv

Formato requerido:

user,passwd
usuario1,password1
usuario2,password2

El script utiliza SharedArray para compartir datos entre VUs y optimizar memoria.

---

# ▶️ Ejecución

Todos los comandos se ejecutan desde la raíz del proyecto.

Ejecutar prueba básica:

npm run test

---

Generar resumen TXT:

npm run test:summary

Salida:

results/textSummary.txt

---

Generar resultados JSON:

npm run test:json

Salida:

results/resultados.json

---

Generar reporte visual HTML:

npm run test:html

Salida:

results/report.html

---

Ejecutar todo:

npm run test:all

---

# 📈 Visualización del Reporte

Abrir:

results/report.html

Incluye:

* Usuarios virtuales
* Requests por segundo
* Latencia y percentiles
* Throughput del sistema

---

# 📦 Ejecución desde cualquier equipo

El proyecto utiliza rutas relativas, por lo que puede ejecutarse en cualquier ubicación.

Solo ejecutar:

cd LOADTEST-K6
npm run test

---

# ⚠️ Troubleshooting (Windows)

Si PowerShell bloquea npm:

Set-ExecutionPolicy -Scope CurrentUser RemoteSigned

Cerrar y abrir nuevamente la terminal.

---

# 📚 Archivos Entregables

README.md → instrucciones
conclusiones.txt → hallazgos del análisis
textSummary.txt → métricas resumidas
report.html → dashboard visual

---

# 👨‍💻 Autor

Dennis Montalvo
