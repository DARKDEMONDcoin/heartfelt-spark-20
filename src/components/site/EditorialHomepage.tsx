import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, BarChart3, BrainCircuit, CalendarCheck2, Check, CheckCircle2, Clock3, Code2, Globe2, Loader2, LockKeyhole, MessageSquareText, Play, SearchCheck, Send, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import { faqs } from "@/components/site/Faq";
import { Portrait } from "@/components/site/Portrait";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { plans } from "@/data/pricing";
import { stories } from "@/data/stories";
import dashboardAsset from "@/assets/product/dashboard.webp.asset.json";
import approvalsAsset from "@/assets/product/approvals.webp.asset.json";
import brainAsset from "@/assets/product/brain.webp.asset.json";
import integrationsAsset from "@/assets/product/integrations.webp.asset.json";
import reportsAsset from "@/assets/product/reports.webp.asset.json";

type DemoPhase = "idle" | "thinking" | "draft" | "approved";

const capabilities = [
  { icon: MessageSquareText, kicker: "سِراج · المحتوى", title: "من فكرة واحدة إلى حضور يومي متكامل.", body: "يخطط ويكتب ويجهّز المحتوى لكل منصة، ثم يضع كل مادة أمامك للمراجعة.", image: dashboardAsset.url, tone: "terracotta", span: "wide" },
  { icon: ShieldCheck, kicker: "التحكم", title: "لا شيء حساس يخرج دونك.", body: "قواعد اعتماد واضحة تحفظ سيطرتك وتترك العمل يتحرك.", image: approvalsAsset.url, tone: "teal", span: "standard" },
  { icon: BrainCircuit, kicker: "عقل العلامة", title: "سياق واحد يتذكره الفريق كله.", body: "نبرتك وجمهورك ومنتجاتك تتحول إلى معرفة مشتركة.", image: brainAsset.url, tone: "gold", span: "standard" },
  { icon: CalendarCheck2, kicker: "أمَل · التنظيم", title: "الأولوية التالية واضحة دائماً.", body: "تنظيم للتقويم والبريد والمتابعات من دون جداول مبعثرة.", image: reportsAsset.url, tone: "neutral", span: "standard" },
  { icon: SearchCheck, kicker: "نور · الظهور", title: "محتوى يُكتشف ويستحق القراءة.", body: "بحث وكتابة وتحسين لمحركات البحث والإجابة.", image: integrationsAsset.url, tone: "teal", span: "wide" },
] as const;

const sectors = [
  { id: "ecommerce", label: "المتاجر", title: "من أول منشور إلى متابعة الطلب.", body: "المحتوى والحملات ورسائل العملاء تتحرك في مسار واحد دون نسخ ولصق بين الأدوات.", stat: "٧ منصات", image: dashboardAsset.url },
  { id: "restaurants", label: "المطاعم", title: "حضور يومي وردود أسرع وقت الذروة.", body: "جهّز العروض، انشرها، وتابع الرسائل والموافقات من مساحة واحدة.", stat: "٢٤/٧", image: approvalsAsset.url },
  { id: "clinics", label: "العيادات", title: "محتوى يبني الثقة ويحفظ وقت الفريق.", body: "خطط توعوية وردود متسقة مع مراجعة بشرية قبل المواد الحساسة.", stat: "خطوة واحدة", image: brainAsset.url },
  { id: "realestate", label: "العقار", title: "كل فرصة تحصل على متابعة كاملة.", body: "العروض والمحتوى والتقارير تنتقل بين الموظفين بسياق واضح.", stat: "٦ موظفين", image: reportsAsset.url },
] as const;

const stats = [
  { value: "١٨٤", label: "مهمة نموذجية كل أسبوع" },
  { value: "٦٨", label: "ساعة يمكن توفيرها" },
  { value: "−٩٣٪", label: "في زمن الرد" },
  { value: "٢٫٦×", label: "اجتماعات مؤهلة" },
];

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry?.isIntersecting) { node.classList.add("is-visible"); observer.disconnect(); } }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`sahl-reveal ${className}`}>{children}</div>;
}

function ProductFrame({ src, alt, hero = false }: { src: string; alt: string; hero?: boolean }) {
  return <figure className={`sahl-product-frame${hero ? " is-hero" : ""}`}><div className="sahl-browser-bar" aria-hidden="true"><span /><span /><span /><small>app.sahl.ai</small></div><img src={src} alt={alt} loading={hero ? "eager" : "lazy"} /></figure>;
}

