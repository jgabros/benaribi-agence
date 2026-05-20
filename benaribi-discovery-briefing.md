# BENARIBI AGENCE — Discovery Briefing

## Identidad del proyecto

**Nombre:** Benaribi Agence  
**Sector:** Inmobiliaria de lujo + asesoría de inversión empresarial  
**Mercado:** Marruecos (sede operativa en Nador / zona Nador West Med)  
**Presencia física:** Oficina premium en Nador — estética negro carbón, blanco, dorado, arco de herradura marroquí retroiluminado, suelos de mármol, mobiliario directivo  
**Redes activas:** Instagram @benaribiagence  
**Colaborador comercial:** Paco Anjawi Inversiones (socio externo, no es la marca principal)

---

## Público objetivo

**Perfil primario:** Inversores internacionales de alto patrimonio (HNWIs)
- Europeos: España, Francia, Alemania, Países Bajos
- Asiáticos: China (mercado futuro, fase 3)
- Europa del Este: Rusia

**Perfil secundario:** Empresas industriales y logísticas buscando establecerse en zonas francas marroquíes

**Comportamiento del cliente:**
- No llega por redes sociales masivas — llega por LinkedIn, referidos y búsqueda directa
- Toma decisiones de inversión de 6 a 18 meses
- Necesita confianza institucional antes de contactar
- Compara con consultoras internacionales como JLL, Knight Frank, Savills
- Idiomas: EN y FR como primarios, ES como tercero

---

## Servicios (3 líneas de negocio)

### 1. Compraventa de vivienda
- Propiedades residenciales premium en Marruecos
- Clientes: MRE (marroquíes residentes en Europa) + inversores extranjeros
- Proceso: búsqueda, negociación, due diligence, cierre notarial

### 2. Terrenos e inversión industrial
- Parcelas en Nador West Med y zona franca de Tánger
- Clientes: empresas manufactureras, logísticas, importación/exportación
- Servicio: identificación de parcela, trámites con AMDIE, acompañamiento legal
- Contexto clave: Nador West Med es uno de los mayores proyectos de infraestructura portuaria de África — puerto de aguas profundas, zona franca industrial, inversión pública masiva activa en 2026

### 3. Constitución de sociedades
- Creación de estructuras societarias marroquíes para inversores extranjeros
- SARL, SA, sucursales, joint ventures
- Servicios: registro, domiciliación, apertura cuentas, gestión fiscal inicial
- Ventaja fiscal: zonas francas con exenciones de hasta 20 años

---

## Posicionamiento de marca

**Propuesta de valor única:**
> Benaribi es la puerta de entrada al mercado inmobiliario e industrial marroquí para inversores internacionales — con conocimiento local profundo, interlocución profesional multilingüe y acompañamiento integral en todo el proceso.

**Tono:** Institucional, sobrio, confiable. Nunca folklórico ni turístico.  
**Referentes visuales:** JLL, Knight Frank, Savills — no agencias inmobiliarias locales  
**Lo que NO debe parecer:** Agencia de barrio, marca personal de influencer, algo provisional

