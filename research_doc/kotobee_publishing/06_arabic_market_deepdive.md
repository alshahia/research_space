# 06 — Arabic Market Deep Dive / التحليل المعمّق للسوق العربية

**Sources:** angle-genres "Language / market lens" Arabic section + cards 2/8; angle-platform findings 26/39 + Arabic samples + eFinance v1.9.8 + Arabic customers; angle-strategy §D3 + §E3; canonical "Language lens" + risks 2–4; auto-answers Q1/Q6. **Access date for all URLs: 2026-08-12.**

## English summary (read this first)

This chapter is the Arabic half of the bilingual dossier (user decision Q6 — hybrid: chapters 01–05 in English, chapter 06 in Arabic with English summaries). What it contains:

1. **Purpose.** A fully Arabic-language analysis of the MENA/Arabic market on Kotobee, for an Arabic-literate self-publisher.
2. **Covered topics.** Market reality, recommended lanes, Arabic examples with links, RTL build notes, MENA payments, and the EN↔AR translation workflow.
3. **Key finding — the evidence is qualitative.** Kotobee runs a full Arabic ecosystem: the localized كتبي Arabic site, Arabic samples (مرض الزهايمر، لغة الجسد), an Arabic education whitepaper, an Arabic email course, and Arabic testimonials (Sultan Qaboos University).
4. **Key finding — institutional Arabic customers.** MENA governments (Egypt/KSA/Oman/Qatar/UAE), universities (Ain Shams, Helwan, al-Qasemi), publishers (Elyssar Press, Rushd Bookstore, Minhaj), the Ketab national digital library, and the Zedne Arabic children's library.
5. **Key finding — no quantitative data.** No free quantitative Arabic ebook-market dataset was found in research; every Arabic claim in this chapter is explicitly labeled qualitative.
6. **Key finding — recommended lanes.** Education, children's, self-development, and faith-adjacent content are the defensible Arabic starter set.
7. **Key finding — fiction judgment.** Arabic fiction is publishable; the "clean/family" fiction norm for MENA retail is a market-norm judgment, flagged as such, not a measured fact.
8. **Key finding — toolchain.** Kotobee's Arabic RTL + DRM + mobile reader give Arabic self-publishers a native toolchain that KDP's Arabic support cannot match (research judgment, flagged).
9. **Key finding — payments.** Kotobee Books pays via the author's own Stripe/PayPal (author-location caveat); eFinance was added v1.9.8 (2026-07-07) for Egyptian audiences; Moyasar (MENA) is supported for Library/Cloud sales.
10. **Key finding — royalties.** "100% royalties" is "for a limited time" per the official support article — verify at signup; plan economics at a 70% benchmark.
11. **Key finding — translation.** LLM drafts are only the start; human review is mandatory; Arabic register and religious-sensitivity errors are common LLM failure modes (research finding E3, copied below).
12. **Glossary.** A bilingual Arabic–English glossary (30+ terms) closes the chapter and is the term-consistency reference for all your Arabic books.
13. **How to use — order.** Read the Arabic sections in order: market reality → recommended lanes → examples → build notes → payments → translation workflow.
14. **How to use — links.** Cross-check every linked resource in chapter 99 (appendix — full URL register, access date 2026-08-12) before signup.
15. **How to use — companions.** This chapter pairs with chapter 02 (genre ranking and market lens) and chapter 05 (Arabic copy-paste prompts in the prompt bank).
16. **Scope note.** Arabic content is Modern Standard Arabic (فصحى); proper nouns (Zedne, Ketab, Elyssar, Rushd, Minhaj, Moyasar, eFinance) are kept in their source form because research recorded them in Latin script only.

---

## 1. واقع السوق العربية على منصة كوتوبي: أدلة نوعية لا كمية

**وسم الصدق:** الأدلة في هذا القسم **نوعية** — أي أدلة بيئية مستقاة من منصة كوتوبي نفسها (الموقع، العيّنات، دراسات الحالة، قائمة العملاء، المتجر). لم يعثر البحث على أي بيانات كمية مجانية عن سوق الكتب الرقمية العربية (عدد المبيعات، الإيرادات، نسبة النمو)، وهذا غياب موثّق في ملفات البحث؛ لذلك لا ينبغي التعامل مع أي رقم في هذا الفصل على أنه قياس للطلب العربي.

