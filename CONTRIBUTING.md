# Contributing to Spec-Driven DevSecOps

¡Gracias por tu interés en contribuir! Este proyecto nació como una demo para Techno Week 8.0 y está abierto a la comunidad.

## Cómo Contribuir

### Reportar Bugs
1. Abre un [issue](https://github.com/ardops/spec-driven-devsecops/issues) con el tag `bug`
2. Incluye: pasos para reproducir, resultado esperado vs actual, versión de Node.js

### Sugerir Mejoras
1. Abre un issue con el tag `enhancement`
2. Describe el problema que resuelve y la solución propuesta

### Pull Requests
1. Fork el repositorio
2. Crea un branch: `git checkout -b feature/tu-mejora`
3. Haz tus cambios
4. Asegúrate de que el pipeline pase: `npm run security:all && npm test`
5. Commit con mensajes descriptivos
6. Abre un PR contra `main`

## Estándares de Código

- Seguir las convenciones existentes del proyecto
- Todo endpoint nuevo DEBE tener `security` definido en `openapi.yaml`
- Todo endpoint nuevo DEBE usar `authMiddleware`
- Todo campo sensible DEBE tener formato definido en la spec
- Los tests son obligatorios para nuevas funcionalidades

## Seguridad

Si encontrás una vulnerabilidad, NO abras un issue público. Ver [SECURITY.md](SECURITY.md).

## Código de Conducta

Sé respetuoso. Sé constructivo. Estamos aquí para aprender.