**Diferenciadores reales:**
- Única agencia en la zona con presencia en Nador West Med desde el inicio de las obras
- Capacidad de acompañar el proceso completo: propiedad + sociedad + operación
- Bilingüe nativo EN/FR/ES/AR
- Conocimiento del marco legal marroquí de inversión extranjera (Charte de l'Investissement 2022)

---

## Identidad visual existente

**Paleta oficial:**
- Negro carbón: `#1C1C1C` — autoridad, base
- Blanco roto: `#F5F3EF` — limpieza, espacios
- Dorado champán: `#C4A35A` — distinción, detalles premium
- Verde cerceta: `#3D8B7A` — diferenciador, CTA, frescor (aparece en decoración de oficina)
- Gris mármol: `#E0DDD8` — fondo alternativo neutro

**Tipografía recomendada:**
- Títulos: Cormorant Garamond (serif geométrica elegante)
- Cuerpo: DM Sans (sans-serif limpia)
- Acento: Cormorant Garamond itálica

**Elementos gráficos:**
- Isotipo: arco de herradura marroquí — debe refinarse, vectorizarse limpio
- Patrón geométrico derivado del arco para fondos y separadores
- Línea fina dorada como separador horizontal
- Fotografía en blanco y negro o con overlay oscuro + detalle dorado

---

## Arquitectura del sistema digital

### Capa 1 — Web pública de marketing
**Tecnología:** React + Tailwind CSS  
**Objetivo:** Captación de leads internacionales, credibilidad institucional, SEO  
**Idiomas:** EN (base) / FR / ES — selector visible en header  
**Hosting:** CDN europeo, dominio benaribi.ma

**Páginas:**
```
/ Home
  ├── Hero: vídeo aéreo Nador West Med + claim EN/FR
  ├── Servicios (3 tarjetas)
  ├── Por qué Marruecos (datos macro)
  ├── Por qué Benaribi
  └── CTA: Solicitar consulta

/services/residential     — Compraventa de vivienda
/services/industrial      — Terrenos industriales
/services/company-setup   — Constitución de sociedades

/investment               — Inversión en Marruecos
  ├── Marco legal y fiscal
  ├── Nador West Med
  └── Tánger Free Zone

/about                    — Equipo, historia, socios
/resources                — Guía descargable (lead magnet)
/contact                  — Formulario + WhatsApp + mapa
```

**Funcionalidades clave:**
- Formulario segmentado (país origen + servicio + presupuesto estimado)
- Lead magnet: "Morocco Investment Guide 2026" (PDF) a cambio de email
- WhatsApp flotante (+212 676 72 61 19) siempre visible
- Calculadora ROI fiscal v1 (JS puro, sin backend — inputs: capital + sector + tipo inversor → output: exenciones aplicables + estimación costes)
- Integración con CRM (HubSpot Free o Pipedrive)
- Google Analytics 4 + Meta Pixel + LinkedIn Insight Tag

---

### Capa 2 — Portal privado de cliente
**Tecnología:** React 18 + Tailwind CSS + Supabase (PostgreSQL) + Python FastAPI  
**URL:** portal.benaribi.ma  
**Objetivo:** Seguimiento de operaciones, documentación, comunicación con agente

**Funcionalidades:**
- Autenticación con email + contraseña / magic link
- Dashboard: estado de operación en timeline visual
- Documentos: upload/download seguro desde Supabase Storage
- Listado de propiedades disponibles (filtrable por tipo, zona, precio)
- Contacto directo con agente asignado
- Notificaciones automáticas por email

**Roles de usuario:**
- Cliente: solo ve su operación
- Agente Benaribi: ve todas las operaciones asignadas
- Admin: acceso completo

---

### Capa 3 — Motor backend (Python FastAPI)
- Generación de reportes PDF de operación
- Calculadora ROI fiscal avanzada (conectada al portal en v2)
- Procesamiento de documentación societaria
- Webhooks para notificaciones automáticas
- API REST consumida por React

---

## Modelo de datos (Supabase)

### Tablas principales

```sql
clients
  id uuid PK
  full_name text
  email text UNIQUE
  country_origin text
  language_pref text  -- 'en' | 'fr' | 'es' | 'ar'
  investor_type enum  -- 'individual' | 'company' | 'fund'
  created_at timestamptz

operations
  id uuid PK
  client_id uuid FK → clients
  service_type enum  -- 'residential' | 'industrial' | 'company_setup'
  status enum        -- 'lead' | 'active' | 'legal' | 'closing' | 'complete'
  total_amount numeric
  currency text      -- 'MAD' | 'EUR' | 'USD'
  assigned_agent uuid
  created_at timestamptz

properties
  id uuid PK
  type enum          -- 'residential' | 'industrial' | 'commercial'
  zone text          -- 'Nador West Med' | 'Tanger Free Zone' | 'Nador' | etc
  surface_m2 numeric
  price_mad numeric
  status enum        -- 'available' | 'reserved' | 'sold'
  coordinates point
  media_urls jsonb
  created_at timestamptz

documents
  id uuid PK
  operation_id uuid FK → operations
  doc_type enum      -- 'contract' | 'id' | 'fiscal' | 'notarial' | 'other'
  file_path text     -- Supabase Storage path
  uploaded_by uuid
  is_signed boolean
  expires_at timestamptz
  created_at timestamptz

leads
  id uuid PK
  name text
  email text
  country text
  service_interest enum
  budget_range text  -- '<100k' | '100k-500k' | '500k-1m' | '>1m' (EUR)
  source text        -- 'web' | 'linkedin' | 'referral' | 'instagram'
  status enum        -- 'new' | 'contacted' | 'qualified' | 'converted'
  created_at timestamptz

timeline_events
  id uuid PK
  operation_id uuid FK → operations
  event_type enum    -- 'status_change' | 'document' | 'meeting' | 'note'
  description text
  visible_to_client boolean
  created_at timestamptz
```

**Seguridad:** Row Level Security activado — cada cliente solo accede a sus propios registros

---

## Stack tecnológico completo

| Capa | Tecnología | Justificación |
|---|---|---|
| Web pública | React + Tailwind | Stack dominado, reutilizable |
| Portal cliente UI | React 18 + Tailwind | Misma base, componentes compartidos |
| Base de datos + Auth | Supabase (PostgreSQL) | Auth nativa, RLS, Storage incluido |
| Motor backend | Python FastAPI | Lógica fiscal, generación PDF, webhooks |
| Dominio principal | benaribi.ma | Autoridad local marroquí |
| Dominio alternativo | benaribiagence.com → redirect | Captura de variantes |
| Portal cliente | portal.benaribi.ma | Subdominio separado |
| Analítica | GA4 + Meta Pixel + LinkedIn Tag | Cobertura completa de fuentes de tráfico |
| CRM | HubSpot Free | Pipeline de leads web + DocSend |
| Dossier interactivo | DocSend | Tracking por página, notificación de apertura |
| Idiomas | EN base / FR / ES | Expandir a AR (fase 2) y ZH (fase 3) |

---

## Hoja de ruta (fases)

### Fase 00 — Fundaciones (Semana 1) — 0€
- Registrar benaribi.ma y benaribiagence.com
- Crear página empresa LinkedIn
- Alta Google Business Profile con fotos actuales
- Instalar DocSend con dossier actual

### Fase 01 — Identidad visual (Semanas 2–4) — 1.500–3.500€
- Brief para diseñador: arco de herradura vectorial, paleta oficial, tipografía
- Logotipo sistema completo (4 variantes)
- Asset pack digital: plantillas IG, firma email, banner LinkedIn
- Guía de marca PDF

### Fase 02 — Contenido y B2B (Semanas 3–5) — 1.600–3.700€
- Sesión fotográfica de oficina profesional
- Vídeo hero 4K (dron Nador West Med + interior oficina)
- Dossier rediseñado EN/FR (12–16 págs) en DocSend
- LinkedIn ABM: Sales Navigator + listas segmentadas + campañas Insight Tag

### Fase 03 — Web pública (Semanas 5–10) — 2.500–5.000€
- Desarrollo React + Tailwind completo
- Multiidioma EN/FR/ES nativo
- Calculadora ROI fiscal v1
- Lead magnet + formulario segmentado integrado con CRM
- Analítica completa instalada y verificada

### Fase 04 — Portal cliente (Semanas 8–14) — 3.000–6.000€
- Setup Supabase (esquema + RLS + Storage)
- Autenticación y dashboard de operación
- Documentación segura + timeline
- Listado de propiedades filtrable
- Motor FastAPI: reportes PDF + notificaciones

### Fase 05 — Lanzamiento (Semana 14–15) — 500€ + 1.500€/mes
- Campaña lanzamiento redes
- LinkedIn Ads B2B hyper-targeted
- SEO internacional EN/FR/ES
- Primer "Benaribi Investment Briefing" trimestral

---

## Decisiones pendientes del cliente (phase gates)

1. ¿Quién gestiona el contenido web tras el lanzamiento? (retainer vs. equipo interno)
2. ¿Web pública y portal en paralelo o en secuencia?
3. ¿Existe base de datos actual de propiedades/clientes para migrar?
4. ¿Quién produce el copywriting EN/FR? (freelance vs. IA + revisión humana)
5. ¿Hay relación oficial con Nador West Med o AMDIE para usar sus logos?
6. ¿El portal incluye panel de agente interno desde v1?

---

## Skills activas para este proyecto

- **ui-ux-pro-max** — genera el design system adaptado al sector luxury real estate
- **frontend-design** — codifica componentes React/Tailwind con estética premium
- **impeccable** — audita y pule cada feature antes de aprobar

**Flujo de trabajo con skills:**
```
ui-ux-pro-max → design system (paleta, tipografía, componentes base)
     ↓
frontend-design → implementación de componentes y páginas
     ↓
impeccable → auditoría de calidad antes de merge
```

---

## Restricciones y principios de diseño

- **Mobile first** — el tráfico de Instagram y TikTok llega desde móvil
- **Performance** — Core Web Vitals perfectos, imágenes optimizadas, lazy loading
- **Accesibilidad** — WCAG AA mínimo
- **Sin dependencias innecesarias** — cada librería debe justificarse
- **Código limpio y documentado** — el cliente debe poder mantenerlo
- **Nunca folklórico** — cero elementos turísticos, bereberes decorativos o clichés marroquíes
- **Siempre institucional** — cada decisión visual debe poder compararse con JLL sin vergüenza

---

*Documento generado para /kiro-discovery — Benaribi Agence Digital Project — Mayo 2026*
