import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { Browser } from '../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';

const outDir = resolve('docs/pdf');
mkdirSync(outDir, { recursive: true });

const BASE_CSS = `
  @page {
    size: A4 portrait;
    margin: 15mm 15mm 15mm 15mm;
  }
  *, *::before, *::after {
    box-sizing: border-box;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #18181b;
    background: #ffffff;
    line-height: 1.5;
    font-size: 13.5px;
    margin: 0;
    padding: 0;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .doc-header {
    border-bottom: 2px solid #18181b;
    padding-bottom: 12px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .doc-brand {
    font-size: 22px;
    font-weight: 800;
    letter-spacing: -0.03em;
    color: #18181b;
  }
  .doc-brand span {
    font-size: 13px;
    font-weight: 500;
    color: #71717a;
    margin-left: 8px;
  }
  .doc-title {
    font-size: 18px;
    font-weight: 800;
    color: #18181b;
    margin: 0 0 4px 0;
  }
  .doc-meta {
    font-size: 12px;
    color: #71717a;
    font-weight: 600;
  }
  .card {
    background: #fafaf9;
    border: 1px solid #e4e4e7;
    border-radius: 10px;
    padding: 14px 16px;
    margin-bottom: 14px;
    page-break-inside: avoid;
  }
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    border-bottom: 1px solid #e4e4e7;
    padding-bottom: 6px;
  }
  .card-num {
    font-weight: 800;
    font-size: 12px;
    color: #71717a;
    text-transform: uppercase;
  }
  .card-badge {
    background: #e0f2fe;
    color: #0369a1;
    font-weight: 700;
    font-size: 11px;
    padding: 2px 8px;
    border-radius: 999px;
  }
  .card-title {
    font-size: 15px;
    font-weight: 800;
    color: #18181b;
    margin: 0 0 10px 0;
  }
  .dialogue-box {
    background: #ffffff;
    border-radius: 8px;
    padding: 10px 12px;
    margin-bottom: 8px;
    border: 1px solid #f4f4f5;
  }
  .dialogue-box:last-child {
    margin-bottom: 0;
  }
  .speaker {
    display: inline-block;
    font-weight: 800;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-bottom: 4px;
  }
  .speaker.vitaliy { color: #0284c7; }
  .speaker.natalia { color: #b45309; }
  ul.points {
    padding-left: 18px;
    margin: 0;
  }
  ul.points li {
    margin-bottom: 4px;
  }
  .highlight-pill {
    background: #fef3c7;
    padding: 1px 6px;
    border-radius: 4px;
    font-weight: 700;
  }
  .footer-note {
    margin-top: 24px;
    border-top: 1px solid #e4e4e7;
    padding-top: 8px;
    font-size: 11px;
    color: #a1a1aa;
    display: flex;
    justify-content: space-between;
  }
`;