الأدلة النوعية المتوفرة (كلها بصلاحية الوصول 2026-08-12):

- **موقع عربي كامل (كتبي):** https://www.kotobee.com/ar — الموقع مترجم بالكامل إلى العربية، ويضم ورقة تعليمية بالعربية (المسار كما ورد في البحث: `/files/docs/education-whitepaper-ar.pdf`) ودورة بريدية عربية، وشهادات عربية منها جامعة السلطان قابوس.
- **عيّنات عربية:** https://www.kotobee.com/en/samples/alzheimer-arabic (مرض الزهايمر) و https://www.kotobee.com/en/samples/body-language-arabic (لغة الجسد) — إثبات عملي أن الكتب العربية التفاعلية تعمل على المنصة بالاتجاه من اليمين إلى اليسار (RTL).
- **عملاء مؤسسيون في المنطقة:** حكومات مصر والسعودية وقطر والإمارات وعُمان وفلسطين، وجامعات عين شمس (مكتبة ASU2Learn) وحلوان والقاسمي، وشركات كبرى مثل أرامكو — https://www.kotobee.com/en/customers.
- **ناشرون عرب:** Elyssar Press وRushd Bookstore وMinhaj ضمن قائمة عملاء كوتوبي (المصدر نفسه).
- **المكتبة الوطنية الرقمية "Ketab" في مصر:** دراسة حالة رسمية — https://www.kotobee.com/en/case-study/ketab-digital-library-egypt.
- **مكتبة "Zedne" العربية لكتب الأطفال:** دراسة حالة رسمية — https://www.kotobee.com/en/case-study/zedne-arabic-childrens-ebooks-library.
- **عناوين عربية على متجر كوتوبي:** الدليل الشامل للسيارات الكهربائية والهجينة، ومدرسة المستقبل، وملحمة سفينة الفكر وحقيقة فلسطين، إضافة إلى عناوين تعليمية عربية من كوتوبي نفسها — تُعرض عبر https://books.kotobee.com/library (المكتبة تطبيق ويب تفاعلي، والعناوين تُكتشف بالتنقّل داخله).

**الخلاصة:** البيئة العربية في كوتوبي معاملة كسوق من الدرجة الأولى وليست إضافة لاحقة، لكن لا توجد بيانات مبيعات عربية منشورة؛ القرارات المبنية على هذا الفصل قرارات مبنية على أدلة نوعية فقط، وعلى أرقام السوق العالمية الموسومة بمصادرها في الفصل 02.

## 2. المسارات الموصى بها للنشر بالعربية

التوصية القادمة من البحث (توصية 5 في ملف angle-genres): **المحتوى التعليمي + كتب الأطفال + تطوير الذات + المحتوى الروحي/الديني** هو مجموعة الانطلاق الدفاعية للكاتب العربي.

الأسانيد:

- **عرض المتجر (جانب العرض لا الطلب):** فئة التعليم هي الأكبر في متجر كوتوبي بـ 3,589 عنوانًا، ثم كتب الأطفال 503، والصحة والعافية 353، وعلم النفس وتطوير الذات 214 (لقطة متجر 2026-08-12).
- **أرقام السوق العالمية (WordsRated، صفحات محدّثة 2026-03-27):** كتب الأطفال = 32.8% من كل مبيعات الكتب في الولايات المتحدة (2022)؛ النشر التعليمي = 31.28% من إيرادات صناعة النشر (2022)؛ صناعة تطوير الذات = 10.5 مليار دولار (2020) بنمو 19.3% (2021)؛ الكتب الدينية = 757.7 مليون دولار أمريكي (2022، نمو 7.46%) لكن 12.5% فقط منها رقمي — أي فراغ رقمي واضح؛ والقرآن الكريم بأكثر من 800 مليون نسخة عالميًا.
- **البنية العربية للمنصة** (القسم 1 أعلاه) تجعل هذه المسارات الأربعة "موطن كوتوبي" نفسه.

