import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, BarChart3, BrainCircuit, CalendarCheck2, Check, CheckCircle2, Clock3, Code2, Globe2, Loader2, LockKeyhole, MessageSquareText, SearchCheck, Send, ShieldCheck, Workflow } from "lucide-react";

import { faqs } from "@/components/site/Faq";
import { Portrait } from "@/components/site/Portrait";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { plans } from "@/data/pricing";
import dashboardAsset from "@/assets/product/dashboard.webp.asset.json";
import approvalsAsset from "@/assets/product/approvals.webp.asset.json";
import brainAsset from "@/assets/product/brain.webp.asset.json";
import integrationsAsset from "@/assets/product/integrations.webp.asset.json";
import reportsAsset from "@/assets/product/reports.webp.asset.json";

type DemoPhase = "idle" | "thinking" | "draft" | "approved";

const solutions = [
  { icon: MessageSquareText, label: "سِراج · المحتوى والنشر", title: "ينشر بالنيابة عنك، بصوت علامتك.", body: "يحوّل فكرتك إلى خطة ومحتوى مناسب لكل منصة، ثم ينتظر موافقتك قبل النشر.", image: dashboardAsset.url, to: "/employees", size: "hero" },
  { icon: ShieldCheck, label: "المراجعة والاعتماد", title: "الفريق ينجز. وأنت تقرر.", body: "كل مهمة حساسة تصل إلى طابور واضح قبل أن تصل إلى عملائك.", image: approvalsAsset.url, to: "/app/approvals", size: "tall" },
  { icon: BrainCircuit, label: "عقل العلامة", title: "سياق واحد يعرفه الفريق كله.", body: "النبرة والجمهور والمنتجات والملاحظات تتحول إلى معرفة مشتركة.", image: brainAsset.url, to: "/app/brain", size: "square" },
  { icon: CalendarCheck2, label: "أمَل · التنظيم", title: "يومك مرتب قبل أن يبدأ.", body: "تلخّص الأولويات وتنظم التقويم والمتابعات في مسار واحد.", image: reportsAsset.url, to: "/employees", size: "square" },
  { icon: SearchCheck, label: "نور · الظهور", title: "محتوى يُكتشف ويستحق القراءة.", body: "تبحث وتكتب وتحسن حضور مشروعك في محركات البحث والإجابة.", image: integrationsAsset.url, to: "/employees", size: "wide" },
] as const;

const sectors = [
  { id: "ecommerce", label: "المتاجر", title: "من أول منشور إلى متابعة الطلب.", body: "المحتوى والحملات ورسائل العملاء تتحرك في مسار واحد دون نسخ ولصق بين الأدوات.", stat: "٧ منصات", image: dashboardAsset.url },
  { id: "restaurants", label: "المطاعم", title: "حضور يومي وردود أسرع وقت الذروة.", body: "جهّز العروض، انشرها، وتابع الرسائل والموافقات من مساحة واحدة.", stat: "٢٤/٧", image: approvalsAsset.url },
  { id: "clinics", label: "العيادات", title: "محتوى يبني الثقة ويحفظ وقت الفريق.", body: "خطط توعوية وردود متسقة مع مراجعة بشرية قبل المواد الحساسة.", stat: "خطوة واحدة", image: brainAsset.url },
  { id: "realestate", label: "العقار", title: "كل فرصة تحصل على متابعة كاملة.", body: "العروض والمحتوى والتقارير تنتقل بين الموظفين بسياق واضح.", stat: "٦ موظفين", image: reportsAsset.url },
] as const;

const demoBusinesses = ["نُقطة قهوة", "دار نَسج", "مدار التقنية", "عيادات وِصال", "مذاق البيت", "أثر العقارية"];