// 1. DOC 1: SCENES & DIALOGUE
const HTML_DOC1 = `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <title>Сценарій та діалоги зйомки: Смарт 27 м²</title>
  <style>
    ${BASE_CSS}
  </style>
</head>
<body>
  <div class="doc-header">
    <div>
      <div class="doc-brand">358 <span>Студія дизайну та ремонту • Львів</span></div>
      <div class="doc-title">Сценарій та живі діалоги для YouTube (Сцени 1–6)</div>
    </div>
    <div style="text-align: right;">
      <div class="doc-meta">YouTube-випуск «Розумний ремонт»</div>
      <div class="doc-meta">Кейс: Смарт-квартира 27 м² (Львів)</div>
    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <span class="card-num">Сцена 1 • 00:00 – 03:00</span>
      <span class="card-badge">Камера на штативі • Вдвох у кадрі</span>
    </div>
    <h3 class="card-title">Історія з котловану 2020 року та головна дилема: продавати чи здавати?</h3>
    <div class="dialogue-box">
      <span class="speaker vitaliy">Віталій (починає):</span>
      <ul class="points">
        <li>Придбали цю смарт-квартиру <span class="highlight-pill">27 м² (2-й поверх)</span> ще <span class="highlight-pill">20 вересня 2020 року</span> на стадії котловану за <span class="highlight-pill">14 500 $</span>.</li>
        <li>На каналі вже є відео, як ми робили тут ремонт. Зараз усе завершено на 100%.</li>
        <li>Квартира стала як <strong>магніт</strong> — сюди заходиш, і не хочеться виходити. Шкода продавати!</li>
      </ul>
    </div>
    <div class="dialogue-box">
      <span class="speaker natalia">Наталя (доповнює):</span>
      <ul class="points">
        <li>Наше головне питання сьогодні: продати її зараз (такі квартири з ремонтом у будинку оцінюють у <span class="highlight-pill">75 000 – 80 000 $</span>) і купити нову під ремонт, чи залишити в оренду за <span class="highlight-pill">~500 $/міс.</span>?</li>
        <li>Зараз покажемо всі технічні й планувальні рішення на 27 м², а в кінці відкриємо наш рукописний блокнот і порахуємо кожну гривню та окупність.</li>
      </ul>
    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <span class="card-num">Сцена 2 • 03:00 – 05:30</span>
      <span class="card-badge">Жива зйомка біля входу • Шафа</span>
    </div>
    <h3 class="card-title">Чому для себе робили без 3D-візуалізацій + чотиридверна шафа</h3>
    <div class="dialogue-box">
      <span class="speaker vitaliy">Питання Віталія до Наталі:</span>
      <p style="margin: 0; color: #3f3f46;">«Для клієнтів у «358» ти завжди робиш повний дизайн-проєкт із кресленнями та візуалізаціями. Чому тут для себе ми обійшлися без візуалізацій?»</p>
    </div>
    <div class="dialogue-box">
      <span class="speaker natalia">Відповідь Наталі + показ шафи:</span>
      <ul class="points">
        <li>Ми погодили між собою тільки <strong>точне планування</strong>, бо за роки спільної роботи вже бачимо весь об'єм без картинок.</li>
        <li>Але без чіткого планування з розмірами на 27 м² неможливо вмістити стільки зон.</li>
        <li>Показуємо <strong>чотиридверну шафу до стелі</strong> при вході з чорною відкритою нішею та шухлядами — вона забрала весь одяг і побут, звільнивши кімнату.</li>
      </ul>
    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <span class="card-num">Сцена 3 • 05:30 – 09:30</span>
      <span class="card-badge">Зйомка з рук впритул • Санвузол</span>
    </div>
    <h3 class="card-title">Санвузол: двері всередину, бойлер 80 л із термозмішувачем, захист та ванна</h3>
    <div class="dialogue-box">
      <span class="speaker vitaliy">Що обов'язково показуємо наживо в кадрі:</span>
      <ul class="points">
        <li><strong>1. Двері санвузла відкриваються всередину в сторону ванни:</strong> не перекривають вузький коридор, у відкритому стані лягають уздовж ванни, зручно зайти й закрити за собою.</li>
        <li><strong>2. Колона з пральної та сушильної машин + шафа зверху:</strong> відкриваємо дверцята шафи над сушилкою.</li>
        <li><strong>3. Горизонтальний бойлер на 80 л + термозмішувальний вузол під ним:</strong> через обмежену висоту бойлер розташований горизонтально. Щоб мати великий запас гарячої води, бойлер гріє воду гарячіше, а <strong>термозмішувальний клапан</strong> знизу змішує її до стабільної комфортної температури.</li>
        <li><strong>4. Безпека та комфорт:</strong> встановлено <strong>редуктор тиску</strong>, <strong>антипотоп на 2 датчики</strong>, повноцінну ванну зі скляною шторкою, підвісний унітаз із гігієнічним душем і накладний умивальник.</li>
      </ul>
    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <span class="card-num">Сцена 4 • 09:30 – 14:30</span>
      <span class="card-badge">Проходка по кімнаті та кухні</span>
    </div>
    <h3 class="card-title">Монолітна стеля 2,5 м, тепла підлога з Wi-Fi, ліжко + диван і посудомийка</h3>
    <div class="dialogue-box">
      <span class="speaker natalia">Питання Наталі про стелю:</span>
      <p style="margin: 0; color: #3f3f46;">«Багато хто під час ремонту думає: робити гіпсокартон, натяжну стелю чи шпаклювати бетон? Чому тут ми шпаклювали бетон і що радимо замовникам?»</p>
    </div>
    <div class="dialogue-box">
      <span class="speaker vitaliy">Відповідь Віталія (Стеля + Тепла підлога):</span>
      <ul class="points">
        <li><strong>Стеля:</strong> Висота тут близько <span class="highlight-pill">2,5 м</span>. Щоб не втрачати об'єм і висоту, ми пошпаклювали і пофарбували бетонну монолітну стелю. На всіх об'єктах ми радимо саме таку стелю без гіпсокартону і натяжної (натяжну радимо лише тоді, коли треба суттєво зекономити бюджет).</li>
        <li><strong>Опалення:</strong> Виконано теплою підлогою у <span class="highlight-pill">3 контури</span> з зональними терморегуляторами і керуванням через <span class="highlight-pill">Wi-Fi</span>.</li>
        <li><strong>Зонування 27 м²:</strong> Повноцінне двоспальне ліжко з тумбами і підвісами + окремий диван біля панорамного вікна + круглий обідній стіл.</li>
        <li><strong>Дзеркала та кухня:</strong> Дві вертикальні смуги дзеркал до стелі з бра обабіч ТВ і столика візуально подвоюють ширину. У кухні до стелі вбудована <strong>посудомийна машина</strong>, духовка, поверхня, витяжка, холодильник + кондиціонер.</li>
      </ul>
    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <span class="card-num">Сцена 5 • 14:30 – 18:30</span>
      <span class="card-badge">Штатив за столом • Блокнот у руках</span>
    </div>
    <h3 class="card-title">Відкриваємо рукописний блокнот: 16 000 $ витрат + 13 000 $ праці та окупність</h3>
    <div class="dialogue-box">
      <span class="speaker vitaliy">Розкладаємо цифри по поличках:</span>
      <ul class="points">
        <li>Витрачено живими грошима за блокнотом: <span class="highlight-pill">700 000 грн (~16 000 $)</span> — сюди увійшли ВСІ матеріали, меблі, техніка + робота лише по 3 позиціях (стяжка, виготовлення меблів, укладання плитки).</li>
        <li>Усі інші роботи виконали самі. Якби робили на замовлення за оплату — наша робота коштувала б ще <span class="highlight-pill">~13 000 $</span> (разом ринкова вартість такого ремонту з меблями й технікою = <span class="highlight-pill">~29 000 $</span>).</li>
        <li>Купили з котловану (20.09.2020) за <span class="highlight-pill">14 500 $</span>. Зараз без ремонту в будинку — <span class="highlight-pill">~50 000 $</span>, з ремонтом — <span class="highlight-pill">75 000 – 80 000 $</span>.</li>
        <li><strong>Окупність оренди по ~500 $/міс. (6 000 $/рік):</strong> від наших живих вкладень (<span class="highlight-pill">30 500 $</span>) окупається за <strong>5 років (~20% річних)</strong>, а від ринкової ціни продажу (<span class="highlight-pill">75–80 тис. $</span>) — за <strong>12,5–13 років (~7,5–8% річних)</strong>.</li>
      </ul>
    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <span class="card-num">Сцена 6 • 18:30 – 20:00</span>
      <span class="camera-badge">Штатив • Фінал удвох</span>
    </div>
    <h3 class="card-title">Підсумок: чому схиляємось до оренди та ремонтів на замовлення</h3>
    <div class="dialogue-box">
      <span class="speaker vitaliy">Фінальне звернення до глядачів:</span>
      <ul class="points">
        <li>Серцем схиляємося залишити під оренду, бо таких за якістю квартир у будинку немає і відпускати її шкода.</li>
        <li>Для себе зрозуміли: наше головне покликання в «358» — робити якісні проєкти та ремонти під ключ на замовлення, а не просто перепродавати бетон.</li>
        <li><strong>Питання в коментарі:</strong> «А що б ви обрали на нашому місці — здавати за 500+ $/міс. (окупність вкладених 30 500 $ за 5 років) чи продати за 75–80 тис. $ і взяти новий об'єкт?»</li>
        <li>Посилання на наш сайт «358» з усіма фото та таблицею витрат — в описі під відео.</li>
      </ul>
    </div>
  </div>

  <div class="footer-note">
    <span>Студія архітектури та ремонту «358» • Львів</span>
    <span>Документ 1 із 3 • Сценарій</span>
  </div>
</body>
</html>`;