**الرواية العربية:** قابلة للنشر من الناحية التقنية، لكن يجب تسويقها بوصفها قراءة **"عائلية نظيفة" (clean/family)** لتناسب معايير أسواق التجزئة في الشرق الأوسط وشمال أفريقيا — **هذا حكم حول معايير السوق (market-norm judgment) وليس قياسًا، وقد وُسم بذلك صراحة في البحث**. كما أن متجر كوتوبي لا يملك فئة رومانسية أصلًا، لذا الرومانسية العربية تُبنى في كوتوبي وتُباع على أمازون/كوبو (مسار التصدير)، كما في الفصل 02 البطاقة 5.

## 3. أمثلة عربية مع الروابط

- **عيّنتا المنصة الرسميتان:** [مرض الزهايمر](https://www.kotobee.com/en/samples/alzheimer-arabic) و[لغة الجسد](https://www.kotobee.com/en/samples/body-language-arabic) — دراسة النموذجين قبل البناء تختصر أخطاء التنسيق العربي (RTL) والتفاعل.
- **عناوين عربية على المتجر:** الدليل الشامل للسيارات الكهربائية والهجينة، مدرسة المستقبل، ملحمة سفينة الفكر وحقيقة فلسطين (عبر https://books.kotobee.com/library) — دليل وجود كتب عربية منشورة فعلًا على المنصة.
- **دراستا حالة عربيتان:** [مكتبة Zedne العربية لكتب الأطفال](https://www.kotobee.com/en/case-study/zedne-arabic-childrens-ebooks-library) و[المكتبة الوطنية الرقمية Ketab في مصر](https://www.kotobee.com/en/case-study/ketab-digital-library-egypt) — النموذجان اللذان يثبتان الاستخدام المؤسسي العربي للمنصة.
- **ناشر عربي على المنصة:** Rushd Bookstore ضمن عملاء كوتوبي (https://www.kotobee.com/en/customers) — شريك بيع محتمل أو مرجع أسعار في السوق العربية.
- **شهادة عربية:** جامعة السلطان قابوس على الموقع العربي (https://www.kotobee.com/ar).

## 4. ملاحظات البناء: الاتجاه RTL والمحتوى التفاعلي

- **RTL مثبت لا نظري:** وجود العيّنتين العربيتين (مرض الزهايمر، لغة الجسد) على صفحات العيّنات الرسمية يثبت أن القراءة العربية بالاتجاه من اليمين إلى اليسار تعمل داخل تطبيقات كوتوبي؛ كوتوبي بُنيت والعربية لغة من الدرجة الأولى.
- **ميزة البناء العربي أولًا مقابل KDP:** حكم موثق في البحث (angle-genres، قسم العدسة اللغوية): دعم أمازون KDP للعربية "وظيفي" فقط، بينما تصميم كوتوبي التفاعلي والموجه للعربية هو "موطنه الأصلي" — الأداة العربية المتكاملة (RTL + إدارة حقوق + قارئ محمول) لا يضاهيها ما تقدمه KDP للعربية.
- **التنسيقات:** التنسيق الثابت (fixed) لكتب الأطفال المصوّرة والكتب المعتمدة على التصميم؛ والتنسيق السلس/المتدفق (reflowable) للروايات والتطوير الذاتي والقراءة على الجوال؛ وكوتوبي تسمح **بخلط التنسيقين في كتاب واحد** (دليل تفاعلي رسمي: https://blog.kotobee.com/how-create-interactive-ebook-guide/).
- **التفاعلية المناسبة للعربية:** اختبارات (اختيار من متعدد، صح/خطأ، سحب وإفلات)، صوت وفيديو، وأسئلة تفاعلية — مثالية للكتب التعليمية وكتب الأطفال.
- **الصوتيات والقراءة الجهرية:** ElevenLabs يقدم أصوات سرد ذكاء اصطناعي بأكثر من 70 لغة مع خطة مجانية ومدفوعة (https://elevenlabs.io/)؛ وKotobee Narrator مجاني يحوّل ملفات MP3 إلى كتب صوتية منظمة قابلة للبيع (https://www.kotobee.com/en/products/narrator).
- **حدود التفاعل:** التفاعلية تعمل داخل تطبيقات كوتوبي (القارئ/السحابة/المكتبة) فقط؛ التصدير إلى أمازون بصيغة EPUB عادية يفقد التفاعل — صدّر النسخة العادية للمتاجر واحتفظ بالنسخة التفاعلية لقنوات كوتوبي (مصدر: https://blog.kotobee.com/ebook-drm-security-what-how/).

## 5. المدفوعات في منطقة الشرق الأوسط وشمال أفريقيا

- **Kotobee Books:** المؤلف يربط حساب **Stripe أو PayPal الخاص به** (مفاتيح API)؛ المشتري يدفع للمؤلف مباشرة؛ وحقوق الملكية تصل إلى حساب المؤلف في بوابة الدفع نفسها (مقال الدعم: https://support.kotobee.com/en/support/solutions/articles/8000111089-collect-payments-in-kotobee-books).
- **تحذير موقع المؤلف (caveat):** الدفع مبني على البوابة التي يملكها المؤلف، والرسوم تُخصم من حسابه (نحو 2.9% + 0.30 دولار لكل عملية). غير مؤكد ما إذا كانت بوابة eFinance متاحة للبائعين غير المصريين — تحقق عند التسجيل إن لم تكن في مصر (مذكور في الفصل 01).
- **eFinance (مصر):** بوابة دفع مصرية أُضيفت في الإصدار v1.9.8 بتاريخ 2026-07-07 — "بوابات دفع… للجمهور المصري" (مقال الإصدار: https://support.kotobee.com/en/support/solutions/articles/8000130253-kotobee-v1-9-8-platform-release-7th-july-2026).
- **Moyasar (الشرق الأوسط):** بوابة دفع لمنطقة الشرق الأوسط وشمال أفريقيا، مدعومة لمبيعات **Library وCloud** (رسوم لكل معاملة) وليست لـ Kotobee Books (مقال الدعم: https://support.kotobee.com/en/support/solutions/articles/8000098165-collect-payments-with-moyasar).
- **"100% من حقوق الملكية":** الصياغة الرسمية في مقال الدليل خطوة بخطوة هي "لفترة محدودة" (for a limited time) — https://support.kotobee.com/en/support/solutions/articles/8000120127-publishing-your-ebook-on-kotobee-books-step-by-step-guide. تعامل معها كميزة حالية، وخطط اقتصادياتك على أساس 70% كمعيار احتياطي.
- **العملة:** الأسعار على Kotobee Books تُحدد بالدولار الأمريكي (0 = مجاني).

## 6. سير عمل الترجمة من الإنجليزية إلى العربية وبالعكس

- **الخطوة 1 — مسودة آلية:** مسودة أولية عبر نموذج لغوي كبير (LLM)، مع **DeepL** مرجع الترجمة المعتمد في هذا الملف (https://www.deepl.com/) و**Grammarly** للمراجعة النحوية (دعم عربي محدود، خطة مجانية/12 دولارًا شهريًا؛ https://www.grammarly.com/).
- **الخطوة 2 — مراجعة بشرية إلزامية (لا يمكن تخطيها):** حكم من ملف البحث (E1.8 وE3): "أخطاء المستوى اللغوي العربي والحساسية الدينية هي أنماط فشل شائعة لنماذج اللغة" — أي أن المسودة الآلية نقطة بداية، والمراجعة البشرية شرط الجودة.
- **قائمة التحقق من المراجعة:**
  1. المستوى اللغوي: فصحى موحدة (Modern Standard Arabic) وليست عامية، إلا إذا كان الكتاب موجّهًا لعامية بعينها بقرار مقصود.
  2. الحساسية الدينية والثقافية: مراجعة أي عبارة تمس الدين أو العادات (خاصة في مسار المحتوى الروحي/الديني) يدويًا وبحذر شديد.
  3. اتساق المصطلحات: مصطلح واحد لكل مفهوم في كل كتبك — استخدم معجم الفصل أدناه كمرجع موحد.
  4. سلامة RTL: الأرقام والتواريخ وعلامات الترقيم وترتيب الاقتباسات عند خلط العربية بالإنجليزية.
  5. تدقيق الحقائق يدويًا: دقة الذكاء الاصطناعي نحو 80% (حسب مقال كوتوبي المُستشهد به في الفصل 05) — خاصة المحتوى الصحي والديني والقانوني.
- **الإصدار المزدوج:** نماذج كوتوبي تثبت نمط النشر بلغتين — إصدار عربي وإنجليزي من القالب التفاعلي نفسه بتكلفة حدية شبه صفرية (حكم من البحث في العدسة اللغوية).
- **الإفصاح:** راجع عند التسجيل شروط Kotobee Books المتعلقة بالمحتوى المولّد بالذكاء الاصطناعي (الرابط موجود في قسم "تحقق عند التسجيل" بالفصل 99، ومحتواه لم يُقرأ في البحث).

## 7. معجم عربي – إنجليزي (مصطلحات النشر على كوتوبي)

| English | العربية | ملاحظة |
|---|---|---|
| publish / publishing | نشر / النشر | فعل النشر وإطلاق الكتاب |
| self-publishing | نشر ذاتي | النشر دون دار نشر |
| royalties | حقوق الملكية (عائدات البيع) | نسبة المؤلف من سعر البيع |
| royalty percentage | نسبة حقوق الملكية | مثل 100% أو 70% |
| ebook | كتاب رقمي | الكتاب بصيغة إلكترونية |
| EPUB | EPUB | الصيغة المفتوحة للكتب الرقمية (يقبلها متجر كوتوبي) |
| KPUB | KPUB | صيغة كوتوبي الداخلية (يقبلها متجر كوتوبي) |
| RTL (right-to-left) | اتجاه النص من اليمين إلى اليسار | اتجاه القراءة العربية |
| fixed layout | تنسيق ثابت | لكتب الأطفال المصوّرة والتصميم |
| reflowable layout | تنسيق سلس (متدفق) | للروايات وتكيّف النص مع الشاشة |
| cover | غلاف | صورة الغلاف (1600×2400 بكسل) |
| storefront | متجر (واجهة بيع) | متجر كوتوبي: books.kotobee.com |
| library | مكتبة | معرض الكتب أو المكتبة ذات العلامة التجارية |
| reader | قارئ | تطبيق القراءة (Kotobee Reader) |
| author | مؤلف | صاحب الكتاب |
| price | سعر | يحدد بالدولار الأمريكي |
| payment gateway | بوابة دفع | مثل Stripe وPayPal وeFinance وMoyasar |
| payment processor | معالج المدفوعات | يخصم رسوم المعالجة (نحو 2.9% + 0.30$) |
| translation | ترجمة | نقل النص بين اللغات |
| machine translation | ترجمة آلية | مسودة أولية فقط — مراجعة بشرية إلزامية |
| human review | مراجعة بشرية | شرط الجودة بعد الترجمة الآلية |
| proofreading | تدقيق لغوي | المراجعة النحوية والإملائية |
| interactive | تفاعلي | اختبارات وصوت وفيديو داخل الكتاب |
| quiz | اختبار تفاعلي | أسئلة اختيار/صح وخطأ/سحب وإفلات |
| audiobook | كتاب صوتي | يُبنى عبر Kotobee Narrator |
| narrator | راوٍ / أداة السرد | أداة كوتوبي المجانية للكتب الصوتية |
| export | تصدير | إخراج بصيغ EPUB/MOBI/PDF |
| distribution | توزيع | إيصال الكتاب للقنوات والمتاجر |
| platform | منصة | كوتوبي نفسها |
| account | حساب | حساب المؤلف |
| novel | رواية | قصة طويلة |
| clean/family fiction | رواية عائلية نظيفة | تناسب جميع أفراد الأسرة (معيار سوق، لا قياس) |
| MENA | منطقة الشرق الأوسط وشمال أفريقيا | السوق المستهدفة في هذا الفصل |
| copyright | حقوق المؤلف | الملكية الفكرية للكتاب |

## English summary (bottom)

This chapter establishes that Kotobee's Arabic ecosystem is real but qualitative: recommended lanes are education, children's, self-development, and faith content, with "clean/family" fiction as a flagged market judgment. Build RTL-first in Kotobee, collect payments via your own Stripe/PayPal (eFinance for Egypt, Moyasar for Library/Cloud), and always human-review machine translation. Full URL register, verify-at-signup flags, and dead-URL table are in chapter 99.