function ProductFrame({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return <figure className={`stripe-static-frame ${className}`}><div className="stripe-browser-bar" aria-hidden="true"><i /><i /><i /><span>app.sahl.ai</span></div><img src={src} alt={alt} loading={className.includes("is-hero") ? "eager" : "lazy"} /></figure>;
}

function SirajDemo() {
  const [prompt, setPrompt] = useState("جهّز حملة لإطلاق منتجنا الجديد الأسبوع القادم");
  const [phase, setPhase] = useState<DemoPhase>("idle");
  const timer = useRef<number | null>(null);
  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);
  const run = () => { if (!prompt.trim() || phase === "thinking") return; setPhase("thinking"); timer.current = window.setTimeout(() => setPhase("draft"), 900); };
  return <div className="stripe-demo" id="siraj-demo"><header><span><i /> مساحة عمل سهل</span><strong>محادثة مع سِراج</strong><small>متصل الآن</small></header><div className="stripe-demo-layout"><aside><Portrait memberId="sonny" name="سِراج" eager /><strong>سِراج</strong><small>مدير السوشيال ميديا</small><ul><li className="is-active">المحادثة</li><li>المهام</li><li>المعرفة</li><li>النتائج</li></ul></aside><div className="stripe-chat"><div className="stripe-user-message"><small>أنت</small><p>{prompt}</p></div>{phase === "thinking" && <div className="stripe-thinking"><Loader2 /><span>سِراج يراجع عقل العلامة ويقسم الحملة إلى مهام...</span></div>}{(phase === "draft" || phase === "approved") && <div className="stripe-agent-message"><span><Portrait memberId="sonny" name="سِراج" /><b>سِراج</b><small>الآن</small></span><p>جهّزت خطة إطلاق من ٧ أيام: إعلان تمهيدي، ٣ منشورات، قصة يومية، ورسائل متابعة بنبرة علامتك.</p><div><span>٧ مواد</span><span>إنستقرام + فيسبوك</span></div></div>}{phase === "approved" && <div className="stripe-success"><CheckCircle2 /><span><b>تم اعتماد الخطة</b><small>أضيفت إلى تقويم الفريق</small></span></div>}<div className="stripe-composer"><label htmlFor="stripe-prompt">اكتب طلبك</label><textarea id="stripe-prompt" rows={2} value={prompt} onChange={(event) => { setPrompt(event.target.value); setPhase("idle"); }} /><Button type="button" size="icon" onClick={run} disabled={!prompt.trim() || phase === "thinking"} aria-label="إرسال الطلب">{phase === "thinking" ? <Loader2 className="animate-spin" /> : <Send />}</Button></div>{(phase === "draft" || phase === "approved") && <div className="stripe-demo-actions"><Button variant="outline" onClick={() => setPhase("idle")}>تعديل</Button><Button onClick={() => setPhase("approved")} disabled={phase === "approved"}><Check />{phase === "approved" ? "تم الاعتماد" : "اعتماد وجدولة"}</Button></div>}</div></div></div>;
}