function SirajDemo() {
  const [prompt, setPrompt] = useState("جهّز حملة لإطلاق منتجنا الجديد الأسبوع القادم");
  const [phase, setPhase] = useState<DemoPhase>("idle");
  const timer = useRef<number | null>(null);
  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);
  const run = () => { if (!prompt.trim() || phase === "thinking") return; setPhase("thinking"); timer.current = window.setTimeout(() => setPhase("draft"), 850); };
  return <div className="sahl-demo" id="siraj-demo"><header><span><i /> مساحة عمل سهل</span><strong>محادثة مع سِراج</strong><small>متصل الآن</small></header><div className="sahl-demo-grid"><aside><Portrait memberId="sonny" name="سِراج" eager /><strong>سِراج</strong><small>مدير المحتوى</small><nav><b>المحادثة</b><span>المهام</span><span>المعرفة</span><span>النتائج</span></nav></aside><div className="sahl-chat"><div className="sahl-user-message"><small>أنت</small><p>{prompt}</p></div>{phase === "thinking" && <div className="sahl-thinking"><Loader2 className="animate-spin" /> يراجع سِراج عقل العلامة ويقسم الحملة...</div>}{(phase === "draft" || phase === "approved") && <div className="sahl-agent-message"><span><Portrait memberId="sonny" name="سِراج" /><b>سِراج</b></span><p>جهّزت خطة إطلاق من ٧ أيام: إعلان تمهيدي، ٣ منشورات، قصة يومية، ورسائل متابعة بنبرة علامتك.</p><div><span>٧ مواد</span><span>إنستقرام + فيسبوك</span></div></div>}{phase === "approved" && <div className="sahl-success"><CheckCircle2 /><span><b>تم اعتماد الخطة</b><small>أضيفت إلى تقويم الفريق</small></span></div>}<div className="sahl-composer"><label htmlFor="sahl-prompt">اكتب طلبك</label><textarea id="sahl-prompt" rows={2} value={prompt} onChange={(event) => { setPrompt(event.target.value); setPhase("idle"); }} /><Button type="button" size="icon" onClick={run} disabled={!prompt.trim() || phase === "thinking"} aria-label="إرسال الطلب">{phase === "thinking" ? <Loader2 className="animate-spin" /> : <Send />}</Button></div>{(phase === "draft" || phase === "approved") && <div className="sahl-demo-actions"><Button variant="outline" onClick={() => setPhase("idle")}>تعديل</Button><Button onClick={() => setPhase("approved")} disabled={phase === "approved"}><Check />{phase === "approved" ? "تم الاعتماد" : "اعتماد وجدولة"}</Button></div>}</div></div></div>;
}