// 2. DOC 2: BUDGET & ECONOMICS
const HTML_DOC2 = `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <title>Кошторис, цифри та економіка окупності: Смарт 27 м²</title>
  <style>
    ${BASE_CSS}
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-bottom: 18px;
    }
    .kpi-box {
      background: #fafaf9;
      border: 1px solid #e4e4e7;
      border-radius: 8px;
      padding: 10px 12px;
      text-align: center;
    }
    .kpi-box-label {
      font-size: 11px;
      font-weight: 700;
      color: #71717a;
      text-transform: uppercase;
      margin-bottom: 3px;
    }
    .kpi-box-val {
      font-size: 19px;
      font-weight: 800;
      color: #18181b;
      letter-spacing: -0.02em;
    }
    .kpi-box-sub {
      font-size: 11px;
      color: #52525b;
      margin-top: 2px;
    }
    .math-card {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 10px;
      padding: 12px 14px;
      margin-bottom: 18px;
    }
    .math-title {
      font-weight: 800;
      font-size: 14px;
      color: #166534;
      margin: 0 0 8px 0;
    }
    .table-budget {
      width: 100%;
      border-collapse: collapse;
      font-size: 12.5px;
    }
    .table-budget th {
      background: #18181b;
      color: #ffffff;
      padding: 7px 10px;
      text-align: left;
      font-weight: 700;
      font-size: 12px;
    }
    .table-budget td {
      padding: 6px 10px;
      border-bottom: 1px solid #e4e4e7;
    }
    .table-budget tr:nth-child(even) {
      background: #fcfcfc;
    }
    .table-budget tr.total-row {
      background: #f4f4f5;
      font-weight: 800;
      border-top: 2px solid #18181b;
      border-bottom: 2px solid #18181b;
    }
    .num {
      text-align: right;
      font-weight: 700;
      white-space: nowrap;
    }
  </style>
</head>
<body>
  <div class="doc-header">
    <div>
      <div class="doc-brand">358 <span>Студія дизайну та ремонту • Львів</span></div>
      <div class="doc-title">Економіка об'єкта, окупність та кошторис із блокнота</div>
    </div>
    <div style="text-align: right;">
      <div class="doc-meta">YouTube «Розумний ремонт»</div>
      <div class="doc-meta">Об'єкт: Смарт 27 м² • 2020–2026 рр.</div>
    </div>
  </div>

  <div class="kpi-grid">
    <div class="kpi-box">
      <div class="kpi-box-label">Купівля (20.09.2020)</div>
      <div class="kpi-box-val">14 500 $</div>
      <div class="kpi-box-sub">Котлован, 27 м² (537 $/м²)</div>
    </div>
    <div class="kpi-box">
      <div class="kpi-box-label">Без ремонту зараз</div>
      <div class="kpi-box-val">~50 000 $</div>
      <div class="kpi-box-sub">Ринкова ціна в будинку</div>
    </div>
    <div class="kpi-box">
      <div class="kpi-box-label">Витрати з кишені</div>
      <div class="kpi-box-val">16 000 $</div>
      <div class="kpi-box-sub">~700 000 грн за блокнотом</div>
    </div>
    <div class="kpi-box">
      <div class="kpi-box-label">Власна праця «358»</div>
      <div class="kpi-box-val">~13 000 $</div>
      <div class="kpi-box-sub">Ринкова оцінка робіт</div>
    </div>
    <div class="kpi-box">
      <div class="kpi-box-label">Вкладено живих грошей</div>
      <div class="kpi-box-val">30 500 $</div>
      <div class="kpi-box-sub">14 500 $ + 16 000 $</div>
    </div>
    <div class="kpi-box">
      <div class="kpi-box-label">Оцінка з цим ремонтом</div>
      <div class="kpi-box-val">75 000 – 80 000 $</div>
      <div class="kpi-box-sub">Повний фарш під ключ</div>
    </div>
  </div>

  <div class="math-card">
    <div class="math-title">Математика довгострокової оренди (при ставці ~500 $/міс. = 6 000 $/рік)</div>
    <ul class="points" style="color: #14532d;">
      <li><strong>Погляд 1 — Від фактично вкладених живих грошей (30 500 $):</strong> окупність складає рівно <span class="highlight-pill">5 років</span> при дохідності <span class="highlight-pill">~19,7% річних</span>.</li>
      <li><strong>Погляд 2 — З урахуванням ринкової вартості власної праці (43 500 $):</strong> окупність складає <span class="highlight-pill">~7,2 року</span> при дохідності <span class="highlight-pill">~13,8% річних</span>.</li>
      <li><strong>Погляд 3 — Від поточної ринкової вартості продажу готової квартири (75 000 – 80 000 $):</strong> окупність складає <span class="highlight-pill">12,5 – 13,3 року</span> при спокійній консервативній дохідності <span class="highlight-pill">7,5% – 8,0% річних</span>.</li>
    </ul>
  </div>

  <table class="table-budget">
    <thead>
      <tr>
        <th style="width: 72%;">Позиція з рукописного блокнота (матеріали, обладнання, підрядники)</th>
        <th class="num" style="width: 28%;">Сума (грн)</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Корпусні меблі на замовлення (кухня до стелі, 4-дверна шафа, тумби, столик)</td><td class="num">137 000 грн</td></tr>
      <tr><td>Основна побутова техніка (пральна, сушильна, посудомийна, духовка, холодильник, плита)</td><td class="num">100 000 грн</td></tr>
      <tr><td>Плиточні роботи та керамограніт (матеріали + робота майстра)</td><td class="num">100 000 грн</td></tr>
      <tr><td>М'які меблі: диван біля вікна, ліжко двоспальне, обідній стіл, крісла</td><td class="num">46 000 грн</td></tr>
      <tr><td>Чорнова сантехніка та водяна тепла підлога у 3 контури з Wi-Fi регуляторами</td><td class="num">40 000 грн</td></tr>
      <tr><td>Кондиціонер інверторний</td><td class="num">30 000 грн</td></tr>
      <tr><td>Міжкімнатні двері санвузла (відкривання всередину)</td><td class="num">27 000 грн</td></tr>
      <tr><td>Змішувачі, душовий гарнітур, термозмішувальний клапан бойлера</td><td class="num">26 000 грн</td></tr>
      <tr><td>Телевізор 50" TCL QLED MiniLED</td><td class="num">24 000 грн</td></tr>
      <tr><td>Електромонтажні матеріали (кабелі, щит, автоматика Hager)</td><td class="num">20 000 грн</td></tr>
      <tr><td>Світло: люстри, бра, підвісні світильники, трекові лінії</td><td class="num">20 000 грн</td></tr>
      <tr><td>Машинна стяжка підлоги під нівелір (робота + матеріали)</td><td class="num">16 000 грн</td></tr>
      <tr><td>Малярні матеріали: фарба для монолітної стелі та стін, ґрунти, склохолст</td><td class="num">15 000 грн</td></tr>
      <tr><td>Санфаянс: підвісний унітаз, прихована інсталяція, гігієнічний душ</td><td class="num">15 000 грн</td></tr>
      <tr><td>Горизонтальний бойлер 80 л під стелю над пральною машиною</td><td class="num">15 000 грн</td></tr>
      <tr><td>Стельові карнизи / багети під фарбування</td><td class="num">12 000 грн</td></tr>
      <tr><td>Штукатурка та шпаклівка (сухі суміші, фінішні склади)</td><td class="num">12 000 грн</td></tr>
      <tr><td>Система вентиляції (канали, вентрешітки, витяжні вентилятори)</td><td class="num">11 600 грн</td></tr>
      <tr><td>Підлогові плінтуси (матеріали та фурнітура)</td><td class="num">9 000 грн</td></tr>
      <tr><td>Дзеркала: 2 вертикальні смуги до стелі біля ТВ + велике дзеркало у ванній</td><td class="num">9 000 грн</td></tr>
      <tr><td>Повноцінна акрилова ванна зі скляною шторкою</td><td class="num">8 000 грн</td></tr>
      <tr><td>Текстиль: блекаут-штори, тюль на панорамне вікно</td><td class="num">8 000 грн</td></tr>
      <tr><td>Постільна білизна, подушки, матрац</td><td class="num">7 000 грн</td></tr>
      <tr><td>Гідроізоляція вологих зон, епоксидна фуга, сантехнічні короби</td><td class="num">6 000 грн</td></tr>
      <tr><td>Килимки зонувальні біля ліжка та дивана</td><td class="num">6 000 грн</td></tr>
      <tr><td>Накладний умивальник на стільницю у ванній</td><td class="num">5 000 грн</td></tr>
      <tr><td>Безпека: редуктор тиску Caleffi + система антипотопу (2 датчики)</td><td class="num">4 600 грн</td></tr>
      <tr><td>Дводіапазонний Wi-Fi роутер</td><td class="num">3 500 грн</td></tr>
      <tr><td>Приліжкові тумбочки</td><td class="num">2 000 грн</td></tr>
      <tr class="total-row">
        <td>РАЗОМ ВИТРАЧЕНО ГРОШИМА ЗА БЛОКНОТОМ («З КИШЕНІ»)</td>
        <td class="num">~700 000 грн (~16 000 $)</td>
      </tr>
    </tbody>
  </table>

  <div class="footer-note">
    <span>Студія архітектури та ремонту «358» • Львів</span>
    <span>Документ 2 із 3 • Фінанси та кошторис</span>
  </div>
</body>
</html>`;