export function EditorialHomepage() {
  const [sector, setSector] = useState(0);
  const currentSector = sectors[sector] ?? sectors[0];
  return <div className="stripe-sahl-home stripe-rebuild" dir="rtl">
    <section className="stripe-sahl-hero" aria-labelledby="home-title"><div className="sahl-hero-mesh" aria-hidden="true"><i className="is-terracotta" /><i className="is-teal" /><i className="is-gold" /><i className="is-deep" /></div><div className="stripe-sahl-grid" aria-hidden="true" /><div className="stripe-sahl-shell stripe-sahl-hero-inner"><div className="stripe-sahl-hero-copy"><p className="stripe-eyebrow"><span>جديد</span> فريق عربي يعمل معك على مدار الساعة</p><h1 id="home-title">البنية التشغيلية<br /><em>لنمو مشروعك.</em></h1><p>موظفون رقميون يكتبون ويصممون ويردّون ويبيعون ويحللون — من أول مهمة إلى أول نتيجة، داخل مساحة واحدة.</p><div className="stripe-sahl-actions"><Link to="/auth" search={{ mode: "signup" as const }}>ابدأ الآن <ArrowLeft /></Link><a href="#siraj-demo">شاهد سِراج يعمل</a></div><small><CheckCircle2 /> ١٤ يوماً مجاناً، بدون بطاقة بنكية</small></div><div className="stripe-hero-stage"><ProductFrame src={dashboardAsset.url} alt="مساحة عمل سهل لإدارة الفريق الرقمي" className="is-hero" /><div className="stripe-floating-task"><span><CheckCircle2 /></span><div><small>اكتملت الآن</small><b>خطة محتوى الأسبوع</b></div></div></div></div></section>

    <section className="stripe-trust sahl-logo-marquee" aria-label="نماذج لأنشطة عربية يمكنها استخدام سهل"><div className="stripe-sahl-shell"><p><b>نماذج تجريبية</b> لأنشطة عربية صُمّم سهل لخدمتها</p><div className="sahl-logo-track">{[...demoBusinesses, ...demoBusinesses].map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}</div></div></section>

    <section className="stripe-solutions"><div className="stripe-sahl-shell"><header className="stripe-section-intro"><span>فريق يعمل كنظام واحد</span><h2>كل قدرة تأخذ<br />المساحة التي تستحقها.</h2><p>ابدأ بسِراج للنشر، ثم أضف التنظيم والمراجعة والبحث. كل موظف يعرف سياق علامتك ويسلّم العمل للموظف التالي.</p></header><div className="sahl-bento-grid">{solutions.map((item) => <article key={item.label} className={`sahl-bento-card liquid-glass is-${item.size}`}><div className="stripe-card-copy"><item.icon /><span>{item.label}</span><h3>{item.title}</h3><p>{item.body}</p><Link to={item.to}>استكشف القدرة <ArrowLeft /></Link></div><ProductFrame src={item.image} alt={`معاينة ${item.label} في سهل`} /></article>)}</div></div></section>

    <section className="stripe-proof"><div className="stripe-sahl-shell"><header><span>مصمّمة للنمو</span><h2>أرقام واضحة.<br />عمل يتحرك.</h2></header><div className="stripe-proof-grid"><article><strong>٦</strong><span>موظفين متخصصين</span></article><article><strong>٢٤/٧</strong><span>تشغيل ومتابعة</span></article><article><strong>٧</strong><span>منصات من مكان واحد</span></article><article><strong>١٥+</strong><span>مصدر بيانات قابل للربط</span></article></div></div></section>

    <section className="stripe-live-product"><div className="stripe-sahl-shell"><header className="stripe-section-intro"><span>المنتج في قلب الصفحة</span><h2>اكتب ما تحتاجه.<br />وشاهد سِراج يبدأ.</h2><p>تجربة عملية واحدة بدلاً من عشرات المقاطع المتحركة: اكتب الطلب، استلم المسودة، ثم اعتمدها.</p></header><SirajDemo /></div></section>

    <section className="stripe-sectors"><div className="stripe-sahl-shell"><header className="stripe-section-intro"><span>لكل نوع مشروع</span><h2>نفس الفريق.<br />سياق يناسب نشاطك.</h2></header><div className="stripe-sector-tabs" role="tablist" aria-label="اختر نوع النشاط">{sectors.map((item, index) => <Button key={item.id} variant="ghost" role="tab" aria-selected={sector === index} className={sector === index ? "is-active" : ""} onClick={() => setSector(index)}>{item.label}</Button>)}</div><div className="stripe-sector-panel"><div><span>{currentSector.label}</span><h3>{currentSector.title}</h3><p>{currentSector.body}</p><strong>{currentSector.stat}</strong><Link to="/use-cases/$id" params={{ id: currentSector.id }}>شاهد الحل الكامل <ArrowLeft /></Link></div><figure><img src={currentSector.image} alt={`سهل لقطاع ${currentSector.label}`} /></figure></div></div></section>

    <section className="stripe-infrastructure"><div className="stripe-sahl-shell"><header><span>موثوقة ومترابطة</span><h2>منصة جاهزة<br />لطريقتك في العمل.</h2><p>اربط حساباتك، ثبّت قواعد الموافقة، وشاهد كل خطوة ينفذها الفريق.</p></header><ProductFrame src={integrationsAsset.url} alt="تكاملات سهل" /><div className="stripe-infrastructure-grid"><article><Workflow /><b>تتصل بأدواتك</b><p>حسابات النشر والتحليلات وموقعك في تدفق واحد.</p></article><article><LockKeyhole /><b>تحكم واضح</b><p>المهام الحساسة تنتظر موافقتك قبل التنفيذ.</p></article><article><Code2 /><b>تتوسع معك</b><p>أضف موظفين ومصادر جديدة عندما يكبر العمل.</p></article></div></div></section>

    <section className="stripe-stories"><div className="stripe-sahl-shell"><header><span>نتيجة يمكن قياسها</span><h2>عمل أقل تشتتاً.<br />ونمو أكثر انتظاماً.</h2></header><blockquote><p>“بدلاً من التنقل بين خمس أدوات ومتابعة كل تفصيلة، أصبحت أرسل المطلوب مرة واحدة وأراجع النتيجة فقط.”</p><footer><b>صاحبة متجر إلكتروني</b><span>الرياض، السعودية</span></footer></blockquote><div className="stripe-story-stats"><span><BarChart3 /><b>٣×</b><small>محتوى أكثر انتظاماً</small></span><span><Clock3 /><b>١٢ ساعة</b><small>موفّرة كل أسبوع</small></span><span><Globe2 /><b>٤ قنوات</b><small>تعمل بصوت واحد</small></span></div></div></section>

    <section className="stripe-pricing"><div className="stripe-sahl-shell"><header className="stripe-section-intro"><span>خطط واضحة</span><h2>ابدأ بحجمك اليوم.<br />وكبّر الفريق وقتما تحتاج.</h2></header><div className="stripe-plan-grid">{plans.map((plan) => <article key={plan.id} className={plan.highlight ? "is-featured" : ""}>{plan.highlight && <span className="stripe-plan-tag">الأكثر اختياراً</span>}<small>{plan.tag}</small><h3>{plan.name}</h3><div>{plan.monthly ? <><strong>{plan.monthly.toLocaleString("ar-SA")}</strong><span>ر.س / شهرياً</span></> : <strong className="is-text">حسب الطلب</strong>}</div><p>{plan.desc}</p><ul>{plan.perks.slice(0, 4).map((perk) => <li key={perk}><Check />{perk}</li>)}</ul>{plan.monthly ? <Link to="/auth" search={{ mode: "signup" as const }}>{plan.cta}<ArrowLeft /></Link> : <Link to="/contact">{plan.cta}<ArrowLeft /></Link>}</article>)}</div></div></section>

    <section className="stripe-faq"><div className="stripe-sahl-shell"><header className="stripe-section-intro"><span>أسئلة شائعة</span><h2>قبل أن يبدأ الفريق.</h2></header><Accordion type="single" collapsible>{faqs.slice(0, 6).map((item, index) => <AccordionItem key={item.q} value={`faq-${index}`}><AccordionTrigger>{item.q}</AccordionTrigger><AccordionContent>{item.a}</AccordionContent></AccordionItem>)}</Accordion></div></section>

    <section className="stripe-final-cta"><div className="stripe-sahl-shell"><span>فريقك جاهز</span><h2>ابدأ اليوم.<br />ودع العمل يتحرك.</h2><p>كوّن فريقك الرقمي في دقائق، وابدأ أول مهمة مجاناً.</p><div className="stripe-sahl-actions"><Link to="/auth" search={{ mode: "signup" as const }}>ابدأ ١٤ يوماً مجاناً <ArrowLeft /></Link><Link to="/contact">تحدث معنا</Link></div></div></section><SiteFooter />
  </div>;
}