export function EditorialHomepage() {
  const [sector, setSector] = useState(0);
  const [story, setStory] = useState(0);
  const currentSector = sectors[sector] ?? sectors[0];
  return <div className="sahl-white-home" dir="rtl">
    <section className="sahl-hero" aria-labelledby="home-title"><div className="sahl-hero-lines" aria-hidden="true" /><div className="sahl-shell sahl-hero-layout"><Reveal className="sahl-hero-copy"><p className="sahl-kicker"><span>جديد</span> فريق عربي جاهز لأول مهمة</p><h1 id="home-title">سهل<br /><em>فريق يعمل.</em><br />وأنت تقود.</h1><p className="sahl-lead">موظفون رقميون يكتبون ويصممون ويردّون ويبيعون ويحللون، داخل مساحة عمل واحدة تعرف مشروعك.</p><div className="sahl-actions"><Button asChild size="lg"><Link to="/auth" search={{ mode: "signup" as const }}>ابدأ مجاناً <ArrowLeft /></Link></Button><Button asChild size="lg" variant="ghost"><a href="#siraj-demo">شاهد سِراج يعمل <Play /></a></Button></div><small><CheckCircle2 /> ١٤ يوماً مجاناً · بدون بطاقة بنكية</small></Reveal><Reveal className="sahl-hero-product"><div className="sahl-hero-wash" aria-hidden="true" /><ProductFrame src={dashboardAsset.url} alt="مساحة عمل سهل لإدارة الفريق الرقمي" hero /><div className="sahl-float-note"><CheckCircle2 /><span><small>اكتملت الآن</small><b>خطة محتوى الأسبوع</b></span></div></Reveal></div></section>

    <section className="sahl-trust" aria-label="أمثلة لأنشطة صُمم سهل لخدمتها"><div className="sahl-shell"><p><b>أمثلة توضيحية</b> لأنشطة عربية صُمّم سهل لخدمتها</p><div className="sahl-trust-row">{["نُقطة قهوة", "دار نَسج", "مدار التقنية", "عيادات وِصال", "مذاق البيت", "أثر العقارية"].map((name) => <span key={name}>{name}</span>)}</div></div></section>

    <section className="sahl-section sahl-capabilities"><div className="sahl-shell"><Reveal><header className="sahl-section-head"><span>نظام واحد بدل أدوات متفرقة</span><h2>كل ما يحتاجه مشروعك،<br /><em>يعمل معاً من البداية.</em></h2><p>ابدأ بموظف واحد، ثم أضف القدرات التي تحتاجها. كل مهمة تحمل سياقها إلى الخطوة التالية.</p></header></Reveal><div className="sahl-cap-grid">{capabilities.map((item) => <Reveal key={item.kicker} className={`sahl-cap-card is-${item.span} is-${item.tone}`}><div><item.icon /><span>{item.kicker}</span><h3>{item.title}</h3><p>{item.body}</p><Link to="/features">اعرف أكثر <ArrowLeft /></Link></div><ProductFrame src={item.image} alt={`معاينة ${item.kicker} في سهل`} /></Reveal>)}</div></div></section>

    <section className="sahl-stats"><div className="sahl-stats-curve" aria-hidden="true"><i /><i /><i /></div><div className="sahl-shell"><Reveal><header><span>بيانات توضيحية من تدفقات سهل</span><h2>أثر العمل يظهر<br />في لوحة واحدة.</h2></header></Reveal><div className="sahl-stat-grid">{stats.map((item, index) => <Reveal key={item.label} className="sahl-stat"><small>٠{index + 1}</small><strong>{item.value}</strong><span>{item.label}</span></Reveal>)}</div></div></section>

    <section className="sahl-section sahl-demo-section"><div className="sahl-shell"><Reveal><header className="sahl-section-head is-split"><div><span>جرّب طريقة العمل</span><h2>اطلب النتيجة.<br /><em>واترك التفاصيل لسِراج.</em></h2></div><p>بدلاً من عرض دعائي، هذه تجربة حقيقية مصغّرة: اكتب المطلوب، استلم المسودة، ثم اعتمدها.</p></header></Reveal><Reveal><SirajDemo /></Reveal></div></section>

    <section className="sahl-section sahl-sectors"><div className="sahl-shell"><Reveal><header className="sahl-section-head"><span>حل يناسب نشاطك</span><h2>المنصة نفسها.<br /><em>وسياق مختلف لكل مشروع.</em></h2></header></Reveal><div className="sahl-sector-tabs" role="tablist" aria-label="اختر نوع النشاط">{sectors.map((item, index) => <Button key={item.id} variant="ghost" role="tab" aria-selected={sector === index} className={sector === index ? "is-active" : ""} onClick={() => setSector(index)}>{item.label}</Button>)}</div><Reveal className="sahl-sector-panel"><div><span>{currentSector.label}</span><h3>{currentSector.title}</h3><p>{currentSector.body}</p><strong>{currentSector.stat}</strong><Link to="/use-cases/$id" params={{ id: currentSector.id }}>شاهد الحل الكامل <ArrowLeft /></Link></div><figure><img src={currentSector.image} alt={`سهل لقطاع ${currentSector.label}`} /></figure></Reveal></div></section>

    <section className="sahl-section sahl-infrastructure"><div className="sahl-shell"><Reveal><header className="sahl-section-head is-split"><div><span>بنية تشغيل موثوقة</span><h2>يرتبط بأدواتك.<br /><em>ويبقيك في التحكم.</em></h2></div><p>اربط الحسابات التي تعمل عليها، ضع قواعد الاعتماد، وتابع كل خطوة ينفذها الفريق.</p></header></Reveal><Reveal className="sahl-system-board"><ProductFrame src={integrationsAsset.url} alt="تكاملات سهل ومسار العمل" /><div className="sahl-system-points"><span><Workflow /><b>تدفق واحد</b></span><span><LockKeyhole /><b>موافقتك أولاً</b></span><span><Code2 /><b>يتوسع معك</b></span></div></Reveal></div></section>

    <section className="sahl-section sahl-stories"><div className="sahl-shell"><Reveal><header className="sahl-section-head"><span>قصص من العمل الحقيقي</span><h2>نتائج أوضح،<br /><em>بتشغيل أقل تشتتاً.</em></h2></header></Reveal><div className="sahl-story-accordion">{stories.map((item, index) => <article key={item.id} className={story === index ? "is-open" : ""}><Button variant="ghost" onClick={() => setStory(index)} aria-expanded={story === index}><span>٠{index + 1}</span><b>{item.company}</b><small>{item.sector}</small><i>+</i></Button><div className="sahl-story-content"><div><span>{item.country}</span><h3>{item.headline}</h3><blockquote>“{item.quote}”</blockquote><footer><b>{item.person}</b><small>{item.role}</small></footer></div><div className="sahl-story-results">{item.results.map((result) => <span key={result.k}><strong>{result.v}</strong><small>{result.k}</small></span>)}</div></div></article>)}</div></div></section>

    <section className="sahl-section sahl-start"><div className="sahl-shell"><Reveal><header className="sahl-section-head"><span>اختر نقطة البداية</span><h2>ثلاث طرق واضحة<br /><em>لتبدأ بالطريقة المناسبة.</em></h2></header></Reveal><div className="sahl-start-grid"><Reveal><article><Sparkles /><span>ابدأ بنفسك</span><h3>جرّب سهل مجاناً</h3><p>كوّن فريقك وابدأ أول مهمة خلال دقائق، من دون بطاقة بنكية.</p><Link to="/auth" search={{ mode: "signup" as const }}>ابدأ الآن <ArrowLeft /></Link></article></Reveal><Reveal><article><Play /><span>شاهد المنتج</span><h3>عرض مباشر لسِراج</h3><p>شاهد كيف يتحول طلب بسيط إلى خطة قابلة للمراجعة والتنفيذ.</p><a href="#siraj-demo">شاهد التجربة <ArrowLeft /></a></article></Reveal><Reveal><article><Globe2 /><span>للمؤسسات</span><h3>صمّم تشغيل فريقك</h3><p>للشركات والفروع التي تحتاج صلاحيات وإعداداً ودعماً مخصصاً.</p><Link to="/contact">تحدث مع المبيعات <ArrowLeft /></Link></article></Reveal></div></div></section>

    <section className="sahl-section sahl-pricing"><div className="sahl-shell"><Reveal><header className="sahl-section-head"><span>خطط واضحة</span><h2>ابدأ بحجمك اليوم.<br /><em>وكبّر الفريق وقتما تحتاج.</em></h2></header></Reveal><div className="sahl-plan-grid">{plans.map((plan) => <Reveal key={plan.id}><article className={plan.highlight ? "is-featured" : ""}>{plan.highlight && <span className="sahl-plan-tag">الأكثر اختياراً</span>}<small>{plan.tag}</small><h3>{plan.name}</h3><div className="sahl-price">{plan.monthly ? <><strong>{plan.monthly.toLocaleString("ar-SA")}</strong><span>ر.س / شهرياً</span></> : <strong>حسب الطلب</strong>}</div><p>{plan.desc}</p><ul>{plan.perks.slice(0, 5).map((perk) => <li key={perk}><Check />{perk}</li>)}</ul><Button asChild variant={plan.highlight ? "default" : "outline"}>{plan.monthly ? <Link to="/auth" search={{ mode: "signup" as const }}>{plan.cta}<ArrowLeft /></Link> : <Link to="/contact">{plan.cta}<ArrowLeft /></Link>}</Button></article></Reveal>)}</div></div></section>

    <section className="sahl-section sahl-faq"><div className="sahl-shell"><Reveal><header className="sahl-section-head"><span>أسئلة شائعة</span><h2>قبل أن يبدأ<br />فريقك الجديد.</h2></header></Reveal><Accordion type="single" collapsible>{faqs.slice(0, 6).map((item, index) => <AccordionItem key={item.q} value={`faq-${index}`}><AccordionTrigger>{item.q}</AccordionTrigger><AccordionContent>{item.a}</AccordionContent></AccordionItem>)}</Accordion></div></section>

    <section className="sahl-final"><div className="sahl-shell"><Reveal><span>جاهز لأول مهمة؟</span><h2>دع العمل يتحرك.<br />وابْقَ أنت في القيادة.</h2><p>ابدأ مجاناً، كوّن فريقك الرقمي، وراجع أول نتيجة اليوم.</p><div className="sahl-actions"><Button asChild size="lg"><Link to="/auth" search={{ mode: "signup" as const }}>ابدأ ١٤ يوماً مجاناً <ArrowLeft /></Link></Button><Button asChild size="lg" variant="ghost"><Link to="/contact">تحدث معنا</Link></Button></div></Reveal></div></section><SiteFooter />
  </div>;
}