// 3. DOC 3: SHOT CHECKLIST (14 PLANS)
const HTML_DOC3 = `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <title>Чек-лист знімальних планів та B-roll: Смарт 27 м²</title>
  <style>
    ${BASE_CSS}
    .check-row {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 10px 12px;
      border: 1px solid #e4e4e7;
      border-radius: 8px;
      margin-bottom: 8px;
      background: #fafaf9;
      page-break-inside: avoid;
    }
    .checkbox-box {
      width: 20px;
      height: 20px;
      border: 2px solid #18181b;
      border-radius: 4px;
      flex-shrink: 0;
      margin-top: 1px;
      background: #ffffff;
    }
    .check-content {
      flex: 1;
    }
    .check-title {
      font-weight: 800;
      font-size: 13.5px;
      color: #18181b;
      margin-bottom: 2px;
    }
    .check-desc {
      font-size: 12.5px;
      color: #52525b;
    }
    .tag {
      display: inline-block;
      font-size: 11px;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 4px;
      background: #e4e4e7;
      color: #18181b;
      margin-right: 6px;
    }
  </style>
</head>
<body>
  <div class="doc-header">
    <div>
      <div class="doc-brand">358 <span>Студія дизайну та ремонту • Львів</span></div>
      <div class="doc-title">Режисерський чек-лист знімальних планів та B-roll (14 кадрів)</div>
    </div>
    <div style="text-align: right;">
      <div class="doc-meta">YouTube-канал «Розумний ремонт»</div>
      <div class="doc-meta">Об'єкт: Смарт 27 м²</div>
    </div>
  </div>

  <div style="margin-bottom: 14px; font-size: 12.5px; color: #52525b; background: #e0f2fe; padding: 10px 12px; border-radius: 8px;">
    <strong>Інструкція для оператора:</strong> Відзначайте галочками кожен кадр після запису. Обов'язково зняти статичні плани на штативі, плавні проходки (gimbal) та макро-деталі інженерних вузлів.
  </div>

  <div class="check-row">
    <div class="checkbox-box"></div>
    <div class="check-content">
      <div class="check-title"><span class="tag">Штатив</span> 1. Загальний вступний план: Віталій та Наталя в кадрі</div>
      <div class="check-desc">Сцена 1: вступ про покупку з котловану 2020 року за 14 500 $ та головну дилему (продати за 80 тис. $ чи здавати в оренду).</div>
    </div>
  </div>

  <div class="check-row">
    <div class="checkbox-box"></div>
    <div class="check-content">
      <div class="check-title"><span class="tag">Проходка</span> 2. Чотиридверна шафа при вході (до стелі)</div>
      <div class="check-desc">Відкрити дверцята, показати глибину, відкриту нішу чорного кольору, висувні шухляди та як вона вміщує весь побут.</div>
    </div>
  </div>

  <div class="check-row">
    <div class="checkbox-box"></div>
    <div class="check-content">
      <div class="check-title"><span class="tag">Динаміка</span> 3. Двері санвузла з відкриванням всередину (в дії)</div>
      <div class="check-desc">Показати наживо: двері відчиняються всередину вздовж ванни, не перекривають вузький коридор і дозволяють зручно зайти.</div>
    </div>
  </div>

  <div class="check-row">
    <div class="checkbox-box"></div>
    <div class="check-content">
      <div class="check-title"><span class="tag">Середній</span> 4. Колона: пральна машина + сушильна машина у вбудованій шафі</div>
      <div class="check-desc">Відкрити фасад шафи, показати ідеальне розташування побутової техніки в санвузлі смарт-квартири.</div>
    </div>
  </div>

  <div class="check-row">
    <div class="checkbox-box"></div>
    <div class="check-content">
      <div class="check-title"><span class="tag">Макро B-roll</span> 5. Горизонтальний бойлер 80 л + термозмішувальний клапан</div>
      <div class="check-desc">Крупний план вузла підмішування холодної води під бойлером. Показати, як це економить висоту та збільшує запас гарячої води.</div>
    </div>
  </div>

  <div class="check-row">
    <div class="checkbox-box"></div>
    <div class="check-content">
      <div class="check-title"><span class="tag">Макро B-roll</span> 6. Ввідний вузол: редуктор тиску Caleffi та датчики антипотопу</div>
      <div class="check-desc">Крупний план сантехнічного захисту квартири від високого тиску в мережі новобудови та можливих протікань.</div>
    </div>
  </div>

  <div class="check-row">
    <div class="checkbox-box"></div>
    <div class="check-content">
      <div class="check-title"><span class="tag">Панорама</span> 7. Зона ванни: скляна шторка, інсталяція, гігієнічний душ, умивальник</div>
      <div class="check-desc">Плавний вертикальний кадр чистового оздоблення керамогранітом із зарізкою кутів під 45° та освітленням дзеркала.</div>
    </div>
  </div>

  <div class="check-row">
    <div class="checkbox-box"></div>
    <div class="check-content">
      <div class="check-title"><span class="tag">Макро B-roll</span> 8. Бетонна монолітна стеля (висота ~2,5 м) та багети</div>
      <div class="check-desc">Кадр під косим кутом до світла з вікна: показати бездоганну площину шпаклівки й фарбування бетону без гіпсокартону.</div>
    </div>
  </div>

  <div class="check-row">
    <div class="checkbox-box"></div>
    <div class="check-content">
      <div class="check-title"><span class="tag">Макро B-roll</span> 9. Терморегулятори теплої підлоги (3 контури з Wi-Fi)</div>
      <div class="check-desc">Крупний план сенсорного екрана терморегулятора на стіні та демонстрація керування зі смартфона через додаток.</div>
    </div>
  </div>

  <div class="check-row">
    <div class="checkbox-box"></div>
    <div class="check-content">
      <div class="check-title"><span class="tag">Широкий кут</span> 10. Спальне ліжко + диван біля вікна в єдиній перспективі</div>
      <div class="check-desc">Показати, що на 27 м² є і приватна зона відпочинку (двоспальне ліжко з тумбами), і денна зона з диваном біля вікна.</div>
    </div>
  </div>

  <div class="check-row">
    <div class="checkbox-box"></div>
    <div class="check-content">
      <div class="check-title"><span class="tag">Середній</span> 11. Зона ТВ: 50" MiniLED + дві вертикальні смуги дзеркал із бра</div>
      <div class="check-desc">Показати візуальний ефект розширення простору від дзеркальних смуг від підлоги до стелі з увімкненими бра.</div>
    </div>
  </div>

  <div class="check-row">
    <div class="checkbox-box"></div>
    <div class="check-content">
      <div class="check-title"><span class="tag">Проходка</span> 12. Кухня до стелі: відкрити посудомийку, духовку, витяжку</div>
      <div class="check-desc">Показати компактну, але 100% функціональну кухню: відкрити вбудовану посудомийну машину та холодильник.</div>
    </div>
  </div>

  <div class="check-row">
    <div class="checkbox-box"></div>
    <div class="check-content">
      <div class="check-title"><span class="tag">Штатив</span> 13. Розбір рукописного блокнота за круглим столом</div>
      <div class="check-desc">Сцена 5: Віталій гортає реальний блокнот із кошторисом, Наталя коментує цифри (16 000 $ грошима + 13 000 $ праці).</div>
    </div>
  </div>

  <div class="check-row">
    <div class="checkbox-box"></div>
    <div class="check-content">
      <div class="check-title"><span class="tag">Макро Top-Down</span> 14. Крупний план сторінок блокнота зверху (Top-Down, 5–10 сек)</div>
      <div class="check-desc">Кадр зверху над столом для перебивки під час начитки структури витрат та підсумкових 700 000 грн.</div>
    </div>
  </div>

  <div class="footer-note">
    <span>Студія архітектури та ремонту «358» • Львів</span>
    <span>Документ 3 із 3 • Чек-лист кадрів</span>
  </div>
</body>
</html>`;

const items = [
  { name: '01_Scenariy_i_Dialohy_27m2', html: HTML_DOC1 },
  { name: '02_Koshtorys_i_Ekonomika_27m2', html: HTML_DOC2 },
  { name: '03_Cheklist_Kadriv_B-Roll_27m2', html: HTML_DOC3 },
];

async function main() {
  console.log('Launching Chrome to generate 3 PDF documents...');
  const browser = await Browser.launch({ width: 1200, height: 900 });

  for (const item of items) {
    const htmlPath = join(outDir, `${item.name}.html`);
    const pdfPath = join(outDir, `${item.name}.pdf`);
    writeFileSync(htmlPath, item.html, 'utf-8');

    const page = await browser.newPage({ width: 1200, height: 900 });
    await page.goto(`file://${htmlPath}`, { timeoutMs: 15000, settleMs: 500 });

    const pdfRes = await page.send('Page.printToPDF', {
      printBackground: true,
      paperWidth: 8.27, // A4 standard width in inches
      paperHeight: 11.69, // A4 standard height in inches
      marginTop: 0.4,
      marginBottom: 0.4,
      marginLeft: 0.4,
      marginRight: 0.4,
      preferCSSPageSize: true,
    });

    writeFileSync(pdfPath, Buffer.from(pdfRes.data, 'base64'));
    console.log(`Generated: ${pdfPath}`);
    await page.close();
  }

  await browser.close();
  console.log('All 3 PDF documents generated successfully!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

